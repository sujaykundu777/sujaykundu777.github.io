/**
 * This script is used to preview the resume in a canvas.
 * It uses html2pdf.js to convert the resume to PDF.
 * Author: @sujaykundu777
 * URL: https://github.com/sujaykundu777
 * Website: https://sujaykundu.com
 */

let scale = 1; // Default scale

document.addEventListener("DOMContentLoaded", () => {
  const draggable = document.querySelector(".draggable");
  const canvasContainer = document.querySelector(".canvas-container");
  const resumeBox = document.getElementById("resumeBox");

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
  //centerResumeBox(); // Call the function to center the resumeBox on page load

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Mouse down event to start dragging
  draggable.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
    draggable.style.cursor = "grabbing";
  });

  // Mouse move event to drag the element
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      draggable.style.left = `${x}px`;
      draggable.style.top = `${y}px`;
    }
  });

  // Mouse up event to stop dragging
  document.addEventListener("mouseup", () => {
    isDragging = false;
    draggable.style.cursor = "grab";
  });

  // Touch events for mobile drag
  draggable.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length === 1) {
        isDragging = true;
        // Use touch positions
        offsetX = e.touches[0].clientX - draggable.offsetLeft;
        offsetY = e.touches[0].clientY - draggable.offsetTop;
        draggable.style.cursor = "grabbing";
      }
    },
    { passive: false }
  );

  document.addEventListener(
    "touchmove",
    function (e) {
      if (isDragging && e.touches.length === 1) {
        const x = e.touches[0].clientX - offsetX;
        const y = e.touches[0].clientY - offsetY;
        draggable.style.left = `${x}px`;
        draggable.style.top = `${y}px`;
        e.preventDefault(); // Prevent scrolling while dragging
      }
    },
    { passive: false }
  );

  document.addEventListener("touchend", function () {
    isDragging = false;
    draggable.style.cursor = "grab";
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

  if (scale === 1) {
    const resumeElement = document.getElementById("resumeBox");
    var opt = {
      filename: "resume.pdf",
      enableLinks: true,
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(resumeElement).save();
  }
}

// function visitWebsite() {
//     window.open('{{ site.portfolio_url | relative_url }}', '_blank');
// }

function resetResume() {
  const draggable = document.querySelector(".draggable");
  const canvasContainer = document.querySelector(".canvas-container");
  const resumeBox = document.getElementById("resumeBox");
  if (!draggable || !canvasContainer || !resumeBox) return;

  // Calculate the initial scale to fit the resumeBox within the canvas-container
  const containerRect = canvasContainer.getBoundingClientRect();
  const resumeRect = resumeBox.getBoundingClientRect();
  const scaleX = containerRect.width / resumeRect.width;
  const scaleY = containerRect.height / resumeRect.height;
  // Use the smaller scale to ensure the entire resume fits
  scale = Math.min(scaleX, scaleY);
  resumeBox.style.transform = `scale(${scale})`;

  // Center or left-align the resumeBox in the canvas-container
  const draggableRect = draggable.getBoundingClientRect();
  let left, top;
  if (window.innerWidth <= 600) {
    // On mobile, align to left and top with a small margin
    left = 8;
    top = 8;
  } else {
    // On desktop, center
    left = (containerRect.width - draggableRect.width) / 2;
    top = (containerRect.height - draggableRect.height) / 2;
  }
  draggable.style.left = `${left}px`;
  draggable.style.top = `${top}px`;
}
