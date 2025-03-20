/**
 * This script is used to preview the resume in a canvas.
 * It uses html2pdf.js to convert the resume to PDF.
 * Author: @sujaykundu777
 * URL: https://github.com/sujaykundu777
 * Website: https://sujaykundu.com
 */

let scale = 1; // Default scale

document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.querySelector('.draggable');
    const canvasContainer = document.querySelector('.canvas-container');
    const resumeBox = document.getElementById('resumeBox');


    // Center the resumeBox in the canvas-container
    const centerResumeBox = () => {
        const containerRect = canvasContainer.getBoundingClientRect();
        const draggableRect = draggable.getBoundingClientRect();

        const centerX = (containerRect.width - draggableRect.width) / 2;
        const centerY = (containerRect.height - draggableRect.height) / 2;

        draggable.style.left = `${centerX}px`;
        draggable.style.top = `${centerY}px`;
    };
    // Calculate the initial scale to fit the resumeBox within the canvas-container
    const fitResumeBoxToCanvas = () => {
        const containerRect = canvasContainer.getBoundingClientRect();
        const resumeRect = resumeBox.getBoundingClientRect();

        const scaleX = containerRect.width / resumeRect.width;
        const scaleY = containerRect.height / resumeRect.height;

        // Use the smaller scale to ensure the entire resume fits
        scale = Math.min(scaleX, scaleY);

        // Apply the scale to the resumeBox
        resumeBox.style.transform = `scale(${scale})`;
    };
    
    // Call the functions to fit and center the resumeBox
    fitResumeBoxToCanvas();
    centerResumeBox(); // Call the function to center the resumeBox on page load

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Mouse down event to start dragging
    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - draggable.offsetLeft;
        offsetY = e.clientY - draggable.offsetTop;
        draggable.style.cursor = 'grabbing';
    });

    // Mouse move event to drag the element
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            draggable.style.left = `${x}px`;
            draggable.style.top = `${y}px`;
        }
    });

    // Mouse up event to stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
    });
});

// let scale = 0.1;

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

// function visitWebsite() {
//     window.open('{{ site.portfolio_url | relative_url }}', '_blank');
// }

