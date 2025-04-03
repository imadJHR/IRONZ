"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Tag,
  ChevronLeft,
  ThumbsUp,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ArrowLeft,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blog-posts";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);

  // Fetch article data based on slug
  useEffect(() => {
    setIsLoading(true);

    // Find article by slug (in a real app, this would be an API call)
    const foundArticle = blogPosts.find((post) => post.id === slug);

    if (foundArticle) {
      setArticle(foundArticle);

      // Get related articles (same category, excluding current article)
      const related = blogPosts
        .filter(
          (post) => post.category === foundArticle.category && post.id !== slug
        )
        .slice(0, 3);

      setRelatedArticles(related);

      // Simulate loading comments
      setTimeout(() => {
        setComments([
          {
            id: 1,
            author: {
              name: "Marie Dupont",
              avatar: "/placeholder.svg?height=40&width=40&text=MD",
            },
            date: "2024-01-25",
            text: "Super article ! J'ai appris beaucoup de choses que je vais mettre en pratique dès demain.",
            likes: 5,
          },
          {
            id: 2,
            author: {
              name: "Pierre Martin",
              avatar: "/placeholder.svg?height=40&width=40&text=PM",
            },
            date: "2024-01-24",
            text: "Merci pour ces conseils très utiles. Est-ce que vous pourriez faire un article sur les étirements après l'entraînement ?",
            likes: 3,
          },
        ]);

        setIsLoading(false);
      }, 1000);
    } else {
      // Article not found, redirect to blog page
      router.push("/blog");
    }
  }, [slug, router]);

  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    // Add new comment (in a real app, this would be an API call)
    const newComment = {
      id: comments.length + 1,
      author: {
        name: "Vous",
        avatar: "/placeholder.svg?height=40&width=40&text=Vous",
      },
      date: new Date().toISOString().split("T")[0],
      text: commentText,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // Handle share link copy
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (isLoading || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Article Header */}
      <header className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image || "/placeholder.svg?height=800&width=1600"}
            alt={article.title}
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux articles
            </Link>

            <Badge className="mb-4 bg-yellow-500 text-black font-medium px-3 py-1 rounded-full">
              {article.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                  <AvatarImage
                    src={article.author.avatar}
                    alt={article.author.name}
                  />
                  <AvatarFallback className="bg-yellow-100 text-yellow-800">
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center ml-auto gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full border-gray-600 hover:bg-white/10 ${
                    liked ? "text-yellow-400 border-yellow-400" : "text-white"
                  }`}
                  onClick={() => setLiked(!liked)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {liked ? "Aimé" : "J'aime"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full border-gray-600 hover:bg-white/10 ${
                    bookmarked
                      ? "text-yellow-400 border-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  {bookmarked ? "Enregistré" : "Enregistrer"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-6">
              {/* Social Share Sidebar */}
              <div className="hidden md:block">
                <div className="sticky top-32 space-y-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-300"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-colors duration-300"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(article.title)}`,
                        "_blank"
                      )
                    }
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors duration-300"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          window.location.href
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 rounded-full ${
                      copied
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "hover:bg-gray-100 hover:text-gray-800 hover:border-gray-300"
                    } transition-colors duration-300`}
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Article Body */}
              <div className="flex-1">
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                  <p className="lead">{article.excerpt}</p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl,
                    eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                    ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
                    nisl sit amet nisl.
                  </p>

                  <h2>Les principes fondamentaux</h2>

                  <p>
                    Nullam quis risus eget urna mollis ornare vel eu leo. Cum
                    sociis natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. Nullam id dolor id nibh ultricies
                    vehicula ut id elit.
                  </p>

                  <p>
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                    dolor auctor. Duis mollis, est non commodo luctus, nisi erat
                    porttitor ligula, eget lacinia odio sem nec elit. Donec
                    ullamcorper nulla non metus auctor fringilla.
                  </p>

                  <h2>Comment mettre en pratique</h2>

                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Sed
                    posuere consectetur est at lobortis. Aenean eu leo quam.
                    Pellentesque ornare sem lacinia quam venenatis vestibulum.
                    Aenean lacinia bibendum nulla sed consectetur. Aenean
                    lacinia bibendum nulla sed consectetur.
                  </p>

                  <blockquote>
                    La constance est la clé du succès. Un entraînement régulier,
                    même court, est plus efficace qu'un entraînement intensif
                    mais irrégulier.
                  </blockquote>

                  <p>
                    Vestibulum id ligula porta felis euismod semper. Maecenas
                    faucibus mollis interdum. Donec id elit non mi porta gravida
                    at eget metus. Nullam quis risus eget urna mollis ornare vel
                    eu leo.
                  </p>

                  <h2>Conclusion</h2>

                  <p>
                    Nulla vitae elit libero, a pharetra augue. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Cras mattis
                    consectetur purus sit amet fermentum. Praesent commodo
                    cursus magna, vel scelerisque nisl consectetur et.
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-12">
                  <h3 className="text-lg font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-3 py-1 cursor-pointer hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300 transition-colors duration-300"
                      >
                        <Tag className="h-3 w-3 mr-1.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mobile Share Buttons */}
                <div className="md:hidden mb-12">
                  <h3 className="text-lg font-medium mb-3">Partager</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-300"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      <Facebook className="h-5 w-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-colors duration-300"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href
                          )}&text=${encodeURIComponent(article.title)}`,
                          "_blank"
                        )
                      }
                    >
                      <Twitter className="h-5 w-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors duration-300"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-10 w-10 rounded-full ${
                        copied
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "hover:bg-gray-100 hover:text-gray-800 hover:border-gray-300"
                      } transition-colors duration-300`}
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-700">
                      <AvatarImage
                        src={article.author.avatar}
                        alt={article.author.name}
                      />
                      <AvatarFallback className="bg-yellow-100 text-yellow-800 text-xl">
                        {article.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {article.author.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Coach sportif certifié et nutritionniste, spécialisé
                        dans l'optimisation des performances et la remise en
                        forme. Passionné par le partage de connaissances pour
                        aider chacun à atteindre ses objectifs.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300 transition-colors duration-300"
                        >
                          Voir le profil
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-black transition-colors duration-300"
                        >
                          Suivre
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    Commentaires ({comments.length})
                  </h3>

                  {/* Comment Form */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                    <h4 className="text-lg font-medium mb-4">
                      Laisser un commentaire
                    </h4>
                    <form onSubmit={handleSubmitComment}>
                      <Textarea
                        placeholder="Votre commentaire..."
                        className="mb-4 min-h-[120px] bg-white dark:bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                      />
                      <div className="flex gap-4">
                        <Input
                          type="text"
                          placeholder="Votre nom"
                          className="bg-white dark:bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                          required
                        />
                        <Input
                          type="email"
                          placeholder="Votre email"
                          className="bg-white dark:bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                          required
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          type="submit"
                          className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full px-6 transition-colors duration-300"
                        >
                          Publier
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={comment.author.avatar}
                              alt={comment.author.name}
                            />
                            <AvatarFallback className="bg-yellow-100 text-yellow-800">
                              {comment.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium">
                                {comment.author.name}
                              </h5>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(comment.date).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                              {comment.text}
                            </p>

                            <div className="flex items-center gap-4">
                              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-300 flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{comment.likes}</span>
                              </button>

                              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-300">
                                Répondre
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Articles similaires</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Link href={`/blog/${post.id}`} className="block relative">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Badge className="absolute top-3 left-3 bg-yellow-500 text-black font-medium px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </Badge>
                      </div>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(post.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <Link href={`/blog/${post.id}`} className="block">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-yellow-600 dark:text-yellow-400 font-medium text-sm hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors duration-300"
                      >
                        Lire l'article
                        <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
