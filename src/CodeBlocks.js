import { CHANGE_X_BY, CHANGE_Y_BY, DEFAULT_DROPDOWN_OPTIONS, DIALOG_TEXT, GLIDE_GO_TO, GLIDE_POSITION, GO_TO, INPUT_TYPE, MOVE_STEPS, POSITION, ROTATE, SET_X_TO, SET_Y_TO, TURN_LEFT, TURN_RIGHT } from "./constants"

export const CODE_BLOCKS = {
    "MOTION": [
        {
            id: MOVE_STEPS,
            type: POSITION,
            icon: null,
            text: "Move 10 steps",
            prefix: "Move",
            suffix: "steps",
            input: [
                {
                    type: INPUT_TYPE[0],
                    default: 10
                }
            ]
        },
        {
            id: TURN_RIGHT,
            type: ROTATE,
            prefix: "Turn",
            suffix: "degrees",
            icon: {
                name: "redo",
                className: "text-white mx-2",
                size: 15
            },
            text: "",
            input: [
                {
                    type: INPUT_TYPE[0],
                    default: 15
                }
            ]
        },
        {
            id: TURN_LEFT,
            type: ROTATE,
            prefix: "Turn",
            suffix: "degrees",
            icon: {
                name: "undo",
                className: "text-white mx-2",
                size: 15
            },
            text: "",
            input: [
                {
                    type: INPUT_TYPE[0],
                    default: 15
                }
            ]
        },
        {
            id: GO_TO,
            type: "SELECT",
            prefix: "go to",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {
                    type: INPUT_TYPE[1],
                    options: [...DEFAULT_DROPDOWN_OPTIONS],
                    default: DEFAULT_DROPDOWN_OPTIONS[0].value
                }
            ]
        },
        {
            id: GLIDE_GO_TO,
            type: "SELECT",
            prefix: "glide",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {
                    type: INPUT_TYPE[0],
                    default: 1
                },
                {
                    prefix: "secs to",
                    type: INPUT_TYPE[1],
                    options: [...DEFAULT_DROPDOWN_OPTIONS],
                    default: DEFAULT_DROPDOWN_OPTIONS[0].value
                }
            ]
        },
        {
            id: GLIDE_POSITION,
            type: "SELECT",
            prefix: "glide",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {

                    type: INPUT_TYPE[0],
                    default: 1
                },
                {
                    prefix: "secs to x: ",
                    type: INPUT_TYPE[0],
                    default: 1
                },
                {
                    prefix: "Y: ",
                    type: INPUT_TYPE[0],
                    default: 1
                }
            ]
        },
        {
            id: CHANGE_X_BY,
            type: "SELECT",
            prefix: "change x by",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {

                    type: INPUT_TYPE[0],
                    default: 1
                },
            ]
        },
        {
            id: SET_X_TO,
            type: "SELECT",
            prefix: "set x to",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {

                    type: INPUT_TYPE[0],
                    default: 1
                },
            ]
        },
        {
            id: CHANGE_Y_BY,
            type: "SELECT",
            prefix: "change y by",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {

                    type: INPUT_TYPE[0],
                    default: 1
                },
            ]
        },
        {
            id: SET_Y_TO,
            type: "SELECT",
            prefix: "set y to",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {

                    type: INPUT_TYPE[0],
                    default: 1
                },
            ]
        }

    ],
    "LOOKS": [
        {
            id: DIALOG_TEXT,
            type: "DIALOG",
            prefix: "say",
            suffix: "",
            icon: null,
            text: "",
            input: [
                {
                    type: INPUT_TYPE[0],
                    default: 'Hello'
                },
                {
                    prefix: "for",
                    suffix: "seconds",
                    type: INPUT_TYPE[0],
                    default: 1
                },
            ]
        }
    ]
}

export function CodeBlock({ id, type, name, prefix, suffix, icon, text, input = { default: '' } }) {
    this.id = id
    this.name = name
    this.icon = icon
    this.prefix = prefix
    this.suffix = suffix
    this.text = text
    this.input = input
    this.inputValue = input.map(item => item.default) || ''
    this.x = 0;
    this.y = 0
    this.type = type
    this.setValue = (val) => {
        this.inputValue.push(val)
    }
    this.setPos = (x, y) => {
        this.x = x;
        this.y = y
    }
}
