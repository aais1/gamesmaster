import React, { useEffect, useState } from 'react';

const GridOverlay = ({ gridSettings }) => {
    const { gridType, thickness, color, opacity } = gridSettings;
    const [hexSize, setHexSize] = useState(50); // Increased initial hex size for better visibility

    useEffect(() => {
        const calculateHexSize = () => {
            const containerWidth = window.innerWidth * 0.7;
            const containerHeight = window.innerHeight * 0.8;

            // Calculate hex size based on container dimensions for a more balanced look
            const calculatedHexWidth = containerWidth / 8; // Adjust '8' for fewer hexagons horizontally
            const calculatedHexHeight = containerHeight / 7; // Adjust '7' for fewer hexagons vertically

            setHexSize(Math.min(calculatedHexWidth / 2, calculatedHexHeight / Math.sqrt(3)));
        };

        calculateHexSize();
        window.addEventListener('resize', calculateHexSize);
        return () => window.removeEventListener('resize', calculateHexSize);
    }, []);

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

    // Render hexagonal grid across the entire area
    const renderHexagonalGrid = () => {
        const hexWidth = hexSize * 2;
        const hexHeight = Math.sqrt(3) * hexSize;
        const hexagons = [];
        const containerWidth = window.innerWidth * 0.7;
        const containerHeight = window.innerHeight * 0.8;

        for (let y = 0; y < containerHeight + hexHeight; y += hexHeight) {
            for (let x = 0; x < containerWidth + hexWidth; x += hexWidth * 2) {
                const cx = x;
                const cy = y + (x / hexWidth % 2 ? hexHeight / 2 : 0);

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

    // Render square grid across the entire area
    const renderSquareGrid = () => {
        const columns = 8; // Adjust for desired density
        const rows = 7;
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
