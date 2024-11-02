import React from "react";
import GridOverlay from "./GridOverlay";
import { useImageContext } from '../context/ImageContext'; 
import ReactDOMServer from 'react-dom/server';

const SettingsPanel = ({ gridSettings, setGridSettings }) => {
    const { image } = useImageContext(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGridSettings((prev) => ({
            ...prev,
            [name]: name === 'opacity' || name === 'thickness' || name === 'rows' || name === 'columns' ? Number(value) : value,
        }));
    };

    const downloadImage = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        const img = new Image();
        img.src = image; 
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
    
            // Create the SVG string for the grid
            const svgString = ReactDOMServer.renderToStaticMarkup(
                <svg xmlns="http://www.w3.org/2000/svg" width={canvas.width} height={canvas.height}>
                    <rect width="100%" height="100%" fill="none" />
                    <GridOverlay gridSettings={gridSettings} />
                </svg>
            );
    
            // Render grid from SVG on canvas
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
            const paths = svgDoc.querySelectorAll('rect, polygon');
    
            paths.forEach((path) => {
                const strokeWidth = parseFloat(path.getAttribute('stroke-width'));
                ctx.strokeStyle = path.getAttribute('stroke');
                ctx.lineWidth = strokeWidth*1.2; // Ensure thickness matches directly
    
                if (path.tagName === 'rect') {
                    const x = parseFloat(path.getAttribute('x')) * (canvas.width / 100);
                    const y = parseFloat(path.getAttribute('y')) * (canvas.height / 100);
                    const width = parseFloat(path.getAttribute('width')) * (canvas.width / 100);
                    const height = parseFloat(path.getAttribute('height')) * (canvas.height / 100);
                    ctx.strokeRect(x, y, width, height);
                } else if (path.tagName === 'polygon') {
                    const points = path.getAttribute('points').split(' ').map(p => p.split(',').map(Number));
                    ctx.beginPath();
                    ctx.moveTo(points[0][0] * (canvas.width / 100), points[0][1] * (canvas.height / 100));
                    points.forEach(point => {
                        ctx.lineTo(point[0] * (canvas.width / 100), point[1] * (canvas.height / 100));
                    });
                    ctx.closePath();
                    ctx.stroke();
                }
            });
    
            const link = document.createElement('a');
            link.download = 'map-with-grid.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    };
    

    const handleDownload = () => {
        if (image) {
            downloadImage();
        } else {
            alert("Please upload an image before downloading.");
        }
    };

    return (
        <div className="flex flex-col space-y-2 py-8 md:py-0 md:w-full w-[90vw] mx-auto  md:mx-auto">
            <div className="bg-[#1e2122] text-black border-[#500b0b] border-[3px] rounded-lg text-center p-2">
                <h3 className="text-[20.3px] font-semibold mb-4 text-white text-center">SETTINGS</h3>
                <div className="flex px-8 items-center justify-between mb-4 text-[15.7px]">
                    <label className="text-white">Grid Type</label>
                    <select
                        name="gridType"
                        value={gridSettings.gridType}
                        onChange={handleChange}
                        className="bg-white rounded-lg text-center p-1"
                    >
                        <option value="square">Square</option>
                    </select>
                </div>
                <div className="flex items-center px-8 justify-between mb-4">
                    <label className="text-white">Color</label>
                    <input
                        name="color"
                        type="color"
                        value={gridSettings.color}
                        onChange={handleChange}
                        className="h-7 w-[80px]"
                    />
                </div>
                <div className="flex items-center px-8 justify-between mb-4">
                    <label className="text-white">Opacity</label>
                    <input
                        name="opacity"
                        type="number"
                        className="w-16 bg-white rounded-lg text-center p-1"
                        value={gridSettings.opacity}
                        min={0}
                        max={100}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center px-8 justify-between mb-4">
                    <label className="text-white">Rows</label>
                    <input
                        name="rows"
                        type="number"
                        min="1"
                        value={gridSettings.rows}
                        onChange={handleChange}
                        className="w-16 bg-white rounded-lg text-center p-1"
                    />
                </div>
                <div className="flex items-center px-8 justify-between mb-4">
                    <label className="text-white">Columns</label>
                    <input
                        name="columns"
                        type="number"
                        min="1"
                        value={gridSettings.columns}
                        onChange={handleChange}
                        className="w-16 bg-white rounded-lg text-center p-1"
                    />
                </div>
                <div className="flex items-center px-8 justify-between mb-4">
                    <label className="text-white">Thickness</label>
                    <input
                        name="thickness"
                        type="number"
                        min="1"
                        value={gridSettings.thickness}
                        onChange={handleChange}
                        className="w-16 bg-white rounded-lg text-center p-1"
                    />
                </div>
            </div>

            <div className="bg-[#1e2122] border-[#500b0b] border-[3px] rounded-lg p-4">
                <h3 className="text-[18.4px] font-semibold mb-4 text-white text-center">CREATE & DOWNLOAD</h3>
                <button
                    onClick={handleDownload}
                    className="w-full bg-[#df0000] text-white py-2 px-4 text-[13.4px] rounded-full text-center"
                >
                    DOWNLOAD MAP →
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
