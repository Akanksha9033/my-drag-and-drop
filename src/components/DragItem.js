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
  const [isDragging, setIsDragging] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  // Detect if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Handle touch start
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  };

  // Handle touch move (Move the item under the finger)
  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const element = e.target;

    element.style.position = "absolute";
    element.style.left = `${touch.clientX - 50}px`;
    element.style.top = `${touch.clientY - 25}px`;
  };

  // Handle touch end (Detect drop target)
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Find the drop zone under the user's touch
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      const event = new Event("drop", { bubbles: true });
      event.dataTransfer = {
        getData: () => term, // Simulate data transfer
      };
      dropTarget.dispatchEvent(event);
    }

    // Reset the element's position
    const element = e.target;
    element.style.position = "static";
  };

  return (
    <div
      className="drag-item"
      draggable={!isMobile} // Disable native dragging on mobile
      onDragStart={(e) => {
        if (isMobile) return;
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

