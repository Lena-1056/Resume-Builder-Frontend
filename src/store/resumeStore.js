import { create } from 'zustand';

const initialResumeData = {
  title: 'Untitled Resume',
  profileInfo: {
    fullName: '',
    designation: '',
    summary: '',
  },
  contactInfo: {
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  template: { theme: 'modern', colorPalette: ['#4F46E5'] }
};

export const useResumeStore = create((set) => ({
  resumeData: initialResumeData,
  isDraftSaved: true,
  lastSavedAt: null,

  setResumeData: (data) => set({ resumeData: data, isDraftSaved: false }),
  updateProfileInfo: (key, value) => 
    set((state) => ({ 
      resumeData: { 
        ...state.resumeData, 
        profileInfo: { ...state.resumeData.profileInfo, [key]: value } 
      },
      isDraftSaved: false
    })),

  updateContactInfo: (key, value) => 
    set((state) => ({ 
      resumeData: { 
        ...state.resumeData, 
        contactInfo: { ...state.resumeData.contactInfo, [key]: value } 
      },
      isDraftSaved: false
    })),

  addCollectionItem: (collectionName, initialItem) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [collectionName]: [...(state.resumeData[collectionName] || []), initialItem]
      },
      isDraftSaved: false
    })),

  updateCollectionItem: (collectionName, index, key, value) =>
    set((state) => {
      const updatedCollection = [...(state.resumeData[collectionName] || [])];
      
      if (collectionName === 'interests') {
        updatedCollection[index] = typeof value === 'string' ? value : value.target?.value;
      } else {
        updatedCollection[index] = { ...updatedCollection[index], [key]: value };
      }
      
      return {
        resumeData: {
          ...state.resumeData,
          [collectionName]: updatedCollection
        },
        isDraftSaved: false
      };
    }),

  removeCollectionItem: (collectionName, index) =>
    set((state) => {
      const updatedCollection = [...(state.resumeData[collectionName] || [])];
      updatedCollection.splice(index, 1);
      return {
        resumeData: {
          ...state.resumeData,
          [collectionName]: updatedCollection
        },
        isDraftSaved: false
      };
    }),
  
  updateThemeColor: (colorHex) => 
    set((state) => ({ 
      resumeData: { 
        ...state.resumeData, 
        template: { ...state.resumeData.template, colorPalette: [colorHex] } 
      },
      isDraftSaved: false
    })),

  // Storage operations
  setDraftSaved: (status) => set({ isDraftSaved: status, lastSavedAt: new Date() }),
  resetForm: () => set({ resumeData: initialResumeData, isDraftSaved: true }),
}));
