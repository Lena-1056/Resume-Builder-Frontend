import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, LogOut, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resumes');
      setResumes(response.data);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/resumes/${id}`);
        toast.success('Resume deleted successfully');
        setResumes(resumes.filter(r => r.id !== id));
      } catch (e) {
        console.error(e);
        toast.error('Failed to delete resume');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-gray-600">
              Welcome, {user?.name || 'User'}
            </span>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Resumes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card */}
          <div 
            onClick={() => navigate('/builder')}
            className="group flex flex-col items-center justify-center h-72 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:border-primary/50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <span className="font-semibold text-gray-600 group-hover:text-primary transition-colors">Create New Resume</span>
          </div>

          {/* Resume List */}
          {loading ? (
            <div className="flex items-center justify-center h-72 col-span-full">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            resumes.map((resume) => (
              <div key={resume.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col h-72">
                {/* Thumbnail placeholder */}
                <div className="flex-1 bg-gray-100 relative overflow-hidden group-hover:bg-indigo-50 transition-colors">
                  {resume.thumbnailLink ? (
                    <img src={resume.thumbnailLink} alt={resume.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <FileText className="w-16 h-16 text-gray-300 group-hover:text-primary/20 transition-colors" />
                    </div>
                  )}
                </div>
                
                {/* Info & Actions */}
                <div className="p-5 bg-white border-t border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{resume.title || 'Untitled Resume'}</h3>
                  <p className="text-xs text-gray-500 mb-4">Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                  
                  <div className="flex items-center justify-between gap-2">
                    <button 
                      onClick={() => navigate(`/builder/${resume.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 hover:bg-primary hover:text-white text-primary text-sm font-medium py-2 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button 
                       className="p-2 text-gray-400 hover:text-primary bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors tooltip"
                    >
                       <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(resume.id)}
                      className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors tooltip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
