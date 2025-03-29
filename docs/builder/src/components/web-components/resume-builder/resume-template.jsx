function ResumeTemplate({
    formData
}) {
    return (
        <div>
            <h1>Resume Template</h1>
            {/* Add your resume template content here */}
            {/* Example: */}
            <h1> Name</h1>
            <h1> {formData.name} </h1>

            <h1> Phone</h1>
            <h1> {formData.phone} </h1>

            <h1> Email </h1>
            <h1> {formData.email} </h1>
            <h2>Summary</h2>
            <p id="template-bio">{formData.summary}</p>
           
            {/* You can add more sections, skills, experiences, etc. as needed */}
            {/* For example: */}
            <h2>Skills</h2>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Javascript</li>
            </ul>
            {/* Add more sections as needed */}
            {/* For example: */}
            <h2>Experience</h2>
            <p>I have 5 years of experience in web development.</p>
            {/* You can add more experiences, projects, etc. as needed */}
        </div>
    );
}
export default ResumeTemplate;