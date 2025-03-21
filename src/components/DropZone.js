
// // export default DropZone;

// import React from "react";

// const DropZone = ({ definition, handleDrop, placedItem }) => {
//   return (
//     <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, definition)}>
//       <span className="drop-label">{definition.label}.</span>
//       <span className="drop-text">{placedItem || definition.text}</span>
//     </div>
//   );
// };

// export default DropZone;



// DropZone component that acts as a drop area for drag-and-drop functionality
const DropZone = ({ definition, handleDrop, placedItem }) => {
  return (
    <div
      className="drop-zone"
      onDragOver={(e) => {
        e.preventDefault(); // Required for Chrome to allow drops
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        const draggedTerm = e.dataTransfer.getData("text/plain");
        handleDrop(e, definition, draggedTerm);
      }}
      onTouchEnd={(e) => {
        e.preventDefault(); // Prevent default mobile behavior
        console.log("Touch end detected on drop zone:", definition.text);
      }}
    >
      <span className="drop-text">{placedItem || definition.text}</span>
    </div>
  );
};

export default DropZone; // Exporting the DropZone component for use in other parts of the app
