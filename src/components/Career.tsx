import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Khuban Software Development</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed cross-platform React Native modules for Android and iOS
              with component-based architecture, navigation, state management, and
              API integration.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Software Developer</h4>
                <h5>Midas Consulting & IT Solutions</h5>
              </div>
              <h3>2025 - 2026</h3>
            </div>
            <p>
              Developed scalable multi-tenant ATS SaaS platform with Next.js,
              Node.js, and MongoDB. Built SSR, CMS, and RESTful APIs improving
              performance by ~40%. Led SEO and implemented AI/LLM resume parsing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Joon Corporation Pvt. Ltd.</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Develop and customize responsive, SEO-friendly websites on a
              website builder platform using HTML5, CSS3, JavaScript, and
              Twig/Liquid templates with reusable architecture and CSS animations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
