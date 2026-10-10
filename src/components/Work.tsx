import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    const getTranslateX = () => {
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      const workContainer = document.querySelector(".work-container") as HTMLElement;
      if (!workFlex || !workContainer) return 2000;
      return Math.max(workFlex.scrollWidth - workContainer.clientWidth + 160, 800);
    };

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  const projects = [
    {
      title: "Multi-Tenant ATS SaaS",
      category: "Recruitment SaaS Platform",
      tools: "Next.js, Node.js, MongoDB, Redis, JWT, Webhooks",
    },
    {
      title: "Artemis AI & SEO Platform",
      category: "AI Content & SEO Engine",
      tools: "Next.js, Cloudinary, SSR, RESTful APIs, Caching",
    },
    {
      title: "AI Resume Parser & RAG Engine",
      category: "LLM & Automation",
      tools: "Python, LLM, RAG, Node.js, Docker, Swagger",
    },
    {
      title: "Website Builder Platform",
      category: "CMS & Dynamic Templates",
      tools: "HTML5, CSS3, JavaScript, Twig, Liquid, CSS Animations",
    },
    {
      title: "Cross-Platform Mobile App",
      category: "Mobile Development (iOS & Android)",
      tools: "React Native, Redux, Node.js, RESTful APIs",
    },
    {
      title: "Cloud Infrastructure & DevOps",
      category: "DevOps & Cloud Architecture",
      tools: "AWS S3, Docker, Nginx, Cloudflare Tunnel, Linux",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
