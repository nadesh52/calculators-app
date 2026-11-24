import { AVATAR_COLORS } from "../constants";

export const colorFromName = (name: string) => {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};
