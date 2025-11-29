import { Card } from "@/components/ui/card";
import { Code, Database, Wrench, Lightbulb } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["JavaScript (ES6+)", "TypeScript"]
  },
  {
    title: "Frameworks",
    icon: Wrench,
    skills: ["Node.js", "Express.js", "React.js", "Next.js", "NestJS"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "PostgreSQL", "ElasticSearch"]
  },
  {
    title: "Tools & Concepts",
    icon: Lightbulb,
    skills: ["Docker", "Git", "AWS", "BullMQ", "Pinecone", "REST APIs", "WebSockets", "Scalability", "CI/CD"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Modern tech stack for full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className="p-6 border-border bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-sm px-3 py-1 rounded-full bg-muted text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
