# Twiller 🔔

A modern Twitter-inspired notification dashboard built with Next.js, TypeScript, and Tailwind CSS.

Twiller allows users to create tweets, track custom keywords, and receive instant browser notifications whenever a tracked keyword appears.

---

## ✨ Features

### 📝 Tweet Management

* Create tweets
* View tweet history
* Search tweets
* Highlight matched keywords
* Keyword match badges

### 🔔 Smart Notifications

* Browser notification support
* Permission management
* Notification history
* Instant keyword alerts

### 🎨 Modern UI

* Responsive design
* Dark / Light mode
* Smooth transitions
* Glassmorphism-inspired components
* Mobile-friendly layout

### 💾 Local Persistence

* Saved theme preference
* Notification settings persistence
* Tweet history storage
* Notification history storage

---

## 🛠 Tech Stack

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Browser Notification API
* Local Storage

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── TweetInput.tsx
│   ├── TweetList.tsx
│   ├── ProfileSettings.tsx
│   └── ThemeToggle.tsx
│
├── utils/
│   ├── notification.ts
│   ├── keywordCheck.ts
│   └── keywords.ts
│
└── types/
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Gautam0804/twiller.git
cd twiller
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗 Build for Production

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## 🔑 Keyword Tracking

Default keywords:

```ts
export const KEYWORDS = [
  "cricket",
  "science",
];
```

You can customize keywords inside:

```text
src/utils/keywords.ts
```

---

## 🌙 Theme Support

* Dark Mode
* Light Mode
* Theme preference persistence

---

## 🔔 Browser Notifications

Twiller uses the Browser Notification API.

When notifications are enabled:

1. Browser permission is requested.
2. Keyword matches trigger alerts.
3. Notification history is stored locally.

---

## 📸 Screenshots

Add screenshots here after deployment.

```text
screenshots/
├── home.png
├── notifications.png
└── dark-mode.png
```

---

## 🌐 Deployment

Deploy easily using Vercel:

```bash
npm run build
```

Then import the repository into Vercel.

---

## 🔮 Future Enhancements

* User Authentication
* Supabase Integration
* Real-time Tweet Feed
* AI Sentiment Analysis
* Analytics Dashboard
* PWA Support
* Tweet Scheduling
* Multi-user Support
* Advanced Keyword Management

---

## 👨‍💻 Author

Gautam Kumar Yadav

GitHub:
https://github.com/Gautam0804

---

## 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute.
