import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, RefreshCw, Download, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useResumeStore } from '../store/resumeStore';

// Components
import { 
  ProfileForm, ExperienceForm, SkillsForm, ProjectsForm, 
  EducationForm, CertificationsForm, InterestsForm, ColorPicker 
} from '../components/ResumeFormSections';
import A4Preview from '../components/A4Preview';
import EmailResumeModal from '../components/EmailResumeModal';

const STEPS = [
  { id: 'profile', title: 'Profile' },
  { id: 'experience', title: 'Work Experience' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'education', title: 'Education' },
  { id: 'certifications', title: 'Certifications' },
  { id: 'interests', title: 'Interests' }
];

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resumeData, setResumeData, isDraftSaved, setDraftSaved } = useResumeStore();
  
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  
  const a4Ref = useRef(null);

  // Fetch resume if editing
  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        try {
          const { data } = await api.get(`/resumes/${id}`);
          if (!data.profileInfo) data.profileInfo = {};
          setResumeData(data);
          setDraftSaved(true);
        } catch (error) {
          console.error(error);
          toast.error('Failed to load resume');
          navigate('/dashboard');
        } finally {
          setLoading(false);
        }
      };
      fetchResume();
    } else {
       setLoading(false);
    }
  }, [id, navigate, setResumeData, setDraftSaved]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id || resumeData.id) {
        const updateId = id || resumeData.id;
        await api.put(`/resumes/${updateId}`, resumeData);
        setDraftSaved(true);
        toast.success('Resume updated');
      } else {
        const { data } = await api.post('/resumes', { ...resumeData, title: resumeData.title || 'Untitled Resume' });
        setResumeData(data);
        setDraftSaved(true);
        toast.success('Resume created');
        navigate(`/builder/${data.id}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error saving resume');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  // PDF Generation Logic utilizing html2pdf.js
  const generatePdfOptions = () => ({
    margin: 0,
    filename: `${resumeData.title || 'Resume'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });

  const downloadPdf = async () => {
    if (!a4Ref.current) return;
    toast.loading('Generating PDF...', { id: 'pdf-toast' });
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default ? html2pdfModule.default : html2pdfModule;
      await html2pdf().set(generatePdfOptions()).from(a4Ref.current).save();
      toast.success('Downloaded successfully!', { id: 'pdf-toast' });
    } catch (e) {
      toast.error('Failed to download PDF', { id: 'pdf-toast' });
      console.error(e);
    }
  };

  const generatePdfBlob = async () => {
    if (!a4Ref.current) return null;
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default ? html2pdfModule.default : html2pdfModule;
      const pdfBlob = await html2pdf().set(generatePdfOptions()).from(a4Ref.current).outputPdf('blob');
      return pdfBlob;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render the active wizard step form
  const ActiveFormComponent = 
    currentStep === 0 ? ProfileForm :
    currentStep === 1 ? ExperienceForm :
    currentStep === 2 ? SkillsForm :
    currentStep === 3 ? ProjectsForm :
    currentStep === 4 ? EducationForm :
    currentStep === 5 ? CertificationsForm :
    InterestsForm;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex-none flex items-center justify-between px-6 shadow-sm z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={resumeData.title || ''}
            onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
            className="text-lg font-semibold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-primary focus:outline-none transition-colors px-1 py-0.5 w-64"
            placeholder="Document Title"
          />
          {!isDraftSaved && <span className="text-xs text-amber-500 font-medium px-2 py-1 bg-amber-50 rounded-full">Unsaved changes</span>}
          {isDraftSaved && <span className="text-xs text-green-500 font-medium px-2 py-1 bg-green-50 rounded-full">Saved</span>}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setEmailModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-4 h-4 text-primary" /> Email
          </button>
          <button 
            onClick={downloadPdf}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" /> Export PDF
          </button>
        </div>
      </header>

      {/* Main Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: Editor Panel (Wizard) */}
        <div className="w-1/2 flex flex-col bg-white border-r border-gray-200 shadow-inner">
          <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
            
            <ColorPicker />
            
            {/* Minimal Wizard Progress Stepper */}
            <div className="mb-8 flex items-center justify-between px-2">
              <span className="text-sm font-bold text-gray-400">Step {currentStep + 1} of {STEPS.length}</span>
              <span className="text-sm font-bold text-primary">{STEPS[currentStep].title}</span>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <ActiveFormComponent />
            </div>
            
          </div>
          
          {/* Wizard Footer Controls */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center flex-none">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40"
            >
              Back
            </button>
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                disabled={saving || isDraftSaved}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-colors disabled:opacity-50"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Draft
              </button>
              
              <button 
                onClick={currentStep === STEPS.length - 1 ? downloadPdf : handleNext}
                className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-lg shadow-primary/30 transition-all"
              >
                {currentStep === STEPS.length - 1 ? 'Finish & Download' : 'Next Step'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview Panel */}
        <div className="w-1/2 bg-gray-500 overflow-y-auto p-8 flex justify-center custom-scrollbar">
           {/* We scale it slightly down on screen so it fits nicely, but html2pdf intercepts the raw DOM measurements */}
           <div className="origin-top scale-[0.8] transition-all duration-300 hover:scale-[0.85]">
             <A4Preview ref={a4Ref} />
           </div>
        </div>

      </div>

      <EmailResumeModal 
        isOpen={emailModalOpen} 
        onClose={() => setEmailModalOpen(false)}
        generatePdfBlob={generatePdfBlob}
      />
    </div>
  );
};

export default ResumeBuilder;
