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
  const [touchElement, setTouchElement] = useState(null);

  // Check if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Handle touch start
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const touch = e.touches[0];
    const newElement = e.target.cloneNode(true);
    newElement.style.position = "absolute";
    newElement.style.zIndex = "1000";
    newElement.style.pointerEvents = "none";
    document.body.appendChild(newElement);
    setTouchElement(newElement);

    newElement.style.left = `${touch.clientX}px`;
    newElement.style.top = `${touch.clientY}px`;
  };

  // Handle touch move (Move the item)
  const handleTouchMove = (e) => {
    if (!isDragging || !touchElement) return;
    const touch = e.touches[0];

    touchElement.style.left = `${touch.clientX - 50}px`;
    touchElement.style.top = `${touch.clientY - 25}px`;
  };

  // Handle touch end (Drop the item)
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (touchElement) {
      const touch = e.changedTouches[0];
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

      if (dropTarget && dropTarget.classList.contains("drop-zone")) {
        const event = new Event("drop", { bubbles: true });
        event.dataTransfer = {
          getData: () => term, // Simulate drag data
        };
        dropTarget.dispatchEvent(event);
      }

      // Remove cloned element
      document.body.removeChild(touchElement);
      setTouchElement(null);
    }
  };

  return (
    <div
      className="drag-item"
      draggable={!isMobile} // Enable native drag only on desktop
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



