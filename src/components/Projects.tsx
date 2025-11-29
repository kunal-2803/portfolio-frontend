import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "Chataffy – AI Chat Support System",
    description: "Professional AI-powered chat support platform with web scraping, embedding pipelines, and real-time communication.",
    tech: ["Next.js", "Node.js", "Socket.IO", "BullMQ", "Pinecone", "Docker"],
    highlights: [
      "Created web scraping and embedding pipelines for chatbot training",
      "Used BullMQ for job queues and Pinecone for vector storage",
      "Containerized with Docker for scalable deployment"
    ],
    demoUrl: "", // User will add
    image: "/chataffy-image.png",
  },
  {
    title: "Folklog – Kids' Learning Platform",
    description: "Backend services for an educational platform serving thousands of young learners with content delivery and analytics.",
    tech: ["NestJS", "MySQL", "TypeORM", "New Relic", "Bunny.net CDN", "RevenueCat"],
    highlights: [
      "Developed backend APIs using NestJS + MySQL",
      "Integrated New Relic and Bunny.net CDN for performance",
      "Added Google Analytics and RevenueCat for tracking and subscriptions"
    ],
    demoUrl: "https://www.folklog.com/",
    image: "/folklog -image.png",
  },
  {
    title: "Freshopure – B2B Ordering App",
    description: "B2B fruits & vegetables ordering platform with secure authentication and serverless architecture.",
    tech: ["Node.js", "MongoDB", "AWS", "JWT", "Msg91"],
    highlights: [
      "Built APIs for order management and OTP-based authentication",
      "Deployed on AWS with JWT-secured access",
      "Serverless MongoDB setup for scalability"
    ],
    demoUrl: "https://freshopure.com/",
    image: "/freshopure-image.png",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-12 md:py-24 px-4 md:px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Production-ready applications built with modern tech stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="p-4 md:p-6 border-border bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 flex flex-col"
            >
              {/* Project Screenshot */}
              <div className="w-full h-40 md:h-48 rounded-lg mb-4 md:mb-6 overflow-hidden border border-border">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 md:mb-4 flex-grow">
                {project.description}
              </p>

              <ul className="space-y-1 mb-3 md:mb-4">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
                    <span className="text-primary text-xs mt-0.5 shrink-0">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                {project.tech.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 md:gap-3 mt-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs md:text-sm"
                  asChild
                  disabled={!project.demoUrl}
                >
                  <a
                    href={project.demoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={project.demoUrl ? 0 : -1}
                  >
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Demo
                  </a>
                </Button>
                {/* <Button size="sm" variant="outline" className="flex-1 text-xs md:text-sm" disabled={!project.codeUrl}>
                  <Code2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Code
                </Button> */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
