import { createContext, useContext, useState } from "react";

const ImageContex=createContext();

export const ImageContextProvider=({children})=>{
    const [image,setImage]=useState(null);
    return (
        <ImageContex.Provider value={{image,setImage}}>
            {children}
        </ImageContex.Provider>
    );
}


export const useImageContext=()=>{
    const context=useContext(ImageContex);
    if(!context){
        throw new Error('useImageContext must be used within a ImageContextProvider');
    }
    return context;
}