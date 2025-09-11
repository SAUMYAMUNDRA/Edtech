"use client";
import React from 'react';

// This is a generic, reusable component for creating an infinite scrolling effect.
// It accepts an array of 'items' and a 'renderItem' function to display them.
export default function Scroller({ items = [], renderItem, speed = "normal" }) {
    if (!items || items.length === 0) {
        return null; // Don't render anything if there are no items
    }

    // Duplicate the items array to create the seamless looping effect
    const duplicatedItems = [...items, ...items];

    // Determine animation duration based on speed prop
    const durationClass = speed === "slow" ? "animate-[scroll_80s_linear_infinite]" : "animate-[scroll_40s_linear_infinite]";

    return (
        <div className="group w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className={`flex min-w-full shrink-0 gap-4 py-4 ${durationClass} group-hover:[animation-play-state:paused]`}>
                {/* We map over the duplicated list and use the provided renderItem function for each item */}
                {duplicatedItems.map((item, index) => {
                    // The renderItem function is called here, passing the item and a unique key
                    return renderItem(item, index);
                })}
            </div>
        </div>
    );
}