// // import React from "react";
// // import DragItem from "./DragItem";
// // import DropZone from "./DropZone";

// // const Question = ({ questionData, handleDragStart, handleDrop }) => {
// //   return (
// //     <div className="question-container">
// //       <h3>{questionData.question}</h3>
// //       <div className="drag-drop-area">
// //         <div className="terms">
// //           {questionData.terms.map((term, index) => (
// //             <DragItem key={index} term={term} handleDragStart={handleDragStart} />
// //           ))}
// //         </div>
// //         <div className="definitions">
// //           {questionData.definitions.map((definition) => (
// //             <DropZone key={definition.id} definition={definition} handleDrop={handleDrop} />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Question;

// import React from "react";
// import DragItem from "./DragItem";
// import DropZone from "./DropZone";

// const Question = ({ questionData, handleDragStart, handleDrop }) => {
//   return (
//     <div className="question-container">
//       {/* ✅ Directly display the question without serial numbers */}
//       <h3 className="question-text" style={{ fontWeight: "300" }}>
//   {questionData.question}
// </h3>

//       <div className="drag-drop-area">
//         <div className="terms">
//           {questionData.terms.map((term, index) => (
//             <DragItem key={index} term={term} handleDragStart={handleDragStart} />
//           ))}
//         </div>
//         <div className="definitions">
//           {questionData.definitions.map((definition, index) => (
//             <DropZone key={index} definition={definition} handleDrop={handleDrop} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Question;
// import React from "react";
// import DragItem from "./DragItem";
// import DropZone from "./DropZone";

// const Question = ({ questionData, handleDragStart, handleDrop }) => {
//   return (
//     <div className="question-container">
//       <h3 className="question-text">{questionData.question}</h3>

//       <div className="drag-drop-area">
//         {questionData.terms.map((term, index) => (
//           <div className="drag-drop-row" key={index}>
//             <DragItem term={term} handleDragStart={handleDragStart} />
//             <DropZone definition={questionData.definitions[index]} handleDrop={handleDrop} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Question;
import React from "react";
import DragItem from "./DragItem";
import DropZone from "./DropZone";

const Question = ({ questionData, handleDragStart, handleDrop }) => {
  return (
    <div className="question-container">
      {/* ✅ Added Serial Number Before Each Question */}
      <h3 className="question-text">Q{questionData.id}. {questionData.question}</h3>

      <div className="drag-drop-area">
        {questionData.terms.map((term, index) => (
          <div className="drag-drop-row" key={index}>
            {/* ✅ Added Serial Number to Drag and Drop Items */}
            <span className="serial-number">{index + 1}.</span>
            <DragItem term={term} handleDragStart={handleDragStart} />
            <DropZone definition={questionData.definitions[index]} handleDrop={handleDrop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
