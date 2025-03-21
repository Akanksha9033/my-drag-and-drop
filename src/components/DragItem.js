// import React from "react";

// const DragItem = ({ term, handleDragStart }) => {
//   return (
//     <div
//       className="drag-item"
//       draggable
//       onDragStart={(e) => handleDragStart(e, term)}
//     >
//       {term}
//     </div>
//   );
// };

// export default DragItem;
// import React from "react";

// const DragItem = ({ term, handleDragStart }) => {
//   return (
//     <div
//       className="drag-item"
//       draggable
//       onDragStart={(e) => handleDragStart(e, term)}
//     >
//       {term}
//     </div>
//   );
// };

// export default DragItem;

// import React from "react";

// const DragItem = ({ term, handleDragStart }) => {
//   return (
//     <div className="drag-item" draggable onDragStart={(e) => handleDragStart(e, term)}>
//       {term}
//     </div>
//   );
// };

// export default DragItem;

import React, { useState } from "react";

const DragItem = ({ term, handleDragStart }) => {
  const [touchPosition, setTouchPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Check if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Handle touch start
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setTouchPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    handleDragStart(e, term);
  };

  // Handle touch movement
  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const element = e.target;
    const touch = e.touches[0];

    element.style.position = "absolute";
    element.style.left = `${touch.clientX - 50}px`; // Adjust positioning
    element.style.top = `${touch.clientY - 25}px`;
  };

  // Handle touch end (Drop)
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Get the drop target
    const dropTarget = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );

    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      const event = new Event("drop", { bubbles: true });
      event.dataTransfer = {
        getData: () => term, // Simulate data transfer
      };
      dropTarget.dispatchEvent(event);
    }
  };

  return (
    <div
      className="drag-item"
      draggable={!isMobile} // Enable dragging only on desktop
      onDragStart={(e) => {
        if (isMobile) return; // Prevent dragStart on mobile
        e.dataTransfer.setData("text/plain", term);
        handleDragStart(e, term);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {term}
    </div>
  );
};

export default DragItem;

