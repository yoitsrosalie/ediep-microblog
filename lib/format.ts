export function getPostMeta(createdAt: string) {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffMinutes = diffMs / 1000 / 60;

  const isNew = diffMinutes < 60; // your threshold — adjust as you like

  let display: string;
  if (diffMinutes < 60) display = `${Math.floor(diffMinutes)} min ago`;
  else if (diffMinutes < 60 * 24) display = `${Math.floor(diffMinutes / 60)} hr ago`;
  else display = 'Yesterday'; // simplistic — good enough for prototype

  return { isNew, display };
}