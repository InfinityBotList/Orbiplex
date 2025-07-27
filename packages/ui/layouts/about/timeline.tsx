import { motion } from 'framer-motion'
import { FaAward, FaCloud, FaRocket, FaServer, FaTools } from 'react-icons/fa'
import React from 'react'

interface TimelineItem {
    date: string
    title: string
    description: string
    icon: React.ElementType
    color: string
}

const milestones: TimelineItem[] = [
    {
        date: 'September 24, 2020',
        title: 'Infinity List Founded',
        description:
            'Created with the vision of providing an above-average bot listing service unlike existing platforms.',
        icon: FaRocket,
        color: 'bg-blue-600'
    },
    {
        date: 'Q4 2020',
        title: 'First 100 Bots',
        description: 'Reached our first major milestone with 100 verified bots and growing community engagement.',
        icon: FaAward,
        color: 'bg-green-600'
    },
    {
        date: '2021',
        title: 'API Launch',
        description: 'Launched comprehensive developer API with extensive documentation and SDK support.',
        icon: FaCloud,
        color: 'bg-purple-600'
    },
    {
        date: '2025',
        title: 'Orbiplex Rewrite',
        description:
            'Complete platform rewrite with modern tech stack, improved performance, and enhanced user experience.',
        icon: FaTools,
        color: 'bg-pink-600'
    },
    {
        date: '2025',
        title: 'Server Listings',
        description: 'Expanded beyond bots to include Discord server listings and community discovery features.',
        icon: FaServer,
        color: 'bg-cyan-600'
    }
]

export function TimelineComponent() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">Our Journey</h2>
                    <p className="text-lg text-gray-300">
                        From a simple idea to the leading bot listing platform - here&apos;s our story
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone: TimelineItem, index: number) => {
                            const IconComponent = milestone.icon
                            return (
                                <motion.div
                                    key={milestone.date + index}
                                    className="relative flex mt-2 items-start gap-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`relative z-10 w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40`}
                                    >
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Card */}
                                    <div className="flex-1 relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg hover:border-blue-400 hover:shadow-blue-500/30 transition-all duration-300">
                                        <div className="text-sm text-blue-400 font-medium mb-1">{milestone.date}</div>
                                        <h3 className="text-2xl font-semibold text-white mb-2">{milestone.title}</h3>
                                        <p className="text-gray-300">{milestone.description}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
