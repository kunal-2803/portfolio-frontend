import { Card } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "JECRC University, Jaipur",
    degree: "B.Tech in Computer Science",
    period: "2019 - 2023",
    achievement: "8.2 CGPA"
  },
  {
    institution: "SVM Public School, Jaipur",
    degree: "Class 12th",
    period: "2018 - 2019",
    achievement: "76.8%"
  }
];

const certifications = [
  {
    title: "Architecting with Google Compute Engine",
    issuer: "Coursera",
    url: "https://coursera.org/share/43d99c07bcc703eade9746709228fae9"
  },
  {
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Coursera",
    url: "https://coursera.org/share/85bb5ffebe623f3782091a8127bd11e2"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-12 md:py-24 px-4 md:px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Education & Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          {education.map((edu, index) => (
            <Card 
              key={index}
              className="p-4 md:p-6 border-border bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{edu.institution}</h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-1">{edu.degree}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-sm">
                    <p className="text-muted-foreground">{edu.period}</p>
                    <p className="text-primary font-semibold">{edu.achievement}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-3 md:space-y-4">
          {certifications.map((cert, index) => (
            <Card 
              key={index}
              className="p-4 md:p-6 border-border bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg bg-accent/10 text-accent shrink-0">
                  <Award className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold mb-1">{cert.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{cert.issuer}</p>
                </div>
                <a 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
                >
                  View Certificate →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
