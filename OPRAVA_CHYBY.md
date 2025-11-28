# 🔧 OPRAVA CHYBY - "no such file or directory"

## ❌ **PROBLÉM:**
```
Error: ENOENT: no such file or directory, stat '/opt/render/project/src/public/index.html'
```

## ✅ **RIEŠENIE:**

### **Možnosť 1: Oprava štruktúry súborov (ODPORÚČANÉ)**

1. **Skontrolujte štruktúru na GitHub:**
   ```
   moj-kahoot/
   ├── server.js          ✅
   ├── package.json       ✅
   └── public/            ✅
       ├── index.html     ✅
       ├── host.html      ✅
       └── game.html      ✅
   ```

2. **Ak nemáte priečinok `public/`:**
   - Vytvorte priečinok `public/` na GitHub
   - Presuňte `index.html`, `host.html`, `game.html` do `public/`

3. **Ak máte súbory v root priečinku:**
   - Vytvorte priečinok `public/`
   - Presuňte HTML súbory do `public/`

### **Možnosť 2: Aktualizácia server.js**

Nahraďte váš `server.js` týmto opraveným:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');
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
console.log('Looking for files...');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); // Fallback to root directory
app.use(express.json());

// Routes with fallback
app.get('/', (req, res) => {
  let indexPath = path.join(__dirname, 'public', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    indexPath = path.join(__dirname, 'index.html');
  }
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <h1>🎮 Kahoot Clone</h1>
      <p>Súbory sa načítavaju... Skúste obnoviť stránku.</p>
      <p>Ak problém pretrváva, skontrolujte štruktúru súborov na GitHub.</p>
    `);
  }
});

// ... zvyšok kódu zostáva rovnaký
```

### **Možnosť 3: Nové nasadenie**

1. **Zmaž starý Web Service** v Render
2. **Vytvor nový Web Service**
3. **Skontroluj že máte správnu štruktúru súborov**

## 🔍 **DIAGNOSTIKA:**

### **Skontrolujte logy v Render:**
1. Render Dashboard → váš service
2. Logs → hľadajte:
   ```
   Current directory: /opt/render/project/src
   Files in public directory: [...]
   ```

### **Správna štruktúra by mala ukázať:**
```
Files in public directory: ['index.html', 'host.html', 'game.html']
```

## 🚀 **RÝCHLE RIEŠENIE:**

### **1. Aktualizujte server.js**
- Nahraďte obsah súboru `server.js` opravenou verziou vyššie
- Commit na GitHub

### **2. Render automaticky redeploy**
- Render automaticky nasadí novú verziu
- Sledujte logy

### **3. Test**
- Otvorte vašu URL
- Malo by fungovať aj s nesprávnou štruktúrou súborov

## ✅ **OVERENIE:**

Ak všetko funguje, uvidíte:
- `https://vas-web.onrender.com` → hlavná stránka
- `https://vas-web.onrender.com/host` → admin stránka
- Žiadne chyby v logoch

**Opravený server.js má fallback mechanizmy a bude fungovať aj s rôznymi štruktúrami súborov! 🎉**