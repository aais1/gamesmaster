// MapUpload.js
import React, { useCallback, useRef } from 'react';
import GridOverlay from './GridOverlay';
import { useImageContext } from '../context/ImageContext'; // Adjust the import path accordingly

const MapUpload = ({ gridSettings }) => {
    const { image, setImage } = useImageContext(); // Use context
    const containerRef = useRef(null);

    const handleFileInputClick = () => {
        document.getElementById('mapUpload').click();
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    }, []);

    const handleDragOver = (event) => {
        event.preventDefault();
        containerRef.current.style.border = '4px dashed #df0000';
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        containerRef.current.style.border = '1px solid rgb(127 29 29)';
    };

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // Update context state
        };
        reader.readAsDataURL(file);
        containerRef.current.style.border = '1px solid rgb(127 29 29)';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    return (
        <div className="flex flex-col md:w-full w-[90vw] mx-auto">
            <div 
                ref={containerRef}
                className="flex flex-col min-h-[81vh] items-center justify-center border-[#500b0b] border-[3px] bg-[#1e2122] rounded-xl p-8 relative"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {!image && (
                    <>
                        <label htmlFor="mapUpload" className="text-[25px] md:text-[31px] font-semibold mb-5">
                            UPLOAD YOUR MAP
                        </label>
                        <input
                            type="file"
                            alt="Upload Image"
                            accept="image/*"
                            hidden
                            id="mapUpload"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleFileInputClick}
                            className="bg-[#df0000] text-white py-2 px-10 text-[20.8px] font-semibold rounded-2xl mb-2"
                        >
                            Select your Image
                        </button>
                        <p className="text-white font-[400] text-[16.8px]">or drop image here</p>
                    </>
                )}

                {image && (
                    <>
                        <img
                            src={image}
                            alt="Uploaded Map"
                            className="absolute inset-0 m-auto z-0 w-full h-full"
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <GridOverlay
                            gridSettings={gridSettings}
                            className="absolute inset-0 z-10"
                        />
                    </>
                )}
            </div>
            <div className="text-right mt-1">
                {image && (
                    <button
                        onClick={() => {
                            setImage(null); // Clear the context state
                        }}
                        className="text-sm underline"
                    >
                        Remove Map
                    </button>
                )}
            </div>
        </div>
    );
};

export default MapUpload;
