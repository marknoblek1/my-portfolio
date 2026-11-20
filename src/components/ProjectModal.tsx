import React, { useEffect } from 'react';
import { ExternalLink, Mail, X } from 'lucide-react';
import { ProjectShowcase } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import { ProjectVisualPlaceholder } from './ProjectVisualPlaceholder';

interface ProjectModalProps {
  project: ProjectShowcase | null;
  onClose: () => void;
  onOpenContact: (contextTitle?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] border border-white/10 bg-[#101014] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-widest text-[#E61C45]">
              {project.category}
            </p>
            <h2
              id="project-modal-title"
              className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <ProjectVisualPlaceholder project={project} />
        </div>

        <div className="mt-6 space-y-5">
          <p className="text-[15px] leading-relaxed text-zinc-300">
            {project.caseStudySummary.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
            <div>
              <p className="text-zinc-500 text-xs">Role</p>
              <p className="mt-1 font-medium text-white">
                {project.caseStudySummary.role}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Platform</p>
              <p className="mt-1 font-medium text-white">
                {project.caseStudySummary.platform}
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-zinc-500 text-xs mb-2.5">Key Deliverables</p>
            <ul className="space-y-1.5 text-sm text-zinc-300">
              {project.caseStudySummary.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E61C45] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <p className="text-xs text-zinc-400">
              External case study link can be configured in{' '}
              <code className="text-zinc-200">src/data/projects.ts</code>.
            </p>

            <div className="flex items-center gap-3">
              {project.externalUrl.trim() ? (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[#E61C45] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#F32952] transition-colors"
                >
                  <span>Open External Link</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContact(`Inquiry about ${project.title}`);
                  }}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[#E61C45] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#F32952] transition-colors cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Request Case Study ({siteConfig.contact.email})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
