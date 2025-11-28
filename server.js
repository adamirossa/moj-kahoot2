const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Debug: Check file structure
console.log('Current directory:', __dirname);
console.log('Public directory:', path.join(__dirname, 'public'));

const fs = require('fs');
try {
  const publicFiles = fs.readdirSync(path.join(__dirname, 'public'));
  console.log('Files in public directory:', publicFiles);
} catch (err) {
  console.error('Error reading public directory:', err);
  
  // Try to find files in current directory
  try {
    const currentFiles = fs.readdirSync(__dirname);
    console.log('Files in current directory:', currentFiles);
  } catch (err2) {
    console.error('Error reading current directory:', err2);
  }
}

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// In-memory storage (v produkcii použite databázu)
let games = new Map();
let players = new Map();

// Routes
app.get('/', (req, res) => {
  let indexPath = path.join(__dirname, 'public', 'index.html');
  
  // Check if file exists, if not try alternative paths
  if (!fs.existsSync(indexPath)) {
    console.log('index.html not found at:', indexPath);
    
    // Try direct path
    const altPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(altPath)) {
      indexPath = altPath;
      console.log('Found index.html at:', indexPath);
    } else {
      console.log('index.html not found at:', altPath);
      return res.status(404).send(`
        <h1>Files not found</h1>
        <p>Looking for index.html at: ${indexPath}</p>
        <p>Alternative path: ${altPath}</p>
        <p>Current directory: ${__dirname}</p>
      `);
    }
  }
  
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

app.get('/host', (req, res) => {
  let hostPath = path.join(__dirname, 'public', 'host.html');
  
  if (!fs.existsSync(hostPath)) {
    const altPath = path.join(__dirname, 'host.html');
    if (fs.existsSync(altPath)) {
      hostPath = altPath;
    } else {
      return res.status(404).send('host.html not found');
    }
  }
  
  res.sendFile(hostPath);
});

app.get('/game/:pin', (req, res) => {
  let gamePath = path.join(__dirname, 'public', 'game.html');
  
  if (!fs.existsSync(gamePath)) {
    const altPath = path.join(__dirname, 'game.html');
    if (fs.existsSync(altPath)) {
      gamePath = altPath;
    } else {
      return res.status(404).send('game.html not found');
    }
  }
  
  res.sendFile(gamePath);
});

// API Routes
app.post('/api/create-game', (req, res) => {
  const { quiz } = req.body;
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  
  const game = {
    pin,
    quiz,
    players: [],
    currentQuestion: -1,
    status: 'lobby', // lobby, question, results, finished
    startTime: null
  };
  
  games.set(pin, game);
  
  res.json({ pin, success: true });
});

app.get('/api/game/:pin', (req, res) => {
  const game = games.get(req.params.pin);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  res.json(game);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Host joins game
  socket.on('host-join', (pin) => {
    const game = games.get(pin);
    if (game) {
      socket.join(`game-${pin}`);
      socket.emit('host-joined', { success: true });
      
      // Send current players
      socket.emit('players-update', game.players);
    } else {
      socket.emit('host-joined', { success: false, error: 'Game not found' });
    }
  });

  // Player joins game
  socket.on('player-join', ({ pin, name }) => {
    const game = games.get(pin);
    if (!game) {
      socket.emit('player-joined', { success: false, error: 'Game not found' });
      return;
    }

    if (game.status !== 'lobby') {
      socket.emit('player-joined', { success: false, error: 'Game already started' });
      return;
    }

    // Check if name already exists
    if (game.players.find(p => p.name === name)) {
      socket.emit('player-joined', { success: false, error: 'Name already taken' });
      return;
    }

    const player = {
      id: socket.id,
      name,
      score: 0,
      answers: []
    };

    game.players.push(player);
    players.set(socket.id, { pin, name });
    
    socket.join(`game-${pin}`);
    socket.emit('player-joined', { success: true, player });
    
    // Notify host and other players
    io.to(`game-${pin}`).emit('players-update', game.players);
  });

  // Start game
  socket.on('start-game', (pin) => {
    const game = games.get(pin);
    if (game && game.status === 'lobby') {
      game.status = 'question';
      game.currentQuestion = 0;
      game.startTime = Date.now();
      
      const question = game.quiz.questions[0];
      const questionData = {
        question: question.question,
        answers: question.answers.map((answer, index) => ({ index, text: answer })),
        timeLimit: question.timeLimit || 20,
        questionNumber: 1,
        totalQuestions: game.quiz.questions.length
      };
      
      io.to(`game-${pin}`).emit('question-start', questionData);
      
      // Auto advance after time limit
      setTimeout(() => {
        showResults(pin);
      }, (question.timeLimit || 20) * 1000);
    }
  });

  // Player submits answer
  socket.on('submit-answer', ({ pin, answerIndex, responseTime }) => {
    const game = games.get(pin);
    const playerData = players.get(socket.id);
    
    if (game && playerData && game.status === 'question') {
      const player = game.players.find(p => p.id === socket.id);
      const question = game.quiz.questions[game.currentQuestion];
      
      if (player && !player.answers[game.currentQuestion]) {
        const isCorrect = answerIndex === question.correctAnswer;
        let points = 0;
        
        if (isCorrect) {
          // Points based on speed (max 1000 points)
          const timeBonus = Math.max(0, (question.timeLimit - responseTime) / question.timeLimit);
          points = Math.round(500 + (500 * timeBonus));
        }
        
        player.answers[game.currentQuestion] = {
          answerIndex,
          isCorrect,
          points,
          responseTime
        };
        
        player.score += points;
        
        socket.emit('answer-result', { isCorrect, points });
        
        // Update leaderboard
        const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
        io.to(`game-${pin}`).emit('leaderboard-update', sortedPlayers);
      }
    }
  });

  // Next question
  socket.on('next-question', (pin) => {
    const game = games.get(pin);
    if (game) {
      game.currentQuestion++;
      
      if (game.currentQuestion < game.quiz.questions.length) {
        game.status = 'question';
        const question = game.quiz.questions[game.currentQuestion];
        
        const questionData = {
          question: question.question,
          answers: question.answers.map((answer, index) => ({ index, text: answer })),
          timeLimit: question.timeLimit || 20,
          questionNumber: game.currentQuestion + 1,
          totalQuestions: game.quiz.questions.length
        };
        
        io.to(`game-${pin}`).emit('question-start', questionData);
        
        // Auto advance after time limit
        setTimeout(() => {
          showResults(pin);
        }, (question.timeLimit || 20) * 1000);
      } else {
        // Game finished
        game.status = 'finished';
        const finalResults = [...game.players].sort((a, b) => b.score - a.score);
        io.to(`game-${pin}`).emit('game-finished', finalResults);
      }
    }
  });

  // Show results
  socket.on('show-results', (pin) => {
    showResults(pin);
  });

  function showResults(pin) {
    const game = games.get(pin);
    if (game && game.status === 'question') {
      game.status = 'results';
      const question = game.quiz.questions[game.currentQuestion];
      
      // Calculate answer statistics
      const answerStats = question.answers.map((answer, index) => {
        const count = game.players.filter(p => 
          p.answers[game.currentQuestion] && 
          p.answers[game.currentQuestion].answerIndex === index
        ).length;
        
        return {
          text: answer,
          count,
          percentage: game.players.length > 0 ? Math.round((count / game.players.length) * 100) : 0,
          isCorrect: index === question.correctAnswer
        };
      });
      
      const leaderboard = [...game.players].sort((a, b) => b.score - a.score);
      
      io.to(`game-${pin}`).emit('results-show', {
        question: question.question,
        correctAnswer: question.correctAnswer,
        answerStats,
        leaderboard: leaderboard.slice(0, 5) // Top 5
      });
    }
  }

  // Disconnect
  socket.on('disconnect', () => {
    const playerData = players.get(socket.id);
    if (playerData) {
      const game = games.get(playerData.pin);
      if (game) {
        game.players = game.players.filter(p => p.id !== socket.id);
        io.to(`game-${playerData.pin}`).emit('players-update', game.players);
      }
      players.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🎮 Kahoot Clone running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT}`);
});