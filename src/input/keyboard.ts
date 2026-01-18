"use client";

export function useKeyboard(callback: (key: string) => void)
{
  const handler = (e: KeyboardEvent) =>
  {
    callback(e.key.toLowerCase())
  }
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}