"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  Tag,
  MessageCircle,
  ThumbsUp,
  Copy,
} from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { blogPosts, blogCategories } from "@/data/blog-posts"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

// Markdown renderer
import ReactMarkdown from "react-markdown"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (params.slug) {
      const currentPost = blogPosts.find((p) => p.slug === params.slug)

      if (currentPost) {
        setPost(currentPost)

        // Find related posts (same category, excluding current)
        const related = blogPosts
          .filter((p) => p.category === currentPost.category && p.id !== currentPost.id)
          .slice(0, 3)

        setRelatedPosts(related)
      } else {
        // Post not found, redirect to blog listing
        router.push("/blog")
      }

      setIsLoading(false)
    }
  }, [params.slug, router])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Lien copié !",
      description: "Le lien de l'article a été copié dans votre presse-papier.",
    })
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    toast({
      title: "Commentaire envoyé !",
      description: "Votre commentaire a été soumis avec succès et sera publié après modération.",
    })
    setComment("")
    setName("")
    setEmail("")
  }

  const handleLike = () => {
    setLiked(!liked)
    if (!liked) {
      toast({
        title: "Article apprécié !",
        description: "Merci d'avoir partagé votre appréciation.",
      })
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    if (!bookmarked) {
      toast({
        title: "Article sauvegardé !",
        description: "Cet article a été ajouté à vos favoris.",
      })
    } else {
      toast({
        title: "Article retiré !",
        description: "Cet article a été retiré de vos favoris.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center">
          <div className="animate-pulse space-y-8 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <p className="mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
          <Button asChild>
            <Link href="/blog">Retour aux articles</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour aux articles
            </Link>

            <Badge className="bg-yellow-500 text-black hover:bg-yellow-600 mb-4">
              {blogCategories.find((cat) => cat.id === post.category)?.name || post.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-center text-gray-300 text-sm mb-6">
              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center mb-2 sm:mb-0">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime} de lecture</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-medium">{post.author.name}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-2/3"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link href={`/blog?tag=${tag}`} key={tag}>
                      <Badge
                        variant="outline"
                        className="px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-colors"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share and Actions */}
              <div className="flex flex-wrap items-center justify-between mb-12 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="mr-3 font-medium">Partager:</span>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Partager sur Facebook</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full h-8 w-8 text-sky-500 hover:text-sky-600 hover:bg-sky-100"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Partager sur Twitter</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full h-8 w-8 text-blue-700 hover:text-blue-800 hover:bg-blue-100"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">Partager sur LinkedIn</span>
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copier le lien</span>
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    className={liked ? "bg-yellow-500 text-black hover:bg-yellow-600" : ""}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {liked ? "Apprécié" : "J'apprécie"}
                  </Button>
                  <Button
                    variant={bookmarked ? "default" : "outline"}
                    size="sm"
                    className={bookmarked ? "bg-yellow-500 text-black hover:bg-yellow-600" : ""}
                    onClick={handleBookmark}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    {bookmarked ? "Sauvegardé" : "Sauvegarder"}
                  </Button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mb-12 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{post.author.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Expert Fitness & Nutrition</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Passionné de fitness et de bien-être depuis plus de 10 ans, {post.author.name} partage son expertise
                  pour aider chacun à atteindre ses objectifs de santé et de forme physique.
                </p>
              </div>

              {/* Comments Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Commentaires</h3>

                <div className="mb-8">
                  <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg mb-4">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Julie D." />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">Julie D.</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Il y a 3 jours</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Merci pour cet article très complet ! J'ai appris beaucoup de choses que je vais pouvoir mettre en
                      pratique dès demain.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Michel T." />
                        <AvatarFallback>MT</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">Michel T.</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Il y a 5 jours</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Excellent article, très bien documenté. J'aurais aimé avoir plus d'informations sur les aspects
                      pratiques, mais c'est déjà une excellente base.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitComment}>
                  <h4 className="text-xl font-bold mb-4">Laisser un commentaire</h4>
                  <div className="mb-4">
                    <Textarea
                      placeholder="Votre commentaire..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Votre email"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Publier le commentaire
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-1/3"
            >
              {/* Related Articles */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                  Articles similaires
                </h3>

                <div className="space-y-6">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost) => (
                      <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group block">
                        <div className="flex items-start">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium line-clamp-2 group-hover:text-yellow-600 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {new Date(relatedPost.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">Aucun article similaire trouvé.</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                  Catégories
                </h3>

                <div className="space-y-2">
                  {blogCategories.map((category) => (
                    <Link
                      href={`/blog?category=${category.id}`}
                      key={category.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {blogPosts.filter((p) => p.category === category.id).length}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-6 bg-black text-white rounded-lg">
                <h3 className="text-xl font-bold mb-3">Newsletter</h3>
                <p className="text-gray-300 mb-4">
                  Recevez nos derniers articles et conseils directement dans votre boîte mail.
                </p>

                <form className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    className="w-full p-3 bg-white/10 border-gray-700 text-white placeholder:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                    S'inscrire
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

