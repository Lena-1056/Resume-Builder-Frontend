import { useState, useEffect } from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(false);
  
  // Example token usage: /verify-email?token=abcdef
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleTokenVerification(token);
    }
  }, [token]);

  const handleTokenVerification = async (verifyToken) => {
    setVerifyingToken(true);
    try {
      await api.get(`/auth/verify-email?token=${verifyToken}`);
      toast.success('Email successfully verified! You can now log in.');
      navigate('/'); // Or redirect directly to login if possible
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed. The link might be expired.');
    } finally {
      setVerifyingToken(false);
    }
  }

  const handleResend = async () => {
    // We would need the user's email, which should ideally be stored in location state
    // during navigation, or we could ask for it.
    // For simplicity, let's assume we prompt if we don't have it.
    const emailStr = window.prompt("Enter your email address to resend verification link:");
    if (!emailStr) return;

    setLoading(true);
    try {
      await api.post('/auth/resend-verification', { email: emailStr });
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="glass max-w-md w-full p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-400"></div>
        
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Mail className="w-10 h-10 text-primary" />
        </div>
        
        {verifyingToken ? (
           <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying Email...</h2>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
           </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your inbox</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We've sent a verification link to your email address. Please click the link to activate your account.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={handleResend}
                disabled={loading}
                className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
              >
                {loading ? 'Sending...' : 'Resend Verification Email'} <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
