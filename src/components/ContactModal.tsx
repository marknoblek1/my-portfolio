import React, { useEffect, useState } from 'react';
import { Check, Copy, Mail, Send, X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ContactModalProps {
  isOpen: boolean;
  contextTitle: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  contextTitle,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    contextTitle || 'Project Inquiry'
  )}&body=${encodeURIComponent(
    `${name ? `Hi Mark,\n\nMy name is ${name}.\n\n` : 'Hi Mark,\n\n'}${message}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md rounded-[20px] border border-white/10 bg-[#101014] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#E61C45]">
              {siteConfig.designer.role}
            </p>
            <h2
              id="contact-modal-title"
              className="mt-1 font-display text-2xl font-bold text-white"
            >
              {contextTitle || "Let's work together"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact dialog"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {siteConfig.contact.ctaSubtitle}
        </p>

        {/* Direct Email Box */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail className="h-4 w-4 text-[#E61C45] shrink-0" />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="truncate text-sm font-medium text-white hover:text-[#E61C45] transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:border-[#E61C45] hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Compose quick email */}
        <div className="mt-5 space-y-3.5">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-medium text-zinc-400 mb-1.5"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-white/10 bg-[#080809] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#E61C45] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-medium text-zinc-400 mb-1.5"
            >
              Project Brief or Message
            </label>
            <textarea
              id="contact-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me a little about your timeline and goals..."
              className="w-full rounded-lg border border-white/10 bg-[#080809] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#E61C45] focus:outline-none resize-none"
            />
          </div>

          <a
            href={mailtoHref}
            className="w-full inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#E61C45] px-5 py-3 text-sm font-medium text-white hover:bg-[#F32952] transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Open in Email Client</span>
          </a>
        </div>
      </div>
    </div>
  );
};
