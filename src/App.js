import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DIALOG_TEXT, MOUSE_POINTER_POSITION, POSITION, RANDOM_POSITION, ROTATE } from "./constants";
import { calculatePositionFromDirection, calculateRandomPosition } from "./math";
import { computeSpritePos } from "./util/computeSprite";

export default function App() {
  const [sprite, setSprite] = useState({ angle: 90, speed: 0, type: "", x: 0, y: 0, glide: 0.5 })
  const [text, setText] = useState("")
  const [dragData, setDragData] = useState(null)

  const handleMoveSprite = (codeBlocks) => {
    while (codeBlocks.length > 0) {
      const ele = codeBlocks.shift()
      const { id, inputValue, type, x, y } = ele || {}
      if (id === DIALOG_TEXT) {
        const [val, timer] = inputValue;
        setText(val)
        setTimeout(() => {
          setText("")
        }, timer * 1000)
      }
      else {
        const value = computeSpritePos(id, sprite, ele)
        setSprite({ ...sprite, ...value })
      }
    }

  }

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar setDragData={setDragData} dragData={dragData} /> <MidArea moveSprite={handleMoveSprite} dragData={dragData} setDragData={setDragData} />
        </div>
        <div id="sprite-container" className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea sprite={sprite} text={text} />
        </div>
      </div>
    </div>
  );
}
