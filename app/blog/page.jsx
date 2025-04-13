"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  ArrowRight,
  Search,
  Bookmark,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { blogPosts, blogCategories, popularTags } from "@/data/blog-posts";
import Navbar from "@/components/navbar";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search term and active category
  useEffect(() => {
    let filtered = [...blogPosts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post.category === activeCategory);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, activeCategory]);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Featured posts (top 3 featured posts)
  const featuredPosts = blogPosts
    .filter((post) => post.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  // Handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
    

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blog-hero-dark.jpg"
            alt="Blog Hero"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300 leading-tight">
              Explorez notre univers
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10">
              Découvrez des articles inspirants, des conseils d'experts et les
              dernières tendances pour votre bien-être.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative max-w-xl mx-auto mb-10"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full pl-12 pr-4 py-3 h-14 bg-white/10 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 rounded-full shadow-lg transition-all duration-300 focus:bg-white/15"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full px-6 py-2 h-11 font-medium transition-all duration-300 hover:shadow-md hover:shadow-yellow-500/20"
                >
                  Rechercher
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-3">
              {popularTags.slice(0, 6).map((tag) => (
                <motion.div
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="outline"
                    className="px-4 py-1.5 cursor-pointer border-gray-600 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
                    onClick={() => setSearchTerm(tag)}
                  >
                    <Tag className="h-3 w-3 mr-1.5" />
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="flex flex-col items-center">
                <Badge
                  variant="secondary"
                  className="mb-4 px-4 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                >
                  À ne pas manquer
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Nos articles vedettes
                </h2>
                <div className="w-24 h-1 bg-yellow-500 rounded-full"></div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700"
                >
                  <Link href={`/blog/${post.id}`} className="block relative">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image || "/blog-placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-black font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </Badge>
                      <div className="absolute top-4 right-4">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-yellow-500 transition-all duration-300 shadow-sm"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(post.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.id}`} className="block">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3 border-2 border-white dark:border-gray-800 shadow-sm">
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                          <AvatarFallback className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Auteur
                          </p>
                        </div>
                      </div>

                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                        >
                          Lire plus
                          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex flex-col items-center">
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              >
                Nos articles
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Dernières publications
              </h2>
              <div className="w-24 h-1 bg-yellow-500 rounded-full"></div>
            </div>
          </motion.div>

          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-12"
          >
            <TabsList className="flex flex-wrap justify-center mb-10 bg-transparent gap-2">
              <TabsTrigger
                value="all"
                className="rounded-full px-5 py-2 m-0 data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Tous
              </TabsTrigger>
              {blogCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full px-5 py-2 m-0 data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              {filteredPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                      >
                        <Link
                          href={`/blog/${post.id}`}
                          className="block relative"
                        >
                          <div className="relative h-52 overflow-hidden">
                            <Image
                              src={post.image || "/blog-placeholder.jpg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            <Badge className="absolute top-3 left-3 bg-yellow-500 text-black font-medium px-2.5 py-0.5 rounded-full">
                              {post.category}
                            </Badge>
                            {post.trending && (
                              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Tendance
                              </Badge>
                            )}
                          </div>
                        </Link>

                        <div className="p-5">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(post.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>

                          <Link href={`/blog/${post.id}`} className="block">
                            <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2 border-2 border-white dark:border-gray-800">
                                <AvatarImage
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                />
                                <AvatarFallback className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                                  {post.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">
                                {post.author.name}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-gray-700 transition-colors duration-300"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <span className="mr-3">{post.likes}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-gray-700 transition-colors duration-300"
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-16">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="h-10 w-10 rounded-full hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300 transition-colors duration-300 disabled:opacity-50"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((number) => (
                          <Button
                            key={number}
                            variant={
                              currentPage === number ? "default" : "outline"
                            }
                            className={
                              currentPage === number
                                ? "bg-yellow-500 text-black hover:bg-yellow-600 h-10 w-10 rounded-full font-medium transition-all duration-300"
                                : "h-10 w-10 rounded-full hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300 transition-colors duration-300"
                            }
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </Button>
                        ))}

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            paginate(Math.min(totalPages, currentPage + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="h-10 w-10 rounded-full hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300 transition-colors duration-300 disabled:opacity-50"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-xl"
                >
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold mb-4">
                    Aucun article trouvé
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Aucun article ne correspond à vos critères de recherche.
                    Essayez d'autres termes ou catégories.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:shadow-md"
                  >
                    Réinitialiser les filtres
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/newsletter-dark.jpg"
            alt="Newsletter background"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              >
                Restez connecté
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ne manquez rien
              </h2>
              <p className="text-gray-300 mb-10 text-lg">
                Abonnez-vous à notre newsletter pour recevoir nos derniers
                articles et conseils directement dans votre boîte mail.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="flex-grow h-12 bg-white/10 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 rounded-full transition-all duration-300 focus:bg-white/15"
                  required
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium h-12 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
                  S'abonner
                </Button>
              </form>

              <p className="text-gray-400 text-sm mt-4">
                En vous inscrivant, vous acceptez de recevoir nos emails et
                confirmez avoir lu notre politique de confidentialité.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
