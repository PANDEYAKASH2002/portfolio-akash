"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { MapPin, CalendarDays, CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-base relative z-10">
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <span className="section-label">Career</span>
          <h2 className="section-heading">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-3 sm:pl-6">
          {/* Timeline line */}
          <div className="timeline-line" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6 sm:space-y-8"
          >
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="timeline-dot" />

                {/* Glass Card */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 ml-3 sm:ml-6 group">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-bold text-black">
                          {exp.role}
                        </h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                            exp.type === "Full-time"
                              ? "border-black/15 text-black/60 bg-black/[0.03]"
                              : "border-black/10 text-black/45 bg-black/[0.02]"
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-black/70">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:items-end shrink-0">
                      <div className="flex items-center gap-1.5 text-sm text-black/50">
                        <CalendarDays size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-black/45">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-black/6 mb-6" />

                  {/* Achievements */}
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        className="flex items-start gap-3 text-black/65 text-sm leading-relaxed"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-black/35"
                        />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Index badge */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-lg border border-black/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-black/25">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
