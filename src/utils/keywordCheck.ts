import { KEYWORDS } from "./keywords";

export const containsKeyword = (text: string): boolean => {
  const lowerText = text.toLowerCase();

  return KEYWORDS.some((keyword) =>
    new RegExp(`\\b${keyword.toLowerCase()}\\b`, "i").test(
      lowerText
    )
  );
};