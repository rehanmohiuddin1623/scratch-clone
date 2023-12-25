import React from "react"
import Icon from "./Icon";
import "./styles.css"
import { DEFAULT_DROPDOWN_OPTIONS, INPUT_TYPE } from "../constants";

function BlockView({ codeBlock, draggable = true, onDragStart, onTextChange }) {

    const renderInput = (type, val, options, ind) => {
        switch (type) {
            case INPUT_TYPE[0]:
                return (
                    <input
                        id={Math.random() * 1000}
                        name={Math.random() * 1000} type="text"
                        defaultValue={typeof val === "number" ? Math.abs(val) : val}
                        className="w-6 text-black rounded-md p-0.5"
                        onChange={e => {
                            e.preventDefault()
                            onTextChange(e.target.value, ind)
                        }}
                    />
                )
            case INPUT_TYPE[1]:
                return (
                    <select className="text-black rounded-md" defaultValue={DEFAULT_DROPDOWN_OPTIONS[0].value} onChange={e => {
                        onTextChange(e.target.value, ind)
                    }} >
                        {options.map((opt) => (
                            <option className="text-black" label={opt.label} value={opt.value} />
                        ))}
                    </select>
                )
        }
    }
    return (
        <div className="mb-4" style={{ width: "fit-content" }} draggable={draggable} onDragStart={onDragStart} key={codeBlock.id}>
            <div className="block-view" >
                <div className="upper bg-white-500" />
                <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer gap-1 align-middle">
                    {`${codeBlock.prefix} `}
                    {codeBlock.icon ? <Icon name={codeBlock.icon.name} size={codeBlock.icon.size} className="text-white mx-2" /> : <></>}
                    {codeBlock.input ? codeBlock.input.map((input, ind) => <> {input.prefix || ""} {renderInput(input.type, input.default, input.options, ind)} {input.suffix || ""} </>) : <></>}
                    {` ${codeBlock.suffix}`}
                </div>
                <div className="lower bg-blue-500" />
            </div>
        </div>
    )
}

export default BlockView