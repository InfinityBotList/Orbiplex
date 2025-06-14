"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";
import { Music, ShieldCheck, TrendingUp, Bot, Server } from "lucide-react";

import { HeroSection } from "@byteui/layouts/main/hero";
import { FeaturesSection } from "@byteui/layouts/main/features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 mt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Popular Bots Section */}
        <section className="py-28 px-4 bg-muted/30 dark:bg-secondary/20">
          <div className="container max-w-screen-xl mx-auto">
            <SectionDivider
              title="Popular Bots"
              subtitle="The most-used Discord bots by our community"
              link="/bots/popular"
              linkText="See More"
              alignment="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {popularBots.map((bot) => (
                <EnhancedBotCard
                  key={bot.id}
                  id={bot.id}
                  name={bot.name}
                  description={bot.description}
                  avatar={bot.avatar}
                  verified={bot.verified}
                  votes={bot.votes}
                  stars={bot.stars}
                  serverCount={bot.serverCount}
                  tags={bot.tags}
                  inviteUrl={bot.inviteUrl}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-28 px-4 bg-background dark:bg-background">
          <div className="container max-w-screen-xl mx-auto">
            <SectionDivider
              title="Popular Categories"
              subtitle="Browse Discord bots by category to find exactly what you need"
              link="/categories"
              linkText="View All Categories"
              alignment="left"
            />

            <CategoryGrid
              className="mt-12"
              categories={[
                {
                  name: "Music",
                  icon: <Music className="w-5 h-5 text-white" />,
                  description: "Discord bots for playing music, managing playlists, and enhancing your server's audio experience.",
                  count: 124,
                  href: "/categories/music",
                  gradientFrom: "#8467fa",
                  gradientTo: "#bd63f9"
                },
                {
                  name: "Moderation",
                  icon: <ShieldCheck className="w-5 h-5 text-white" />,
                  description: "Tools to help you moderate your server, prevent spam, and keep your community safe.",
                  count: 98,
                  href: "/categories/moderation",
                  gradientFrom: "#3b82f6",
                  gradientTo: "#60a5fa"
                },
                {
                  name: "Leveling",
                  icon: <TrendingUp className="w-5 h-5 text-white" />,
                  description: "Track user activity, award XP, and create engaging progression systems for your server.",
                  count: 57,
                  href: "/categories/leveling",
                  gradientFrom: "#10b981",
                  gradientTo: "#34d399"
                },
                {
                  name: "Economy",
                  icon: <Bot className="w-5 h-5 text-white" />,
                  description: "Create virtual economies with currencies, shops, and games to enhance engagement.",
                  count: 72,
                  href: "/categories/economy",
                  gradientFrom: "#f97316",
                  gradientTo: "#fb923c"
                },
                {
                  name: "Gaming",
                  icon: <Server className="w-5 h-5 text-white" />,
                  description: "Bots for gaming features, stats tracking, matchmaking, and enhancing gaming experiences.",
                  count: 86,
                  href: "/categories/gaming",
                  gradientFrom: "#14b8a6",
                  gradientTo: "#2dd4bf"
                },
                {
                  name: "Utility",
                  icon: <Bot className="w-5 h-5 text-white" />,
                  description: "Multi-purpose utility bots with various functions to enhance your Discord server.",
                  count: 135,
                  href: "/categories/utility",
                  gradientFrom: "#ec4899",
                  gradientTo: "#f472b6"
                }
              ]}
            />
          </div>
        </section>

        {/* Featured Servers Section */}
        <section className="py-28 px-4 bg-muted/30 dark:bg-secondary/20">
          <div className="container max-w-screen-xl mx-auto">
            <SectionDivider
              title="Featured Servers"
              subtitle="Discover unique communities hand-selected by our team"
              link="/servers"
              linkText="View All Servers"
              alignment="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {featuredServers.map((server) => (
                <EnhancedServerCard
                  key={server.id}
                  id={server.id}
                  name={server.name}
                  description={server.description}
                  icon={server.icon}
                  banner={server.banner}
                  verified={server.verified}
                  members={server.members}
                  online={server.online}
                  stars={server.stars}
                  tags={server.tags}
                  inviteUrl={server.inviteUrl}
                  guildFeatures={server.guildFeatures}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Bots Carousel */}
        <section className="py-28 px-4 bg-muted/30 dark:bg-secondary/20">
          <div className="container max-w-screen-xl mx-auto">
            <SectionDivider
              title="Trending This Week"
              subtitle="The Discord bots gaining popularity right now"
              link="/trending"
              linkText="View All Trending"
              alignment="left"
            />

            <div className="mt-12">
              <CollectionCarousel itemsPerView={3} autoplay={true} showArrows={true} showDots={true}>
                {[
                  {
                    id: "meme-generator",
                    name: "Meme Generator",
                    description: "Create and share memes directly in your Discord server with hundreds of templates.",
                    avatar: "https://cdn.discordapp.com/avatars/123456111111111678/abcdef1234567890.png",
                    banner: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1000",
                    verified: true,
                    votes: 3789,
                    stars: 4.7,
                    serverCount: 12980,
                    tags: ["Fun", "Memes", "Images", "Entertainment"],
                    inviteUrl: "https://discord.com/oauth2/authorize?client_id=123456111111111678&scope=bot"
                  },
                  {
                    id: "movie-night",
                    name: "Movie Night",
                    description: "Schedule movie nights, vote on films, and sync watching with friends.",
                    avatar: "https://cdn.discordapp.com/avatars/22222222222222789/bcdefg1234567890.png",
                    banner: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000",
                    verified: true,
                    votes: 2845,
                    stars: 4.6,
                    serverCount: 9876,
                    tags: ["Entertainment", "Movies", "Scheduling", "Fun"],
                    inviteUrl: "https://discord.com/oauth2/authorize?client_id=22222222222222789&scope=bot"
                  },
                  {
                    id: "ai-assistant",
                    name: "AI Assistant",
                    description: "AI-powered assistant for answering questions, generating content, and helping with tasks.",
                    avatar: "https://cdn.discordapp.com/avatars/33333333333333890/cdefgh1234567890.png",
                    banner: "https://images.unsplash.com/photo-1677442135308-8337cefd3bf9?q=80&w=1000",
                    verified: true,
                    votes: 6543,
                    stars: 4.9,
                    serverCount: 23456,
                    tags: ["AI", "Utility", "Productivity", "Tools"],
                    inviteUrl: "https://discord.com/oauth2/authorize?client_id=33333333333333890&scope=bot"
                  },
                  {
                    id: "giveaway",
                    name: "Giveaway Master",
                    description: "Run giveaways with customizable requirements, roles, and automatic winner selection.",
                    avatar: "https://cdn.discordapp.com/avatars/44444444444444901/defghi1234567890.png",
                    banner: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000",
                    verified: false,
                    votes: 3210,
                    stars: 4.2,
                    serverCount: 7654,
                    tags: ["Giveaways", "Events", "Fun", "Community"],
                    inviteUrl: "https://discord.com/oauth2/authorize?client_id=44444444444444901&scope=bot"
                  }
                ].map((bot) => (
                  <VerticalBotCard
                    key={bot.id}
                    id={bot.id}
                    name={bot.name}
                    description={bot.description}
                    avatar={bot.avatar}
                    banner={bot.banner}
                    verified={bot.verified}
                    votes={bot.votes}
                    stars={bot.stars}
                    featured={false}
                    serverCount={bot.serverCount}
                    tags={bot.tags}
                    inviteUrl={bot.inviteUrl}
                  />
                ))}
              </CollectionCarousel>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="py-28 px-4 bg-background dark:bg-background">
          <div className="container max-w-screen-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Infinity List <span className="text-gradient">by the Numbers</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
                Join the ever-growing community of Discord bot and server enthusiasts
              </p>
            </motion.div>

            <BotStatsDashboard
              votes={384756}
              stars={4.7}
              servers={12467}
              users={2500000}
              reviews={8934}
              uptime={99.8}
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-28 px-4 bg-muted/30 dark:bg-secondary/20">
          <div className="container max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover why thousands of Discord communities and bot developers choose Infinity List
              </p>
            </motion.div>

            <TestimonialsGrid
              className="mt-12"
              testimonials={[
                {
                  quote: "Infinity List helped me find the perfect music bot for my server. The detailed reviews and features list made it easy to choose.",
                  author: "Alex Johnson",
                  role: "Server Owner",
                  avatar: "https://i.pravatar.cc/150?img=1"
                },
                {
                  quote: "As a bot developer, I've seen a significant increase in users since listing on Infinity List. The platform is a game-changer!",
                  author: "Sarah Chen",
                  role: "Bot Developer",
                  avatar: "https://i.pravatar.cc/150?img=5"
                },
                {
                  quote: "The categories and filtering options make it so easy to find exactly what you're looking for. Best Discord resource out there!",
                  author: "Miguel Rodriguez",
                  role: "Discord Moderator",
                  avatar: "https://i.pravatar.cc/150?img=3"
                }
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 px-4">
          <div className="container max-w-screen-xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Dynamic background with animated gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-accent"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Mesh grid pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 2px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Blob shapes */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] rounded-full bg-white/10 mix-blend-overlay filter blur-3xl" />
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] rounded-full bg-white/10 mix-blend-overlay filter blur-3xl" />

              {/* Content */}
              <div className="relative py-20 px-6 md:px-16 text-center text-white z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-bold mb-6"
                >
                  Ready to showcase your creation?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg mb-10 max-w-2xl mx-auto opacity-90"
                >
                  Add your Discord bot or server to Infinity List and reach thousands of potential users.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                  <Link
                    href="/add-bot"
                    className="px-8 py-4 rounded-xl bg-white/95 text-primary font-semibold hover:bg-white shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Add Your Bot
                  </Link>
                  <Link
                    href="/add-server"
                    className="px-8 py-4 rounded-xl bg-transparent border-2 border-white/80 text-white font-semibold hover:bg-white/10 shadow-lg hover:shadow-white/10 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Add Your Server
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
