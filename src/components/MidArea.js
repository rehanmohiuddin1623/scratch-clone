import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import Block from "./Block";
import { getNearestBlocks, mutateList } from "../util/misc";

export default function MidArea({ moveSprite, dragData, setDragData, replay }) {
  const [rectangles, setRectangles] = useState([]);
  const dragRef = useRef()
  const dropDownRef = useRef(null)
  const [history, setHistory] = useState([])
  const [actions, setActions] = useState([])

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
          {actions.length ? <div className="flex flex-col relative">
            <button onClick={() => {
              const _display = dropDownRef.current.style.display
              dropDownRef.current.style.display = _display === "none" || _display === "" ? "block" : "none"
            }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="flex gap-2 text-blue-500 hover:text-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button">
              <span>History</span>
              <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div ref={dropDownRef} id="dropdown" class="absolute right-2 top-12 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {actions.map((step, ind) => (
                  <li key={ind} className="flex items-center gap-2 pl-2" >
                    <input type="checkbox" defaultChecked={step.checked} onClick={(e) => {
                      setHistory((_prevHistory) => [...mutateList(e.target.checked, _prevHistory, step)])
                    }} />
                    <label className="capitalize" >{step.id.split("_").join(" ").toLowerCase()}</label>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end" >
                <button
                  className=" text-xs text-blue-500 p-2 cursor-pointer text-bold"
                  onClick={() => moveSprite([...history])} >
                  Apply
                </button>
              </div>
            </div>

          </div> : <></>}
          <button
            onClick={() => {
              triggerSprite(rectangles)
            }}
            className="p-2 text-blue-500"
          >
            Run All
          </button>
        </div>
        <div ref={dragRef}
          width={400} height={300} style={{ border: "2px solid", position: 'relative' }} className="h-full w-full" id="mid-area" >
          {rectangles.map((rect, ind) => {
            return (
              <Block
                triggerAction={(codeBlock, { x, y }) => {
                  const _actions = getNearestBlocks(codeBlock, rectangles, { x, y })
                  setActions([..._actions])
                  triggerSprite(_actions)
                }}
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
