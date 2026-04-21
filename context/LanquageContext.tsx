"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Définition des langues supportées
type Language = 'fr' | 'en';

// 2. Définition de l'interface pour le contexte
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void; // Ajouté pour plus de flexibilité
}

// Création du contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('fr');

  const toggleLanguage = () => {
    setLanguageState((prevLanguage) => (prevLanguage === 'fr' ? 'en' : 'fr'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    toggleLanguage,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé avec gestion d'erreur si utilisé hors du Provider
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};