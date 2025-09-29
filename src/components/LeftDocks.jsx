import React from "react";
import DockMostTracked from "./DockMostTracked";
import DockDisruptions from "./DockDisruptions";
import DockBookmarks from "./DockBookmarks";

export default function LeftDocks({ mostTracked = [], disruptions = [], bookmarks = [] }) {
  return (
    <div className="fixed left-4 top-20 z-40 space-y-3 pointer-events-none">
      <div className="pointer-events-auto"><DockMostTracked items={mostTracked} /></div>
      <div className="pointer-events-auto"><DockDisruptions items={disruptions} /></div>
      <div className="pointer-events-auto"><DockBookmarks items={bookmarks} /></div>
    </div>
  );
}


