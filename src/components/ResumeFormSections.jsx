import React from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

const COLORS = ['#4F46E5', '#E11D48', '#059669', '#D97706', '#2563EB', '#475569'];

export const ColorPicker = () => {
  const { resumeData, updateThemeColor } = useResumeStore();
  const currentColor = resumeData.template?.colorPalette?.[0] || '#4F46E5';

  return (
    <div className="flex gap-2 items-center mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <span className="text-sm font-medium text-gray-700 mr-2">Theme Color:</span>
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => updateThemeColor(color)}
          className={`w-8 h-8 rounded-full border-2 transition-all ${currentColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-110'}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export const ProfileForm = () => {
  const { resumeData, updateProfileInfo, updateContactInfo } = useResumeStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" value={resumeData.profileInfo?.fullName || ''} onChange={(e) => updateProfileInfo('fullName', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input type="text" value={resumeData.profileInfo?.designation || ''} onChange={(e) => updateProfileInfo('designation', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Software Engineer" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={resumeData.contactInfo?.email || ''} onChange={(e) => updateContactInfo('email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input type="text" value={resumeData.contactInfo?.phone || ''} onChange={(e) => updateContactInfo('phone', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="+1 234 567 890" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" value={resumeData.contactInfo?.location || ''} onChange={(e) => updateContactInfo('location', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="New York, NY" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input type="text" value={resumeData.contactInfo?.linkedin || ''} onChange={(e) => updateContactInfo('linkedin', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="linkedin.com/in/johndoe" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input type="text" value={resumeData.contactInfo?.github || ''} onChange={(e) => updateContactInfo('github', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="github.com/johndoe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input type="text" value={resumeData.contactInfo?.website || ''} onChange={(e) => updateContactInfo('website', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="johndoe.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea rows={4} value={resumeData.profileInfo?.summary || ''} onChange={(e) => updateProfileInfo('summary', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="A brief summary of your professional experience..." />
      </div>
    </div>
  );
};

export const ExperienceForm = () => {
  const { resumeData, addCollectionItem, updateCollectionItem, removeCollectionItem } = useResumeStore();
  const experiences = resumeData.workExperience || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <button onClick={() => addCollectionItem('workExperience', { company: '', role: '', startDate: '', endDate: '', description: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 bg-primary/10 rounded-full">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
            <button onClick={() => removeCollectionItem('workExperience', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={exp.company || ''} onChange={(e) => updateCollectionItem('workExperience', index, 'company', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Acme Inc." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                <input type="text" value={exp.role || ''} onChange={(e) => updateCollectionItem('workExperience', index, 'role', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Software Engineer" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                <input type="text" value={exp.startDate || ''} onChange={(e) => updateCollectionItem('workExperience', index, 'startDate', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Jan 2020" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                <input type="text" value={exp.endDate || ''} onChange={(e) => updateCollectionItem('workExperience', index, 'endDate', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Present" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} value={exp.description || ''} onChange={(e) => updateCollectionItem('workExperience', index, 'description', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Describe your responsibilities and achievements..." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EducationForm = () => {
  const { resumeData, addCollectionItem, updateCollectionItem, removeCollectionItem } = useResumeStore();
  const education = resumeData.education || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button onClick={() => addCollectionItem('education', { degree: '', institution: '', startDate: '', endDate: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 bg-primary/10 rounded-full">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
            <button onClick={() => removeCollectionItem('education', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Degree</label>
                <input type="text" value={edu.degree || ''} onChange={(e) => updateCollectionItem('education', index, 'degree', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="B.S. Computer Science" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Institution</label>
                <input type="text" value={edu.institution || ''} onChange={(e) => updateCollectionItem('education', index, 'institution', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="University of Tech" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                <input type="text" value={edu.startDate || ''} onChange={(e) => updateCollectionItem('education', index, 'startDate', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="2016" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                <input type="text" value={edu.endDate || ''} onChange={(e) => updateCollectionItem('education', index, 'endDate', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="2020" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsForm = () => {
  const { resumeData, addCollectionItem, updateCollectionItem, removeCollectionItem } = useResumeStore();
  const skills = resumeData.skills || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button onClick={() => addCollectionItem('skills', { name: '', progress: 100 })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 bg-primary/10 rounded-full">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="text" value={skill.name || ''} onChange={(e) => updateCollectionItem('skills', index, 'name', e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Skill (e.g. React)" />
            <button onClick={() => removeCollectionItem('skills', index)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg border border-gray-200">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectsForm = () => {
  const { resumeData, addCollectionItem, updateCollectionItem, removeCollectionItem } = useResumeStore();
  const projects = resumeData.projects || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button onClick={() => addCollectionItem('projects', { title: '', description: '', github: '', liveDemo: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 bg-primary/10 rounded-full">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((proj, index) => (
          <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
             <button onClick={() => removeCollectionItem('projects', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="mb-4 pr-8 mt-2">
               <label className="block text-xs font-medium text-gray-700 mb-1">Project Title</label>
               <input type="text" value={proj.title || ''} onChange={(e) => updateCollectionItem('projects', index, 'title', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Portfolio Website" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={2} value={proj.description || ''} onChange={(e) => updateCollectionItem('projects', index, 'description', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Built a portfolio website using React..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GitHub Link</label>
                <input type="text" value={proj.github || ''} onChange={(e) => updateCollectionItem('projects', index, 'github', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Live Demo</label>
                <input type="text" value={proj.liveDemo || ''} onChange={(e) => updateCollectionItem('projects', index, 'liveDemo', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="https://..." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CertificationsForm = () => {
  const { resumeData, addCollectionItem, updateCollectionItem, removeCollectionItem } = useResumeStore();
  const certifications = resumeData.certifications || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
        <button onClick={() => addCollectionItem('certifications', { title: '', issuer: '', year: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 bg-primary/10 rounded-full">
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
             <button onClick={() => removeCollectionItem('certifications', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="mb-4 pr-8 mt-2">
               <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
               <input type="text" value={cert.title || ''} onChange={(e) => updateCollectionItem('certifications', index, 'title', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="AWS Certified Developer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Issuer</label>
                <input type="text" value={cert.issuer || ''} onChange={(e) => updateCollectionItem('certifications', index, 'issuer', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Amazon" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                <input type="text" value={cert.year || ''} onChange={(e) => updateCollectionItem('certifications', index, 'year', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="2023" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InterestsForm = () => {
  const { resumeData, addCollectionItem, updateCollectionItem, removeCollectionItem } = useResumeStore();
  const interests = resumeData.interests || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Interests</h2>
        <button onClick={() => addCollectionItem('interests', '')} className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 bg-primary/10 rounded-full">
          <Plus className="w-4 h-4" /> Add Interest
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="text" value={interest || ''} onChange={(e) => updateCollectionItem('interests', index, null, e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Machine Learning" />
            <button onClick={() => removeCollectionItem('interests', index)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg border border-gray-200">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
