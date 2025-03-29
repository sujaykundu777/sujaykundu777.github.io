import React from "react";
// import { Preview, print } from 'react-html2pdf';
import ResumeTemplate from "../resume-template";

function ResumePreviewer() {
  return (
    <div>
      <h1>Resume Previewer </h1>
      {/* <Preview id={'jsx-template'}> */}
      <ResumeTemplate bio={"This is bio"} />
      {/* </Preview>
            <button onClick={()=>print('a', 'jsx-template')}> print</button> */}
    </div>
  );
}

export default ResumePreviewer;
