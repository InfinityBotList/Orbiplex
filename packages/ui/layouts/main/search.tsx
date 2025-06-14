"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bot, Server, X, Loader2 } from "lucide-react";
import { mockSearchResults } from "@byteutils/mocks/search/main";
import { cn } from "@byteutils/functions/cn";
import Link from "next/link";
import Image from "next/image";


interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showCategories?: boolean;
}

export function BotSearchBar({
  className,
  placeholder = "Search for bots, servers, or categories...",
  showCategories = true,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle clicks outside of the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simulate search functionality
  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);

      // Simulate API call with delay
      const timeoutId = setTimeout(() => {
        setResults(mockSearchResults);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setResults(null);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults(null);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={searchRef}
      className={cn(
        "relative w-full",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center gap-2 w-full px-4 py-3 rounded-2xl transition-all duration-200",
          "bg-gradient-to-b from-card/80 to-background/80 backdrop-blur-xl",
          "shadow-lg shadow-primary/5",
          "border border-border/50 hover:border-border/80",
          isFocused ? "ring-2 ring-primary/20 border-primary/30" : ""
        )}
      >
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground/70 text-foreground"
          spellCheck={false}
        />
        <AnimatePresence mode="wait">
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="p-1 hover:bg-muted/80 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(isFocused && (query || showCategories)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2 p-2",
              "bg-gradient-to-b from-card/95 to-background/95 backdrop-blur-xl",
              "rounded-2xl border border-border/50 shadow-xl"
            )}
          >
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Quick Categories */}
                {showCategories && !query && (
                  <div className="p-2">
                    <div className="text-xs font-medium text-muted-foreground/70 mb-3 px-2">
                      POPULAR CATEGORIES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mockSearchResults.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          className={cn(
                            "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                            "bg-muted/50 hover:bg-primary/10 hover:text-primary",
                            "border border-border/50 hover:border-primary/30"
                          )}
                        >
                          {category.name}
                          <span className="ml-1.5 text-xs text-muted-foreground/70">
                            {category.count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {results && (
                  <>
                    {/* Bots */}
                    {results.bots.length > 0 && (
                      <div className="p-2">
                        <div className="text-xs font-medium text-muted-foreground/70 mb-3 px-2 flex items-center gap-2">
                          <Bot className="w-3 h-3" /> BOTS
                        </div>
                        <div className="space-y-1">
                          {results.bots.map((bot: any) => (
                            <Link
                              key={bot.id}
                              href={`/bots/${bot.id}`}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Image
                                src={bot.avatar}
                                alt={bot.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{bot.name}</div>
                                <div className="text-sm text-muted-foreground truncate">
                                  {bot.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Servers */}
                    {results.servers.length > 0 && (
                      <div className="p-2 border-t border-border/50">
                        <div className="text-xs font-medium text-muted-foreground/70 mb-3 px-2 flex items-center gap-2">
                          <Server className="w-3 h-3" /> SERVERS
                        </div>
                        <div className="space-y-1">
                          {results.servers.map((server: any) => (
                            <Link
                              key={server.id}
                              href={`/servers/${server.id}`}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Image
                                src={server.icon}
                                alt={server.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{server.name}</div>
                                <div className="text-sm text-muted-foreground truncate">
                                  {server.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
