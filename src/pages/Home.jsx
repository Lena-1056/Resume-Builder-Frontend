import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import useAuthStore from '../store/authStore';

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-300/20 blur-3xl rounded-full"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/30">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            AI ResumeBuilder
          </span>
        </div>
        <button
          onClick={handleGetStarted}
          className="px-6 py-2.5 bg-white text-primary font-semibold rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
        >
          {isAuthenticated ? 'Dashboard' : 'Get Started'}
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>The Ultimate ATS-Friendly Resume Generator</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
          Build ATS-Friendly Resumes with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">AI</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
          Create professional, modern, and ATS-optimized resumes in minutes. Stand out to recruiters and land your dream job with our smart builder.
        </p>

        <button
          onClick={handleGetStarted}
          className="group relative px-8 py-4 bg-primary text-white text-lg font-bold rounded-full overflow-hidden shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center justify-center gap-2">
            Build Your Resume Now <FileText className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        {/* Features minimal */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-left max-w-4xl w-full">
            {[
              { title: "ATS Optimized", desc: "Formats guaranteed to pass Applicant Tracking Systems." },
              { title: "AI Powered", desc: "Generate smart bullet points that highlight your impact." },
              { title: "Premium Templates", desc: "Stand out with beautifully designed industry templates." }
            ].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <CheckCircle className="text-primary w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
        </div>
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Home;
