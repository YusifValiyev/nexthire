import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function CVPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const cvData = parseCV(location.state.cvData);

    function parseCV(rawData) {
        try {
            let trimmed = rawData.trim();
            const firstBrace = trimmed.indexOf("{");
            const lastBrace = trimmed.lastIndexOf("}");

            if (firstBrace === -1 || lastBrace === -1) {
                throw new Error("No JSON object found");
            }

            const jsonString = trimmed.slice(firstBrace, lastBrace + 1);
            const cvObject = JSON.parse(jsonString);
            return cvObject;
        } catch (err) {
            console.error("Failed to parse CV JSON:", err);
            return null;
        }
    }

    const handleDownloadPDF = () => {
        const printWindow = window.open("", "_blank");

        const cvHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${cvData.name} - CV</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background: white;
            }

            .cv-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              background: white;
            }

            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #a282ff;
              padding-bottom: 20px;
            }

            .name {
              font-size: 32px;
              font-weight: bold;
              color: #a282ff;
              margin-bottom: 10px;
            }

            .section {
              margin-bottom: 25px;
            }

            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #a282ff;
              margin-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 5px;
            }

            .summary-text {
              text-align: justify;
              color: #4b5563;
              line-height: 1.7;
            }

            .experience-item, .education-item {
              margin-bottom: 20px;
              padding: 15px;
              border-left: 3px solid #a282ff;
              background: #f8fafc;
            }

            .job-title {
              font-size: 18px;
              font-weight: bold;
              color: #a282ff;
            }

            .years {
              font-size: 14px;
              color: #9ca3af;
              margin-bottom: 10px;
            }

            .description {
              color: #4b5563;
              line-height: 1.6;
            }

            .responsibilities {
              color: #4b5563;
              line-height: 1.6;
              list-style: none;
              padding: 0;
            }

            .responsibilities li {
              margin-bottom: 5px;
              padding-left: 15px;
              position: relative;
            }

            .responsibilities li:before {
              content: "•";
              color: #a282ff;
              font-weight: bold;
              position: absolute;
              left: 0;
            }

            .skills-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 10px;
              margin-top: 10px;
            }

            .skill-item {
              background: #f3f0ff;
              color: #a282ff;
              padding: 8px 12px;
              border-radius: 20px;
              text-align: center;
              font-size: 14px;
              border: 1px solid #d8c8ff;
            }

            .interests-list {
              display: flex;
              gap: 15px;
              flex-wrap: wrap;
            }

            .interest-item {
              background: #f3f0ff;
              color: #8b5cff;
              padding: 6px 12px;
              border-radius: 15px;
              font-size: 14px;
              border: 1px solid #d8c8ff;
            }

            @media print {
              .cv-container {
                padding: 20px;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="cv-container">
            <div class="header">
              <h1 class="name">${cvData.name}</h1>
            </div>

            <div class="section">
              <h2 class="section-title">Professional Summary</h2>
              <p class="summary-text">${cvData.summary}</p>
            </div>

            <div class="section">
              <h2 class="section-title">Work Experience</h2>
              ${cvData.work_experience
                  .map(
                      (exp) => `
                <div class="experience-item">
                  <div class="job-title">${exp.job_title}</div>
                  <div class="years">${exp.work_dates}</div>
                  <ul class="responsibilities">
                    ${exp.responsibilities
                        .map((resp) => `<li>${resp}</li>`)
                        .join("")}
                  </ul>
                </div>
              `
                  )
                  .join("")}
            </div>

            <div class="section">
              <h2 class="section-title">Education</h2>
              ${cvData.education
                  .map(
                      (edu) => `
                <div class="education-item">
                  <div class="job-title">${edu.degree}</div>
                  <div class="description">${edu.institution}</div>
                  <div class="years">${edu.years}</div>
                </div>
              `
                  )
                  .join("")}
            </div>

            <div class="section">
              <h2 class="section-title">Technical Skills</h2>
              <div class="skills-grid">
                ${cvData.technical_skills
                    .map((skill) => `<div class="skill-item">${skill}</div>`)
                    .join("")}
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Soft Skills</h2>
              <div class="skills-grid">
                ${cvData.soft_skills
                    .map((skill) => `<div class="skill-item">${skill}</div>`)
                    .join("")}
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Interests</h2>
              <div class="interests-list">
                ${cvData.interests
                    .map(
                        (interest) =>
                            `<div class="interest-item">${interest}</div>`
                    )
                    .join("")}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        printWindow.document.write(cvHTML);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!cvData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">No CV data found.</p>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6 mb-6">
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium"
                        style={{ backgroundColor: '#a282ff' }}
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            <div
                id="cv-content"
                className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            >
                <div className="p-8">
                    <div className="text-center mb-8 pb-6" style={{ borderBottom: '2px solid #a282ff' }}>
                        <h1 className="text-4xl font-bold mb-3" style={{ color: '#a282ff' }}>
                            {cvData.name}
                        </h1>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2" style={{ color: '#a282ff' }}>
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            {cvData.summary}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2" style={{ color: '#a282ff' }}>
                            Work Experience
                        </h2>
                        {cvData.work_experience.map((exp, index) => (
                            <div
                                key={index}
                                className="mb-6 p-4 rounded-r-lg"
                                style={{ borderLeft: '4px solid #a282ff', backgroundColor: '#f8fafc' }}
                            >
                                <h3 className="text-xl font-bold" style={{ color: '#a282ff' }}>
                                    {exp.job_title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">
                                    {exp.work_dates}
                                </p>
                                <ul className="text-gray-700 leading-relaxed list-none">
                                    {exp.responsibilities.map((resp, respIndex) => (
                                        <li key={respIndex} className="mb-2 pl-4 relative">
                                            <span
                                                className="absolute left-0 font-bold"
                                                style={{ color: '#a282ff' }}
                                            >
                                                •
                                            </span>
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2" style={{ color: '#a282ff' }}>
                            Education
                        </h2>
                        {cvData.education.map((edu, index) => (
                            <div
                                key={index}
                                className="mb-6 p-4 rounded-r-lg"
                                style={{ borderLeft: '4px solid #a282ff', backgroundColor: '#f8fafc' }}
                            >
                                <h3 className="text-xl font-bold" style={{ color: '#a282ff' }}>
                                    {edu.degree}
                                </h3>
                                <p className="text-lg text-gray-600 mb-1">
                                    {edu.institution}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {edu.years}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2" style={{ color: '#a282ff' }}>
                            Technical Skills
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {cvData.technical_skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 rounded-full text-center font-medium border"
                                    style={{
                                        backgroundColor: '#f3f0ff',
                                        color: '#a282ff',
                                        borderColor: '#d8c8ff'
                                    }}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2" style={{ color: '#a282ff' }}>
                            Soft Skills
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {cvData.soft_skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 rounded-full text-center font-medium border"
                                    style={{
                                        backgroundColor: '#f3f0ff',
                                        color: '#a282ff',
                                        borderColor: '#d8c8ff'
                                    }}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2" style={{ color: '#a282ff' }}>
                            Interests
                        </h2>
                        <div className="flex gap-4 flex-wrap">
                            {cvData.interests.map((interest, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 rounded-full font-medium border"
                                    style={{
                                        backgroundColor: '#f3f0ff',
                                        color: '#8b5cff',
                                        borderColor: '#d8c8ff'
                                    }}
                                >
                                    {interest}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
