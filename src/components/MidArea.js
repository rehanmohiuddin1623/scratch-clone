import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import Block from "./Block";

export default function MidArea({ moveSprite, dragData, setDragData }) {
  const [rectangles, setRectangles] = useState([]);
  const dragRef = useRef()
  const dragOver = useRef(false)

  const updatePosition = ({ x, y }, id) => {
    setRectangles(_reactangles =>
      _reactangles.map((react, ind) => {
        if (ind == id) {
          return { ...react, x: Math.abs(x), y: Math.abs(y) }
        }
        else {
          return { ...react }
        }
      })
    )
  }
  const handleDragOver = (e) => {
    if (dragData) {
      const parsedObject = dragData
      const { left, top } = dragRef.current.getBoundingClientRect();
      setRectangles([...rectangles, { ...parsedObject, x: e.clientX - left - 10, y: e.clientY - top - 10 }])
      setDragData(null)
    }
  };
  const triggerSprite = (actions) => {
    moveSprite(actions.map(({ id, type, inputValue, x, y }) => ({ id, type, inputValue, x, y })))
  }
  return (
    <div
      id="mid-view"
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragOver={handleDragOver}
      className="flex-1 h-full overflow-auto">
      <>
        <div className="flex w-full justify-end">
          <button
            onClick={() => {
              triggerSprite(rectangles)
            }}
            className="p-2 text-blue-500"
          >
            Run
          </button>
        </div>
        <div ref={dragRef}
          width={400} height={300} style={{ border: "2px solid", position: 'relative' }} className="h-full w-full" id="mid-area" >
          {rectangles.map((rect, ind) => {
            return (
              <Block
                triggerAction={triggerSprite}
                onTextChange={(val, inputIndex) => {
                  setRectangles(_prevReactanges => _prevReactanges.map((rect, i) => {
                    if (i == ind) {
                      const _inputValue = rect.inputValue.map((pastVal, ind) => {
                        if (inputIndex == ind) {
                          return isNaN(val) ? val : Number(val)
                        }
                        return isNaN(pastVal) ? pastVal : Number(pastVal)
                      })
                      return { ...rect, inputValue: _inputValue }
                    }
                    else {
                      return { ...rect }
                    }
                  }))
                }}
                ind={ind}
                codeBlock={rect}
                initialPosition={{ x: rect.x, y: rect.y }}
                id={rect.id}
                onDrag={(id, { x, y }) => updatePosition({ x, y }, id)}
                pieces={rectangles}
              />
            )
          })}
        </div>
      </>
    </div>
  );
}
