import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { projects, ProjectShowcase } from '../data/projects';
import { ProjectVisualPlaceholder } from './ProjectVisualPlaceholder';
import { RollingOrb } from './RollingOrb';

interface SelectedWorksSectionProps {
  onSelectProject: (project: ProjectShowcase) => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({
  onSelectProject,
}) => {
  return (
    <section
      id="work"
      className="relative z-10 w-full pt-4 pb-24 sm:pb-36 scroll-mt-20"
    >
      {/* Bottom-right 3D rolling crimson & black Orb */}
      <RollingOrb
        phaseDelay={-8}
        className="absolute right-6 sm:right-14 lg:right-28 bottom-4 sm:bottom-8 z-0"
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 sm:px-10">
        {/* Section Heading */}
        <h2 className="mb-[24px] flex items-baseline gap-1.5 tracking-tight leading-none">
          <span className="font-satoshi text-[18px] font-medium text-white">
            Selected
          </span>
          <span className="font-satoshi text-[18px] font-bold text-[#E61C45] leading-none">
            Works
          </span>
        </h2>

        {/* Alternating Project Showcases */}
        <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[87px]">
          {projects.map((project, index) => {
            const isImageLeft = project.imagePosition === 'left';

            return (
              <article
                key={project.id}
                className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-[32px]"
              >
                {/* Visual Showcase Slot */}
                <div
                  className={`relative z-10 lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Row 2 (index 1): Concentric contour beside AVOIR showcase */}
                  {index === 1 && (
                    <motion.img
                      src="/assets/aistudio/Group_1707478324_e26d13d5.png"
                      alt=""
                      aria-hidden="true"
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="hidden lg:block pointer-events-none select-none absolute -right-4 top-6 w-[83px] h-auto z-0"
                    />
                  )}
                  <div className="relative z-10">
                    <ProjectVisualPlaceholder project={project} />
                  </div>
                </div>

                {/* Project Description & CTA */}
                <div
                  className={`relative lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft ? 'lg:order-2 lg:pt-16' : 'lg:order-1'
                  }`}
                >
                  {/* Row 1 (index 0): Klusta / AVOIR text column decorations */}
                  {index === 0 && (
                    <>
                      <motion.img
                        src="/assets/aistudio/Rectangle_369__1__1010c8ab.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute left-[46%] top-[44px] w-[55px] h-auto z-0"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478324__1__e26d13d5.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute left-[24%] top-[16px] w-[83px] h-auto z-0"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478319_25e925e1.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute left-[24%] -bottom-[72px] w-[83px] h-auto z-0"
                      />
                    </>
                  )}

                  {/* Row 2 (index 1): AVOIR Furniture text column decorations */}
                  {index === 1 && (
                    <>
                      <motion.img
                        src="/assets/aistudio/Group_1707478317_fc43df28.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute left-[18%] -top-[128px] w-[102px] h-auto z-0"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478318_63206bd7.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute right-[10%] top-[18px] w-[72px] h-auto z-0"
                      />
                    </>
                  )}

                  {/* Row 3 (index 2): ONYX text column decorations */}
                  {index === 2 && (
                    <>
                      <motion.img
                        src="/assets/aistudio/Rectangle_369_1010c8ab.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute left-[46%] -top-[42px] w-[55px] h-auto z-0"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478324__1__e26d13d5.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                        className="hidden lg:block pointer-events-none select-none absolute left-[52%] -top-[72px] w-[83px] h-auto z-0"
                      />
                    </>
                  )}

                  <div className="relative z-10">
                    <h3 className="font-satoshi text-[18px] font-medium tracking-tight text-white">
                      {project.title}
                    </h3>

                    <p className="mt-[16px] font-satoshi text-[16px] font-light leading-[1.65] text-white max-w-[440px]">
                      {project.descriptionPrefix}
                      <span className="font-satoshi text-[18px] font-medium text-[#E61C45]">
                        {project.descriptionHighlight}
                      </span>
                      {project.descriptionSuffix}
                    </p>

                    <p className="mt-[16px] font-satoshi text-[15px] font-semibold text-white">
                      {project.category}
                    </p>

                    <div className="mt-[24px]">
                      {project.externalUrl.trim() ? (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 rounded-[6px] bg-[#E61C45] px-6 py-3 text-[14px] font-medium text-white transition-all duration-150 hover:bg-[#F32952] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
                        >
                          <span>View Project</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="group inline-flex items-center gap-3 rounded-[6px] bg-[#E61C45] px-6 py-3 text-[14px] font-medium text-white transition-all duration-150 hover:bg-[#F32952] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>View Project</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
