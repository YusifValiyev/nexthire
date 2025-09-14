import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import html2pdf from "html2pdf.js";

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

            // Ensure all required fields exist with defaults
            return {
                name: cvObject.name || "",
                email: cvObject.email || "",
                phone: cvObject.phone || "",
                location: cvObject.location || "",
                linkedin: cvObject.linkedin || "",
                summary: cvObject.summary || "",
                work_experience: cvObject.work_experience || [],
                education: cvObject.education || [],
                technical_skills: cvObject.technical_skills || [],
                soft_skills: cvObject.soft_skills || [],
                lookingForJob: cvObject.lookingForJob || [],
                ...cvObject
            };
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

    const handleDownloadPDF = async () => {
        const content = document.getElementById("cv-content");

        // Optimize for ATS-friendly PDF
        const options = {
            filename: `${cvData.name.replace(/\s+/g, '_')}-CV.pdf`,
            image: {
                type: "jpeg",
                quality: 0.98,
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                letterRendering: true,
                allowTaint: false,
                scrollY: -window.scrollY,
                windowWidth: content.scrollWidth,
                windowHeight: content.scrollHeight,
                backgroundColor: "#ffffff",
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
                compress: true,
            },
            margin: [10, 10, 10, 10], // Top, right, bottom, left margins
        };

        html2pdf().set(options).from(content).save();
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!cvData) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#4b5563', marginBottom: '1rem' }}>No CV data found.</p>
                    <button
                        onClick={handleBack}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#4b5563',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer'
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 0' }}>
            {/* Header with responsive button layout */}
            <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            padding: '0.75rem 1.5rem',
                            width: '100%',
                            color: 'white',
                            backgroundColor: "#a282ff",
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.875rem'
                        }}
                    >
                        Back
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                color: 'white',
                                backgroundColor: isEditing ? "#666" : "#a282ff",
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.875rem'
                            }}
                        >
                            {isEditing ? "View Mode" : "Edit Mode"}
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            style={{
                                padding: '0.75rem 1.5rem',
                                color: 'white',
                                backgroundColor: "#a282ff",
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.875rem'
                            }}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* CV Content */}
            <div
                id="cv-content"
                style={{
                    maxWidth: '56rem',
                    backgroundColor: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    margin: '0 1rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontFamily: 'Arial, sans-serif, system-ui',
                    lineHeight: '1.6',
                    color: '#333333'
                }}
            >
                <div style={{ padding: '3rem 2.5rem', maxWidth: '800px', margin: '0 auto' }}>
                    <style>{`
                        @media print {
                            * {
                                -webkit-print-color-adjust: exact !important;
                                color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }

                            #cv-content {
                                box-shadow: none !important;
                                margin: 0 !important;
                                max-width: none !important;
                                padding: 2rem !important;
                            }

                            .page-break {
                                page-break-before: always;
                            }

                            h1, h2, h3, h4, h5, h6 {
                                page-break-after: avoid;
                                margin-top: 0 !important;
                            }

                            ul, ol {
                                page-break-inside: avoid;
                            }

                            section {
                                break-inside: avoid-page;
                                page-break-inside: avoid;
                            }
                        }
                    `}</style>
                    {/* Header Section */}
                    <header style={{ textAlign: 'center', marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '3px solid #a282ff' }}>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={cvData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        marginBottom: '1.5rem',
                                        textAlign: 'center',
                                        width: '100%',
                                        border: 'none',
                                        outline: 'none',
                                        backgroundColor: 'transparent',
                                        color: "#a282ff",
                                        lineHeight: '1.2'
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                                    <input
                                        type="email"
                                        value={cvData.email || ""}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="Email address"
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            color: '#374151',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <input
                                        type="tel"
                                        value={cvData.phone || ""}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        placeholder="Phone number"
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            color: '#374151',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={cvData.location || ""}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        placeholder="Location"
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            color: '#374151',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <input
                                        type="url"
                                        value={cvData.linkedin || ""}
                                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                                        placeholder="LinkedIn URL"
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            color: '#374151',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                    color: "#a282ff",
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.025em'
                                }}>
                                    {cvData.name}
                                </h1>
                                <div style={{
                                    color: '#374151',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.6rem',
                                    maxWidth: '600px',
                                    margin: '0 auto',
                                    lineHeight: '1.5'
                                }}>
                                    {cvData.email && <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cvData.email}</div>}
                                    {cvData.phone && <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cvData.phone}</div>}
                                    {cvData.location && <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cvData.location}</div>}
                                    {cvData.linkedin && (
                                        <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                            <a href={cvData.linkedin} style={{ color: '#2563eb', textDecoration: 'underline' }}>
                                                {cvData.linkedin}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </header>

                    {/* Professional Summary */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.375rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #e5e7eb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: "#a282ff"
                        }}>
                            PROFESSIONAL SUMMARY
                        </h2>
                        {isEditing ? (
                            <textarea
                                value={cvData.summary}
                                onChange={(e) => handleInputChange("summary", e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.5rem',
                                    color: '#374151',
                                    lineHeight: '1.7',
                                    resize: 'none',
                                    fontSize: '1rem'
                                }}
                                rows="5"
                            />
                        ) : (
                            <p style={{
                                color: '#374151',
                                lineHeight: '1.7',
                                textAlign: 'justify',
                                fontSize: '1rem',
                                marginTop: '0.5rem'
                            }}>
                                {cvData.summary}
                            </p>
                        )}
                    </section>

                    {/* Work Experience */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.375rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #e5e7eb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: "#a282ff"
                        }}>
                            PROFESSIONAL EXPERIENCE
                        </h2>
                        {cvData.work_experience.map((exp, index) => (
                            <div key={index} style={{
                                marginBottom: '2.5rem',
                                paddingBottom: '1.5rem',
                                borderBottom: index < cvData.work_experience.length - 1 ? '1px solid #e5e7eb' : 'none'
                            }}>
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
                                            style={{
                                                fontSize: '1.125rem',
                                                fontWeight: 'bold',
                                                width: '100%',
                                                marginBottom: '0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem',
                                                color: "#a282ff"
                                            }}
                                        />
                                        <input
                                            type="text"
                                            value={exp.company || ""}
                                            onChange={(e) =>
                                                handleObjectArrayChange(
                                                    "work_experience",
                                                    index,
                                                    "company",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Company Name"
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: '500',
                                                width: '100%',
                                                marginBottom: '0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem',
                                                color: '#374151'
                                            }}
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
                                            style={{
                                                fontSize: '0.875rem',
                                                color: '#4b5563',
                                                marginBottom: '0.75rem',
                                                width: '100%',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem'
                                            }}
                                        />
                                        <div style={{ marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>
                                                Key Achievements & Responsibilities:
                                            </span>
                                            <button
                                                onClick={() => addResponsibility(index)}
                                                style={{
                                                    fontSize: '0.75rem',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '0.375rem',
                                                    color: 'white',
                                                    width: 'fit-content',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    backgroundColor: "#a282ff"
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {exp.responsibilities.map((resp, respIndex) => (
                                            <div key={respIndex} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
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
                                                    style={{
                                                        flex: '1',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.375rem',
                                                        padding: '0.5rem',
                                                        fontSize: '0.875rem'
                                                    }}
                                                />
                                                <button
                                                    onClick={() =>
                                                        removeResponsibility(index, respIndex)
                                                    }
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        padding: '0.25rem 0.5rem',
                                                        backgroundColor: '#ef4444',
                                                        color: 'white',
                                                        borderRadius: '0.375rem',
                                                        width: 'fit-content',
                                                        border: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                <h3 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 'bold',
                                                    color: "#a282ff",
                                                    marginBottom: '0.25rem',
                                                    lineHeight: '1.3'
                                                }}>
                                                    {exp.job_title}
                                                </h3>
                                                <p style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    color: '#374151',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    {exp.company || exp.institution || ""}
                                                </p>
                                            </div>
                                            <p style={{
                                                fontSize: '0.95rem',
                                                color: '#6b7280',
                                                fontWeight: '500',
                                                fontStyle: 'italic'
                                            }}>
                                                {exp.work_dates}
                                            </p>
                                        </div>
                                        <ul style={{
                                            color: '#374151',
                                            lineHeight: '1.7',
                                            listStyle: 'none',
                                            padding: 0,
                                            marginTop: '1rem'
                                        }}>
                                            {exp.responsibilities.map((resp, respIndex) => (
                                                <li key={respIndex} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',

                                                    marginBottom: '0.75rem'
                                                }}>
                                                    <span style={{
                                                        fontSize: '1rem',
                                                        marginRight: '0.75rem',
                                                        marginTop: '0.125rem',
                                                        flexShrink: 0,
                                                        color: "#a282ff",
                                                        fontWeight: 'bold'
                                                    }}>
                                                        •
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.95rem',
                                                        lineHeight: '1.6'
                                                    }}>{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        ))}
                    </section>

                    {/* Education */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.375rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #e5e7eb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: "#a282ff"
                        }}>
                            EDUCATION
                        </h2>
                        {cvData.education.map((edu, index) => (
                            <div key={index} style={{
                                marginBottom: '2rem',
                                paddingBottom: '1.5rem',
                                borderBottom: index < cvData.education.length - 1 ? '1px solid #e5e7eb' : 'none'
                            }}>
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
                                            style={{
                                                fontSize: '1.125rem',
                                                fontWeight: 'bold',
                                                width: '100%',
                                                marginBottom: '0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem',
                                                color: "#a282ff"
                                            }}
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
                                            style={{
                                                fontSize: '1rem',
                                                color: '#374151',
                                                marginBottom: '0.5rem',
                                                width: '100%',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem'
                                            }}
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
                                            style={{
                                                fontSize: '0.875rem',
                                                color: '#4b5563',
                                                width: '100%',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem'
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                <h3 style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 'bold',
                                                    color: "#a282ff",
                                                    marginBottom: '0.25rem',
                                                    lineHeight: '1.3'
                                                }}>
                                                    {edu.degree}
                                                </h3>
                                                <p style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    color: '#374151',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    {edu.institution}
                                                </p>
                                            </div>
                                            <p style={{
                                                fontSize: '0.95rem',
                                                color: '#6b7280',
                                                fontWeight: '500',
                                                fontStyle: 'italic'
                                            }}>
                                                {edu.years}
                                            </p>
                                        </div>
                                        {edu.gpa && (
                                            <p style={{
                                                fontSize: '0.95rem',
                                                color: '#4b5563',
                                                marginTop: '0.75rem',
                                                fontWeight: '500'
                                            }}>
                                                GPA: {edu.gpa}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </section>

                    {/* Technical Skills */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.375rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #e5e7eb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            color: "#a282ff"
                        }}>
                            TECHNICAL SKILLS
                            {isEditing && (
                                <button
                                    onClick={() => addSkill("technical_skills")}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        width: 'fit-content',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: "#a282ff"
                                    }}
                                >
                                    Add Skill
                                </button>
                            )}
                        </h2>
                        {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {cvData.technical_skills.map((skill, index) => (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '0.75rem', padding: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
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
                                            style={{
                                                flex: '1',
                                                padding: '0.5rem 0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                color: "#a282ff"
                                            }}
                                        />
                                        <button
                                            onClick={() => removeSkill("technical_skills", index)}
                                            style={{
                                                fontSize: '0.75rem',
                                                padding: '0.5rem 0.75rem',
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                borderRadius: '0.5rem',
                                                width: 'fit-content',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                color: '#374151',
                                fontSize: '1rem',
                                lineHeight: '1.8',
                                paddingTop: '0.5rem',
                            }}>
                                {cvData.technical_skills.join("   •    ")}
                            </div>
                        )}
                    </section>

                    {/* Core Competencies */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.375rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid #e5e7eb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            color: "#a282ff"
                        }}>
                            CORE COMPETENCIES
                            {isEditing && (
                                <button
                                    onClick={() => addSkill("soft_skills")}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        width: 'fit-content',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: "#a282ff"
                                    }}
                                >
                                    Add Competency
                                </button>
                            )}
                        </h2>
                        {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {cvData.soft_skills.map((skill, index) => (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '0.75rem', padding: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
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
                                            style={{
                                                flex: '1',
                                                padding: '0.5rem 0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                color: "#a282ff"
                                            }}
                                        />
                                        <button
                                            onClick={() => removeSkill("soft_skills", index)}
                                            style={{
                                                fontSize: '0.75rem',
                                                padding: '0.5rem 0.75rem',
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                borderRadius: '0.5rem',
                                                width: 'fit-content',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                color: '#374151',
                                fontSize: '1rem',
                                lineHeight: '1.8',
                                paddingTop: '0.5rem'
                            }}>
                                {cvData.soft_skills.join("  •  ")}
                            </div>
                        )}
                    </section>

                    {/* Additional Sections - only show if data exists */}
                    {cvData.certifications && cvData.certifications.length > 0 && (
                        <section style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.375rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '2px solid #e5e7eb',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: "#a282ff"
                            }}>
                                CERTIFICATIONS
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.5rem' }}>
                                {cvData.certifications.map((cert, index) => (
                                    <div key={index} style={{
                                        color: '#374151',
                                        lineHeight: '1.6',
                                        fontSize: '1rem'
                                    }}>
                                        <span style={{ fontWeight: '600' }}>{cert.name}</span>
                                        {cert.issuer && <span style={{ color: '#4b5563', fontWeight: '500' }}> - {cert.issuer}</span>}
                                        {cert.date && <span style={{ color: '#6b7280', fontStyle: 'italic' }}> ({cert.date})</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {cvData.languages && cvData.languages.length > 0 && (
                        <section style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.375rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '2px solid #e5e7eb',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: "#a282ff"
                            }}>
                                LANGUAGES
                            </h2>
                            <div style={{
                                color: '#374151',
                                fontSize: '1rem',
                                lineHeight: '1.8',
                                paddingTop: '0.5rem',
                                marginRight: '2rem'
                            }}>
                                {cvData.languages.map(lang => `${lang.language} (${lang.proficiency})`).join("  •  ")}
                            </div>
                        </section>
                    )}

                    {/* Career Interests */}
                    {cvData.lookingForJob && cvData.lookingForJob.length > 0 && (
                        <section style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.375rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '2px solid #e5e7eb',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '2rem',
                                color: "#a282ff"
                            }}>
                                CAREER INTERESTS
                                {isEditing && (
                                    <button
                                        onClick={() => addSkill("lookingForJob")}
                                        style={{
                                            fontSize: '0.75rem',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            width: 'fit-content',
                                            border: 'none',
                                            cursor: 'pointer',
                                            backgroundColor: "#a282ff"
                                        }}
                                    >
                                        Add Interest
                                    </button>
                                )}
                            </h2>
                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cvData.lookingForJob.map((interest, index) => (
                                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '1rem', padding: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
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
                                                style={{
                                                    flex: '1',
                                                    padding: '0.5rem 0.75rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.5rem',
                                                    fontSize: '1rem',
                                                    color: "#a282ff"
                                                }}
                                            />
                                            <button
                                                onClick={() => removeSkill("lookingForJob", index)}
                                                style={{
                                                    fontSize: '0.75rem',
                                                    padding: '0.5rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    borderRadius: '0.5rem',
                                                    width: 'fit-content',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    color: '#374151',
                                    fontSize: '1rem',
                                    lineHeight: '1.8',
                                    paddingTop: '0.5rem',
                                    marginRight: '2rem'
                                }}>
                                    {cvData.lookingForJob.join("  •  ")}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
