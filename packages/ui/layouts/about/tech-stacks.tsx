import { motion } from 'framer-motion'
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiPostgresql,
    SiRedis,
    SiDocker,
    SiCloudflare
} from 'react-icons/si'
import { FaServer, FaMobile, FaCloudUploadAlt, FaLock } from 'react-icons/fa'
import { TbApi } from 'react-icons/tb'

interface TechItem {
    name: string
    icon: React.ElementType
    description: string
    color: string
}

const techStack: Record<string, TechItem[]> = {
    frontend: [
        {
            name: 'Next.js 15',
            icon: SiNextdotjs,
            description: 'React framework with App Router',
            color: 'text-slate-900 dark:text-white'
        },
        {
            name: 'React 18',
            icon: SiReact,
            description: 'Component-based UI library',
            color: 'text-blue-500'
        },
        {
            name: 'TypeScript',
            icon: SiTypescript,
            description: 'Type-safe JavaScript',
            color: 'text-blue-600'
        },
        {
            name: 'Tailwind CSS',
            icon: SiTailwindcss,
            description: 'Utility-first CSS framework',
            color: 'text-cyan-500'
        },
        {
            name: 'Framer Motion',
            icon: SiFramer,
            description: 'Animation library for React',
            color: 'text-pink-500'
        }
    ],
    backend: [
        {
            name: 'Plexus',
            icon: TbApi,
            description: 'Custom TypeScript API backend',
            color: 'text-orange-600'
        },
        {
            name: 'PostgreSQL',
            icon: SiPostgresql,
            description: 'Relational database',
            color: 'text-blue-700'
        },
        {
            name: 'Redis',
            icon: SiRedis,
            description: 'In-memory data store',
            color: 'text-red-600'
        }
    ],
    infrastructure: [
        {
            name: 'Docker',
            icon: SiDocker,
            description: 'Containerization platform',
            color: 'text-blue-500'
        },
        {
            name: 'WebSocket',
            icon: SiCloudflare,
            description: 'Real-time communication',
            color: 'text-yellow-600'
        },
        {
            name: 'Cloudflare',
            icon: SiCloudflare,
            description: 'CDN and security',
            color: 'text-orange-500'
        },
        {
            name: 'OAuth2',
            icon: FaLock,
            description: 'Multi-platform authentication',
            color: 'text-green-600'
        }
    ]
}

export function TechStacks() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Built with Modern Technology
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Powered by cutting-edge technologies for optimal performance, scalability, and developer
                        experience
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.2 }}
                        >
                            <h3 className="text-2xl font-semibold text-white mt-4 capitalize flex items-center gap-3">
                                {category === 'frontend' && <FaMobile className="text-blue-400" />}
                                {category === 'backend' && <FaServer className="text-green-400" />}
                                {category === 'infrastructure' && <FaCloudUploadAlt className="text-purple-400 mt-2" />}
                                {category}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                {technologies.map((tech, techIndex) => {
                                    const IconComponent = tech.icon
                                    return (
                                        <motion.div
                                            key={tech.name}
                                            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20 hover:border-blue-400 hover:shadow-blue-500/30 transition-all duration-300 group cursor-pointer overflow-hidden"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.2 + techIndex * 0.05 }}
                                            whileHover={{ scale: 1.04 }}
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>

                                            <div className="flex items-center gap-3 mb-3 relative z-10">
                                                <IconComponent
                                                    className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                                                />
                                                <h4 className="font-semibold text-white text-lg">{tech.name}</h4>
                                            </div>
                                            <p className="text-sm text-gray-300 relative z-10">{tech.description}</p>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
