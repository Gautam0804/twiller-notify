"use client";

import { Heart, Bookmark, Share2, Bell } from "lucide-react";
import { useState } from "react";

interface Tweet {
  id: number;
  content: string;
  createdAt: string;
  author: string;
}

const KEYWORDS = ["cricket", "science"];

function highlightText(text: string) {
  const words = text.split(" ");

  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,!?]/g, "");

    if (
      KEYWORDS.some(
        (keyword) =>
          keyword.toLowerCase() === cleanWord.toLowerCase()
      )
    ) {
      return (
        <span
          key={index}
          className="text-blue-400 font-semibold"
        >
          {word}{" "}
        </span>
      );
    }

    if (word.startsWith("#")) {
      return (
        <span
          key={index}
          className="text-cyan-400"
        >
          {word}{" "}
        </span>
      );
    }

    if (word.startsWith("@")) {
      return (
        <span
          key={index}
          className="text-purple-400"
        >
          {word}{" "}
        </span>
      );
    }

    return word + " ";
  });
}

export default function TweetList({
  tweets,
}: {
  tweets: Tweet[];
}) {
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const toggleSave = (id: number) => {
    setSaved((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  if (!tweets.length) {
    return (
      <div className="bg-slate-800/70 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-3">🚀</div>

        <h3 className="text-lg font-semibold">
          No Tweets Yet
        </h3>

        <p className="text-slate-400 mt-2">
          Create your first tweet and start tracking
          keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => {
        const matchedKeyword = KEYWORDS.some((keyword) =>
          tweet.content
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );

        return (
          <div
            key={tweet.id}
            className="
              bg-slate-800/70
              border
              border-slate-700
              rounded-2xl
              p-5
              backdrop-blur
              hover:border-blue-500/50
              transition-all
              duration-300
              hover:shadow-lg
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {tweet.author.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold">
                    {tweet.author}
                  </h4>

                  <p className="text-xs text-slate-400">
                    @{tweet.author.toLowerCase()}
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-400">
                {tweet.createdAt}
              </span>
            </div>

            {/* Keyword Badge */}
            {matchedKeyword && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs">
                  <Bell size={12} />
                  Keyword Match
                </span>
              </div>
            )}

            {/* Tweet Content */}
            <p className="leading-relaxed text-sm text-slate-200">
              {highlightText(tweet.content)}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700">

              <button
                onClick={() => toggleLike(tweet.id)}
                className={`flex items-center gap-2 text-sm transition
                  ${
                    liked.includes(tweet.id)
                      ? "text-red-400"
                      : "text-slate-400"
                  }`}
              >
                <Heart size={16} />
                Like
              </button>

              <button
                onClick={() => toggleSave(tweet.id)}
                className={`flex items-center gap-2 text-sm transition
                  ${
                    saved.includes(tweet.id)
                      ? "text-yellow-400"
                      : "text-slate-400"
                  }`}
              >
                <Bookmark size={16} />
                Save
              </button>

              <button
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-400
                  hover:text-blue-400
                  transition
                "
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}