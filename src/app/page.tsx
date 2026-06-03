"use client";

import { useState, useEffect } from "react";
import TweetInput from "../components/TweetInput";
import TweetList from "../components/TweetList";
import ProfileSettings from "../components/ProfileSettings";
import ThemeToggle from "../components/ThemeToggle";
import { containsKeyword } from "../utils/keywordCheck";
import { showNotification } from "../utils/notification";

type Tweet = {
  id: number;
  content: string;
  createdAt: string;
  author: string;
};

export default function Page() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedTweets = localStorage.getItem("tweets");
    const savedHistory = localStorage.getItem("history");

    if (savedTweets) setTweets(JSON.parse(savedTweets));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleTweet = (content: string) => {
    const tweet: Tweet = {
      id: Date.now(),
      content,
      createdAt: new Date().toLocaleTimeString(),
      author: "Gautam",
    };

    setTweets((prev) => [tweet, ...prev]);

    if (notifyEnabled && containsKeyword(content)) {
      showNotification(content);
      setHistory((h) => [content, ...h].slice(0, 10));
    }
  };

  const filteredTweets = tweets.filter((tweet) =>
    tweet.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Twiller 🔔
            </h1>
            <p className="text-slate-400 mt-1">
              Smart keyword notifications for tweets
            </p>
          </div>

          <ThemeToggle />
        </div>

        {/* Welcome Card */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 backdrop-blur">
          <h2 className="font-bold text-lg">
            Welcome back, Gautam 👋
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Create tweets and get instant alerts when tracked keywords appear.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm">Tweets</p>
            <h2 className="text-2xl font-bold">
              {tweets.length}
            </h2>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm">Alerts</p>
            <h2 className="text-2xl font-bold">
              {history.length}
            </h2>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm">Status</p>
            <h2
              className={`text-lg font-bold ${
                notifyEnabled
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {notifyEnabled ? "ON" : "OFF"}
            </h2>
          </div>

        </div>

        <ProfileSettings
          enabled={notifyEnabled}
          setEnabled={setNotifyEnabled}
        />

        {/* Search */}
        <input
          type="text"
          placeholder="Search tweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Notification History */}
        {history.length > 0 && (
          <div className="bg-slate-800/70 border border-slate-700 p-5 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">
                Notification History
              </h3>

              <button
                onClick={() => setHistory([])}
                className="text-red-400 text-sm hover:text-red-300"
              >
                Clear
              </button>
            </div>

            <ul className="space-y-2">
              {history.map((h, i) => (
                <li
                  key={i}
                  className="bg-slate-900 p-3 rounded-lg text-sm"
                >
                  🔔 {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <TweetInput onTweet={handleTweet} />

        {/* Tweets Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">
            Latest Tweets
          </h2>

          {tweets.length > 0 && (
            <button
              onClick={() => setTweets([])}
              className="text-red-400 text-sm hover:text-red-300"
            >
              Delete All
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredTweets.length === 0 ? (
          <div className="bg-slate-800 border border-dashed border-slate-600 rounded-xl p-10 text-center">
            <h3 className="text-lg font-semibold">
              No Tweets Yet 🚀
            </h3>
            <p className="text-slate-400 mt-2">
              Start by posting your first tweet.
            </p>
          </div>
        ) : (
          <TweetList tweets={filteredTweets} />
        )}
      </div>
    </main>
  );
}