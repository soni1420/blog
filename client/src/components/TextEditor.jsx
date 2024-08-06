import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  placeholder:"Tell your story..",
  uploader: { insertImageAsBase64URI: true },
};

const TextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
     value={initialValue}
      config={config}
      //   onBlur={(newContent) => getValue(newContent)}
     onChange={(newContent) => getValue(newContent)}
   />
  );
};

export default TextEditor;