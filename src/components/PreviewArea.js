import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ sprite, text }) {
  return (
    <div className="relative flex-none h-full w-full overflow-y-auto p-2 mt-4">
      <CatSprite sprite={sprite} text={text} />
    </div>
  );
}
