import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Activant Solutions",
    role: "Full Stack Developer",
    period: "Oct 2024 - Present",
    location: "Jaipur, Rajasthan",
    highlights: [
      "Working on Chataffy, an AI-powered chat support platform for businesses",
      "Developed chatbot training features using web crawling and embeddings",
      "Implemented real-time chat with Socket.IO, Next.js, and Node.js",
      "Built customizable chatbot settings and AI-human handoff features",
      "Optimized performance and scalability through code profiling"
    ],
    image:"/activant-image.png"
  },
  {
    company: "Code Symphony LLP",
    role: "Full Stack Developer",
    period: "May 2023 - Oct 2024",
    location: "Gujarat, India",
    highlights: [
      "Developed backend services for Folklog, a kids' learning platform using NestJS and MySQL",
      "Integrated TypeORM, New Relic, and Bunny.net CDN for monitoring and fast content delivery",
      "Implemented role-based API management and subscription handling with RevenueCat",
      "Reviewed pull requests ensuring scalability and clean code practices"
    ],
    image:"/code-symphony-image.jpg",
  },
  {
    company: "KainSkep Solutions",
    role: "Node.js Intern",
    period: "Sept 2022 - Apr 2023",
    location: "Jaipur, Rajasthan",
    highlights: [
      "Contributed to Eximpedia, an analytics tool for Asia's trade data",
      "Developed REST APIs using Node.js and ElasticSearch for data insights and visualization"
    ],
    image:"/kain-skep-image.jpg"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-12 md:py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            3 years of building production-grade applications
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="p-4 md:p-8 border-border bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  {/* <Briefcase className="h-5 w-5 md:h-6 md:w-6" /> */}

                  <img src= {exp.image} alt="A description of the image" className="h-5 w-5 md:h-6 md:w-6"/>

                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{exp.company}</h3>
                      <p className="text-primary text-base md:text-lg">{exp.role}</p>
                    </div>
                    <div className="text-left sm:text-right text-sm text-muted-foreground">
                      <p className="font-medium">{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm md:text-base">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
