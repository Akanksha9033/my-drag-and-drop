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


import React from "react";

const DragItem = ({ term, handleDragStart }) => {
  // Check if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div
      className="drag-item"
      draggable={!isMobile} // Disable dragging on mobile devices
      onDragStart={(e) => {
        if (isMobile) return; // Prevent dragStart on mobile
        e.dataTransfer.setData("text/plain", term);
        e.dataTransfer.effectAllowed = "move";
        handleDragStart(e, term);
      }}
      onTouchStart={(e) => {
        // Prevent Chrome from treating it as a file drag
        e.preventDefault();
        console.log("Touch start detected:", term);
      }}
    >
      {term}
    </div>
  );
};

export default DragItem;
