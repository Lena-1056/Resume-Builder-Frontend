import React from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Mail, Phone, MapPin, Code2, ExternalLink } from 'lucide-react';

// Using inline styles dynamically for the selected theme color 
// and CSS classes for strict A4 simulation.
const A4Preview = React.forwardRef((props, ref) => {
  const { resumeData } = useResumeStore();
  const themeColor = resumeData.template?.colorPalette?.[0] || '#4F46E5';

  return (
    <div 
      ref={ref}
      // Strict A4 dimensions for web representation and precise export
      className="bg-white shadow-lg mx-auto" 
      style={{ width: '210mm', minHeight: '297mm', padding: '15mm', paddingBottom: '15mm', boxSizing: 'border-box' }}
    >
      <style>
        {`
          .pdf-section { page-break-inside: avoid; margin-bottom: 24px; }
          .pdf-page-break { page-break-before: always; }
        `}
      </style>

      {/* Header Segment */}
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-gray-900 mb-1">
          {resumeData.profileInfo?.fullName || 'YOUR NAME'}
        </h1>
        <h2 className="text-xl font-medium tracking-wider" style={{ color: themeColor }}>
          {resumeData.profileInfo?.designation || 'PROFESSIONAL TITLE'}
        </h2>
        
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-700 font-medium">
          {resumeData.contactInfo?.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {resumeData.contactInfo.email}</span>}
          {resumeData.contactInfo?.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {resumeData.contactInfo.phone}</span>}
          {resumeData.contactInfo?.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {resumeData.contactInfo.location}</span>}
        </div>
      </div>

      {/* Summary Section */}
      {resumeData.profileInfo?.summary && (
        <div className="pdf-section">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-2" style={{ color: themeColor }}>Profile</h3>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{resumeData.profileInfo.summary}</p>
        </div>
      )}

      {/* Two Column Layout for the rest */}
      <div className="grid grid-cols-3 gap-8">
        
        {/* Left Col: Experience & Projects */}
        <div className="col-span-2">
          
          {/* Experience */}
          {resumeData.workExperience?.length > 0 && (
            <div className="pdf-section">
              <h3 className="text-lg font-bold uppercase tracking-widest border-b-[1.5px] pb-1 mb-4" style={{ color: themeColor, borderColor: '#e5e7eb' }}>
                Experience
              </h3>
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">{exp.role}</h4>
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects?.length > 0 && (
            <div className="pdf-section">
              <h3 className="text-lg font-bold uppercase tracking-widest border-b-[1.5px] pb-1 mb-4" style={{ color: themeColor, borderColor: '#e5e7eb' }}>
                Projects
              </h3>
              {resumeData.projects.map((proj, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900">{proj.title}</h4>
                    {proj.github && <a href={proj.github} className="text-xs text-gray-500 flex items-center gap-1"><Code2 className="w-3 h-3"/> Code</a>}
                    {proj.liveDemo && <a href={proj.liveDemo} style={{ color: themeColor }} className="text-xs flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Live Demo</a>}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Education, Skills, Certs, Interests */}
        <div className="col-span-1 border-l pl-6 border-gray-200">
          
          {/* Education */}
          {resumeData.education?.length > 0 && (
            <div className="pdf-section mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: themeColor }}>Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold text-sm text-gray-900 leading-tight">{edu.degree}</h4>
                  <p className="text-xs text-gray-600 mt-1">{edu.institution}</p>
                  <p className="text-xs text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills?.length > 0 && (
            <div className="pdf-section mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: themeColor }}>Skills</h3>
              <div className="flex flex-col gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-xs font-semibold text-gray-800">{skill.name}</p>
                    {/* Visual progress bar representation (optional) */}
                    <div className="w-full h-1 bg-gray-200 mt-1 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${skill.progress || 80}%`, backgroundColor: themeColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications?.length > 0 && (
            <div className="pdf-section mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: themeColor }}>Certifications</h3>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-bold text-xs text-gray-900 leading-tight">{cert.title}</h4>
                  <p className="text-xs text-gray-600">{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </div>
          )}

          {/* Interests */}
          {resumeData.interests?.length > 0 && (
            <div className="pdf-section">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: themeColor }}>Interests</h3>
              <div className="flex flex-wrap gap-1">
                {resumeData.interests.map((interest, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

A4Preview.displayName = 'A4Preview';
export default A4Preview;
