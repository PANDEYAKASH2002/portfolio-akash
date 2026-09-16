"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";
import MagneticIcon from "@/components/ui/MagneticIcon";
import EmailModal from "./EmailModal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ContactSection() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <section id="contact" className="section-base relative z-10 overflow-hidden">
      <div className="divider absolute top-0 left-0 right-0" />

      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Large heading */}
          <motion.div variants={itemVariants} className="mb-10 sm:mb-14 md:mb-16">
            <span className="section-label">Get In Touch</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-black mb-4">
              LET&apos;S BUILD
              <br />
              <span className="text-black/25">SOMETHING GREAT.</span>
            </h2>
            <p className="mt-4 max-w-xl text-black/60 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              I&apos;m always interested in building useful products, solving
              challenging problems, and working with modern web technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* Contact Info Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 sm:p-7 md:p-8"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/45 mb-6">
                Contact Details
              </h3>

              <div className="space-y-4 sm:space-y-5">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 group"
                  aria-label="Send email to Akash Pandey"
                >
                  <MagneticIcon strength={0.4}>
                    <div className="w-10 h-10 rounded-xl border border-black/10 bg-black/[0.03] flex items-center justify-center flex-shrink-0 group-hover:border-black/25 group-hover:bg-black/[0.06] transition-all duration-200">
                      <Mail size={16} className="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                  </MagneticIcon>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-black/40 mb-0.5">Email</p>
                    <p className="text-xs sm:text-sm text-black/80 group-hover:text-black transition-colors duration-200 truncate">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                  aria-label="Call Akash Pandey"
                >
                  <MagneticIcon strength={0.4}>
                    <div className="w-10 h-10 rounded-xl border border-black/10 bg-black/[0.03] flex items-center justify-center flex-shrink-0 group-hover:border-black/25 group-hover:bg-black/[0.06] transition-all duration-200">
                      <Phone size={16} className="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                  </MagneticIcon>
                  <div>
                    <p className="text-xs text-black/40 mb-0.5">Phone</p>
                    <p className="text-xs sm:text-sm text-black/80 group-hover:text-black transition-colors duration-200">
                      {personalInfo.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <MagneticIcon strength={0.3}>
                    <div className="w-10 h-10 rounded-xl border border-black/10 bg-black/[0.03] flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-black/50" />
                    </div>
                  </MagneticIcon>
                  <div>
                    <p className="text-xs text-black/40 mb-0.5">Location</p>
                    <p className="text-xs sm:text-sm text-black/80">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 sm:p-7 md:p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-black/45 mb-6">
                  Connect
                </h3>

                {/* Social links */}
                <div className="space-y-3 mb-6 sm:mb-8">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-black/10 hover:border-black/25 hover:bg-black/[0.04] transition-all duration-200 group shadow-xs"
                    aria-label="Visit LinkedIn profile"
                  >
                    <div className="flex items-center gap-3">
                      <MagneticIcon strength={0.4}>
                        <LinkedinIcon size={16} className="text-black/60 group-hover:text-black transition-colors" />
                      </MagneticIcon>
                      <span className="text-xs sm:text-sm text-black/80 group-hover:text-black font-medium transition-colors">
                        LinkedIn
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-black/40 group-hover:text-black transition-colors"
                    />
                  </a>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-black/10 hover:border-black/25 hover:bg-black/[0.04] transition-all duration-200 group shadow-xs"
                    aria-label="Visit GitHub profile"
                  >
                    <div className="flex items-center gap-3">
                      <MagneticIcon strength={0.4}>
                        <GithubIcon size={16} className="text-black/60 group-hover:text-black transition-colors" />
                      </MagneticIcon>
                      <span className="text-xs sm:text-sm text-black/80 group-hover:text-black font-medium transition-colors">
                        GitHub
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-black/40 group-hover:text-black transition-colors"
                    />
                  </a>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="btn-primary justify-center w-full cursor-pointer"
                  aria-label="Send email"
                >
                  <MagneticIcon strength={0.3}>
                    <Mail size={15} />
                  </MagneticIcon>
                  <span>Email Me</span>
                </button>
                <a
                  href={personalInfo.resumePath}
                  download="Akash_Pandey_Resume.pdf"
                  className="btn-secondary justify-center w-full"
                  aria-label="Download Resume"
                >
                  <MagneticIcon strength={0.3}>
                    <Download size={15} />
                  </MagneticIcon>
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </section>
  );
}
