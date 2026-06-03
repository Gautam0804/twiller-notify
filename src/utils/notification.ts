export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "tweet";

export const isNotificationSupported = (): boolean => {
  return typeof window !== "undefined" &&
    "Notification" in window;
};

export const getPermissionStatus = (): NotificationPermission => {
  if (!isNotificationSupported()) return "denied";

  return Notification.permission;
};

export const requestPermission = async (): Promise<boolean> => {
  try {
    if (!isNotificationSupported()) {
      console.warn("Notifications not supported");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    const permission = await Notification.requestPermission();

    return permission === "granted";
  } catch (error) {
    console.error("Notification permission error:", error);
    return false;
  }
};

interface NotificationOptions {
  title?: string;
  body: string;
  type?: NotificationType;
}

export const showNotification = ({
  title = "Twiller 🔔",
  body,
  type = "tweet",
}: NotificationOptions): void => {
  if (!isNotificationSupported()) return;

  if (Notification.permission !== "granted") return;

  let icon = "/icons/tweet.png";

  switch (type) {
    case "success":
      icon = "/icons/success.png";
      break;

    case "warning":
      icon = "/icons/warning.png";
      break;

    case "info":
      icon = "/icons/info.png";
      break;
  }

  const notification = new Notification(title, {
    body,
    icon,
    badge: "/icons/badge.png",
    tag: "twiller-notification",
    renotify: true,
    silent: false,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  setTimeout(() => {
    notification.close();
  }, 5000);
};