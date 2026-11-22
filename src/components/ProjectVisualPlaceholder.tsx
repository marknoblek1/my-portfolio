import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ProjectShowcase } from '../data/projects';
import { usePointerCapability } from '../hooks/usePointerCapability';

interface ProjectVisualPlaceholderProps {
  project: ProjectShowcase;
}

/**
 * Renders the user's real project asset when `project.imageSrc` is provided.
 * When missing, displays a clean wireframe device composition matching the
 * exact spatial placement, tilt, and showcase backdrop of the reference design.
 */
export const ProjectVisualPlaceholder: React.FC<ProjectVisualPlaceholderProps> = ({
  project,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const { canHover } = usePointerCapability();
  const hasValidImage = Boolean(project.imageSrc.trim()) && !imageFailed;

  if (hasValidImage) {
    return (
      <div
        className={`group relative w-full rounded-[20px] overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
          canHover ? 'hover:-translate-y-[3px]' : ''
        }`}
      >
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className={`block w-full h-auto object-cover transition-transform duration-300 ease-out ${
            canHover ? 'group-hover:scale-[1.04]' : ''
          }`}
        />
      </div>
    );
  }

  // Emerald card placeholder (Project 1: AVOIR Real Estate & Furniture)
  if (project.theme === 'emerald') {
    return (
      <div className="group relative w-full aspect-[16/11.5] rounded-[20px] overflow-hidden bg-gradient-to-br from-[#097C5C] via-[#066348] to-[#034432] p-5 sm:p-7 lg:p-8 shadow-2xl">
        {/* Subtle inner light gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.12),transparent_55%)]"
        />

        {/* 3-screen mobile showcase placeholder composition */}
        <div className="relative h-full w-full flex items-end justify-center gap-2.5 sm:gap-4 pt-4">
          {/* Left shorter splash phone frame */}
          <div className="w-[27%] h-[78%] rounded-[18px] sm:rounded-[22px] border-[3px] border-[#111827] bg-[#0B2220] p-2 sm:p-3 flex flex-col justify-between shadow-xl">
            <div className="mx-auto h-1 w-8 rounded-full bg-white/15" />
            <div className="space-y-2 my-auto">
              <div className="mx-auto h-6 w-6 rounded-lg bg-emerald-400/20 border border-emerald-300/25" />
              <div className="mx-auto h-2 w-3/4 rounded bg-white/25" />
              <div className="mx-auto h-1.5 w-1/2 rounded bg-white/15" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 sm:h-5 w-full rounded-md bg-emerald-500/40" />
              <div className="h-4 sm:h-5 w-full rounded-md border border-white/20" />
            </div>
          </div>

          {/* Center taller listing phone frame */}
          <div className="w-[33%] h-[98%] rounded-[20px] sm:rounded-[26px] border-[3px] border-[#111827] bg-[#F8FAFC] p-2 sm:p-3 flex flex-col justify-between shadow-2xl">
            <div className="space-y-2">
              <div className="h-24 sm:h-32 w-full rounded-xl bg-slate-200 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-slate-400" />
              </div>
              <div className="h-2.5 w-4/5 rounded bg-slate-800/80" />
              <div className="h-2 w-2/3 rounded bg-slate-400/60" />
              <div className="h-1.5 w-full rounded bg-slate-300/70" />
              <div className="h-1.5 w-5/6 rounded bg-slate-300/70" />
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
              <div className="h-2.5 w-12 rounded bg-slate-700/70" />
              <div className="h-5 w-12 rounded-md bg-[#065F46]" />
            </div>
          </div>

          {/* Right tall summary phone frame */}
          <div className="w-[31%] h-[92%] rounded-[20px] sm:rounded-[24px] border-[3px] border-[#111827] bg-[#F8FAFC] p-2 sm:p-3 flex flex-col justify-between shadow-xl">
            <div className="space-y-2">
              <div className="h-2.5 w-2/3 rounded bg-slate-700/80 mx-auto" />
              <div className="space-y-1.5 pt-2">
                <div className="h-2 w-full rounded bg-slate-200" />
                <div className="h-2 w-4/5 rounded bg-slate-200" />
                <div className="h-2 w-full rounded bg-slate-200" />
              </div>
              <div className="mt-3 h-10 w-full rounded-lg bg-slate-100 border border-slate-200" />
            </div>
            <div className="h-5 sm:h-6 w-full rounded-md bg-[#065F46]" />
          </div>
        </div>

        {/* Quiet placeholder label */}
        <div className="pointer-events-none absolute bottom-3 right-4 flex items-center gap-1.5 text-[11px] font-medium text-emerald-100/70">
          <ImageIcon className="h-3.5 w-3.5" />
          <span>{project.placeholderScreens.subtitle} · Placeholder</span>
        </div>
      </div>
    );
  }

  // Floating angled showcase placeholder (Project 2: AVOIR Furniture Shopping)
  if (project.theme === 'floating') {
    return (
      <div className="relative w-full aspect-[16/11.5] flex items-center justify-center overflow-visible">
        {/* Subtle ambient radial shadow behind floating devices */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-full bg-white/[0.03] blur-3xl"
        />

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Back-left tilted phone wireframe */}
          <div className="absolute left-[10%] sm:left-[14%] top-[18%] w-[30%] h-[72%] -rotate-12 rounded-[22px] border-[3px] border-zinc-800 bg-[#F9FAFB] p-2.5 sm:p-3.5 shadow-2xl flex flex-col justify-between opacity-95">
            <div className="space-y-2">
              <div className="h-2 w-1/2 rounded bg-slate-700/75" />
              <div className="space-y-2 pt-2">
                <div className="h-6 rounded-lg bg-slate-200/80" />
                <div className="h-6 rounded-lg bg-slate-200/80" />
                <div className="h-6 rounded-lg bg-slate-200/80" />
              </div>
            </div>
            <div className="h-4 w-full rounded bg-slate-900/15" />
          </div>

          {/* Right tilted product detail wireframe */}
          <div className="absolute right-[4%] sm:right-[6%] bottom-[4%] w-[31%] h-[74%] rotate-6 rounded-[22px] border-[3px] border-zinc-800 bg-[#F9FAFB] p-2.5 sm:p-3.5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-24 sm:h-28 w-full rounded-xl bg-amber-900/10 border border-slate-200 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-slate-400" />
              </div>
              <div className="h-2.5 w-1/2 rounded bg-slate-800/80" />
              <div className="h-1.5 w-full rounded bg-slate-300" />
              <div className="h-1.5 w-4/5 rounded bg-slate-300" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-1">
                <span className="h-3 w-3 rounded-full bg-slate-900" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-rose-400" />
              </div>
              <div className="h-4 w-12 rounded bg-slate-200" />
            </div>
          </div>

          {/* Front upright storefront wireframe */}
          <div className="relative z-10 w-[36%] h-[88%] rounded-[26px] border-[4px] border-zinc-900 bg-white p-3 sm:p-4 shadow-[0_24px_60px_rgba(0,0,0,0.65)] flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="h-5 w-5 rounded-full bg-slate-200" />
                <div className="h-2 w-16 rounded bg-slate-300" />
              </div>
              <div className="h-6 w-full rounded-lg bg-slate-100 border border-slate-200" />
              <div className="h-20 sm:h-24 w-full rounded-xl bg-zinc-900 p-2.5 flex flex-col justify-end">
                <div className="h-2 w-3/4 rounded bg-white/75 mb-1.5" />
                <div className="h-4 w-14 rounded bg-white/90" />
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <div className="h-7 rounded-md bg-slate-100" />
                <div className="h-7 rounded-md bg-slate-100" />
                <div className="h-7 rounded-md bg-slate-100" />
                <div className="h-7 rounded-md bg-slate-100" />
              </div>
            </div>
            <div className="h-10 sm:h-12 w-full rounded-xl bg-emerald-900/15 flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Quiet placeholder label */}
        <div className="pointer-events-none absolute bottom-1 right-3 flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
          <ImageIcon className="h-3.5 w-3.5" />
          <span>{project.placeholderScreens.subtitle} · Placeholder</span>
        </div>
      </div>
    );
  }

  // Cobalt blue card placeholder (Project 3: ONYX Cryptocurrency Wallet)
  return (
    <div className="relative w-full aspect-[16/11.5] rounded-[20px] overflow-hidden bg-gradient-to-br from-[#063AB8] via-[#03216E] to-[#010D33] p-5 sm:p-7 shadow-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(59,130,246,0.28),transparent_60%)]"
      />

      {/* Fanned wallet device wireframes */}
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Left light asset list phone */}
        <div className="absolute left-[-2%] sm:left-[2%] top-[16%] w-[32%] h-[82%] -rotate-12 rounded-[22px] border-[3px] border-slate-900 bg-white p-2.5 sm:p-3 shadow-2xl flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-2 pt-3">
            <div className="h-9 rounded-full bg-amber-400/25 border border-amber-500/40" />
            <div className="h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            <div className="h-9 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
            <div className="h-9 rounded-full bg-sky-500/20 border border-sky-500/40" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-slate-300" />
            <div className="h-2 w-4/5 rounded bg-slate-200" />
          </div>
        </div>

        {/* Center primary dark wallet phone */}
        <div className="relative z-10 w-[37%] h-[92%] -rotate-6 rounded-[24px] border-[4px] border-slate-900 bg-[#0B1221] p-3 sm:p-4 shadow-[0_24px_55px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="h-5 w-5 rounded-full bg-slate-700" />
              <div className="h-2 w-12 rounded bg-slate-700" />
            </div>
            <div className="pt-1">
              <div className="h-2 w-14 rounded bg-slate-500/60 mb-1.5" />
              <div className="h-5 w-28 rounded bg-white/85" />
            </div>
            {/* Action buttons strip inside white card */}
            <div className="rounded-xl bg-white p-2.5 space-y-2">
              <div className="grid grid-cols-4 gap-1.5">
                <div className="h-5 rounded-full bg-slate-200" />
                <div className="h-5 rounded-full bg-slate-200" />
                <div className="h-5 rounded-full bg-slate-200" />
                <div className="h-5 rounded-full bg-slate-200" />
              </div>
              <div className="h-10 rounded-lg bg-[#0B2D8F]" />
            </div>
          </div>
          <div className="h-1.5 w-1/3 mx-auto rounded-full bg-slate-600" />
        </div>

        {/* Right QR receive phone */}
        <div className="absolute right-[2%] sm:right-[4%] top-[18%] w-[33%] h-[82%] -rotate-6 rounded-[22px] border-[3px] border-slate-900 bg-white p-2.5 sm:p-3.5 shadow-2xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-2.5 w-2/3 mx-auto rounded bg-slate-700/80" />
            <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1 w-10 h-10">
                <div className="bg-slate-800 rounded-[2px]" />
                <div className="bg-slate-300 rounded-[2px]" />
                <div className="bg-slate-800 rounded-[2px]" />
                <div className="bg-slate-300 rounded-[2px]" />
                <div className="bg-slate-800 rounded-[2px]" />
                <div className="bg-slate-300 rounded-[2px]" />
                <div className="bg-slate-800 rounded-[2px]" />
                <div className="bg-slate-300 rounded-[2px]" />
                <div className="bg-slate-800 rounded-[2px]" />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-5 w-full rounded bg-slate-100 border border-slate-200" />
            <div className="h-2 w-3/4 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Quiet placeholder label */}
      <div className="pointer-events-none absolute bottom-3 right-4 flex items-center gap-1.5 text-[11px] font-medium text-blue-100/70">
        <ImageIcon className="h-3.5 w-3.5" />
        <span>{project.placeholderScreens.subtitle} · Placeholder</span>
      </div>
    </div>
  );
};
