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

  // Detect if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Prevent page scrolling while dragging
  document.body.style.overflow = isDragging ? "hidden" : "auto";

  // Handle touch start (begin dragging)
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const touch = e.touches[0];
    const originalElement = e.target;

    // Create a floating clone for smooth dragging
    const newElement = originalElement.cloneNode(true);
    newElement.style.position = "absolute";
    newElement.style.width = `${originalElement.offsetWidth}px`; // Maintain size
    newElement.style.height = `${originalElement.offsetHeight}px`;
    newElement.style.zIndex = "1000";
    newElement.style.pointerEvents = "none";
    newElement.style.border = "2px dashed #000"; // Make dragging visible
    document.body.appendChild(newElement);
    setTouchElement(newElement);

    newElement.style.left = `${touch.clientX}px`;
    newElement.style.top = `${touch.clientY}px`;
  };

  // Handle touch move (Move item with the finger)
  const handleTouchMove = (e) => {
    if (!isDragging || !touchElement) return;

    const touch = e.touches[0];
    touchElement.style.left = `${touch.clientX - touchElement.offsetWidth / 2}px`;
    touchElement.style.top = `${touch.clientY - touchElement.offsetHeight / 2}px`;
  };

  // Handle touch end (drop in a valid box)
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (touchElement) {
      const touch = e.changedTouches[0];
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

      if (dropTarget && dropTarget.classList.contains("drop-zone")) {
        const event = new Event("drop", { bubbles: true });
        event.dataTransfer = {
          getData: () => term,
        };
        dropTarget.dispatchEvent(event);
      }

      // Remove floating clone
      document.body.removeChild(touchElement);
      setTouchElement(null);
    }
  };

  return (
    <div
      className="drag-item"
      draggable={!isMobile} // Enable drag only on desktop
      onDragStart={(e) => {
        if (isMobile) return;
        e.dataTransfer.setData("text/plain", term);
        handleDragStart(e, term);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }} // Prevent scrolling on touch drag
    >
      {term}
    </div>
  );
};

export default DragItem;
