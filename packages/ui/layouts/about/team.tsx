'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TeamMember, UserStatus } from '@byteutils/types/team'
import React, { useState } from 'react'
import { FaUser, FaShieldAlt, FaCode, FaUsers, FaCrown, FaCog } from 'react-icons/fa'
import { MdSecurity, MdManageAccounts } from 'react-icons/md'
import { HiUserGroup, HiCode } from 'react-icons/hi'
import { RiUserStarFill, RiShieldCheckFill } from 'react-icons/ri'
import { BiRotateRight } from 'react-icons/bi'

export function TeamSection({
    teamData,
    isLoading,
    error
}: {
    teamData: TeamMember[]
    isLoading: boolean
    error: boolean
}) {
    // Sort team members by their top position index
    const sortedMembers = [...teamData].sort((a, b) => {
        const aIndex = Math.min(...a.positions.map(p => p.index))
        const bIndex = Math.min(...b.positions.map(p => p.index))
        return aIndex - bIndex
    })

    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8 section-gradient-primary relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 mt-3">
                {/* Enhanced Heading */}
                <motion.div
                    className="text-center mb-20 mt-3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className="inline-block mt-3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="inline-flex mt-3 items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-sm font-medium text-primary dark:text-primary-foreground">
                            <FaUsers className="w-4 h-4" />
                            Meet the Team
                        </span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-text-shine">
                            Dream Team Behind
                        </span>
                        <br />
                        <span className="text-foreground">Infinity List</span>
                    </h2>

                    <motion.p
                        className="text-xl mb-3 text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Passionate minds building the future with dedication, innovation, and love for the craft. Each
                        member brings unique expertise to create something extraordinary.
                    </motion.p>
                </motion.div>

                {/* Loading State with Enhanced Skeleton */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="glass-card p-8 relative overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />

                                {/* Avatar Skeleton */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 bg-muted rounded-full mx-auto animate-pulse" />
                                    <div className="absolute bottom-1 right-1/2 translate-x-8 w-5 h-5 bg-muted/60 rounded-full animate-pulse" />
                                </div>

                                {/* Content Skeleton */}
                                <div className="space-y-3">
                                    <div className="h-5 bg-muted rounded-lg animate-pulse" />
                                    <div className="h-4 bg-muted/70 rounded-lg animate-pulse w-3/4 mx-auto" />
                                    <div className="flex gap-2 justify-center mt-4">
                                        <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse" />
                                        <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : error ? (
                    <motion.div
                        className="text-center max-w-md mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="glass-card p-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaUsers className="w-10 h-10 text-destructive/70" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">Unable to Load Team</h3>
                            <p className="text-muted-foreground mb-4">
                                We&apos;re having trouble loading our team information right now.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Please check back later or visit our Discord server to meet the team!
                            </p>
                        </div>
                    </motion.div>
                ) : sortedMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sortedMembers.map((member, index) => (
                            <TeamCard key={member.user.id} member={member} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="text-center max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="glass-card p-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaUsers className="w-10 h-10 text-muted-foreground/70" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Team Information Unavailable</h3>
                            <p className="text-muted-foreground">
                                Our team information is currently being updated. Please check back soon!
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
    const [showAll, setShowAll] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const visiblePositions = showAll ? member.positions : member.positions.slice(0, 2)

    function getIconComponent(icon?: string): React.ReactElement | null {
        if (!icon) return null

        const iconMap: Record<string, React.ReactElement> = {
            'mdi:user': <RiUserStarFill className="w-3 h-3" />,
            'carbon:review': <RiShieldCheckFill className="w-3 h-3" />,
            'ic:outline-security': <MdSecurity className="w-3 h-3" />,
            'vaadin:group': <HiUserGroup className="w-3 h-3" />,
            'hugeicons:developer': <HiCode className="w-3 h-3" />,
            'material-symbols:3d-rotation-rounded': <BiRotateRight className="w-3 h-3" />
        }

        return iconMap[icon] || <FaUser className="w-3 h-3" />
    }

    function getStatusInfo(status: UserStatus) {
        switch (status) {
            case 'online':
                return {
                    color: 'bg-emerald-500',
                    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.6)]',
                    ring: 'ring-emerald-400/30',
                    pulse: 'animate-status-pulse'
                }
            case 'idle':
                return {
                    color: 'bg-amber-400',
                    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.6)]',
                    ring: 'ring-amber-300/30',
                    pulse: 'animate-status-pulse'
                }
            case 'dnd':
                return {
                    color: 'bg-red-500',
                    glow: 'shadow-[0_0_12px_rgba(239,68,68,0.6)]',
                    ring: 'ring-red-400/30',
                    pulse: 'animate-status-pulse'
                }
            case 'offline':
                return {
                    color: 'bg-slate-400',
                    glow: '',
                    ring: 'ring-slate-300/30',
                    pulse: ''
                }
            default:
                return {
                    color: 'bg-slate-400',
                    glow: '',
                    ring: 'ring-slate-300/30',
                    pulse: ''
                }
        }
    }

    const statusInfo = getStatusInfo(member.user.status)
    const isHighPriority = member.positions.some(pos => pos.index <= 3)

    return (
        <motion.div
            className={`
                glass-card p-8 text-center group cursor-pointer
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
                ${isHighPriority ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/5' : ''}
                ${isHovered ? 'scale-[1.02]' : ''}
            `}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.08,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
                boxShadow: isHighPriority
                    ? '0 25px 50px -12px rgba(var(--primary-rgb), 0.25)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
        >
            {/* High Priority Badge */}
            {isHighPriority && (
                <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.08 + 0.5, type: 'spring' }}
                >
                    <FaCrown className="w-3 h-3 text-white" />
                </motion.div>
            )}

            {/* Enhanced Profile Image */}
            <div className="relative mb-6">
                <motion.div
                    className="relative w-24 h-24 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {/* Animated Border */}
                    <div
                        className={`
                        absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-primary via-accent to-primary
                        ${isHovered ? 'animate-spin' : ''}
                        transition-all duration-1000
                    `}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden bg-card border-2 border-background">
                            {member.user.avatar ? (
                                <Image
                                    src={member.user.avatar}
                                    alt={member.user.display_name}
                                    width={96}
                                    height={96}
                                    className={`
                                        w-full h-full object-cover transition-transform duration-500
                                        ${isHovered ? 'scale-110' : 'scale-100'}
                                    `}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                                    <FaUsers className="w-8 h-8 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Status Indicator */}
                <motion.div
                    className={`
                        absolute bottom-1 right-1 w-6 h-6 rounded-full border-3 border-background
                        ${statusInfo.color} ${statusInfo.glow} ${statusInfo.pulse}
                        flex items-center justify-center
                    `}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    {member.user.status === 'online' && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                </motion.div>
            </div>

            {/* Enhanced Name & Username */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.3 }}
            >
                <h3 className="font-bold text-foreground mb-2 text-lg group-hover:text-primary transition-colors duration-300">
                    {member.user.display_name}
                </h3>
                <p className="text-sm text-muted-foreground font-mono bg-muted/30 px-3 py-1 rounded-full inline-block">
                    @{member.user.username}
                </p>
            </motion.div>

            {/* Enhanced Positions */}
            {member.positions.length > 0 && (
                <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 + 0.4 }}
                >
                    <div className="flex flex-wrap justify-center gap-2">
                        {visiblePositions.map((position, posIndex) => (
                            <motion.span
                                key={position.id}
                                className={`
                                    inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full
                                    transition-all duration-300 border
                                    ${
                                        position.index <= 3
                                            ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 text-primary'
                                            : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted/70'
                                    }
                                `}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.08 + 0.5 + posIndex * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                {getIconComponent(position.icon)}
                                <span className="capitalize">{position.name.replace(/_/g, ' ')}</span>
                            </motion.span>
                        ))}
                    </div>

                    {member.positions.length > 2 && (
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            className="text-xs text-primary hover:text-accent transition-colors duration-200 font-medium underline decoration-dotted underline-offset-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showAll ? 'Show less' : `+${member.positions.length - 2} more roles`}
                        </motion.button>
                    )}
                </motion.div>
            )}

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    )
}
