import { CHANGE_X_BY, CHANGE_Y_BY, DIALOG_TEXT, GLIDE_GO_TO, GLIDE_POSITION, GO_TO, MOUSE_POINTER_POSITION, MOVE_STEPS, RANDOM_POSITION, SET_X_TO, SET_Y_TO, TURN_LEFT, TURN_RIGHT } from "../constants";
import { calculatePositionFromDirection, calculateRandomPosition } from "../math";

export function calculate(inputValue, codeBlock) {
    const { x, y } = codeBlock
    if (inputValue === MOUSE_POINTER_POSITION) {
        return { x, y }
    }
    else if (inputValue === RANDOM_POSITION) {
        const spriteRef = document.getElementById("sprite-container")
        const [contWidthX, contWidthY] = [spriteRef.offsetWidth - 120, spriteRef.offsetHeight - 20]
        const [x, y] = [calculateRandomPosition({ min: 0, max: contWidthX }), calculateRandomPosition({ min: 0, max: contWidthY })]
        return { x, y }
    }
}

export function turnCalculation(angle, sprite) {
    return { angle: sprite.angle + angle }
}

export function computeSpritePos(type, sprite, codeBlock) {
    const spriteMap = {
        [GO_TO]: () => {
            const val = codeBlock.inputValue[0]
            return { ...sprite, glide: 0.5, ...calculate(val, codeBlock) }
        },
        [GLIDE_GO_TO]: () => {
            const [glide, val] = codeBlock.inputValue;
            return { ...sprite, glide, ...calculate(val, codeBlock) }
        },
        [GLIDE_POSITION]: () => {
            const [glide, x, y] = codeBlock.inputValue
            return { ...sprite, glide, x, y }
        },
        [CHANGE_X_BY]: () => {
            const [x] = codeBlock.inputValue
            return { ...sprite, glide: 0.5, x: sprite.x + Number(x) }
        },
        [SET_X_TO]: () => {
            const [x] = codeBlock.inputValue
            return { ...sprite, glide: 0.5, x }
        },
        [CHANGE_Y_BY]: () => {
            const [y] = codeBlock.inputValue
            return { ...sprite, glide: 0.5, y: sprite.y + y }
        },
        [SET_Y_TO]: () => {
            const [y] = codeBlock.inputValue
            return { ...sprite, glide: 0.5, y }
        },
        [MOVE_STEPS]: () => {
            const [speed] = codeBlock.inputValue;
            const { x, y } = calculatePositionFromDirection(sprite.angle, sprite.speed + speed)
            return { ...sprite, glide: 0.5, x, y, speed: sprite.speed + speed }
        },
        [TURN_LEFT]: () => {
            const [angle] = codeBlock.inputValue;
            return { ...sprite, glide: 0.5, ...turnCalculation(-angle, sprite) }
        },
        [TURN_RIGHT]: () => {
            const [angle] = codeBlock.inputValue;
            return { ...sprite, glide: 0.5, ...turnCalculation(angle, sprite) }
        }
    }
    return spriteMap[type]()
}