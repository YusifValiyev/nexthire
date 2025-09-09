import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function CVPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [cvData, setCvData] = useState(() => parseCV(location.state.cvData));

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

    const handleInputChange = (field, value) => {
        setCvData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleArrayChange = (arrayName, index, value) => {
        setCvData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? value : item
            ),
        }));
    };

    const handleObjectArrayChange = (arrayName, index, field, value) => {
        setCvData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleResponsibilityChange = (expIndex, respIndex, value) => {
        setCvData((prev) => ({
            ...prev,
            work_experience: prev.work_experience.map((exp, i) =>
                i === expIndex
                    ? {
                          ...exp,
                          responsibilities: exp.responsibilities.map(
                              (resp, j) => (j === respIndex ? value : resp)
                          ),
                      }
                    : exp
            ),
        }));
    };

    const addResponsibility = (expIndex) => {
        setCvData((prev) => ({
            ...prev,
            work_experience: prev.work_experience.map((exp, i) =>
                i === expIndex
                    ? {
                          ...exp,
                          responsibilities: [
                              ...exp.responsibilities,
                              "New responsibility",
                          ],
                      }
                    : exp
            ),
        }));
    };

    const removeResponsibility = (expIndex, respIndex) => {
        setCvData((prev) => ({
            ...prev,
            work_experience: prev.work_experience.map((exp, i) =>
                i === expIndex
                    ? {
                          ...exp,
                          responsibilities: exp.responsibilities.filter(
                              (_, j) => j !== respIndex
                          ),
                      }
                    : exp
            ),
        }));
    };

    const addSkill = (skillType) => {
        setCvData((prev) => ({
            ...prev,
            [skillType]: [...prev[skillType], "New skill"],
        }));
    };

    const removeSkill = (skillType, index) => {
        setCvData((prev) => ({
            ...prev,
            [skillType]: prev[skillType].filter((_, i) => i !== index),
        }));
    };

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
              padding: 40px 20px;
              background: white;
            }

            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #a282ff;
              padding-bottom: 20px;
            }

            .name {
              font-size: 28px;
              font-weight: bold;
              color: #a282ff;
              margin-bottom: 10px;
            }

            .section {
              margin-bottom: 25px;
            }

            .section-title {
              font-size: 18px;
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
              font-size: 16px;
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
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-top: 10px;
            }

            .skill-item {
              background: #f3f0ff;
              color: #a282ff;
              padding: 6px 12px;
              border-radius: 20px;
              text-align: center;
              font-size: 13px;
              border: 1px solid #d8c8ff;
              flex: 0 0 auto;
            }

            .interests-list {
              display: flex;
              gap: 8px;
              flex-wrap: wrap;
            }

            .interest-item {
              background: #f3f0ff;
              color: #8b5cff;
              padding: 6px 12px;
              border-radius: 15px;
              font-size: 13px;
              border: 1px solid #d8c8ff;
            }

            @media print {
              .cv-container {
                padding: 20px;
                box-shadow: none;
              }

              .name {
                font-size: 24px;
              }

              .section-title {
                font-size: 16px;
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
                ${cvData.lookingForJob
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            {/* Header with responsive button layout */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-4 sm:mb-6">
                <div className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <button
                        onClick={handleBack}
                        className="px-4 sm:px-6 w-full sm:w-fit! py-2 sm:py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm sm:text-base"
                        style={{ backgroundColor: "#a282ff" }}
                    >
                        Back
                    </button>
                    <div className="flex flex-col justify-end sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm sm:text-base"
                            style={{
                                backgroundColor: isEditing ? "#666" : "#a282ff",
                            }}
                        >
                            {isEditing ? "View Mode" : "Edit Mode"}
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm sm:text-base"
                            style={{ backgroundColor: "#a282ff" }}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* CV Content */}
            <div
                id="cv-content"
                className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mx-4 sm:mx-auto"
            >
                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div
                        className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6"
                        style={{ borderBottom: "2px solid #a282ff" }}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={cvData.name}
                                onChange={(e) =>
                                    handleInputChange("name", e.target.value)
                                }
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-center w-full border-none outline-none bg-transparent"
                                style={{ color: "#a282ff" }}
                            />
                        ) : (
                            <h1
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
                                style={{ color: "#a282ff" }}
                            >
                                {cvData.name}
                            </h1>
                        )}
                    </div>

                    {/* Professional Summary */}
                    <div className="mb-6 sm:mb-8">
                        <h2
                            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-b border-gray-200 pb-2"
                            style={{ color: "#a282ff" }}
                        >
                            Professional Summary
                        </h2>
                        {isEditing ? (
                            <textarea
                                value={cvData.summary}
                                onChange={(e) =>
                                    handleInputChange("summary", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded text-gray-700 leading-relaxed resize-none text-sm sm:text-base"
                                rows="4"
                            />
                        ) : (
                            <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                                {cvData.summary}
                            </p>
                        )}
                    </div>

                    {/* Work Experience */}
                    <div className="mb-6 sm:mb-8">
                        <h2
                            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-b border-gray-200 pb-2"
                            style={{ color: "#a282ff" }}
                        >
                            Work Experience
                        </h2>
                        {cvData.work_experience.map((exp, index) => (
                            <div
                                key={index}
                                className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-r-lg"
                                style={{
                                    borderLeft: "4px solid #a282ff",
                                    backgroundColor: "#f8fafc",
                                }}
                            >
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={exp.job_title}
                                            onChange={(e) =>
                                                handleObjectArrayChange(
                                                    "work_experience",
                                                    index,
                                                    "job_title",
                                                    e.target.value
                                                )
                                            }
                                            className="text-lg sm:text-xl font-bold w-full mb-2 border border-gray-300 rounded px-2 py-1"
                                            style={{ color: "#a282ff" }}
                                        />
                                        <input
                                            type="text"
                                            value={exp.work_dates}
                                            onChange={(e) =>
                                                handleObjectArrayChange(
                                                    "work_experience",
                                                    index,
                                                    "work_dates",
                                                    e.target.value
                                                )
                                            }
                                            className="text-xs sm:text-sm text-gray-500 mb-3 w-full border border-gray-300 rounded px-2 py-1"
                                        />
                                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="text-sm font-medium text-gray-600">
                                                Responsibilities:
                                            </span>
                                            <button
                                                onClick={() =>
                                                    addResponsibility(index)
                                                }
                                                className="text-xs px-2 py-1 rounded text-white w-fit"
                                                style={{
                                                    backgroundColor: "#a282ff",
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {exp.responsibilities.map(
                                            (resp, respIndex) => (
                                                <div
                                                    key={respIndex}
                                                    className="flex flex-col sm:flex-row gap-2 mb-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={resp}
                                                        onChange={(e) =>
                                                            handleResponsibilityChange(
                                                                index,
                                                                respIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            removeResponsibility(
                                                                index,
                                                                respIndex
                                                            )
                                                        }
                                                        className="text-xs px-2 py-1 bg-red-500 text-white rounded w-fit"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h3
                                            className="text-lg sm:text-xl font-bold"
                                            style={{ color: "#a282ff" }}
                                        >
                                            {exp.job_title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-3">
                                            {exp.work_dates}
                                        </p>
                                        <ul className="text-gray-700 leading-relaxed list-none text-sm sm:text-base">
                                            {exp.responsibilities.map(
                                                (resp, respIndex) => (
                                                    <li
                                                        key={respIndex}
                                                        className="mb-2 pl-4 relative"
                                                    >
                                                        <span
                                                            className="absolute left-0 font-bold"
                                                            style={{
                                                                color: "#a282ff",
                                                            }}
                                                        >
                                                            •
                                                        </span>
                                                        {resp}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="mb-6 sm:mb-8">
                        <h2
                            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-b border-gray-200 pb-2"
                            style={{ color: "#a282ff" }}
                        >
                            Education
                        </h2>
                        {cvData.education.map((edu, index) => (
                            <div
                                key={index}
                                className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-r-lg"
                                style={{
                                    borderLeft: "4px solid #a282ff",
                                    backgroundColor: "#f8fafc",
                                }}
                            >
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) =>
                                                handleObjectArrayChange(
                                                    "education",
                                                    index,
                                                    "degree",
                                                    e.target.value
                                                )
                                            }
                                            className="text-lg sm:text-xl font-bold w-full mb-2 border border-gray-300 rounded px-2 py-1"
                                            style={{ color: "#a282ff" }}
                                        />
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) =>
                                                handleObjectArrayChange(
                                                    "education",
                                                    index,
                                                    "institution",
                                                    e.target.value
                                                )
                                            }
                                            className="text-base sm:text-lg text-gray-600 mb-2 w-full border border-gray-300 rounded px-2 py-1"
                                        />
                                        <input
                                            type="text"
                                            value={edu.years}
                                            onChange={(e) =>
                                                handleObjectArrayChange(
                                                    "education",
                                                    index,
                                                    "years",
                                                    e.target.value
                                                )
                                            }
                                            className="text-xs sm:text-sm text-gray-500 w-full border border-gray-300 rounded px-2 py-1"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h3
                                            className="text-lg sm:text-xl font-bold"
                                            style={{ color: "#a282ff" }}
                                        >
                                            {edu.degree}
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-600 mb-1">
                                            {edu.institution}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {edu.years}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Technical Skills */}
                    <div className="mb-6 sm:mb-8">
                        <h2
                            className="text-xl sm:text-2xl flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-bold mb-3 sm:mb-4 border-b border-gray-200 pb-2"
                            style={{ color: "#a282ff" }}
                        >
                            Technical Skills
                            {isEditing && (
                                <button
                                    onClick={() => addSkill("technical_skills")}
                                    className="text-xs sm:text-sm px-3 py-1 rounded text-white w-fit"
                                    style={{ backgroundColor: "#a282ff" }}
                                >
                                    Add Skill
                                </button>
                            )}
                        </h2>
                        {isEditing ? (
                            <div className="space-y-3">
                                {cvData.technical_skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 border border-gray-300 rounded"
                                    >
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "technical_skills",
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                                            style={{ color: "#a282ff" }}
                                        />
                                        <button
                                            onClick={() =>
                                                removeSkill(
                                                    "technical_skills",
                                                    index
                                                )
                                            }
                                            className="text-xs sm:text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {cvData.technical_skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="px-3 sm:px-4 py-2 rounded-full text-center font-medium border text-xs sm:text-sm"
                                        style={{
                                            backgroundColor: "#f3f0ff",
                                            color: "#a282ff",
                                            borderColor: "#d8c8ff",
                                        }}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Soft Skills */}
                    <div className="mb-6 sm:mb-8">
                        <h2
                            className="text-xl sm:text-2xl flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-bold mb-3 sm:mb-4 border-b border-gray-200 pb-2"
                            style={{ color: "#a282ff" }}
                        >
                            Soft Skills
                            {isEditing && (
                                <button
                                    onClick={() => addSkill("soft_skills")}
                                    className="text-xs sm:text-sm px-3 py-1 rounded text-white w-fit"
                                    style={{ backgroundColor: "#a282ff" }}
                                >
                                    Add Skill
                                </button>
                            )}
                        </h2>
                        {isEditing ? (
                            <div className="space-y-3">
                                {cvData.soft_skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 border border-gray-300 rounded"
                                    >
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "soft_skills",
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                                            style={{ color: "#a282ff" }}
                                        />
                                        <button
                                            onClick={() =>
                                                removeSkill(
                                                    "soft_skills",
                                                    index
                                                )
                                            }
                                            className="text-xs sm:text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {cvData.soft_skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="px-3 sm:px-4 py-2 rounded-full text-center font-medium border text-xs sm:text-sm"
                                        style={{
                                            backgroundColor: "#f3f0ff",
                                            color: "#a282ff",
                                            borderColor: "#d8c8ff",
                                        }}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Looking For Job */}
                    <div className="mb-6 sm:mb-8">
                        <h2
                            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-b flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-gray-200 pb-2"
                            style={{ color: "#a282ff" }}
                        >
                            Looking For Job
                            {isEditing && (
                                <button
                                    onClick={() => addSkill("lookingForJob")}
                                    className="text-xs sm:text-sm px-3 py-1 rounded text-white w-fit"
                                    style={{ backgroundColor: "#a282ff" }}
                                >
                                    Add looking for job
                                </button>
                            )}
                        </h2>
                        {isEditing ? (
                            <div className="space-y-3">
                                {cvData.lookingForJob.map((interest, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 border border-gray-300 rounded"
                                    >
                                        <input
                                            type="text"
                                            value={interest}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "lookingForJob",
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                                            style={{ color: "#8b5cff" }}
                                        />
                                        <button
                                            onClick={() =>
                                                removeSkill(
                                                    "lookingForJob",
                                                    index
                                                )
                                            }
                                            className="text-xs sm:text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex gap-2 sm:gap-4 flex-wrap">
                                {cvData.lookingForJob.map((interest, index) => (
                                    <div
                                        key={index}
                                        className="px-3 sm:px-4 py-2 rounded-full font-medium border text-xs sm:text-sm"
                                        style={{
                                            backgroundColor: "#f3f0ff",
                                            color: "#8b5cff",
                                            borderColor: "#d8c8ff",
                                        }}
                                    >
                                        {interest}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
