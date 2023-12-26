import React, { useRef, useState } from 'react';
import BlockView from './BlockView';

const Block = ({ id, initialPosition, onDrag, codeBlock, ind, onTextChange, triggerAction, pieces }) => {
    const [position, setPosition] = useState(initialPosition);
    const ref = useRef(null)
    const offSet = useRef(initialPosition)
    const dragging = useRef(false)

    const handleDragStart = (e) => {
        if (!['input', 'select'].includes(e.target.tagName.toLowerCase())) {
            e.preventDefault();
        }

        const initialX = e.clientX - position.x;
        const initialY = e.clientY - position.y;

        offSet.current.x = initialX;
        offSet.current.y = initialY;
        dragging.current = true


    };


    const handleDragMove = (e) => {
        // Update position while dragging
        if (dragging.current) {
            const newX = e.clientX - offSet.current.x;
            const newY = e.clientY - offSet.current.y;
            setPosition({ x: newX, y: newY });
            pieces.forEach((item, index) => {
                const [x, y] = [Math.abs(item.x - newX), Math.abs(item.y - newY)]
                if (index !== ind && y < 50) {
                    const { left, top } = document.getElementById(ind).getBoundingClientRect();
                    ref.current.style.transform = `translate(${item.x - newX}px, ${(e.clientY - top) - 30}px)`;
                }
                onDrag(ind, { x: newX, y: newY })

            })

        }
    };
    return (
        <div
            id={ind}
            ref={ref}
            style={{
                position: 'absolute',
                left: initialPosition.x,
                top: initialPosition.y,
                padding: '10px',
                cursor: 'grab',
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={() => {
                dragging.current = false
            }}
            onClick={(e) => {
                if (!dragging.current) {
                    triggerAction(codeBlock, { x: e.clientX, y: e.clientY })
                }
            }}
        >
            <BlockView draggable={false} codeBlock={codeBlock} onTextChange={onTextChange} />
        </div>
    );
};

export default Block;
