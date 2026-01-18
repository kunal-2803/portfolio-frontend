import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { z } from "zod";
import { trackFormSubmit } from "@/utils/analytics";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long")
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Send data to backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Track form submission in Google Analytics
      trackFormSubmit("contact_form");

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Let's discuss your next project or opportunity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 border-border bg-gradient-card backdrop-blur-sm text-center">
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <a href="mailto:kunalagarwal5614@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              kunalagarwal5614@gmail.com
            </a>
          </Card>

          <Card className="p-6 border-border bg-gradient-card backdrop-blur-sm text-center">
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Phone</h3>
            <a href="tel:+917878682369" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              +91 7878682369
            </a>
          </Card>

          <Card className="p-6 border-border bg-gradient-card backdrop-blur-sm text-center">
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Location</h3>
            <p className="text-muted-foreground text-sm">Jaipur, Rajasthan</p>
          </Card>
        </div>

        <Card className="p-8 border-border bg-gradient-card backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  maxLength={255}
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                maxLength={200}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="min-h-[150px]"
                required
                maxLength={1000}
              />
            </div>
            <Button type="submit" size="lg" className="w-full shadow-glow" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
