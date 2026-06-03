"use client";

import { useState, useEffect, useRef } from "react";

const MAX_CHARS = 280;

export default function TweetInput({
  onTweet,
}: {
  onTweet: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const draft = localStorage.getItem("tweet-draft");
    if (draft) setText(draft);
  }, []);

  useEffect(() => {
    localStorage.setItem("tweet-draft", text);
  }, [text]);

  const submitTweet = () => {
    if (!text.trim()) return;

    onTweet(text);

    setText("");
    localStorage.removeItem("tweet-draft");
  };

  const remaining = MAX_CHARS - text.length;
  const progress = (text.length / MAX_CHARS) * 100;

  const counterColor =
    remaining < 20
      ? "text-red-400"
      : remaining < 50
      ? "text-yellow-400"
      : "text-slate-400";

  const emojis = ["🔥", "🚀", "❤️", "🎉", "💻", "⚡"];

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 backdrop-blur">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
          G
        </div>

        <div>
          <h3 className="font-semibold">Gautam</h3>
          <p className="text-xs text-slate-400">
            Share something interesting...
          </p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={3}
        maxLength={MAX_CHARS}
        value={text}
        placeholder="What's happening?"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            submitTweet();
          }
        }}
        className="w-full bg-transparent text-white placeholder:text-slate-500 resize-none focus:outline-none text-lg"
      />

      {/* Emoji Bar */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setText((prev) => prev + emoji)}
            className="hover:scale-110 transition text-xl"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="relative w-10 h-10">
            <svg
              className="w-10 h-10 rotate-[-90deg]"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 2
                   a 16 16 0 0 1 0 32
                   a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="#334155"
                strokeWidth="3"
              />

              <path
                d="M18 2
                   a 16 16 0 0 1 0 32
                   a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${progress},100`}
                className={
                  remaining < 20
                    ? "text-red-400"
                    : "text-blue-400"
                }
              />
            </svg>

            <span
              className={`absolute inset-0 flex items-center justify-center text-xs ${counterColor}`}
            >
              {remaining}
            </span>
          </div>

          <span className="text-xs text-slate-500">
            Ctrl + Enter to Tweet
          </span>
        </div>

        <button
          disabled={!text.trim()}
          onClick={submitTweet}
          className={`px-5 py-2 rounded-full font-medium transition
            ${
              text.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-700 cursor-not-allowed"
            }
          `}
        >
          Tweet 🚀
        </button>
      </div>

      {/* Draft Status */}
      {text.length > 0 && (
        <p className="text-xs text-green-400 mt-3">
          Draft auto-saved ✓
        </p>
      )}
    </div>
  );
}