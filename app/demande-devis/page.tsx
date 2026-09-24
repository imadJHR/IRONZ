"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  getQuoteServices,
  mapServiceQueryParam,
  type CanonicalServiceId,
} from "../../lib/services";

type ServiceId = CanonicalServiceId | "autre";

type BudgetValue =
  | "8000-25000"
  | "28000-35000"
  | "35000-50000"
  | "100000-plus"
  | "a-definir";

interface QuoteFormData {
  service: ServiceId | "";
  city: string;
  spaceType: string;
  surface: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  budget: BudgetValue | "";
  desiredTiming: string;
  message: string;
  terms: boolean;
}

type FormErrors = Partial<Record<keyof QuoteFormData | "submit", string>>;

type QuoteIconName =
  | "layout"
  | "home"
  | "building"
  | "custom"
  | "kids"
  | "layers"
  | "outdoor"
  | "other"
  | "document"
  | "target"
  | "location"
  | "dimensions"
  | "equipment"
  | "wallet"
  | "image"
  | "whatsapp"
  | "user"
  | "phone"
  | "mail"
  | "calendar"
  | "message"
  | "check"
  | "arrow-right"
  | "arrow-left";

interface ServicePresentation {
  icon: QuoteIconName;
  hint: string;
  points: string[];
}

interface QuoteServiceCard {
  id: ServiceId;
  title: string;
  description: string;
  href: string | null;
  icon: QuoteIconName;
  hint: string;
  points: string[];
}

const WHATSAPP_NUMBER = "212674114446";
const PHONE_HREF = "tel:+212674114446";
const PHONE_LABEL = "+212 674-114446";
const QUOTE_EMAIL = "muscleironz2019@gmail.com";

const INITIAL_FORM: QuoteFormData = {
  service: "",
  city: "",
  spaceType: "",
  surface: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  company: "",
  budget: "",
  desiredTiming: "",
  message: "",
  terms: false,
};

const SERVICE_PRESENTATION: Record<ServiceId, ServicePresentation> = {
  "amenagement-salle": {
    icon: "layout",
    hint: "Surface, activités prévues, équipements et organisation souhaitée.",
    points: ["Organisation", "Équipements", "Revêtement"],
  },
  "home-gym": {
    icon: "home",
    hint: "Surface disponible, objectifs d'entraînement et équipements souhaités.",
    points: ["Espace privé", "Objectifs", "Matériel"],
  },
  "salle-professionnelle": {
    icon: "building",
    hint: "Surface, type d'établissement, zones prévues et équipements.",
    points: ["Établissement", "Zones", "Usage"],
  },
  "personnalisation-accessoires": {
    icon: "custom",
    hint: "Produit concerné, logo, couleurs et résultat recherché.",
    points: ["Produit", "Identité", "Finition"],
  },
  "espace-enfance": {
    icon: "kids",
    hint: "Surface, usage prévu, activités et équipements souhaités.",
    points: ["Surface", "Activités", "Équipements"],
  },
  "revetement-sol-mur": {
    icon: "layers",
    hint: "Type d'espace, surface, usage et revêtement recherché.",
    points: ["Support", "Usage", "Surface"],
  },
  "amenagement-terrains-sport": {
    icon: "outdoor",
    hint: "Type de terrain, surface, usage et équipements souhaités.",
    points: ["Terrain", "Surface", "Équipement"],
  },
  autre: {
    icon: "other",
    hint: "Décrivez le besoin, l'espace concerné et le résultat que vous recherchez.",
    points: ["Besoin", "Contexte", "Priorités"],
  },
};

const QUOTE_SERVICES: QuoteServiceCard[] = [
  ...getQuoteServices().map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    href: service.href,
    ...SERVICE_PRESENTATION[service.id],
  })),
  {
    id: "autre",
    title: "Autre projet",
    description: "Un besoin qui ne correspond pas exactement aux services proposés.",
    href: null,
    ...SERVICE_PRESENTATION.autre,
  },
];

const HERO_SUPPORT = [
  { icon: "target" as const, title: "Projet étudié", text: "Selon votre besoin réel" },
  { icon: "document" as const, title: "Devis adapté", text: "Au périmètre discuté" },
  { icon: "whatsapp" as const, title: "Échange direct", text: "Via WhatsApp" },
  { icon: "layout" as const, title: "Service au choix", text: "Modifiable dans le formulaire" },
];

const PREPARATION_CARDS = [
  { icon: "target" as const, title: "Projet", text: "Le type d'espace et l'objectif principal du projet." },
  { icon: "dimensions" as const, title: "Surface / dimensions", text: "Une estimation suffit si les mesures exactes ne sont pas connues." },
  { icon: "equipment" as const, title: "Équipements", text: "Le matériel déjà disponible ou les familles souhaitées." },
  { icon: "location" as const, title: "Localisation", text: "La ville et le type de lieu concerné par le projet." },
  { icon: "wallet" as const, title: "Budget", text: "Une fourchette indicative, uniquement si vous souhaitez la préciser." },
  { icon: "image" as const, title: "Photos / plan", text: "À partager ensuite sur WhatsApp lorsque vous en avez." },
];

const PROCESS_STEPS = [
  { icon: "layout" as const, title: "Choisissez votre service", text: "Sélectionnez le contexte qui correspond le mieux à votre projet." },
  { icon: "document" as const, title: "Décrivez votre projet", text: "Ajoutez les informations que vous connaissez déjà, sans tout rendre obligatoire." },
  { icon: "check" as const, title: "Préparez la demande", text: "Vérifiez les informations avant d'ouvrir votre message prérempli." },
  { icon: "whatsapp" as const, title: "Continuez sur WhatsApp", text: "Relisez le message dans WhatsApp, puis envoyez-le pour lancer l'échange." },
];

const REASSURANCE_ITEMS = [
  { icon: "target" as const, title: "Besoin compris", text: "Les informations servent à cadrer la demande." },
  { icon: "message" as const, title: "Échange direct", text: "Le projet peut être précisé après le formulaire." },
  { icon: "document" as const, title: "Périmètre clair", text: "Le devis dépend des éléments réellement discutés." },
  { icon: "check" as const, title: "Informations utiles", text: "Seuls les champs nécessaires sont demandés." },
];

const FAQ_ITEMS = [
  {
    question: "Quelles informations faut-il préparer pour demander un devis ?",
    answer: "Le type de projet, la ville, l'espace disponible, la surface approximative, les équipements souhaités et vos objectifs sont les informations les plus utiles. Une fourchette de budget et un délai peuvent être ajoutés si vous les connaissez.",
  },
  {
    question: "Puis-je demander un devis sans connaître la surface exacte ?",
    answer: "Oui. Indiquez une estimation ou laissez la surface vide. Vous pourrez préciser les dimensions, envoyer des photos ou partager un plan pendant l'échange sur WhatsApp.",
  },
  {
    question: "Puis-je modifier le service sélectionné ?",
    answer: "Oui. Le service peut être modifié dans la première étape du formulaire, même si la page a été ouverte depuis une page service.",
  },
  {
    question: "Comment envoyer des photos ou un plan du projet ?",
    answer: "Le formulaire prépare d'abord un message WhatsApp. Une fois la conversation ouverte, vous pouvez y joindre les photos, mesures ou plans disponibles.",
  },
  {
    question: "Que se passe-t-il après la préparation de la demande ?",
    answer: "WhatsApp s'ouvre avec un message prérempli. Vérifiez-le puis appuyez sur Envoyer dans WhatsApp. Le formulaire ne stocke pas la demande et ne génère pas automatiquement un devis.",
  },
];

const BUDGET_OPTIONS: Array<{ value: BudgetValue; label: string }> = [
  { value: "8000-25000", label: "8 000 – 25 000 MAD" },
  { value: "28000-35000", label: "28 000 – 35 000 MAD" },
  { value: "35000-50000", label: "35 000 – 50 000 MAD" },
  { value: "100000-plus", label: "Plus de 100 000 MAD" },
  { value: "a-definir", label: "À définir pendant l'échange" },
];

const STEP_LABELS = ["Projet", "Coordonnées", "Détails"];

function QuoteIcon({ name, className = "h-6 w-6" }: { name: QuoteIconName; className?: string }) {
  const paths: Record<QuoteIconName, ReactNode> = {
    layout: <><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M4 10h16M10 10v10M15 4v6" /></>,
    home: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    building: <><path d="M4 20V6l8-3 8 3v14" /><path d="M8 20v-5h8v5M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" /></>,
    custom: <><path d="M12 3a9 9 0 1 0 4.6 16.7c1.5-.9 1-3.2-.8-3.2h-1.3a2 2 0 0 1 0-4H17A4 4 0 0 0 17 4a9 9 0 0 0-5-1Z" /><path d="M7.5 10h.01M9 6.5h.01M14 6.5h.01" /></>,
    kids: <><circle cx="12" cy="5" r="2" /><path d="m9 21 1.5-7L7 11l2-3 3 2 3-2 2 3-3.5 3 1.5 7" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    outdoor: <><path d="M4 20h16M6 20v-7h12v7M8 13V8h8v5M10 8V4h4v4" /></>,
    other: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M7 12h10" /></>,
    document: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h6M9 16h6" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    dimensions: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 16h8M8 8v8M16 8v8M6 12h12" /></>,
    equipment: <><path d="M5 8v8M8 7v10M16 7v10M19 8v8M8 12h8M3 10v4M21 10v4" /></>,
    wallet: <><path d="M4 6.5h14a2 2 0 0 1 2 2V18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" /><path d="M15 11h5v4h-5a2 2 0 0 1 0-4Z" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 15-4-4L6 20" /></>,
    whatsapp: <><path d="M5 19.5 6.2 16A7 7 0 1 1 9 18.3z" /><path d="M9.5 8.5c.4 2.3 2 3.9 4.2 4.8l1.3-1.2 2 1.2c-.3 1.5-1.2 2.2-2.7 2.1-3.8-.3-7-3.5-7.4-7.2C6.7 6.8 7.4 5.9 8.8 5.6z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-5 4.5-7 8-7s7 2 8 7" /></>,
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.7-1.4-6.6-4.3-8-8l2-2-2-4Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.2-3.3A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    check: <path d="m20 6-11 11-5-5" />,
    "arrow-right": <path d="M5 12h14M14 7l5 5-5 5" />,
    "arrow-left": <path d="M19 12H5M10 7l-5 5 5 5" />,
  };

  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.22em] text-yellow-700 dark:text-yellow-400">{children}</span>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{message}</p>;
}

export default function DemandeDevisPage() {
  const [formData, setFormData] = useState<QuoteFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [preparedWhatsappUrl, setPreparedWhatsappUrl] = useState("");
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    const mappedService = mapServiceQueryParam(requestedService);
    if (!mappedService) return;
    setFormData((previous) => ({ ...previous, service: previous.service || mappedService }));
  }, []);

  const selectedService = QUOTE_SERVICES.find((service) => service.id === formData.service);
  const inputClass = (hasError = false) => `min-h-12 w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 dark:bg-gray-950 dark:text-white ${hasError ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    const nextValue = event.currentTarget instanceof HTMLInputElement && event.currentTarget.type === "checkbox" ? event.currentTarget.checked : value;
    const fieldName = name as keyof QuoteFormData;
    setFormData((previous) => ({ ...previous, [fieldName]: nextValue }));
    if (errors[fieldName]) setErrors((previous) => ({ ...previous, [fieldName]: undefined }));
  };

  const selectService = (serviceId: ServiceId) => {
    setFormData((previous) => ({ ...previous, service: serviceId }));
    setErrors((previous) => ({ ...previous, service: undefined }));
  };

  const validateStep = (step: 1 | 2 | 3) => {
    const nextErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.service) nextErrors.service = "Sélectionnez un service.";
      if (!formData.city.trim()) nextErrors.city = "Indiquez votre ville.";
    }
    if (step === 2) {
      if (!formData.firstName.trim()) nextErrors.firstName = "Indiquez votre prénom.";
      if (!formData.lastName.trim()) nextErrors.lastName = "Indiquez votre nom.";
      if (!formData.phone.trim()) nextErrors.phone = "Indiquez votre téléphone.";
      else {
        const phoneDigits = formData.phone.replace(/\D/g, "");
        if (phoneDigits.length < 9 || phoneDigits.length > 15 || !/^[+\d\s().-]+$/.test(formData.phone)) nextErrors.phone = "Saisissez un numéro de téléphone valide.";
      }
      if (!formData.email.trim()) nextErrors.email = "Indiquez votre email.";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = "Saisissez une adresse email valide.";
    }
    if (step === 3) {
      if (!formData.message.trim()) nextErrors.message = "Décrivez brièvement votre projet.";
      if (!formData.terms) nextErrors.terms = "Votre accord est nécessaire pour préparer la demande.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const scrollToForm = () => window.requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => step < 3 ? ((step + 1) as 1 | 2 | 3) : step);
    scrollToForm();
  };
  const goToPreviousStep = () => {
    setErrors({});
    setCurrentStep((step) => step > 1 ? ((step - 1) as 1 | 2 | 3) : step);
    scrollToForm();
  };
  const resetForm = () => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    const mappedService = mapServiceQueryParam(requestedService);
    setFormData({ ...INITIAL_FORM, service: mappedService ?? "" });
    setErrors({});
    setCurrentStep(1);
    setIsSubmitted(false);
    setPreparedWhatsappUrl("");
    setWhatsappOpened(false);
    scrollToForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep < 3) {
      goToNextStep();
      return;
    }
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    try {
      const serviceLabel = selectedService?.title ?? "Autre projet";
      const budgetLabel = BUDGET_OPTIONS.find((option) => option.value === formData.budget)?.label ?? "Non précisé";
      const now = new Date();
      const whatsappMessage = `DEMANDE DE DEVIS IRONZ À FINALISER

Service: ${serviceLabel}
Ville: ${formData.city}
Type d'espace: ${formData.spaceType || "Non précisé"}
Surface: ${formData.surface || "Non précisée"}

Nom: ${formData.firstName} ${formData.lastName}
Téléphone: ${formData.phone}
Email: ${formData.email}
Entreprise: ${formData.company || "Non précisée"}

Budget: ${budgetLabel}
Délai souhaité: ${formData.desiredTiming || "Non précisé"}
Projet: ${formData.message}

Demande préparée le ${now.toLocaleDateString("fr-FR")} à ${now.toLocaleTimeString("fr-FR")}
Source: Site web IRONZ`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      setPreparedWhatsappUrl(whatsappUrl);
      const whatsappWindow = window.open("", "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.location.href = whatsappUrl;
        setWhatsappOpened(true);
      } else setWhatsappOpened(false);
      setIsSubmitted(true);
      setErrors({});
      scrollToForm();
    } catch (error) {
      console.error("Unable to prepare WhatsApp quote request:", error);
      setErrors({ submit: "La demande n'a pas pu être préparée. Vérifiez les informations puis réessayez." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/[0.04]" aria-hidden="true" />
        <div className="absolute -right-24 top-10 h-64 w-64 rounded-full border-[48px] border-yellow-500/15 sm:h-80 sm:w-80" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rotate-12 border-[36px] border-white/[0.04]" aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400"><Link href="/" className="transition-colors hover:text-yellow-400">Accueil</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-white">Demande de devis</span></nav>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)] lg:gap-16">
            <div className="max-w-4xl">
              <span className="mb-6 inline-flex bg-yellow-500 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black sm:text-sm">Projet fitness sur devis</span>
              <h1 className="text-4xl font-display uppercase leading-[0.95] tracking-wide text-white sm:text-5xl md:text-6xl 2xl:text-7xl">Demandez un devis pour votre <span className="text-yellow-500">projet fitness</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">Partagez les informations principales de votre projet. IRONZ les utilise pour comprendre le besoin et préparer un échange adapté au périmètre envisagé.</p>
              {selectedService ? <div className="mt-7 inline-flex max-w-full items-center gap-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-black"><QuoteIcon name={selectedService.icon} className="h-5 w-5" /></span><span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.18em] text-yellow-400">Projet sélectionné</span><strong className="block text-sm text-white sm:text-base">{selectedService.title}</strong></span></div> : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#quote-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400">Commencer ma demande<QuoteIcon name="arrow-right" className="h-5 w-5" /></a>
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500 hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400">Nous contacter</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">{HERO_SUPPORT.map((item) => <article key={item.title} className="rounded-2xl border border-white/15 bg-gray-950 p-4 sm:p-5"><span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name={item.icon} className="h-5 w-5" /></span><h2 className="text-sm font-bold text-white sm:text-base">{item.title}</h2><p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">{item.text}</p></article>)}</div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Préparer un bon devis</SectionLabel><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Quelques détails rendent la demande plus utile</h2><div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-gray-600 dark:text-gray-400"><p>Un devis pertinent commence par le contexte : type de projet, ville, espace disponible, surface approximative et équipements envisagés.</p><p>Vos objectifs, une fourchette de budget et le délai souhaité peuvent aussi aider, mais vous pouvez laisser les informations encore inconnues pour la suite de l&apos;échange.</p></div><Link href="/services" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400">Découvrir les services IRONZ<QuoteIcon name="arrow-right" className="h-4 w-4" /></Link></div><div className="rounded-3xl border border-yellow-500/25 bg-gray-50 p-6 dark:bg-gray-900 sm:p-8"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name="document" /></div><h3 className="text-xl font-bold text-gray-950 dark:text-white">Pourquoi ces informations ?</h3><p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">Elles permettent de distinguer un besoin d&apos;équipement, un projet d&apos;aménagement complet, une contrainte de surface ou un besoin de personnalisation avant de parler du périmètre du devis.</p><p className="mt-5 border-l-4 border-yellow-500 pl-4 text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">Vous n&apos;avez pas besoin de tout connaître pour commencer.</p></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl sm:mb-12"><SectionLabel>Choisir le service</SectionLabel><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Quel projet souhaitez-vous préparer ?</h2><p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">Choisissez le service le plus proche de votre besoin. La sélection reste modifiable dans le formulaire.</p></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{QUOTE_SERVICES.map((service) => { const isSelected = formData.service === service.id; return <button key={service.id} type="button" aria-pressed={isSelected} onClick={() => selectService(service.id)} className={`group relative min-h-64 rounded-2xl border-2 p-6 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500 ${isSelected ? "border-yellow-500 bg-white shadow-lg shadow-yellow-500/10 dark:bg-gray-950" : "border-gray-200 bg-white hover:border-yellow-500/60 dark:border-gray-800 dark:bg-gray-950"}`}><div className="flex items-start justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name={service.icon} /></span><span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${isSelected ? "border-yellow-500 bg-yellow-500 text-black" : "border-gray-300 text-transparent dark:border-gray-700"}`} aria-hidden="true"><QuoteIcon name="check" className="h-4 w-4" /></span></div><h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{service.description}</p><div className="mt-5 flex flex-wrap gap-2">{service.points.map((point) => <span key={point} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">{point}</span>)}</div></button>; })}</div>
        {selectedService ? <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><QuoteIcon name="message" className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700 dark:text-yellow-400" /><div><p className="font-bold text-gray-950 dark:text-white">Informations utiles pour {selectedService.title}</p><p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{selectedService.hint}</p></div></div>{selectedService.href ? <Link href={selectedService.href} className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-gray-950 underline decoration-yellow-600 underline-offset-4 dark:text-white">Voir le service<QuoteIcon name="arrow-right" className="h-4 w-4" /></Link> : null}</div> : null}
      </div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl sm:mb-12"><SectionLabel>Que préparer ?</SectionLabel><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Les informations qui améliorent la qualité du devis</h2><p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">Ajoutez seulement ce que vous connaissez. Aucun de ces éléments optionnels ne doit vous empêcher de commencer la demande.</p></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{PREPARATION_CARDS.map((card) => <article key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900/60 sm:p-7"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-yellow-700 shadow-sm dark:bg-gray-800 dark:text-yellow-400"><QuoteIcon name={card.icon} /></span><h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">{card.title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">{card.text}</p></article>)}</div></div></section>

      <section className="bg-black py-16 text-white md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl sm:mb-12"><span className="inline-flex rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.22em] text-yellow-400">Processus de demande</span><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-white sm:text-4xl md:text-5xl">Comment fonctionne la demande de devis ?</h2><p className="mt-5 leading-relaxed text-gray-400">Le formulaire prépare un message lisible pour poursuivre l&apos;échange directement sur WhatsApp.</p></div><ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{PROCESS_STEPS.map((step, index) => <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"><div className="flex items-center justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name={step.icon} /></span><span className="font-display text-3xl text-white/20">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-6 text-lg font-bold text-white">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-400">{step.text}</p></li>)}</ol></div></section>

      <section id="quote-form" className="scroll-mt-24 bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"><SectionLabel>Votre demande</SectionLabel><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Parlez-nous de votre projet</h2><p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">Trois étapes courtes pour préparer les informations utiles avant l&apos;ouverture de WhatsApp.</p></div>
        <div ref={formRef} className="mx-auto grid max-w-7xl scroll-mt-24 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
          <aside className="order-2 h-fit rounded-3xl bg-black p-6 text-white sm:p-8 lg:order-1 lg:sticky lg:top-28"><span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">Projet en cours</span><div className="mt-5 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name={selectedService?.icon ?? "document"} className="h-7 w-7" /></div><h3 className="mt-5 text-2xl font-display uppercase tracking-wide text-white">{selectedService?.title ?? "Votre projet IRONZ"}</h3><p className="mt-4 leading-relaxed text-gray-300">{selectedService?.hint ?? "Choisissez un service puis ajoutez les premières informations disponibles."}</p><div className="mt-8 border-t border-white/10 pt-6"><p className="flex items-start gap-3 text-sm leading-relaxed text-gray-300"><QuoteIcon name="whatsapp" className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />Le message reste modifiable dans WhatsApp avant son envoi.</p></div></aside>
          <div className="order-1 min-w-0 rounded-3xl border border-gray-200 bg-white p-5 shadow-xl shadow-black/5 dark:border-gray-800 dark:bg-gray-950 sm:p-8 lg:order-2 lg:p-10">
            {isSubmitted ? <div aria-live="polite" className="mx-auto max-w-2xl py-4 text-center sm:py-8"><span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 text-black"><QuoteIcon name={whatsappOpened ? "whatsapp" : "document"} className="h-10 w-10" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-400">Prochaine action</p><h3 className="mt-3 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl">{whatsappOpened ? "Votre message est prêt dans WhatsApp" : "Votre message WhatsApp est prêt"}</h3><p className="mx-auto mt-5 max-w-xl leading-relaxed text-gray-600 dark:text-gray-400">{whatsappOpened ? "WhatsApp a été ouvert avec votre demande préremplie. Vérifiez les informations puis appuyez sur Envoyer dans WhatsApp." : "L'ouverture automatique a été bloquée. Utilisez le bouton ci-dessous, vérifiez le message puis appuyez sur Envoyer dans WhatsApp."}</p><div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-left"><p className="flex items-start gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300"><QuoteIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700 dark:text-yellow-400" />La demande n&apos;est pas envoyée par le site. Elle est transmise uniquement lorsque vous confirmez l&apos;envoi dans WhatsApp.</p></div><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">{preparedWhatsappUrl ? <a href={preparedWhatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400"><QuoteIcon name="whatsapp" className="h-5 w-5" />Ouvrir WhatsApp</a> : null}<button type="button" onClick={() => setIsSubmitted(false)} className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-950 transition-colors hover:border-yellow-500 dark:border-gray-700 dark:text-white">Modifier ma demande</button><button type="button" onClick={resetForm} className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-4 font-semibold text-gray-600 underline underline-offset-4 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white">Réinitialiser</button></div></div> : <>
              <div className="border-b border-gray-200 pb-7 dark:border-gray-800"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-400">Étape {String(currentStep).padStart(2, "0")} sur 03</p><h3 id="quote-step-heading" className="mt-2 text-2xl font-display uppercase tracking-wide text-gray-950 dark:text-white sm:text-3xl">{STEP_LABELS[currentStep - 1]}</h3></div><span className="text-sm font-semibold text-gray-500">{Math.round((currentStep / 3) * 100)}%</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800" role="progressbar" aria-label="Progression du formulaire" aria-valuemin={1} aria-valuemax={3} aria-valuenow={currentStep}><div className="h-full rounded-full bg-yellow-500 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(currentStep / 3) * 100}%` }} /></div><ol className="mt-5 grid grid-cols-3 gap-2" aria-label="Étapes du formulaire">{STEP_LABELS.map((label, index) => { const step = (index + 1) as 1 | 2 | 3; const isActive = currentStep === step; const isComplete = currentStep > step; return <li key={label} aria-current={isActive ? "step" : undefined} className={`rounded-xl border px-2 py-3 text-center text-xs font-bold sm:px-3 sm:text-sm ${isActive ? "border-yellow-500 bg-yellow-500 text-black" : isComplete ? "border-yellow-500/30 bg-yellow-500/10 text-gray-950 dark:text-white" : "border-gray-200 text-gray-500 dark:border-gray-800"}`}><span className="block text-[11px] uppercase tracking-wider sm:text-xs">{String(step).padStart(2, "0")}</span><span className="mt-1 block">{label}</span></li>; })}</ol></div>
              <form onSubmit={handleSubmit} noValidate className="pt-8">
                {currentStep === 1 ? <div><div className="mb-8"><label htmlFor="service" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Service souhaité <span className="text-red-600">*</span></label><select id="service" name="service" value={formData.service} onChange={handleChange} required aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : "service-help"} className={inputClass(Boolean(errors.service))}><option value="">Choisir un service</option>{QUOTE_SERVICES.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}</select><p id="service-help" className="mt-2 text-sm text-gray-500">Vous pouvez revenir sur ce choix avant l&apos;envoi.</p><FieldError id="service-error" message={errors.service} /></div>{selectedService ? <div className="mb-8 flex items-start gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name={selectedService.icon} className="h-5 w-5" /></span><div><p className="font-bold text-gray-950 dark:text-white">À préciser si possible</p><p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{selectedService.hint}</p></div></div> : null}<div className="grid grid-cols-1 gap-6 md:grid-cols-2"><div><label htmlFor="city" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Ville <span className="text-red-600">*</span></label><input id="city" name="city" type="text" value={formData.city} onChange={handleChange} required autoComplete="address-level2" placeholder="Ex. Casablanca" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined} className={inputClass(Boolean(errors.city))} /><FieldError id="city-error" message={errors.city} /></div><div><label htmlFor="spaceType" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Type d&apos;espace <span className="font-normal text-gray-500">(optionnel)</span></label><input id="spaceType" name="spaceType" type="text" value={formData.spaceType} onChange={handleChange} placeholder="Maison, club, hôtel, terrain..." className={inputClass()} /></div><div className="md:col-span-2"><label htmlFor="surface" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Surface approximative <span className="font-normal text-gray-500">(optionnel)</span></label><input id="surface" name="surface" type="text" value={formData.surface} onChange={handleChange} placeholder="Ex. 40 m² ou dimensions à confirmer" className={inputClass()} /></div></div></div> : null}
                {currentStep === 2 ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2"><div><label htmlFor="firstName" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Prénom <span className="text-red-600">*</span></label><input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} className={inputClass(Boolean(errors.firstName))} /><FieldError id="firstName-error" message={errors.firstName} /></div><div><label htmlFor="lastName" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Nom <span className="text-red-600">*</span></label><input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "lastName-error" : undefined} className={inputClass(Boolean(errors.lastName))} /><FieldError id="lastName-error" message={errors.lastName} /></div><div><label htmlFor="phone" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Téléphone <span className="text-red-600">*</span></label><input id="phone" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleChange} required autoComplete="tel" placeholder="+212 6 00 00 00 00" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={inputClass(Boolean(errors.phone))} /><FieldError id="phone-error" message={errors.phone} /></div><div><label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Email <span className="text-red-600">*</span></label><input id="email" name="email" type="email" inputMode="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="votre@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass(Boolean(errors.email))} /><FieldError id="email-error" message={errors.email} /></div><div className="md:col-span-2"><label htmlFor="company" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Entreprise <span className="font-normal text-gray-500">(optionnel)</span></label><input id="company" name="company" type="text" value={formData.company} onChange={handleChange} autoComplete="organization" className={inputClass()} /></div></div> : null}
                {currentStep === 3 ? <div><fieldset><legend className="text-sm font-bold text-gray-800 dark:text-gray-200">Budget indicatif <span className="font-normal text-gray-500">(optionnel)</span></legend><div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">{BUDGET_OPTIONS.map((option) => <label key={option.value} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors focus-within:ring-4 focus-within:ring-yellow-500/10 ${formData.budget === option.value ? "border-yellow-500 bg-yellow-500/10" : "border-gray-200 hover:border-yellow-500/60 dark:border-gray-700"}`}><input type="radio" name="budget" value={option.value} checked={formData.budget === option.value} onChange={handleChange} className="h-5 w-5 accent-yellow-500" /><span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{option.label}</span></label>)}</div></fieldset><div className="mt-6"><label htmlFor="desiredTiming" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Délai souhaité <span className="font-normal text-gray-500">(optionnel)</span></label><input id="desiredTiming" name="desiredTiming" type="text" value={formData.desiredTiming} onChange={handleChange} placeholder="Ex. ce trimestre ou date à confirmer" className={inputClass()} /></div><div className="mt-6"><label htmlFor="message" className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">Description du projet <span className="text-red-600">*</span></label><textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Décrivez l'espace, vos objectifs, les équipements souhaités et les informations déjà disponibles." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-help"} className={`${inputClass(Boolean(errors.message))} resize-y`} /><p id="message-help" className="mt-2 text-sm text-gray-500">Les photos ou plans pourront être joints ensuite dans WhatsApp.</p><FieldError id="message-error" message={errors.message} /></div><div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900"><label htmlFor="terms" className="flex cursor-pointer items-start gap-3"><input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} required aria-invalid={Boolean(errors.terms)} aria-describedby={errors.terms ? "terms-error" : undefined} className="mt-1 h-5 w-5 shrink-0 accent-yellow-500" /><span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">J&apos;accepte que ces informations soient utilisées pour préparer et traiter ma demande auprès d&apos;IRONZ, conformément à la <Link href="/confidentialite" className="font-semibold underline decoration-yellow-500 underline-offset-4">politique de confidentialité</Link>. <span className="text-red-600">*</span></span></label><FieldError id="terms-error" message={errors.terms} /></div>{errors.submit ? <div role="alert" className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">{errors.submit}</div> : null}</div> : null}
                <div className="mt-9 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row sm:justify-between">{currentStep > 1 ? <button type="button" onClick={goToPreviousStep} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-950 transition-colors hover:border-yellow-500 dark:border-gray-700 dark:text-white sm:w-auto"><QuoteIcon name="arrow-left" className="h-5 w-5" />Retour</button> : <span aria-hidden="true" />}{currentStep < 3 ? <button type="button" onClick={goToNextStep} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400 sm:w-auto">Étape suivante<QuoteIcon name="arrow-right" className="h-5 w-5" /></button> : <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"><QuoteIcon name="whatsapp" className="h-5 w-5" />{isSubmitting ? "Préparation..." : "Préparer sur WhatsApp"}</button>}</div>
              </form>
            </>}
          </div>
        </div>
      </div></section>

      <section className="py-16 md:py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 sm:p-8 lg:p-10"><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{REASSURANCE_ITEMS.map((item) => <article key={item.title} className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name={item.icon} className="h-5 w-5" /></span><div><h2 className="font-bold text-gray-950 dark:text-white">{item.title}</h2><p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.text}</p></div></article>)}</div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"><div><SectionLabel>Contact alternatif</SectionLabel><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Vous préférez nous contacter directement ?</h2><p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">Utilisez le canal qui vous convient pour préciser le projet ou partager des documents complémentaires.</p></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-yellow-500 dark:border-gray-800 dark:bg-gray-950"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name="whatsapp" /></span><h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">WhatsApp</h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Échanger directement sur votre besoin.</p></a><a href={PHONE_HREF} className="group rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-yellow-500 dark:border-gray-800 dark:bg-gray-950"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name="phone" /></span><h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">Téléphone</h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{PHONE_LABEL}</p></a><a href={`mailto:${QUOTE_EMAIL}`} className="group rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-yellow-500 dark:border-gray-800 dark:bg-gray-950"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name="mail" /></span><h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">Email</h3><p className="mt-2 break-all text-sm text-gray-600 dark:text-gray-400">{QUOTE_EMAIL}</p></a><Link href="/contact" className="group rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-yellow-500 dark:border-gray-800 dark:bg-gray-950"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><QuoteIcon name="message" /></span><h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">Page Contact</h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Voir toutes les coordonnées IRONZ.</p></Link></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"><SectionLabel>Questions fréquentes</SectionLabel><h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Avant de préparer votre demande</h2><p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">Des réponses pratiques sur les informations à fournir et le fonctionnement réel du formulaire.</p></div><div className="mx-auto max-w-4xl space-y-4">{FAQ_ITEMS.map((item) => <details key={item.question} className="group rounded-2xl border border-gray-200 bg-gray-50 open:border-yellow-500/50 open:bg-white dark:border-gray-800 dark:bg-gray-900 dark:open:bg-gray-950"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-gray-950 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 dark:text-white sm:px-6"><span>{item.question}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-black transition-transform group-open:rotate-45" aria-hidden="true"><QuoteIcon name="other" className="h-4 w-4" /></span></summary><div className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:px-6 sm:pb-6 sm:text-base">{item.answer}</div></details>)}</div></div></section>

      <section className="bg-yellow-500 py-16 text-black md:py-20"><div className="container mx-auto px-4 text-center sm:px-6 lg:px-8"><h2 className="text-3xl font-display uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">Vous avez un projet en tête ?</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg">Commencez avec les informations disponibles. Vous pourrez préciser les détails et partager vos documents pendant l&apos;échange.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="#quote-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-gray-900">Commencer ma demande<QuoteIcon name="arrow-right" className="h-5 w-5" /></a><Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white">Nous contacter</Link></div></div></section>
    </main>
  );
}