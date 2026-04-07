import React, { useState } from 'react';
import { X, Send, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const EmailResumeModal = ({ isOpen, onClose, generatePdfBlob }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientEmail: '',
    subject: 'My Resume Application',
    message: 'Hello,\n\nPlease find my resume attached for your review.\n\nBest regards,'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Trigger the PDF generation logic from parent (returns a Blob)
      const pdfBlob = await generatePdfBlob();
      if (!pdfBlob) throw new Error("Failed to generate PDF document");

      // 2. Prepare FormData payload matching the backend structure
      const payload = new FormData();
      payload.append('recipientEmail', formData.recipientEmail);
      payload.append('subject', formData.subject);
      payload.append('message', formData.message);
      
      // We append the blob but provide a filename 'Resume.pdf'
      payload.append('pdfFile', pdfBlob, 'Resume.pdf');

      // 3. Dispatch to API
      // Note: We need 'multipart/form-data' content type. Axios handles FormData naturally.
      await api.post('/email/send-resume', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Resume sent successfully!');
      onClose();
    } catch (error) {
       console.error("Email error:", error);
       toast.error(error.response?.data?.message || 'Failed to send email. Ensure backend is running and valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" /> Send Resume
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
           
           {/* Attachment indicator */}
           <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-medium text-indigo-800">
             <Paperclip className="w-4 h-4" />
             Your current resume will be attached as "Resume.pdf"
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email Address <span className="text-red-500">*</span></label>
             <input 
               type="email" 
               required
               value={formData.recipientEmail}
               onChange={e => setFormData({ ...formData, recipientEmail: e.target.value })}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
               placeholder="recruiter@company.com"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               required
               value={formData.subject}
               onChange={e => setFormData({ ...formData, subject: e.target.value })}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Message Body <span className="text-red-500">*</span></label>
             <textarea 
               required
               rows={5}
               value={formData.message}
               onChange={e => setFormData({ ...formData, message: e.target.value })}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
             />
           </div>

           <div className="pt-2 flex justify-end gap-3">
             <button 
               type="button" 
               onClick={onClose}
               disabled={loading}
               className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
             >
               Cancel
             </button>
             <button 
               type="submit" 
               disabled={loading}
               className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg flex items-center gap-2 shadow-lg shadow-primary/30 transition-all disabled:opacity-70 disabled:shadow-none"
             >
               {loading ? (
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
               ) : (
                 <Send className="w-4 h-4" /> 
               )}
               {loading ? 'Sending...' : 'Send Email'}
             </button>
           </div>
        </form>

      </div>
    </div>
  );
};

export default EmailResumeModal;
