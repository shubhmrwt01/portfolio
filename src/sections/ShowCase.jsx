import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const ShowCase = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];

    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: { trigger: card, start: "top bottom-=100" },
        },
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
    );
  }, []);

  return (
    <section ref={sectionRef} id="work" className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* LEFT */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper ">
              <img src="/images/project1.png" alt="Rydr" />
            </div>
            <div className="text-content">
              <h2>Rydr : Real-Time Ride hailing platform</h2>
              <p className="text-white-50 md:text-xl">
                Full-stack ride-hailing application built using React Native,
                TypeScript, Node.js, Express, Socket.IO, and MongoDB
              </p>
            </div>
          </div>
          {/* RIGHT */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="images/project2.png" alt="Adoptly" />
              </div>
              <h3 className="mt-3">
                Adoptly : An AI Powered Pet Adoption Platform
              </h3>
            </div>
            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffe7eb]">
                <img src="images/project3.png" alt="EMS" />
              </div>
              <h3 className="mt-3">
                EMS : A robust Java-based desktop application for efficient
                employee record management
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
