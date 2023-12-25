export function calculatePositionFromDirection(angle, speed) {
    const radians = (angle * Math.PI) / 180;

    const xComponent = speed * Math.sin(radians);
    const yComponent = speed * Math.cos(radians);

    return { x: Math.abs(xComponent), y: Math.abs(yComponent) };
}

export function calculateRandomPosition({ min, max }) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}