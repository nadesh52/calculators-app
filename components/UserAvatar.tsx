import React from "react";
import { colorFromName } from "@/utils";

type Props = {
  name: string;
};

export function UserAvatar({ name }: Props) {
  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${colorFromName(
        name,
      )}`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
