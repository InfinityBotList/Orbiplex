"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, Server, Users, MessageCircle, Clock } from "lucide-react";
import { cn } from "@byteutils/functions/cn";

interface BotStatsDashboardProps {
  votes: number;
  stars: number;
  servers: number;
  users?: number;
  reviews?: number;
  uptime?: number; // percentage
  className?: string;
}

export function BotStatsDashboard({
  votes,
  stars,
  servers,
  users,
  reviews,
  uptime,
  className,
}: BotStatsDashboardProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", className)}>
      <StatCard
        icon={<Heart className="w-5 h-5 text-white" />}
        label="Votes"
        value={votes.toLocaleString()}
        color="#a855f7" // Purple
        index={0}
      />
      <StatCard
        icon={<Star className="w-5 h-5 text-white" />}
        label="Rating"
        value={stars.toFixed(1)}
        color="#f59e0b" // Amber
        index={1}
      />
      <StatCard
        icon={<Server className="w-5 h-5 text-white" />}
        label="Servers"
        value={servers.toLocaleString()}
        color="#3b82f6" // Blue
        index={2}
      />
      {users !== undefined && (
        <StatCard
          icon={<Users className="w-5 h-5 text-white" />}
          label="Users"
          value={users.toLocaleString()}
          color="#06b6d4" // Cyan
          index={3}
        />
      )}
      {reviews !== undefined && (
        <StatCard
          icon={<MessageCircle className="w-5 h-5 text-white" />}
          label="Reviews"
          value={reviews.toLocaleString()}
          color="#ec4899" // Pink
          index={4}
        />
      )}
      {uptime !== undefined && (
        <StatCard
          icon={<Clock className="w-5 h-5 text-white" />}
          label="Uptime"
          value={`${uptime.toFixed(1)}%`}
          color="#10b981" // Emerald
          index={5}
        />
      )}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  index?: number;
}

function StatCard({ icon, label, value, color, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="glass-card p-6 flex flex-col items-center text-center"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-md"
        style={{
          background: `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`,
          boxShadow: `0 4px 12px ${color}30`
        }}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

// Helper function to darken or lighten a color
function adjustColor(color: string, amount: number): string {
  // Return a slightly adjusted color if it's a hex
  if (color.startsWith('#')) {
    return color;
  }
  return color;
}
