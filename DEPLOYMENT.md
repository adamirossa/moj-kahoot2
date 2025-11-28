# 🚀 NASADENIE NA RENDER.COM - KROK ZA KROKOM

## 📋 **PREČO RENDER.COM:**
- ✅ **Úplne zadarmo** (bez kreditnej karty)
- ✅ **Node.js podpora** 
- ✅ **Real-time WebSocket** funguje
- ✅ **Automatické nasadenie** z GitHub
- ✅ **HTTPS** automaticky
- ✅ **Vlastná doména** možná

## 🚀 **INŠTALÁCIA (5 minút):**

### **Krok 1: Lokálne testovanie**
```bash
cd kahoot-ready
npm install
npm start
```
Otvorte: http://localhost:3000

### **Krok 2: GitHub**
1. Vytvorte nový GitHub repository
2. Nahrajte všetky súbory z `kahoot-ready/`
3. Push na GitHub

### **Krok 3: Render.com**
1. Choďte na **https://render.com**
2. **Sign up** s GitHub účtom
3. Kliknite **"New +"** → **"Web Service"**
4. Pripojte váš GitHub repository
5. Nastavenia:
   - **Name:** `moj-kahoot`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Kliknite **"Create Web Service"**

### **Krok 4: Čakanie (2-3 minúty)**
- Render automaticky nasadí aplikáciu
- Dostanete URL: `https://moj-kahoot.onrender.com`

## 🎮 **POUŽITIE:**

### **Pre učiteľov:**
1. Choďte na `https://moj-kahoot.onrender.com/host`
2. Vytvorte kvíz s otázkami
3. Spustite hru → dostanete PIN kód
4. Zdieľajte PIN s študentmi

### **Pre študentov:**
1. Choďte na `https://moj-kahoot.onrender.com`
2. Zadajte PIN kód a meno
3. Čakajte na spustenie hry
4. Odpovedajte na otázky

## 🎯 **FUNKCIE (PRESNE AKO KAHOOT):**

### ✅ **Čo funguje:**
- 📝 **Tvorba kvízov** s otázkami
- 🎮 **Real-time multiplayer** hra
- ⏱️ **Časovač** pre otázky
- 🏃‍♂️ **Bodovanie** za rýchlosť
- 🏆 **Live rebríčky**
- 📱 **Mobile friendly**
- 🎛️ **Admin ovládanie** hry

### 🎮 **Herný tok:**
1. **Admin** vytvorí kvíz
2. **Spustí hru** → dostane PIN
3. **Hráči** sa pripoja cez PIN
4. **Real-time hra** s otázkami
5. **Live rebríčky** počas hry
6. **Finálne výsledky**

## 🔧 **RIEŠENIE PROBLÉMOV:**

### **Aplikácia sa nenačíta:**
- Počkajte 2-3 minúty na prvé nasadenie
- Skontrolujte logs v Render dashboarde

### **Real-time nefunguje:**
- Render podporuje WebSocket zadarmo
- Malo by fungovať automaticky

### **Chcete vlastnú doménu:**
- V Render: Settings → Custom Domains
- Pridajte svoju doménu (napr. `moj-kviz.sk`)

## 💡 **TIPY:**

### **Zlepšenie výkonu:**
- Render má "cold start" - prvé načítanie môže trvať 30s
- Po aktivite je rýchle

### **Aktualizácie:**
- Každý push na GitHub = automatické nasadenie
- Žiadna manuálna práca

### **Monitoring:**
- Render dashboard ukazuje logy
- Môžete sledovať používanie

## 🎉 **HOTOVO!**

Máte plne funkčný Kahoot klon na:
`https://vas-nazov.onrender.com`

**Všetko funguje presne ako skutočný Kahoot! 🎮**