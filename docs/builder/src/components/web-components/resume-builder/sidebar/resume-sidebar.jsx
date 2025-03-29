import './resume-sidebar.css';

import { Input, Text, Textarea, Heading } from '@chakra-ui/react';

function ResumeSidebar({ formData, setFormData }) {

    const handleChange = (e, index, section) => {
        if (section) {
          const updatedSection = [...formData[section]];
          updatedSection[index][e.target.name] = e.target.value;
          setFormData({ ...formData, [section]: updatedSection });
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="resume-sidebar">
            {/* Sidebar content */}
            <Heading as='h6' size='md'> Personal Info  </Heading>
            <Text md='8px'>Name: </Text>
            <Input placeholder='Name' name="name" size='md' onChange={handleChange} />

            <Text md='8px'>Phone: </Text>
            <Input placeholder='Phone' name="phone" size='md' onChange={handleChange} />

            <Text md='8px'>Email: </Text>
            <Input placeholder='Email' name="email" size='md' onChange={handleChange} />

            <Text md='8px'>Summary:</Text>
            <Textarea placeholder='Summary' name="summary" size='md' onChange={handleChange} />
        </div>
    );
}

export default ResumeSidebar;
