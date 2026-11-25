import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "./SocialIcons";
import { personal } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type FormState = "idle" | "sending" | "success" | "error";

const socialLinks = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: TelegramIcon, href: personal.social.telegram, label: "Telegram" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("sending");
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-500 ${
      errors[field]
        ? "border-red-400 dark:border-red-500/60"
        : "border-zinc-200 dark:border-zinc-700"
    }`;

  return (
    <section id="contact" className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Contact
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Let's work together.
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            Have a project in mind? Looking to collaborate? Or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Info panel */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-colors duration-300">
              <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight">
                Get in touch
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                I'm currently available for freelance projects and full-time opportunities. Response time is typically within 24 hours.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="group flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-indigo-50/70 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {personal.email}
                  </span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                  Follow me
                </p>
                <div className="flex gap-2.5">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-zinc-100 hover:bg-indigo-50 dark:hover:bg-zinc-800 hover:border-indigo-200 dark:hover:border-zinc-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability card */}
            <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-800/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Available for hire
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Currently open to new opportunities and interesting projects.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass("subject")}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your project, timeline, and budget..."
                  className={`${inputClass("message")} resize-none`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={formState === "sending" || formState === "success"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                {formState === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : formState === "success" ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback messages */}
              {formState === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-sm"
                >
                  <CheckCircle size={16} />
                  Thank you! I'll get back to you as soon as possible.
                </motion.div>
              )}
              {formState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 text-sm"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
