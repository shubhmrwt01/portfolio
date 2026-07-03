import React from "react";
import TitleHeader from "../components/TitleHeader";
import { expCards } from "../constants";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        xPercent: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    });
  }, []);
  return (
    <section
      id="projects"
      className="w-full md:mt-40 mt-20  section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Projects" sub="💼 My Career Overview" />
        <div className="mt-32 relative ">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-3/7">
                  <GlowCard card={card} index={index}>
                    <div>
                      <img src={card.imgPath} alt={card.title} />
                    </div>
                  </GlowCard>
                </div>
                <div className="xl:w-4/7">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                      </div>
                      <div className="space-y-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <h1 className="font-semibold text-3xl md:text-4xl tracking-tight">
                            {card.title}
                          </h1>
                          <button
                            onClick={() =>
                              window.open(card.githublink, "_blank")
                            }
                            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300 self-start"
                          >
                            <FaGithub className="text-lg" />
                            <span className="text-sm font-medium">GitHub</span>
                          </button>
                        </div>

                        <p className="flex items-center gap-2 text-white/50 text-sm">
                          <span>🗓️</span>
                          {card.date}
                        </p>

                        <div className="pt-2">
                          <p className="text-[#839cb5] italic uppercase tracking-wide text-sm mb-4">
                            Features
                          </p>
                          <ul className="flex flex-col gap-3">
                            {card.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-3 text-lg text-white/70"
                              >
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#839cb5] shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
