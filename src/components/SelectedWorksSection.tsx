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
      {/* Bottom-right 3D rolling crimson & black Orb #2 */}
      <RollingOrb
        duration={12}
        direction={-1}
        phaseDelay={-3}
        className="absolute right-4 sm:right-14 lg:right-28 bottom-4 sm:bottom-8 z-0"
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 sm:px-10">
        {/* Section Heading */}
        <h2 className="mb-[24px] flex items-baseline gap-1.5 tracking-tight leading-none">
          <span className="font-satoshi text-[18px] font-medium text-white">
            Selected
          </span>
          <span className="font-satoshi text-[18px] font-bold text-white leading-none">
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
                  {/* Row 2 (index 1): Flat 2D concentric circle beside AVOIR showcase */}
                  {index === 1 && (
                    <motion.img
                      src="/assets/aistudio/Group_1707478324_e26d13d5.png"
                      alt=""
                      aria-hidden="true"
                      animate={{ rotate: [0, -360], y: [0, -6, 0] }}
                      transition={{
                        rotate: { duration: 10.2, repeat: Infinity, ease: 'linear' },
                        y: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      className="pointer-events-none select-none absolute -right-2 -top-3 sm:-right-3 sm:top-2 lg:-right-4 lg:top-6 w-[44px] sm:w-[60px] lg:w-[83px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
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
                  {/* Row 1 (index 0): Klusta text column flat 2D decorations */}
                  {index === 0 && (
                    <>
                      <motion.img
                        src="/assets/aistudio/Rectangle_369__1__1010c8ab.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, 360], y: [0, -7, 0] }}
                        transition={{
                          rotate: { duration: 13.5, repeat: Infinity, ease: 'linear' },
                          y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[5%] -top-[18px] sm:right-[6%] lg:left-[46%] lg:right-auto lg:top-[44px] w-[26px] sm:w-[38px] lg:w-[55px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478324__1__e26d13d5.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360], x: [0, -6, 0] }}
                        transition={{
                          rotate: { duration: 9, repeat: Infinity, ease: 'linear' },
                          x: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[17%] -top-[22px] sm:right-[16%] lg:left-[24%] lg:right-auto lg:top-[16px] w-[42px] sm:w-[58px] lg:w-[83px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478319_25e925e1.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360], y: [0, 8, 0] }}
                        transition={{
                          rotate: { duration: 11.8, repeat: Infinity, ease: 'linear' },
                          y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[3%] -bottom-[20px] lg:left-[24%] lg:right-auto lg:-bottom-[72px] w-[42px] sm:w-[58px] lg:w-[83px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                    </>
                  )}

                  {/* Row 2 (index 1): AVOIR Furniture text column flat 2D decorations */}
                  {index === 1 && (
                    <>
                      <motion.img
                        src="/assets/aistudio/Group_1707478317_fc43df28.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, 360], scale: [1, 1.06, 1] }}
                        transition={{
                          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[14%] -top-[26px] sm:right-[16%] lg:left-[18%] lg:right-auto lg:-top-[128px] w-[52px] sm:w-[72px] lg:w-[102px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478318_63206bd7.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360], x: [0, 6, 0] }}
                        transition={{
                          rotate: { duration: 12.5, repeat: Infinity, ease: 'linear' },
                          x: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[4%] -bottom-[16px] lg:right-[10%] lg:bottom-auto lg:top-[18px] w-[38px] sm:w-[54px] lg:w-[72px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                    </>
                  )}

                  {/* Row 3 (index 2): ONYX text column flat 2D decorations */}
                  {index === 2 && (
                    <>
                      <motion.img
                        src="/assets/aistudio/Rectangle_369_1010c8ab.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, 360], y: [0, 7, 0] }}
                        transition={{
                          rotate: { duration: 16.5, repeat: Infinity, ease: 'linear' },
                          y: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[14%] -top-[20px] sm:right-[16%] lg:left-[46%] lg:right-auto lg:-top-[42px] w-[26px] sm:w-[38px] lg:w-[55px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                      <motion.img
                        src="/assets/aistudio/Group_1707478324__1__e26d13d5.png"
                        alt=""
                        aria-hidden="true"
                        animate={{ rotate: [0, -360], x: [0, -7, 0] }}
                        transition={{
                          rotate: { duration: 8.5, repeat: Infinity, ease: 'linear' },
                          x: { duration: 4.9, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="pointer-events-none select-none absolute right-[2%] -top-[22px] sm:right-[4%] lg:left-[52%] lg:right-auto lg:-top-[72px] w-[42px] sm:w-[58px] lg:w-[83px] h-auto z-0 brightness-[2.1] contrast-[1.15]"
                      />
                    </>
                  )}

                  <div className="relative z-10">
                    <h3 className="font-satoshi text-[18px] font-medium tracking-tight text-white">
                      {project.title}
                    </h3>

                    <p className="mt-[16px] font-satoshi text-[16px] font-light leading-[1.65] text-white max-w-[440px]">
                      {project.descriptionPrefix}
                      <span>{project.descriptionHighlight}</span>
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
