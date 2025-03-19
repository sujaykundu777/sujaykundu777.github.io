/**
 * This script is used to preview the resume in a modal.
 * It uses html2pdf.js to convert the resume to PDF.
 * Author: @sujaykundu777
 * URL: https://github.com/sujaykundu777
 * Website: https://sujaykundu.com
 */
let scale = 1;

function zoomIn() {
    scale += 0.1;
    document.getElementById("resumeBox").style.transform = `scale(${scale})`;
}

function zoomOut() {
    if (scale > 0.5) {
        scale -= 0.1;
        document.getElementById("resumeBox").style.transform = `scale(${scale})`;
    }
}

function downloadPDF() {
    // scroll to top of resumeBox
    document.getElementById("resumeBox").scrollIntoView();
    
    window.scrollTo(0, 0);

    // reset scale to 1
    scale = 1;
    document.getElementById("resumeBox").style.transform = `scale(${scale})`;

    if (scale === 1 ) {
        const resumeElement = document.getElementById("resumeBox");
        var opt =  {
            filename: 'resume.pdf',
            enableLinks: true,
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        html2pdf().set(opt).from(resumeElement).save();
     }
}

function visitWebsite() {
    window.open('{{ site.portfolio_url | relative_url }}', '_blank');
}