"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BellOff,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

import {
  requestPermission,
  getPermissionStatus,
  isNotificationSupported,
} from "../utils/notification";

interface Props {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}

export default function ProfileSettings({
  enabled,
  setEnabled,
}: Props) {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("notifyEnabled");

    if (saved !== null) {
      setEnabled(saved === "true");
    }

    setSupported(isNotificationSupported());

    if (isNotificationSupported()) {
      setPermission(getPermissionStatus());
    }
  }, [setEnabled]);

  const toggleNotifications = async () => {
    const next = !enabled;

    if (next) {
      const granted = await requestPermission();

      if (!granted) {
        setPermission(Notification.permission);
        return;
      }

      setPermission(Notification.permission);
    }

    setEnabled(next);

    localStorage.setItem(
      "notifyEnabled",
      String(next)
    );
  };

  const permissionColor =
    permission === "granted"
      ? "text-green-400"
      : permission === "denied"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div
      className="
        bg-slate-800/70
        backdrop-blur-lg
        border
        border-slate-700
        rounded-2xl
        p-5
        shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          <div
            className={`
              h-12 w-12
              rounded-xl
              flex
              items-center
              justify-center
              ${
                enabled
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-slate-700 text-slate-400"
              }
            `}
          >
            {enabled ? (
              <Bell size={22} />
            ) : (
              <BellOff size={22} />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Keyword Notifications
            </h3>

            <p className="text-sm text-slate-400">
              Receive alerts when tracked
              keywords appear in tweets.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck
                size={14}
                className={permissionColor}
              />

              <span
                className={`text-xs ${permissionColor}`}
              >
                Permission: {permission}
              </span>
            </div>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={toggleNotifications}
          className={`
            relative
            h-8
            w-16
            rounded-full
            transition-all
            duration-300
            ${
              enabled
                ? "bg-blue-500"
                : "bg-slate-600"
            }
          `}
        >
          <span
            className={`
              absolute
              top-1
              left-1
              h-6
              w-6
              rounded-full
              bg-white
              shadow-md
              transition-transform
              duration-300
              ${
                enabled
                  ? "translate-x-8"
                  : ""
              }
            `}
          />
        </button>
      </div>

      {/* Status Section */}
      <div className="mt-4 border-t border-slate-700 pt-4">

        {!supported && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertTriangle size={16} />
            Browser notifications are not supported.
          </div>
        )}

        {supported && permission === "denied" && (
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            <AlertTriangle size={16} />
            Notifications are blocked. Enable
            them in browser settings.
          </div>
        )}

        {supported && permission === "granted" && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <ShieldCheck size={16} />
            Notifications are active and ready.
          </div>
        )}
      </div>

      {/* Optional Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="bg-slate-900 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            Status
          </p>

          <h4
            className={`font-bold ${
              enabled
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {enabled ? "Enabled" : "Disabled"}
          </h4>
        </div>

        <div className="bg-slate-900 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            Keywords
          </p>

          <h4 className="font-bold text-blue-400">
            Cricket • Science
          </h4>
        </div>

      </div>
    </div>
  );
}