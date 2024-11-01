import React from 'react';

const GridOverlay = ({ gridSettings }) => {
    const { gridType, rows, columns, thickness, color, opacity } = gridSettings;

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', 
        opacity: opacity / 100, 
        zIndex: 10, 
    };

    const renderSquareGrid = () => {
        return Array.from({ length: rows }).map((_, rowIndex) =>
            Array.from({ length: columns }).map((_, colIndex) => (
                <rect
                    key={`${rowIndex}-${colIndex}`}
                    x={(100 / columns) * colIndex + '%'}
                    y={(100 / rows) * rowIndex + '%'}
                    width={(100 / columns) + '%'}
                    height={(100 / rows) + '%'}
                    stroke={color}
                    strokeWidth={thickness/3}
                    fill="none"
                />
            ))
        );
    };

    const renderHexagon = (cx, cy, size) => {
        const angle = (Math.PI / 180) * 60;
        const points = Array.from({ length: 6 }, (_, i) => {
            const x = cx + size * Math.cos(angle * i);
            const y = cy + size * Math.sin(angle * i);
            return `${x},${y}`;
        }).join(' ');
    
        return <polygon points={points} stroke={color} strokeWidth={thickness / 3} fill="none" />;
    };
    
    // Adjust renderHexagonalGrid
    const renderHexagonalGrid = (canvasWidth, canvasHeight) => {
        const size = (100 / columns) * 0.5; // Size of each hexagon
        const hexHeight = size * Math.sqrt(3); // Height of the hexagon
    
        return Array.from({ length: rows }).map((_, rowIndex) =>
            Array.from({ length: columns }).map((_, colIndex) => {
                // Calculate the horizontal and vertical offsets
                const xOffset = colIndex * size * 1.5; // Horizontal offset
                const yOffset = rowIndex * (hexHeight * 0.5); // Vertical offset, adjusted for hexagon height
    
                // Adjust for odd rows to create the staggered effect
                const adjustedYOffset = rowIndex % 2 === 0 
                    ? yOffset 
                    : yOffset + (hexHeight * 0.25); // Half the height of the hexagon for stagger
    
                return renderHexagon(xOffset, adjustedYOffset, size);
            })
        );
    };
    
    
    
    

    return (
        <div style={style}>
            <svg width="100%" height="100%">
                {gridType === 'square' ? renderSquareGrid() : renderHexagonalGrid()}
            </svg>
        </div>
    );
};

export default GridOverlay;
