import "./resume-builder.css";
import React, { useState, useRef } from "react";
import { Box, Flex, HStack, VStack, Button } from "@chakra-ui/react";
import ResumeSidebar from "./sidebar/resume-sidebar";
import ResumeTemplate from "./resume-template";
import html2pdf from "html2pdf.js";

function ResumeBuilder() {
  const ref = useRef(null);
  const [preview, setPreview] = useState(false);
  // const [htmlContent, setHtmlContent] = useState('This is example of dynamic content');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    socialLinks: [
      {
        id: 2,
        name: "github",
        link: "",
      },
      {
        id: 2,
        name: "linkedin",
        link: "",
      },
    ],
    summary: "",
    experience: [{ company: "", role: "", duration: "" }],
    education: [{ school: "", degree: "", year: "" }],
    skills: [{ skill: "" }],
    projects: [{ title: "", description: "" }],
    certifications: [{ name: "", year: "" }],
    languages: [{ language: "" }],
    interests: [{ interest: "" }],
    references: [{ name: "", contact: "" }],
    awards: [{ title: "", year: "" }],
    publications: [{ title: "", year: "" }],
    volunteer: [{ organization: "", role: "", duration: "" }],
    hobbies: [{ hobby: "" }],
    courses: [{ name: "", year: "" }],
    additionalInfo: [{ info: "" }],
  });

  const handleViewToggle = () => {
    console.log("Toggle Preview / Edit");
    setPreview(!preview);
  };

  const generatePdf = () => {
    const element = ref.current;

    const options = {
      margin: 10,
      filename: "output.pdf",
      type: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        oriantation: "portrait",
      },
    };

    html2pdf().from(element).set(options).save();
  };

  const printPdf = () => {
    console.log("Print Pdf");
    const element = ref.current;

    const pdfWindow = window.open("", "", `width=800, height=600`);
    pdfWindow.document.write("<html><head><title>Print</title></head><body>");
    pdfWindow.document.write(element.innerHTML);
    pdfWindow.document.write("</body></html>");
    pdfWindow.document.close();
    pdfWindow.print();
  };

  return (
    <>
      <Box>
        <HStack>
          <Button onClick={handleViewToggle}> Toggle Preview / Edit </Button>
          <Button onClick={generatePdf}>Generate Pdf </Button>
          <Button onClick={printPdf}>Print Pdf </Button>
        </HStack>
        <Flex>
          <Box>
            <VStack>
              <h1> Sidebar </h1>
            </VStack>
          </Box>
          <Box>
            <VStack>
              <h1> Resume viewer </h1>
            </VStack>
          </Box>
        </Flex>
      </Box>

      <div className="resume-builder-container">
        <div className="main-container">
          <div className="sidebar">
            <ResumeSidebar formData={formData} setFormData={setFormData} />
            {/* <input value={htmlContent} onChange={(e) => setHtmlContent(e.target.value)} /> */}
          </div>
          <div ref={ref} style={{ display: "inline-block" }}>
            {preview ? (
              <div>
                <h1>Resume Previewer </h1>

                <ResumeTemplate formData={formData} />
              </div>
            ) : (
              <div>
                <h1> Resume viewer </h1>
                <ResumeTemplate formData={formData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeBuilder;
