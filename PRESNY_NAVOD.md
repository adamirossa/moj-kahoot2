# 🚀 PRESNÝ NÁVOD - Nasadenie Kahoot klonu na web

## 📋 **KROK 1: PRÍPRAVA (2 minúty)**

### **1.1 Stiahnite súbory**
- Máte priečinok `kahoot-ready/` s týmito súbormi:
  ```
  kahoot-ready/
  ├── server.js
  ├── package.json
  ├── public/
  │   ├── index.html
  │   ├── host.html
  │   └── game.html
  └── README.md
  ```

### **1.2 Test na počítači (voliteľné)**
```bash
cd kahoot-ready
npm install
npm start
```
- Otvorte: http://localhost:3000
- Ak funguje → pokračujte ďalej

---

## 📋 **KROK 2: GITHUB ÚČET (3 minúty)**

### **2.1 Vytvorte GitHub účet**
1. Choďte na **https://github.com**
2. Kliknite **"Sign up"**
3. Zadajte email, heslo, používateľské meno
4. Potvrďte email

### **2.2 Vytvorte nový repository**
1. Kliknite **"New repository"** (zelené tlačidlo)
2. **Repository name:** `moj-kahoot`
3. **Public** ✅ (musí byť public pre free)
4. **Add README** ✅
5. Kliknite **"Create repository"**

### **2.3 Nahrajte súbory**
1. Kliknite **"uploading an existing file"**
2. **Drag & drop** všetky súbory z `kahoot-ready/`
3. **Commit message:** "Pridanie Kahoot klonu"
4. Kliknite **"Commit changes"**

---

## 📋 **KROK 3: RENDER.COM ÚČET (2 minúty)**

### **3.1 Registrácia**
1. Choďte na **https://render.com**
2. Kliknite **"Get Started for Free"**
3. **"Sign up with GitHub"** ✅ (jednoduchšie)
4. Autorizujte Render prístup k GitHub

### **3.2 Overenie**
- Render vás presmeruje na dashboard
- **Žiadna kreditná karta** nie je potrebná!

---

## 📋 **KROK 4: NASADENIE (5 minút)**

### **4.1 Vytvorenie Web Service**
1. V Render dashboarde kliknite **"New +"**
2. Vyberte **"Web Service"**
3. Kliknite **"Connect a repository"**
4. Vyberte váš repository **"moj-kahoot"**
5. Kliknite **"Connect"**

### **4.2 Konfigurácia**
```
Name: moj-kahoot
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: (nechajte prázdne)
Build Command: npm install
Start Command: npm start
```

### **4.3 Pokročilé nastavenia**
- **Auto-Deploy:** Yes ✅
- **Instance Type:** Free ✅
- Ostatné nechajte predvolené

### **4.4 Spustenie**
1. Kliknite **"Create Web Service"**
2. **Čakajte 3-5 minút** na nasadenie
3. Uvidíte logy ako sa inštaluje

---

## 📋 **KROK 5: TESTOVANIE (2 minúty)**

### **5.1 Získanie URL**
- Po dokončení uvidíte URL: `https://moj-kahoot.onrender.com`
- Kliknite na URL

### **5.2 Test funkčnosti**
1. **Hlavná stránka:** Formulár na pripojenie
2. **Host stránka:** `/host` - tvorba kvízov
3. **Test hry:**
   - Choďte na `/host`
   - Vytvorte kvíz s 2 otázkami
   - Spustite hru → dostanete PIN
   - V novom okne choďte na hlavnú stránku
   - Zadajte PIN a meno
   - Testujte hru!

---

## 📋 **KROK 6: POUŽÍVANIE**

### **6.1 Pre učiteľov/adminov:**
```
URL: https://vas-nazov.onrender.com/host

Postup:
1. Vytvorte kvíz s otázkami
2. Spustite hru
3. Dostanete 6-miestny PIN kód
4. Zdieľajte PIN so študentmi
5. Ovládajte hru (spúšťajte otázky, výsledky)
```

### **6.2 Pre študentov/hráčov:**
```
URL: https://vas-nazov.onrender.com

Postup:
1. Zadajte PIN kód od učiteľa
2. Zadajte svoje meno
3. Čakajte na spustenie hry
4. Odpovedajte na otázky čo najrýchlejšie
5. Sledujte rebríčky a výsledky
```

---

## 📋 **KROK 7: ZDIEĽANIE**

### **7.1 QR kód (voliteľné)**
- Použite online QR generátor
- Zadajte vašu URL: `https://vas-nazov.onrender.com`
- Vytlačte QR kód pre študentov

### **7.2 Vlastná doména (voliteľné)**
1. V Render: **Settings** → **Custom Domains**
2. Pridajte svoju doménu (napr. `kviz.mojaskola.sk`)
3. Nastavte DNS záznamy podľa inštrukcií

---

## 🔧 **RIEŠENIE PROBLÉMOV**

### **❌ "Application failed to start"**
**Riešenie:**
- Skontrolujte že máte správny `package.json`
- Build Command: `npm install`
- Start Command: `npm start`

### **❌ "Cannot GET /"**
**Riešenie:**
- Skontrolujte že máte priečinok `public/`
- Súbor `public/index.html` musí existovať

### **❌ Stránka sa načítava pomaly**
**Riešenie:**
- Render má "cold start" - prvé načítanie trvá 30s
- Po aktivite je rýchle

### **❌ Real-time nefunguje**
**Riešenie:**
- Render podporuje WebSocket zadarmo
- Skontrolujte browser console pre chyby

---

## 💡 **TIPY A TRIKY**

### **Aktualizácie:**
- Každá zmena na GitHub = automatické nasadenie
- Push nový kód → Render automaticky aktualizuje

### **Monitoring:**
- Render Dashboard → Logs
- Môžete sledovať používanie a chyby

### **Výkon:**
- Free tier: 750 hodín mesačne
- Automatické uspanie po 15 min nečinnosti
- Prvé načítanie po uspení: ~30s

### **Bezpečnosť:**
- HTTPS automaticky
- Žiadne databázové heslá (používa memory storage)

---

## 🎉 **HOTOVO!**

**Váš Kahoot klon je online na:**
`https://vas-nazov.onrender.com`

### **Funkcie ktoré máte:**
- ✅ Real-time multiplayer kvízy
- ✅ Bodovanie na základe rýchlosti  
- ✅ Live rebríčky
- ✅ Admin ovládanie hier
- ✅ Mobile friendly
- ✅ Úplne zadarmo!

**Užívajte si interaktívne kvízy! 🎮**

---

## 📞 **PODPORA**

Ak máte problémy:
1. Skontrolujte Render logy
2. Overte že všetky súbory sú na GitHub
3. Skúste znovu vytvoriť Web Service
4. Prvé načítanie môže trvať až 1 minútu