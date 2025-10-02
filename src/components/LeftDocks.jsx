import React from "react";
import DockMostTracked from "./DockMostTracked";
import DockDisruptions from "./DockDisruptions";
import DockBookmarks from "./DockBookmarks";
import { sampleDrones } from "../data/sampleDrones";


export default function LeftDocks({ selectedDrone }) {
    return (
        <div className={`fixed left-4 top-20 z-40 space-y-3 flex flex-col pointer-events-none transition-transform duration-300 ${selectedDrone ? '-translate-x-[360px]' : 'translate-x-0'}`}>
            <div className="pointer-events-auto"><DockMostTracked items={sampleDrones.slice(0, 5)} /></div>
            <div className="pointer-events-auto"><DockDisruptions items={[]} /></div>
            <div className="pointer-events-auto"><DockBookmarks /></div>
        </div>
    )
}


