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

import React, { useRef, useState } from "react";

const DragItem = ({ term, handleDragStart }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const originalRef = useRef(null); // for tracking the real element
  const [dragging, setDragging] = useState(false);

  const handleTouchStart = (e) => {
    e.preventDefault();
    setDragging(true);

    const element = originalRef.current;
    const touch = e.touches[0];

    element.style.position = "absolute";
    element.style.zIndex = 1000;
    element.style.left = `${touch.clientX - element.offsetWidth / 2}px`;
    element.style.top = `${touch.clientY - element.offsetHeight / 2}px`;
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;

    const element = originalRef.current;
    const touch = e.touches[0];

    element.style.left = `${touch.clientX - element.offsetWidth / 2}px`;
    element.style.top = `${touch.clientY - element.offsetHeight / 2}px`;
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setDragging(false);

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      const dropEvent = new Event("drop", { bubbles: true });
      dropEvent.dataTransfer = {
        getData: () => term,
      };
      dropTarget.dispatchEvent(dropEvent);
    }

    // Reset position
    const element = originalRef.current;
    element.style.position = "static";
    element.style.zIndex = "auto";
    element.style.left = "";
    element.style.top = "";
  };

  return (
    <div
      ref={originalRef}
      className="drag-item"
      draggable={!isMobile} // Desktop ke liye native drag
      onDragStart={(e) => {
        if (isMobile) return;
        e.dataTransfer.setData("text/plain", term);
        handleDragStart(e, term);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }} // important to stop scroll during drag
    >
      {term}
    </div>
  );
};

export default DragItem;
