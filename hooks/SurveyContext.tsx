import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Survey {
  id: string;
  siteName: string;
  clientName: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  photoUri?: string;
  location?: { latitude: number; longitude: number };
  contact?: { name: string; phoneNumbers?: { number: string }[] };
  notes?: string;
  createdAt: number;
}

interface SurveyContextType {
  surveys: Survey[];
  draftSurvey: Partial<Survey>;
  saveSurvey: (survey: Omit<Survey, 'id' | 'createdAt'>) => Promise<void>;
  deleteSurvey: (id: string) => Promise<void>;
  updateDraft: (updates: Partial<Survey>) => void;
  clearDraft: () => void;
  loading: boolean;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

const STORAGE_KEY = '@surveys_v1';

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [draftSurvey, setDraftSurvey] = useState<Partial<Survey>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setSurveys(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load surveys', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSurvey = async (surveyData: Omit<Survey, 'id' | 'createdAt'>) => {
    try {
      const newSurvey: Survey = {
        ...surveyData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      
      const updatedSurveys = [newSurvey, ...surveys];
      setSurveys(updatedSurveys);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSurveys));
      clearDraft();
    } catch (error) {
      console.error('Failed to save survey', error);
      throw error;
    }
  };

  const deleteSurvey = async (id: string) => {
    try {
      const updatedSurveys = surveys.filter(s => s.id !== id);
      setSurveys(updatedSurveys);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSurveys));
    } catch (error) {
      console.error('Failed to delete survey', error);
      throw error;
    }
  };

  const updateDraft = (updates: Partial<Survey>) => {
    setDraftSurvey(prev => ({ ...prev, ...updates }));
  };

  const clearDraft = () => {
    setDraftSurvey({});
  };

  return (
    <SurveyContext.Provider value={{
      surveys,
      draftSurvey,
      saveSurvey,
      deleteSurvey,
      updateDraft,
      clearDraft,
      loading
    }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
