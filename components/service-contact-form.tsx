"use client";

import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { CheckCircle, LucideProps } from "lucide-react";

// Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ServiceContactFormProps {
  /** Name of the service being requested (e.g., "Home Gym", "Installation") */
  service: string;
  /** Optional callback when form is successfully submitted */
  onSuccess?: (data: ContactFormData) => void | Promise<void>;
  /** Optional custom API endpoint for form submission */
  endpoint?: string;
  /** Additional CSS classes for the form container */
  className?: string;
}

export default function ServiceContactForm({ 
  service, 
  onSuccess, 
  endpoint,
  className = "" 
}: ServiceContactFormProps): JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ 
      ...prev, 
      [name]: value 
    }));
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError("Le prénom est requis");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Le nom est requis");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Veuillez entrer un email valide");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Le message est requis");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call (replace with actual fetch when ready)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Optional: Send to actual endpoint
      // if (endpoint) {
      //   const response = await fetch(endpoint, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ ...formData, service }),
      //   });
      //   if (!response.ok) throw new Error("Submission failed");
      // }

      // Call success callback with form data
      onSuccess?.(formData);

      // Reset form and show success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitted(true);
      
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return (
      <div className={`text-center py-8 ${className}`} role="status" aria-live="polite">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          Demande envoyée avec succès!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Merci pour votre intérêt pour notre service de <span className="font-semibold text-yellow-600 dark:text-yellow-400">{service}</span>. 
          Notre équipe vous contactera dans les plus brefs délais.
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          type="button"
        >
          Envoyer une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-4 ${className}`}
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="firstName" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Prénom <span className="text-red-500" aria-label="requis">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            placeholder="Votre prénom"
            aria-required="true"
          />
        </div>
        <div>
          <label 
            htmlFor="lastName" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nom <span className="text-red-500" aria-label="requis">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            placeholder="Votre nom"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email <span className="text-red-500" aria-label="requis">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          placeholder="votre@email.com"
          aria-required="true"
        />
      </div>

      <div>
        <label 
          htmlFor="phone" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          pattern="[0-9\s\-\+\(\)]*"
          className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          placeholder="+212 6XX XXX XXX"
        />
      </div>

      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Message <span className="text-red-500" aria-label="requis">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-y"
          placeholder={`Décrivez votre projet de ${service.toLowerCase()}...`}
          aria-required="true"
        />
      </div>

      {error && (
        <p 
          className="text-red-500 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-black font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
        }`}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          "Envoyer ma demande"
        )}
      </button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="/confidentialite" className="text-yellow-600 dark:text-yellow-400 hover:underline">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}