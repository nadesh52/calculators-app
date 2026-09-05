import { AVATAR_COLORS } from "@/features/sharebill/constants";

export const colorFromName = (name: string) => {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};
