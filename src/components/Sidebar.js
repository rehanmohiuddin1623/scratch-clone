import React, { useState } from "react";
import Icon from "./Icon";
import { CODE_BLOCKS, CodeBlock } from "../CodeBlocks";
import BlockView from "./BlockView";

export default function Sidebar({ setDragData, dragData }) {
  return (
    <div className="w-80 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      {CODE_BLOCKS.MOTION.map((code) => {
        const codeBlock = new CodeBlock({ ...code })
        return (
          <BlockView onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(codeBlock));
            setDragData(codeBlock)
          }}
            onTextChange={val => codeBlock.setValue(val)}
            codeBlock={codeBlock}
          />
        )
      })}
      <div className="font-bold"> {"Looks"} </div>
      {CODE_BLOCKS.LOOKS.map((code) => {
        const codeBlock = new CodeBlock({ ...code })
        return (
          <BlockView onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(codeBlock));
            setDragData(codeBlock)
          }}
            onTextChange={val => codeBlock.setValue(val)}
            codeBlock={codeBlock}
          />
        )
      })}

    </div>
  );
}
