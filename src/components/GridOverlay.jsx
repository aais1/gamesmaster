import React from 'react';

const GridOverlay = ({ gridSettings }) => {
    const { gridType, thickness, color, opacity, rows, columns } = gridSettings;
    const hexSize = 30; // Fixed hex size

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

    // Calculate points for a single hexagon based on center coordinates
    const calculateHexagonPoints = (cx, cy, size) => {
        const angle = Math.PI / 3;
        return Array.from({ length: 6 }, (_, i) => {
            const x = cx + size * Math.cos(i * angle);
            const y = cy + size * Math.sin(i * angle);
            return `${x},${y}`;
        }).join(' ');
    };

    // Render hexagonal grid across the area using fixed rows and columns
    const renderHexagonalGrid = () => {
        const hexWidth = hexSize * 2;
        const hexHeight = Math.sqrt(3) * hexSize;
        const hexagons = [];

        for (let row = 0; row <25; row++) {
            for (let col = 0; col < 35; col++) {
                // Calculate the center position of each hexagon
                const cx = col * hexWidth * 0.75;
                const cy = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);

                hexagons.push(
                    <polygon
                        key={`${cx}-${cy}`}
                        points={calculateHexagonPoints(cx, cy, hexSize)}
                        stroke={color}
                        strokeWidth={thickness}
                        fill="none"
                    />
                );
            }
        }

        return hexagons;
    };

    // Render square grid across the area
    const renderSquareGrid = () => {
        const cellWidth = 100 / columns + '%';
        const cellHeight = 100 / rows + '%';

        return (
            <>
                {Array.from({ length: rows }).map((_, rowIndex) =>
                    Array.from({ length: columns }).map((_, colIndex) => (
                        <rect
                            key={`${rowIndex}-${colIndex}`}
                            x={(100 / columns) * colIndex + '%'}
                            y={(100 / rows) * rowIndex + '%'}
                            width={cellWidth}
                            height={cellHeight}
                            stroke={color}
                            strokeWidth={thickness / 3}
                            fill="none"
                        />
                    ))
                )}
            </>
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
