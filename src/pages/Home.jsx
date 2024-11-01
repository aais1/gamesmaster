import MapUpload from "../components/MapUpload";
import SettingsPanel from "../components/SettingsPanel";
import PromoSection from "../components/PromoSection";
import { useState } from "react";
import { useUserContext } from '../context/UserContext';

export function Home() {
    const { user } = useUserContext();
    const [gridSettings, setGridSettings] = useState({
        gridType: 'square',
        color: '#FFFFFF',
        opacity: 100,
        rows: 10,
        columns: 10,
        thickness: 10,
    });

    return (
        <div className="text-white">
            <div className="md:hidden block">
                <PromoSection />
            </div>
            <div className="flex justify-center md:p-4">
                <div className="flex flex-col md:flex-row w-[95vw] pt-8 md:pt-0 md:w-full max-w-[95vw] md:space-x-6">
                    <div className="py-8 md:py-0 border-t md:border-none border-b w-full">
                        <MapUpload gridSettings={gridSettings} />
                    </div>
                    <div className="flex flex-col md:space-y-2 md:pl-8 md:border-l border-white">
                        <SettingsPanel gridSettings={gridSettings} setGridSettings={setGridSettings} />
                        <div className="md:block hidden">
                            <PromoSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
