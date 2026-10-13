import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  num: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  githubUrl: string;
  liveUrl?: string;
  badge: string;
}

const projects: Project[] = [
  {
    num: "01",
    title: "Tixora",
    category: "Cinema & Event Ticketing Platform",
    description:
      "Full-stack movie ticket reservation platform featuring real-time showtime scheduling, concurrency-safe seat locking, secure payment gateway, QR-code ticket generation, and role-based admin dashboards.",
    tools: ["Next.js", "TypeScript", "Java Spring Boot", "PostgreSQL", "Docker", "REST APIs"],
    githubUrl: "https://github.com/harshpratap3205/Tixora",
    liveUrl: "https://github.com/harshpratap3205/Tixora",
    badge: "Full-Stack SaaS",
  },
  {
    num: "02",
    title: "Cartsy E-Commerce",
    category: "Grocery & Retail Storefront",
    description:
      "Modern e-commerce shopping web application with interactive product catalogs, real-time category filtering, persistent cart state management, and streamlined checkout workflows.",
    tools: ["React.js", "Tailwind CSS", "Redux Toolkit", "RESTful APIs", "Vercel"],
    githubUrl: "https://github.com/harshpratap3205/cartsywebsite",
    liveUrl: "https://cartsywebsite.vercel.app",
    badge: "Storefront Web App",
  },
  {
    num: "03",
    title: "Cartsy Admin Panel",
    category: "Merchant Analytics & Operations",
    description:
      "Administrative command center for Cartsy platform providing live inventory tracking, vendor management, order fulfillment pipelines, and interactive revenue metrics.",
    tools: ["React.js", "JavaScript", "Tailwind CSS", "Recharts", "REST APIs"],
    githubUrl: "https://github.com/harshpratap3205/cartsyAdminPanel",
    liveUrl: "https://cartsy-admin-panel.vercel.app",
    badge: "Operations Dashboard",
  },
  {
    num: "04",
    title: "Multi-Tenant ATS SaaS",
    category: "Recruitment & Candidate Tracking",
    description:
      "Scalable recruitment cloud architecture with isolated tenant databases, automated resume parsing pipelines, dynamic hiring stages, and webhook event integrations.",
    tools: ["Next.js", "Node.js", "MongoDB", "Redis", "JWT Auth", "Webhooks"],
    githubUrl: "https://github.com/harshpratap3205",
    liveUrl: "https://github.com/harshpratap3205",
    badge: "Enterprise Cloud",
  },
  {
    num: "05",
    title: "BeastServer",
    category: "High-Throughput Backend Engine",
    description:
      "High-performance Node.js and Express backend engine engineered for extreme HTTP throughput, backend scalability benchmarking, CPU utilization telemetry, and microservices resilience.",
    tools: ["Node.js", "Express.js", "Load Testing", "CPU Profiling", "Microservices", "REST APIs"],
    githubUrl: "https://github.com/harshpratap3205/BeastServer",
    liveUrl: "https://github.com/harshpratap3205/BeastServer",
    badge: "Backend Engine",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workContainer = document.querySelector(".work-container") as HTMLElement;

    const getTranslateX = () => {
      if (!workFlex || !workContainer) return 1200;
      const scrollDistance = workFlex.scrollWidth - workContainer.clientWidth;
      return Math.max(scrollDistance + 80, 400);
    };

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${Math.round(getTranslateX() * 0.9)}`,
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

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

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
                  <h3>{project.num}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>

                <p className="work-description">{project.description}</p>

                <div className="work-tools-section">
                  <span className="work-tools-title">Tools & Stack</span>
                  <div className="work-tags">
                    {project.tools.map((tool) => (
                      <span className="work-tag" key={tool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="work-actions">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="work-btn work-btn-gh"
                    data-cursor="disable"
                  >
                    <FaGithub /> <span>GitHub Repo</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="work-btn work-btn-live"
                      data-cursor="disable"
                    >
                      <span>Live Demo</span> <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>

              <div className="work-card-visual">
                <div className="work-visual-badge">{project.badge}</div>
                <div className="work-visual-monogram">
                  <span>{project.num}</span>
                  <h4>{project.title}</h4>
                </div>
                <div className="work-visual-meta">
                  <span className="work-dot-live"></span>
                  <span>Active Project</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
