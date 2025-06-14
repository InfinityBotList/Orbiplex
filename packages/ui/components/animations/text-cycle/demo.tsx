"use client";

import React from "react";
import { AnimatedTextCycle } from "./index";

const examples = {
    simple: ["Hello", "World", "Everyone"],
    colors: ["🎨 Red", "🌊 Blue", "🌿 Green", "💜 Purple"],
    emojis: ["🚀 Fast", "⚡ Dynamic", "✨ Beautiful"],
    bots: ["Music Bots", "Moderation Bots", "Fun Bots", "Utility Bots"],
    servers: ["Gaming", "Community", "Art", "Development", "Anime"],
};

export default function TextCycleDemo() {
    return (
        <div className="space-y-8 p-6">
            {/* Basic Example */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Basic Usage</h3>
                <div className="text-2xl font-bold">
                    <AnimatedTextCycle words={examples.simple} interval={2000} />
                </div>
            </div>

            {/* Colored Text Example */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">With Gradient Colors</h3>
                <div className="text-2xl font-bold">
                    I love{" "}
                    <AnimatedTextCycle
                        words={examples.colors}
                        interval={2500}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                    />
                </div>
            </div>

            {/* Emoji Example */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">With Emojis</h3>
                <div className="text-2xl font-bold">
                    Our platform is{" "}
                    <AnimatedTextCycle
                        words={examples.emojis}
                        interval={3000}
                        className="text-primary"
                    />
                </div>
            </div>

            {/* Bot List Example */}
            <div className="space-y-2 rounded-xl bg-muted/50 p-6">
                <h3 className="text-sm font-medium text-muted-foreground">Bot Categories Example</h3>
                <div className="text-3xl font-bold">
                    Discover{" "}
                    <AnimatedTextCycle
                        words={examples.bots}
                        interval={2800}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient"
                    />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Shows how the component can be used in the bot listing context
                </p>
            </div>

            {/* Server List Example */}
            <div className="space-y-2 rounded-xl bg-muted/50 p-6">
                <h3 className="text-sm font-medium text-muted-foreground">Server Categories Example</h3>
                <div className="text-3xl font-bold">
                    Join{" "}
                    <AnimatedTextCycle
                        words={examples.servers}
                        interval={2600}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] animate-gradient"
                    />
                    {" "}Servers
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Shows how the component can be used in the server listing context
                </p>
            </div>
        </div>
    );
}