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

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  document.body.style.overflow = isDragging ? "hidden" : "auto";

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const clone = e.target.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.width = `${e.target.offsetWidth}px`;
    clone.style.zIndex = 1000;
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);
    setTouchElement(clone);
    clone.style.left = `${touch.clientX}px`;
    clone.style.top = `${touch.clientY}px`;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !touchElement) return;
    const touch = e.touches[0];
    touchElement.style.left = `${touch.clientX - touchElement.offsetWidth / 2}px`;
    touchElement.style.top = `${touch.clientY - touchElement.offsetHeight / 2}px`;
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (touchElement) {
      const touch = e.changedTouches[0];
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      if (dropTarget && dropTarget.classList.contains("drop-zone")) {
        const event = new Event("drop", { bubbles: true });
        event.dataTransfer = { getData: () => term };
        dropTarget.dispatchEvent(event);
      }
      document.body.removeChild(touchElement);
      setTouchElement(null);
    }
  };

  return (
    <div
      className="drag-item"
      draggable={!isMobile}
      onDragStart={(e) => {
        if (isMobile) return;
        e.dataTransfer.setData("text/plain", term);
        handleDragStart(e, term);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }} // 👈 Important for smooth mobile behavior
    >
      {term}
    </div>
  );
};

export default DragItem;
