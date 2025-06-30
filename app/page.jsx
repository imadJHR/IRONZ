"use client";
import Image from "next/image";
import Link from "next/link";
import ReferencesSection from "../components/references-section";
import logo from "../public/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Dumbbell,
  HeartPulse,
  Shield,
  Weight,
  CheckCircle,
  TrendingUp,
  Award,
  Star,
  ShoppingCart,
  Truck,
  Sparkles,
  MessageSquare,
  X,
  Send,
  ChevronDown,
  Lightbulb,
  RefreshCw,
  CreditCard,
  Phone,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandsMarquee from "@/components/brands-marquee";

import { categories, brands, productUtils } from "@/data/product";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import img1 from "../public/1.jpg";
import img2 from "../public/2.jpg";
import img3 from "../public/3.jpg";
import img4 from "../public/4.jpg";
import img5 from "../public/mo1.jpg";
import img6 from "../public/mo2.jpg";
import img7 from "../public/mo3.jpg";
import img8 from "../public/mo4.jpg";
import banner1 from "../public/des1.jpg";
import banner2 from "../public/des2.jpg";
import banner3 from "../public/des3.jpg";
import banner4 from "../public/des4.jpg";

const faqs = [
  {
    question:
      "Comment choisir le bon équipement pour ma salle de sport à domicile ?",
    answer:
      "Pour choisir le bon équipement, considérez d'abord vos objectifs fitness, l'espace disponible et votre budget. Nous recommandons de commencer par des équipements polyvalents comme un banc réglable, des haltères ajustables et un tapis de sol. N'hésitez pas à contacter notre équipe pour des conseils personnalisés.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nos délais de livraison varient selon votre localisation. En général, comptez 2-3 jours , Vous recevrez un email de confirmation avec un numéro de suivi dès l'expédition de votre commande.",
  },
  {
    question: "Proposez-vous un service d'installation pour les équipements ?",
    answer:
      "Oui, nous proposons un service d'installation professionnel pour les équipements volumineux comme les stations de musculation et les tapis de course. Ce service est disponible dans certaines régions et peut être ajouté lors de votre commande. Contactez notre service client pour plus d'informations.",
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer:
      "Nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas satisfait de votre achat, vous pouvez retourner le produit dans son emballage d'origine pour un remboursement complet ou un échange. Les frais de retour sont à la charge du client, sauf en cas de produit défectueux.",
  },
  {
    question:
      "Vos suppléments sont-ils testés pour les substances interdites ?",
    answer:
      "Absolument. Tous nos suppléments nutritionnels sont fabriqués dans des installations certifiées et sont testés par des laboratoires indépendants pour garantir leur pureté et l'absence de substances interdites. Nous fournissons des certificats d'analyse sur demande.",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const knowledgeBase = {
    returns: {
      triggers: [
        "retour",
        "remboursement",
        "garantie",
        "échanger",
        "défectueux",
      ],
      response: `Nous offrons une politique de retour flexible :

🔄 **Retours standards** : 30 jours pour un remboursement complet (produit non utilisé, dans son emballage d'origine)
⚡ **Retours rapides** : Retours gratuits dans nos boutiques physiques
🔧 **Produits défectueux** : Remplacement gratuit dans les 2 ans avec garantie constructeur

Pour initier un retour, veuillez visiter notre [portail de retours](https://ironz.ma/retours) ou répondre à ce message avec votre numéro de commande.`,
    },
    delivery: {
      triggers: [
        "livraison",
        "délai",
        "expédition",
        "recevoir",
        "temps",
        "commande",
      ],
      response: `🚚 **Options de livraison disponibles** :

1. **Standard** : 2-3 jours ouvrés (gratuite à partir de 500 DH)
2. **Express** : Livraison en 24h (+50 DH)
3. **Click & Collect** : Retrait en magasin en 1h

📦 **Suivi en temps réel** : Vous recevrez un lien de suivi par SMS/email dès l'expédition. Notre système intelligent peut prédire votre heure de livraison à ±30 minutes près !`,
    },
    products: {
      triggers: [
        "équipement",
        "choisir",
        "produit",
        "conseil",
        "recommander",
        "suggestion",
      ],
      response: `Pour une recommandation personnalisée, j'ai besoin de savoir :

1. **Type d'activité** : Musculation, cardio, cross-training, etc.
2. **Niveau** : Débutant, intermédiaire, avancé
3. **Espace disponible** : <5m², 5-10m², >10m²
4. **Budget** : <2000 DH, 2000-5000 DH, >5000 DH

💡 **Top choix ce mois-ci** :
- Home Gym 3000 (meilleur rapport qualité-prix)
- Tapis de course AI Pro (avec coach virtuel intégré)
- Kit haltères intelligents (capteurs de performance)`,
    },
    payment: {
      triggers: ["paiement", "pay", "carte", "crédit", "facture", "payer"],
      response: `💳 **Modes de paiement sécurisés** :

- Carte bancaire (3D Secure) : Visa, Mastercard, Amex
- PayFlex : Paiement en 3x ou 4x sans frais
- Wallet Ironz : Cumulez 5% de cashback
- Cryptomonnaies : Bitcoin, Ethereum (via Binance Pay)

🔒 **Sécurité** : Tous les paiements sont cryptés et protégés par notre système de détection de fraude IA.`,
    },
    contact: {
      triggers: [
        "contact",
        "service client",
        "appeler",
        "email",
        "adresse",
        "téléphone",
      ],
      response: `📞 **Contactez-nous facilement** :

- **Chat live** : Disponible 24/7 sur notre app
- **Téléphone** : +212 674-114446 (8h-20h)
- **Réseaux sociaux** : Réponse garantie en <30 min

💬 **Astuce** : Dites-moi "rappeler" et je vous mets en contact immédiat avec un conseiller !`,
    },
    promotions: {
      triggers: ["promo", "réduction", "solde", "offre", "code", "rabais"],
      response: `🎁 **Promotions actuelles** :

🔥 **Flash Sale** : Jusqu'à 40% sur les équipements premium (fin dans 3h12m)
✨ **Nouveaux membres** : 15% de réduction avec code BIENVENUE15
👑 **Fidélité** : Double points ce week-end

🔔 **Conseil pro** : Abonnez-vous à notre newsletter pour recevoir des offres exclusives avant tout le monde !`,
    },
  };

  const suggestedQuestions = [
    "Comment faire un retour ?",
    "Quand sera livrée ma commande ?",
    "Quel équipement pour débutant ?",
    "Avez-vous des promotions ?",
    "Comment contacter le service client ?",
  ];

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `🌟 **Bonjour ! Je suis IronzBot, votre assistant IA** 🌟

Comment puis-je vous aider aujourd'hui ? Voici ce que je peux faire pour vous :

1. Trouver le produit parfait pour vos besoins
2. Vous informer sur les livraisons et retours
3. Vous proposer des offres personnalisées
4. Vous connecter avec un expert humain

Essayez de me demander : "Quel équipement pour perdre du poids ?" ou "Comment suivre ma commande ?"`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateEnhancedResponse(inputValue);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 1500);
  };

  const generateEnhancedResponse = (userInput) => {
    const input = userInput.toLowerCase();

    for (const [topic, data] of Object.entries(knowledgeBase)) {
      if (data.triggers.some((trigger) => input.includes(trigger))) {
        return data.response;
      }
    }

    if (input.includes("merci") || input.includes("thanks")) {
      return `Je vous en prie ! 😊 N'hésitez pas si vous avez d'autres questions. Saviez-vous que vous pouvez aussi :

- **Programmer un rappel** pour ne pas oublier nos promotions
- **Obtenir un guide gratuit** sur l'entraînement à domicile
- **Réserver une consultation** avec nos coachs certifiés

Comment puis-je continuer à vous aider ?`;
    } else if (input.includes("bonjour") || input.includes("salut")) {
      return `Bonjour à vous ! 🌞 Je suis ravi de vous aider aujourd'hui. Pour gagner du temps, voici quelques demandes fréquentes que je peux traiter instantanément :

1. "Où en est ma commande n°XYZ ?"
2. "Je veux retourner un article"
3. "Quels accessoires pour compléter mon home gym ?"

Dites-moi simplement ce dont vous avez besoin !`;
    } else if (input.includes("urgence") || input.includes("important")) {
      return `🚨 Pour les questions urgentes, je peux :

1. Vous mettre en relation IMMÉDIATE avec un conseiller (réponse <2 min)
2. Envoyer un SMS de rappel avec les informations critiques
3. Vous donner le numéro direct du responsable de service

Dites "rappeler" ou "urgence" pour activer le mode prioritaire.`;
    } else {
      return `🤖 **Je veux m'assurer de bien comprendre votre demande**

Pouvez-vous préciser votre question ou choisir parmi ces options :

1. Informations sur une commande existante
2. Recommandation de produits
3. Support technique
4. Questions sur les paiements
5. Autre demande

Je suis équipé d'une IA avancée qui apprend de chaque conversation pour vous offrir un service toujours plus pertinent !`;
    }
  };

  const handleQuickReply = (question) => {
    setInputValue(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getIconForMessage = (text) => {
    if (text.includes("livraison") || text.includes("délai"))
      return <Truck size={16} className="mr-1" />;
    if (text.includes("retour") || text.includes("remboursement"))
      return <RefreshCw size={16} className="mr-1" />;
    if (text.includes("paiement") || text.includes("payer"))
      return <CreditCard size={16} className="mr-1" />;
    if (text.includes("contact") || text.includes("appeler"))
      return <Phone size={16} className="mr-1" />;
    if (text.includes("promo") || text.includes("réduction"))
      return <Tag size={16} className="mr-1" />;
    if (text.includes("produit") || text.includes("équipement"))
      return <ShoppingCart size={16} className="mr-1" />;
    return <Lightbulb size={16} className="mr-1" />;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-8 right-8 z-50 ${isOpen ? "hidden" : "block"}`}
      >
        <button
          onClick={toggleChat}
          className="bg-black rounded-full p-4 shadow-xl flex items-center justify-center transition-all duration-300 ring-2 ring-white/20 hover:ring-4 hover:ring-white/30"
          aria-label="Ouvrir le chat"
        >
          <Image src={logo} alt="logo" className="w-8 h-8" />
          <motion.span
            className="absolute -top-2 -right-2 bg-yellow-500 text-xs rounded-full px-2 py-1 shadow"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            BOT
          </motion.span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 60 : 550,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-full max-w-md"
          >
            <div
              className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full transition-all duration-300 ${
                isMinimized ? "min-h-[60px]" : "min-h-[550px]"
              }`}
            >
              <div
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 p-4 flex items-center justify-between cursor-pointer"
                onClick={toggleMinimize}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="IronzBot Logo"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                    <motion.div
                      className="absolute -bottom-1 -right-1 bg-green-400 rounded-full w-3 h-3 border-2 border-yellow-600"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      IronzBot Assistant IA
                    </h3>
                    {!isMinimized && (
                      <p className="text-xs text-yellow-100">
                        En ligne • Prêt à vous aider
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMinimize();
                    }}
                    className="text-white hover:text-gray-200 transition-transform"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        isMinimized ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChat();
                    }}
                    className="text-white hover:text-gray-200"
                    aria-label="Fermer le chat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{
                          opacity: 0,
                          y: message.sender === "user" ? 10 : -10,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-br-none"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          {message.sender === "bot" && (
                            <div className="flex items-center mb-1">
                              {message.sender === "bot" && (
                                <div className="flex items-center mb-1">
                                  <div className="h-5 w-5 mr-2 relative rounded-full overflow-hidden">
                                    <Image
                                      src="/logo.png"
                                      alt="IronzBot"
                                      width={20}
                                      height={20}
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                                    IronzBot
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="text-sm whitespace-pre-line">
                            {message.text}
                          </div>
                          <div
                            className={`text-xs mt-1 flex justify-end ${
                              message.sender === "user"
                                ? "text-yellow-100/80"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center space-x-2">
                            <div className="relative h-5 w-5 rounded-full overflow-hidden">
                              <Image
                                src="/logo.png"
                                alt="IronzBot"
                                width={20}
                                height={20}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {messages.length <= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="px-4 pb-2"
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Essayez de demander :
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleQuickReply(question)}
                            className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1.5 transition-colors"
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Écrivez votre message..."
                        className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                      />
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === ""}
                        whileHover={
                          inputValue.trim() !== "" ? { scale: 1.05 } : {}
                        }
                        whileTap={
                          inputValue.trim() !== "" ? { scale: 0.95 } : {}
                        }
                        className={`bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-full p-3 ${
                          inputValue.trim() === ""
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:from-yellow-600 hover:to-yellow-700 shadow-md"
                        }`}
                        aria-label="Envoyer le message"
                      >
                        <Send className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
const banners = [
  {
    id: 1,
    imageDesktop: banner1, // 1920x600
    imageTablet: img1, // 1280x500
    imageMobile: img5, // 768x400
    title: "First Banner Title",
    highlight: "Highlight",
    description: "Description for the first banner.",
    link: "https://www.ironz.ma/product/RED-REX-BEEF-PROTEIN-ISOLATE-4lbs",
    icon: "🌟", // Replace with your icon component or image
  },
  {
    id: 2,
    imageDesktop: banner2, // 1920x600
    imageTablet: img2, // 1280x500
    imageMobile: img6, // 768x400
    title: "Second Banner Title",
    highlight: "Highlight",
    description: "Description for the second banner.",
    link: "https://www.ironz.ma/product/PERFORMANCE-UTILITY-BENCH",
    icon: "🌟", // Replace with your icon component or image
  },
  {
    id: 3,
    imageDesktop: banner3, // 1920x600
    imageTablet: img3, // 1280x500
    imageMobile: img7, // 768x400
    title: "Second Banner Title",
    highlight: "Highlight",
    description: "Description for the second banner.",
    link: "https://www.ironz.ma/product/PERFORMANCE-HOME-GYM",
    icon: "🌟", // Replace with your icon component or image
  },
  {
    id: 4,
    imageDesktop: banner4, // 1920x600
    imageTablet: img4, // 1280x500
    imageMobile: img8, // 768x400
    title: "Second Banner Title",
    highlight: "Highlight",
    description: "Description for the second banner.",
    link: "https://www.ironz.ma/product/C-21-BIKE",
    icon: "🌟", // Replace with your icon component or image
  },
];
export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();
  const featuredProducts = productUtils.getFeaturedProducts().slice(0, 8);
  const newArrivals = productUtils.getNewProducts().slice(0, 8);
  const bestSellers = productUtils.getFeaturedProducts().slice(0, 8);
  const specialOffers = productUtils.getDiscountedProducts().slice(0, 6);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(price);
  };

  const toggleFavorite = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const featuredProduct =
    specialOffers.length > 0 ? specialOffers[0] : featuredProducts[0];

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section - Amélioré pour une meilleure responsivité */}
<section className="relative bg-gray-900 text-white overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10 mix-blend-overlay" />
  </div>

  {/* Swiper */}
  <div className="relative z-10 h-full w-full">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
        renderBullet: (index, className) => {
          return `<span class="${className} bg-yellow-500 w-3 h-3 mx-1 rounded-full transition-all duration-300"></span>`;
        },
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      className="h-full"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative h-full w-full flex items-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                srcSet={`
                  ${banner.imageMobile} 768w,
                  ${banner.imageTablet} 1280w,
                  ${banner.imageDesktop} 1920w
                `}
                src={banner.imageDesktop}
                alt={banner.title}
                fill
                className="object-cover object-center scale-110 group-hover:scale-100 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                priority={banner.id === 1}
                sizes="(max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 px-6 md:px-16 lg:px-24 max-w-4xl text-white">
              <div className="space-y-4 md:space-y-6 transition-all duration-700 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                  <span className="text-yellow-400">{banner.icon}</span>
                  <span className="text-sm font-semibold tracking-wider text-yellow-300 uppercase">
                    {banner.highlight}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                  {banner.title}
                </h2>

                <p className="text-lg md:text-xl lg:text-2xl max-w-2xl opacity-90 leading-relaxed text-gray-100">
                  {banner.description}
                </p>

                {/* Button Container */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-md">
                  {/* Primary Button */}
                  <a
                    href={banner.link}
                    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:scale-[1.02] transition-all duration-300 text-center text-sm sm:text-base shadow-lg shadow-yellow-500/20 hover:shadow-yellow-400/30"
                    rel="noopener noreferrer"
                  >
                    <span>View Product</span>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12H19M12 5L19 12L12 19" />
                    </svg>
                  </a>

                  {/* Secondary Button */}
                  <a
                    href={banner.link}
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent text-white font-bold px-6 py-3 rounded-lg border-2 border-white/30 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 text-center text-sm sm:text-base group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Shop Now</span>
                    <svg
                      className="w-4 h-4 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Mini Banner - Desktop (Bottom Right) */}
            <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
              <div className="bg-black/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 max-w-xs rounded-r-lg shadow-xl">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Nouveautés</h3>
                <p className="text-sm text-gray-200 mb-3">Découvrez notre dernière collection</p>
                <a
                  href={banner.link}
                  className="inline-flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded transition-all duration-300"
                >
                  <span>Voir produit</span>
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12H19M12 5L19 12L12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mini Banner - Mobile (Bottom Center) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 lg:hidden w-[90%]">
              <div className="bg-black/80 backdrop-blur-sm border-t-4 border-yellow-500 p-3 rounded-lg shadow-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-yellow-400">offre spéciale</h3>
                  <p className="text-xs text-gray-200">découvrez notre dernière collection</p>
                </div>
                <a
                  href={banner.link}
                  className="inline-flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded transition-all duration-300 whitespace-nowrap"
                >
                  <span>Shop Now</span>
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12H19M12 5L19 12L12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Custom Navigation */}
      <div className="swiper-button-prev !left-4 !text-white after:!text-2xl !w-12 !h-12 !bg-black/50 !rounded-full hover:!bg-yellow-500 hover:!text-black transition-all backdrop-blur-sm"></div>
      <div className="swiper-button-next !right-4 !text-white after:!text-2xl !w-12 !h-12 !bg-black/50 !rounded-full hover:!bg-yellow-500 hover:!text-black transition-all backdrop-blur-sm"></div>

      {/* Modern Pagination */}
      <div className="swiper-pagination !bottom-20 md:!bottom-8 flex justify-center gap-1"></div>
    </Swiper>
  </div>
</section>
        {/* Promotion Banner - Optimisé pour mobile */}
        {/* <section className="py-6 md:py-8 bg-gradient-to-r from-yellow-500 to-yellow-400">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-2 md:p-3 mr-3 md:mr-4 shadow-md">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg md:text-xl">
                    Offres Spéciales
                  </h3>
                  <p className="text-black/80 text-sm md:text-base">
                    Jusqu'à 30% de réduction sur une sélection de produits
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white shadow-md"
              >
                <Link href="/promotions">
                  Voir toutes les offres
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section> */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4">
                Explorez nos collections
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-sans tracking-tight">
                Nos <span className="text-yellow-500">Catégories</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Découvrez notre sélection d'équipements premium pour tous vos
                besoins fitness
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={
                        category.image ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

                    {/* Icône de catégorie */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {category.id === "musculation" && (
                        <Dumbbell className="h-6 w-6 text-yellow-500" />
                      )}
                      {category.id === "cardio" && (
                        <Heart className="h-6 w-6 text-yellow-500" />
                      )}
                      {category.id === "crossfit" && (
                        <Activity className="h-6 w-6 text-yellow-500" />
                      )}
                      {category.id === "boxe" && (
                        <Flame className="h-6 w-6 text-yellow-500" />
                      )}
                      {category.id === "accessoires" && (
                        <Package className="h-6 w-6 text-yellow-500" />
                      )}
                      {category.id === "nutrition" && (
                        <Apple className="h-6 w-6 text-yellow-500" />
                      )}
                      {![
                        "musculation",
                        "cardio",
                        "crossfit",
                        "boxe",
                        "accessoires",
                        "nutrition",
                      ].includes(category.id) && (
                          <Sparkles className="h-6 w-6 text-yellow-500" />
                        ) && <Sparkles className="h-6 w-6 text-yellow-500" />}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 flex-grow">
                      {category.description ||
                        "Découvrez notre sélection de produits de qualité professionnelle pour tous vos besoins."}
                    </p>

                    <Link
                      href={category.href}
                      className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium group/link mt-auto"
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Badge nombre de produits */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    {category.productCount || "12+"} produits
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-medium rounded-xl"
              >
                <Link href="/categories">
                  Voir toutes les catégories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Products Section - Tabs responsives et cartes de produits améliorées */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Nos <span className="text-yellow-500">Produits</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez notre sélection de produits de qualité professionnelle
              </p>
            </div>

            <Tabs defaultValue="featured" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                <TabsList className="bg-white dark:bg-gray-700 shadow-md rounded-full p-1 border border-gray-100 dark:border-gray-600">
                  <TabsTrigger
                    value="featured"
                    className="text-sm md:text-base whitespace-nowrap rounded-full px-4 py-2"
                  >
                    Populaires
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="text-sm md:text-base whitespace-nowrap rounded-full px-4 py-2"
                  >
                    Nouveautés
                  </TabsTrigger>
                  <TabsTrigger
                    value="bestsellers"
                    className="text-sm md:text-base whitespace-nowrap rounded-full px-4 py-2"
                  >
                    Meilleures Ventes
                  </TabsTrigger>
                  <TabsTrigger
                    value="offers"
                    className="text-sm md:text-base whitespace-nowrap rounded-full px-4 py-2"
                  >
                    Offres Spéciales
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="featured">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {featuredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                    >
                      <div className="relative h-48 sm:h-52 overflow-hidden group">
                        <Image
                          src={
                            product.image ||
                            "/placeholder.svg?height=192&width=256" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={() => toggleFavorite(product)}
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center transition-colors shadow-md",
                              isInFavorites(product.id)
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50"
                            )}
                            aria-label={
                              isInFavorites(product.id)
                                ? "Retirer des favoris"
                                : "Ajouter aux favoris"
                            }
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4",
                                isInFavorites(product.id) && "fill-red-500"
                              )}
                            />
                          </button>
                        </div>
                        {product.isNew && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            Nouveau
                          </div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-2 h-12">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-9 w-9 bg-yellow-500 hover:bg-yellow-600 p-0 rounded-full shadow-md"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {newArrivals.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                    >
                      <div className="relative h-48 sm:h-52 overflow-hidden group">
                        <Image
                          src={
                            product.image ||
                            "/placeholder.svg?height=192&width=256" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={() => toggleFavorite(product)}
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center transition-colors shadow-md",
                              isInFavorites(product.id)
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50"
                            )}
                            aria-label={
                              isInFavorites(product.id)
                                ? "Retirer des favoris"
                                : "Ajouter aux favoris"
                            }
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4",
                                isInFavorites(product.id) && "fill-red-500"
                              )}
                            />
                          </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                          Nouveau
                        </div>
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-2 h-12">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-9 w-9 bg-yellow-500 hover:bg-yellow-600 p-0 rounded-full shadow-md"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bestsellers">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {bestSellers.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                    >
                      <div className="relative h-48 sm:h-52 overflow-hidden group">
                        <Image
                          src={
                            product.image ||
                            "/placeholder.svg?height=192&width=256" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={() => toggleFavorite(product)}
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center transition-colors shadow-md",
                              isInFavorites(product.id)
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50"
                            )}
                            aria-label={
                              isInFavorites(product.id)
                                ? "Retirer des favoris"
                                : "Ajouter aux favoris"
                            }
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4",
                                isInFavorites(product.id) && "fill-red-500"
                              )}
                            />
                          </button>
                        </div>
                        {product.isNew && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            Nouveau
                          </div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-2 h-12">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-9 w-9 bg-yellow-500 hover:bg-yellow-600 p-0 rounded-full shadow-md"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="offers">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {specialOffers.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                    >
                      <div className="relative h-48 sm:h-52 overflow-hidden group">
                        <Image
                          src={
                            product.image ||
                            "/placeholder.svg?height=192&width=256" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={() => toggleFavorite(product)}
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center transition-colors shadow-md",
                              isInFavorites(product.id)
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50"
                            )}
                            aria-label={
                              isInFavorites(product.id)
                                ? "Retirer des favoris"
                                : "Ajouter aux favoris"
                            }
                          >
                            <Heart
                              className={cn(
                                "h-4 w-4",
                                isInFavorites(product.id) && "fill-red-500"
                              )}
                            />
                          </button>
                        </div>
                        {product.isNew && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            Nouveau
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                          -{product.discount}%
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-2 h-12">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.oldPrice)}
                              </span>
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Économisez{" "}
                              {formatPrice(product.oldPrice - product.price)}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-9 w-9 bg-yellow-500 hover:bg-yellow-600 p-0 rounded-full shadow-md"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-xl shadow-md"
              >
                <Link href="/product">
                  Voir tous les produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Featured Product Section - Mise en page améliorée */}
        <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image Column */}
              <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden group shadow-2xl order-1 md:order-1">
                <Image
                  src={
                    featuredProduct.image ||
                    "/placeholder.svg?height=1000&width=800" ||
                    "/placeholder.svg"
                  }
                  alt={featuredProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                {featuredProduct.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-md shadow-lg">
                    -{featuredProduct.discount}% OFF
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div className="order-2 md:order-2">
                <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium mb-3 sm:mb-4 shadow-md">
                  Produit Vedette
                </span>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  {featuredProduct.name}
                </h2>

                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4 sm:h-5 sm:w-5",
                          i < Math.floor(featuredProduct.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 ml-2 text-sm sm:text-base">
                    ({featuredProduct.reviewCount || 0} avis)
                  </span>
                </div>

                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  {featuredProduct.description}
                </p>

                <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  {featuredProduct.features &&
                    featuredProduct.features
                      .slice(0, 4)
                      .map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                </ul>

                <div className="flex items-center mb-4 sm:mb-6">
                  {featuredProduct.oldPrice && (
                    <span className="text-gray-400 line-through text-lg sm:text-xl mr-2 sm:mr-3">
                      {formatPrice(featuredProduct.oldPrice)}
                    </span>
                  )}
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {formatPrice(featuredProduct.price)}
                  </span>

                  {featuredProduct.oldPrice && (
                    <span className="ml-2 sm:ml-3 bg-green-500/20 text-green-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                      Économisez{" "}
                      {formatPrice(
                        featuredProduct.oldPrice - featuredProduct.price
                      )}
                    </span>
                  )}
                </div>

                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-lg sm:rounded-xl shadow-md"
                    onClick={() => addToCart(featuredProduct)}
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    asChild
                    className="border-2 border-white text-white hover:bg-white/10 font-medium text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-lg sm:rounded-xl"
                  >
                    <Link href={`/product/${featuredProduct.slug}`}>
                      Voir les détails
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Brands Section */}
        <section className="py-16 md:py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Nos <span className="text-yellow-500">Marques Partenaires</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Nous collaborons avec les meilleures marques du marché pour vous
                offrir des produits d'exception
              </p>
            </div>

            <BrandsMarquee brands={brands} />
          </div>
        </section>
        {/* References Gallery */}
        <ReferencesSection />
        {/* Why Choose Us Section - Cartes améliorées */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Pourquoi Choisir <span className="text-yellow-500">IRONZ</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Nous nous engageons à vous offrir les meilleurs produits et
                services pour atteindre vos objectifs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                  <CheckCircle className="h-7 w-7 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Qualité Garantie
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tous nos produits sont sélectionnés avec soin et testés pour
                  garantir une qualité professionnelle.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                  <TrendingUp className="h-7 w-7 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Expertise Fitness
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Notre équipe d'experts est là pour vous conseiller et vous
                  aider à choisir les produits adaptés à vos besoins.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                  <Award className="h-7 w-7 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Marques Premium
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous collaborons avec les meilleures marques du marché pour
                  vous offrir des produits d'exception.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                  <Truck className="h-7 w-7 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Livraison Rapide
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Livraison rapide et sécurisée partout au Maroc avec suivi en
                  temps réel.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                  <CheckCircle className="h-7 w-7 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Satisfaction Client
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Votre satisfaction est notre priorité, avec un service client
                  disponible 7j/7 et une garantie de 30 jours.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* FAQ Section - Accordéon amélioré */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Questions <span className="text-yellow-500">Fréquentes</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Trouvez rapidement des réponses à vos questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white dark:bg-gray-700 mb-4 rounded-xl border border-gray-100 dark:border-gray-600 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-medium text-lg px-6 py-4 text-gray-900 dark:text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 px-6 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-10 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Vous ne trouvez pas la réponse à votre question ?
                </p>
                <Button
                  asChild
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-xl shadow-md"
                >
                  <Link href="/contact">
                    Contactez-nous
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Newsletter Section - Design amélioré */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4">
                <span>Restez informé</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Abonnez-vous à notre newsletter
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
                Recevez nos dernières offres, nouveautés et conseils fitness
                directement dans votre boîte mail.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  aria-label="Votre adresse email"
                  className="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl px-8 py-4 shadow-md">
                  S'abonner
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                En vous inscrivant, vous acceptez notre politique de
                confidentialité. Vous pouvez vous désinscrire à tout moment.
              </p>
            </motion.div>
          </div>
        </section>
        {/* ChatBot avec logo personnalisé */}
        <ChatBot />
      </main>
    </>
  );
}
