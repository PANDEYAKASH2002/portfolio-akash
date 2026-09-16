"use client";

import { motion } from "framer-motion";
import { certification } from "@/lib/data";
import { Award, CalendarDays, MapPin } from "lucide-react";
import MagneticIcon from "@/components/ui/MagneticIcon";

export default function CertificationSection() {
  return (
    <section id="certification" className="section-base relative z-10">
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 sm:mb-12"
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-heading">
            Certifi<span className="text-black/25">cation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-2xl"
        >
          <div className="glass-card rounded-2xl p-5 sm:p-7 md:p-8 relative overflow-hidden">
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-black/6 rounded-bl-[4rem]" />

            <div className="flex items-start gap-4 mb-6">
              <MagneticIcon strength={0.4}>
                <div className="w-12 h-12 rounded-xl border border-black/10 bg-black/[0.03] flex items-center justify-center flex-shrink-0 group hover:border-black/25 hover:bg-black/[0.06] transition-all">
                  <Award size={20} className="text-black/60 group-hover:text-black transition-colors" />
                </div>
              </MagneticIcon>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-1">
                  {certification.name}
                </h3>
                <p className="text-black/60 font-medium text-sm sm:text-base">{certification.issuer}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-black/45 text-xs sm:text-sm">
                <CalendarDays size={13} />
                {certification.period}
              </div>
              <div className="flex items-center gap-2 text-black/45 text-xs sm:text-sm">
                <MapPin size={13} />
                {certification.location}
              </div>
            </div>

            <div className="w-full h-px bg-black/6 mb-5" />

            <p className="text-black/60 text-xs sm:text-sm leading-relaxed">
              {certification.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
