

import React, { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const QuillEditor = ({ content, setContent }) => {
  const [editorHeight, setEditorHeight] = useState(500); // Initial height
  const quillRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        const contentHeight = editor.getLength() > 1 ? editor.container.firstChild.offsetHeight : 0;
        
        setEditorHeight(contentHeight + 600); // Add some padding
      }
    };

    updateHeight();

     },[]);

  return (
    <div
      tabIndex={0}
      className="bg-gray-200 text-black rounded-md border border-gray-900 mx-auto w-full h-full focus:outline-none focus:ring-2  focus:ring-[#bae51a] focus:border-[#bae51a]"
      style={{
        maxHeight:"700px",
        overflowY:"auto",
        transition:"height 0.2s ease"
       }} // Smooth transition
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your blog post here..."
        className="h-[300px]  focus:outline-none"
      />
    </div>
  );
};

export default QuillEditor;