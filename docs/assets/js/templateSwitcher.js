/*
* This script is used to switch between different templates.
* Author: @sujaykundu777
* URL:
* Website: https://sujaykundu.com
*/

// load the default template
// switchTemplate('template1');

// if the user clicks on a template, switch to that template
function switchTemplate(templateName) {

    // save the selected template in local storage
    localStorage.setItem('selectedTemplate', templateName);

    // hide all templates
    document.querySelectorAll('.template').forEach(template => {
        template.style.display = 'none';
    });

    // Show the selected template
    const selectedTemplate = document.getElementById(templateName);
    if (selectedTemplate) {
        selectedTemplate.style.display = 'block';
    }

    // Update the dropdown to reflect the selected template
    const templateSelect = document.getElementById('templateSelect');
    if (templateSelect) {
        templateSelect.value = templateName;
    }

}

// function to load the template on page load
function loadTemplateOnPageLoad() {
    // get the selected template from local storage
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    // switch to the saved template
    if (savedTemplate) {
        switchTemplate(savedTemplate);
    }
}

// Call the function to load the template when the page loads
document.addEventListener('DOMContentLoaded', loadTemplateOnPageLoad);