"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personalInfo } from "@/lib/data";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS keys are configured
    if (!serviceId || !templateId || !publicKey) {
      // If keys are missing, inform user with a fallback option
      setStatus("error");
      setErrorMessage(
        "EmailJS credentials are not configured in your environment variables (.env.local). Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const templateParams = {
        name: name,
        from_name: name,
        email: email,
        from_email: email,
        reply_to: email,
        subject: subject || `Message from ${name}`,
        message: message,
        to_name: personalInfo.name,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      setStatus("error");
      const errorText =
        err && typeof err === "object" && "text" in err
          ? String((err as { text: unknown }).text)
          : "Failed to send email. Please try again or reach out directly.";
      setErrorMessage(errorText);
    }
  };

  const handleFallbackMailto = () => {
    const mailtoSubject = encodeURIComponent(subject || `Message from ${name || "Portfolio Visitor"}`);
    const mailtoBody = encodeURIComponent(
      `From: ${name} (${email})\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl border border-black/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <Mail size={16} />
                </div>
                <div>
                  <h3
                    id="email-modal-title"
                    className="text-base font-semibold text-black tracking-tight"
                  >
                    Send a Message
                  </h3>
                  <p className="text-xs text-black/50">
                    Get in touch with {personalInfo.name}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-black/50 hover:text-black hover:bg-black/5 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {status === "success" ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-1">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-black/60 max-w-sm mb-6">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 text-xs font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-xl border border-black/10 transition-colors"
                    >
                      Send Another
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-medium text-white bg-black hover:bg-black/90 rounded-xl transition-colors shadow-sm"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && errorMessage && (
                    <div className="p-3.5 bg-red-50/90 border border-red-200/80 rounded-xl flex items-start gap-3 text-red-700 text-xs">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                      <div className="flex-1 space-y-1.5">
                        <p>{errorMessage}</p>
                        {/* Fallback button if keys not configured or failed */}
                        <button
                          type="button"
                          onClick={handleFallbackMailto}
                          className="inline-flex items-center gap-1.5 font-medium underline text-red-800 hover:text-red-900 pt-1"
                        >
                          Send directly via default mail app →
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="email-modal-name"
                        className="block text-xs font-medium text-black/70 mb-1.5"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email-modal-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-black/[0.02] border border-black/10 rounded-xl text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email-modal-email"
                        className="block text-xs font-medium text-black/70 mb-1.5"
                      >
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email-modal-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 bg-black/[0.02] border border-black/10 rounded-xl text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email-modal-subject"
                      className="block text-xs font-medium text-black/70 mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="email-modal-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full px-3.5 py-2.5 bg-black/[0.02] border border-black/10 rounded-xl text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-modal-message"
                      className="block text-xs font-medium text-black/70 mb-1.5"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="email-modal-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Akash, I'd like to talk about..."
                      className="w-full px-3.5 py-2.5 bg-black/[0.02] border border-black/10 rounded-xl text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleFallbackMailto}
                      className="text-xs text-black/50 hover:text-black underline transition-colors"
                    >
                      Use Mail Client
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 text-xs font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-xl border border-black/10 transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-black hover:bg-black/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
