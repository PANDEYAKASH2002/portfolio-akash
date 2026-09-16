"use client";

import { motion } from "framer-motion";
import { personalInfo, navLinks } from "@/lib/data";
import { Mail, ArrowUp } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";
import MagneticIcon from "@/components/ui/MagneticIcon";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-black/6">
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="container-wide px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-xs">
                <span className="text-white font-black text-sm">AP</span>
              </div>
              <span className="font-bold text-black tracking-wide text-sm sm:text-base">
                AKASH PANDEY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-black/45">Full-Stack JavaScript Developer</p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs sm:text-sm text-black/55 hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>

          {/* Social + Scroll to top with Magnetic vector icons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2.5"
          >
            <MagneticIcon strength={0.4}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-black/45 hover:text-black hover:border-black/25 hover:bg-black/5 transition-all duration-200"
              >
                <LinkedinIcon size={15} />
              </a>
            </MagneticIcon>

            <MagneticIcon strength={0.4}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-black/45 hover:text-black hover:border-black/25 hover:bg-black/5 transition-all duration-200"
              >
                <GithubIcon size={15} />
              </a>
            </MagneticIcon>

            <MagneticIcon strength={0.4}>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-black/45 hover:text-black hover:border-black/25 hover:bg-black/5 transition-all duration-200"
              >
                <Mail size={15} />
              </a>
            </MagneticIcon>

            <div className="w-px h-6 bg-black/15 mx-1" />

            <MagneticIcon strength={0.4}>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-black/45 hover:text-black hover:border-black/25 hover:bg-black/5 transition-all duration-200"
              >
                <ArrowUp size={15} />
              </button>
            </MagneticIcon>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="w-full h-px bg-black/6 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-black/45">
            © 2026 AKASH PANDEY. All rights reserved.
          </p>
          <p className="text-xs text-black/35 text-center sm:text-right">
            Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
