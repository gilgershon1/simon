# 🎮 Simon Game Workshop

Welcome to the Simon Game workshop! Follow these steps to get the multiplayer Simon Says game running locally and deployed to the cloud.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Cursor IDE** installed → [Download here](https://cursor.com)
- ✅ **Node.js 18+** installed → [Download here](https://nodejs.org)
- ✅ **Git** installed → [Download here](https://git-scm.com)
- ✅ **GitHub account** → [Sign up](https://github.com)
- ✅ **Render.com account** (free tier) → [Sign up](https://render.com)

---

## Step 1: Clone the Repository

### 1.1 Open Terminal

- **Mac:** Press `Cmd + Space`, type "Terminal", press Enter
- **Windows:** Press `Win + R`, type "cmd", press Enter

### 1.2 Clone the Code

Copy and paste this command into your terminal:

```bash
git clone https://github.com/itayshmool/simon-game-app-cday.git
```

### 1.3 Open in Cursor

1. Open **Cursor IDE**
2. Click **File** → **Open Folder**
3. Navigate to the `simon-game-app-cday` folder you just cloned
4. Click **Open**

> 💡 You should now see the project files in Cursor's sidebar.

---

## Step 2: Setup Environment

In Cursor, open the terminal:
- **Mac:** Press `Ctrl + `` ` (backtick)
- **Windows:** Press `Ctrl + `` ` (backtick)

Run this command:

```bash
npm run setup
```

This will:
- ✅ Create `.env` files from templates
- ✅ Install backend dependencies
- ✅ Install frontend dependencies

> 💡 **Note:** The default values work for local development - no changes needed!

---

## Step 3: Run Locally

You need **two terminal windows** in Cursor.

### Terminal 1 - Backend Server

In your current terminal, run:

```bash
npm run dev:backend
```

You should see:
```
🎮 SIMON GAME SERVER
   🌐 HTTP:      http://localhost:3000
   🔌 WebSocket: ws://localhost:3000
```

### Terminal 2 - Frontend App

1. Click the **+** button in the terminal panel to open a new terminal
2. Run:

```bash
cd frontend && npm run dev
```

You should see:
```
VITE v7.x.x ready
➜  Local:   http://localhost:5173/
```

### Open in Browser

Go to: **http://localhost:5173**

---

## Step 4: Test the Game Locally

1. Click **"Create Game"**
2. Enter your name, pick an avatar
3. Click **"Create Game"**
4. Copy the **game code** (e.g., `ABC123`)
5. Open a **new browser tab** (or incognito window)
6. Go to **http://localhost:5173**
7. Click **"Join Game"**
8. Paste the game code, enter a different name
9. Go back to first tab → Click **"Start Game"**
10. Play! 🎮

---

## Step 5: Deploy to Render

Now let's put your game online so anyone can play!

### 5.1 Create Your Own GitHub Repository

You need your own copy of the code on GitHub so Render can deploy it.

**In Cursor, open the chat (Cmd+L or Ctrl+L) and ask:**

> "Create a new public GitHub repository called simon-game-app under my account and push this code to it"

Cursor will:
1. ✅ Create the repository on GitHub
2. ✅ Update the git connection
3. ✅ Push all the code to your new repo

> 💡 **You stay in the same folder** - Cursor handles everything behind the scenes.

When done, verify by going to: `https://github.com/YOUR_USERNAME/simon-game-app`

You should see all the project files there.

---

### 5.2 Create a Render Account

1. Go to [render.com](https://render.com)
2. Click **Get Started for Free**
3. Sign up with your **GitHub account** (recommended - makes step 5.3 easier!)

---

### 5.3 Deploy on Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click the **New** button (top right)
3. Select **Blueprint**
4. If prompted, connect your GitHub account
5. Find and select your `simon-game-app` repository
6. Render will detect the `render.yaml` file automatically
7. Click **Apply**

⏳ **Wait 5-10 minutes** for both services to build and deploy.

You'll see two services being created:
- `simon-game-backend` (Web Service)
- `simon-game-frontend` (Static Site)

---

### 5.4 Get Your URLs

Once deployment is complete (green checkmarks), click on each service to find its URL:

| Service | URL Example |
|---------|-------------|
| **Backend** | `https://simon-game-backend-abc123.onrender.com` |
| **Frontend** | `https://simon-game-frontend-abc123.onrender.com` |

📝 **Write down both URLs** - you'll need them in the next step!

---

### 5.5 Configure Environment Variables

The services need to know about each other. Let's connect them.

#### Backend Service:

1. In Render dashboard, click on **simon-game-backend**
2. In the left sidebar, click **Environment**
3. Find the variable `FRONTEND_URL`
4. Click the **pencil icon** to edit
5. Set the value to your **frontend URL** (e.g., `https://simon-game-frontend-abc123.onrender.com`)
6. Click **Save Changes**

#### Frontend Service:

1. In Render dashboard, click on **simon-game-frontend**
2. In the left sidebar, click **Environment**
3. Find `VITE_API_URL` → Set it to your **backend URL**
4. Find `VITE_SOCKET_URL` → Set it to your **backend URL** (same URL)
5. Click **Save Changes**

> ⚠️ **Important:** After saving, Render will automatically redeploy. Wait for the green checkmark again.

---

### 5.6 Test Your Deployed Game

1. Open your **frontend URL** in the browser
2. Create a game
3. Copy the invite link
4. Send it to a friend (or open in another browser/device)
5. Play together online! 🎉

---

## 🎉 Congratulations!

You've successfully:
- ✅ Cloned and set up a full-stack TypeScript project
- ✅ Run a React + Express + WebSocket app locally
- ✅ Created your own GitHub repository
- ✅ Deployed to the cloud with Render

**Your game is now live on the internet!** Share the link with friends and family.

---

## 🛠️ Troubleshooting

### "npm run setup" fails
- Make sure Node.js is installed: run `node --version` in terminal
- Should show `v18.x.x` or higher

### Backend won't start
- Make sure port 3000 is not in use by another app
- Try closing other terminals and running again

### Frontend can't connect to backend
- Verify backend is running (you should see the 🎮 SIMON GAME SERVER message)
- Check that you're using http://localhost:5173 (not a different port)

### Render deployment fails
- Check the **Logs** tab in Render dashboard for error messages
- Make sure all environment variables are set correctly

### Game works locally but not on Render
- Double-check the environment variables in step 5.5
- Make sure you used `https://` (not `http://`) for all URLs
- Wait for redeploy to complete (green checkmark)

### WebSocket connection issues
- Ensure `VITE_SOCKET_URL` matches your exact backend URL
- Check browser console (F12 → Console tab) for error messages

---

## 📚 Project Structure

```
simon-game-app-cday/
├── src/
│   ├── backend/         # Express + Socket.io server
│   │   ├── controllers/ # HTTP endpoints
│   │   ├── services/    # Game logic
│   │   ├── websocket/   # Real-time handlers
│   │   └── utils/       # Helpers
│   └── shared/          # Shared TypeScript types
├── frontend/
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── services/    # API & socket clients
│       └── store/       # Zustand state
├── tests/               # Test files
├── render.yaml          # Render deployment config
├── setup.sh             # Setup script
└── package.json
```

---

## 🔗 Useful Links

- [Cursor IDE](https://cursor.com)
- [Node.js](https://nodejs.org)
- [React](https://react.dev)
- [Socket.io](https://socket.io)
- [Render Docs](https://render.com/docs)
- [TypeScript](https://www.typescriptlang.org)

---

## ❓ Need Help?

If you get stuck, ask Cursor! Open the chat and describe your problem:

> "I'm getting an error when running npm run setup. Here's what I see: [paste error]"

Cursor can help diagnose and fix most issues.

---

**Happy coding! 🚀**
