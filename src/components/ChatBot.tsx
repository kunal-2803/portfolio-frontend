import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MAX_WORDS = 50;
const MAX_QUESTIONS = 6;

const ChatBot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Kunal's assistant. Ask me about his experience, skills, or projects!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Count user questions (excluding initial assistant message)
  const questionCount = useMemo(() => {
    return messages.filter(msg => msg.role === "user").length;
  }, [messages]);

  // Check if question limit reached
  const isQuestionLimitReached = questionCount >= MAX_QUESTIONS;

  // Helper function to count words
  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Handle input change with word limit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const wordCount = countWords(value);
    
    if (wordCount <= MAX_WORDS) {
      setInput(value);
    } else {
      toast({
        title: "Word limit reached",
        description: `Maximum ${MAX_WORDS} words allowed.`,
        variant: "destructive",
      });
    }
  };

  // Auto-scroll to bottom when messages change or when loading starts
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);


const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  // Check word limit
  const wordCount = countWords(input);
  if (wordCount > MAX_WORDS) {
    toast({
      title: "Word limit exceeded",
      description: `Maximum ${MAX_WORDS} words allowed.`,
      variant: "destructive",
    });
    return;
  }

  // Check question limit
  if (isQuestionLimitReached) {
    toast({
      title: "Question limit reached",
      description: "You've reached the maximum number of questions. Please contact via email for further queries.",
      variant: "destructive",
    });
    return;
  }

  const userMessage = input.trim();
  const newMessages = [...messages, { role: "user" as const, content: userMessage }];
  setMessages(newMessages);
  setInput("");
  setIsLoading(true);

  try {
    // Call your Express backend instead of Supabase function
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages,question:userMessage }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    if (data?.answer) {
      setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
    } else {
      throw new Error("No response from backend");
    }

  } catch (error) {
    console.error("Chat error:", error);
    toast({
      title: "Error",
      description: "Failed to get response. Please try again.",
      variant: "destructive",
    });
    // Roll back to previous messages if error occurs
    setMessages(messages);
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-glow z-50"
        size="icon"
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 left-4 md:bottom-24 md:right-6 md:left-auto md:w-96 h-[500px] max-h-[calc(100vh-8rem)] border-border bg-card z-50 flex flex-col shadow-glow">
          {/* Header */}
          <div className="p-3 md:p-4 border-b border-border bg-gradient-primary">
            <h3 className="font-bold text-base md:text-lg">Chat with Kunal's Assistant</h3>
            <p className="text-xs md:text-sm opacity-90">
              {isQuestionLimitReached 
                ? "Question limit reached" 
                : `${MAX_QUESTIONS - questionCount} question${MAX_QUESTIONS - questionCount !== 1 ? 's' : ''} remaining`
              }
            </p>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-lg p-2 md:p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-xs md:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] md:max-w-[80%] rounded-lg p-2 md:p-3 bg-muted text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span 
                        className="w-2 h-2 bg-foreground rounded-full opacity-60"
                        style={{ 
                          animation: "typing 1.4s infinite",
                          animationDelay: "0ms"
                        }}
                      ></span>
                      <span 
                        className="w-2 h-2 bg-foreground rounded-full opacity-60"
                        style={{ 
                          animation: "typing 1.4s infinite",
                          animationDelay: "200ms"
                        }}
                      ></span>
                      <span 
                        className="w-2 h-2 bg-foreground rounded-full opacity-60"
                        style={{ 
                          animation: "typing 1.4s infinite",
                          animationDelay: "400ms"
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input or Email Message */}
          <div className="p-3 md:p-4 border-t border-border">
            {isQuestionLimitReached ? (
              <div className="text-center py-4 space-y-3">
                <Mail className="h-8 w-8 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Question limit reached</p>
                  <p className="text-xs text-muted-foreground">
                    You've asked {MAX_QUESTIONS} questions. For further queries, please contact via email.
                  </p>
                  <a 
                    href="mailto:kunalagarwal5614@gmail.com"
                    className="text-sm text-primary hover:underline inline-block"
                  >
                    kunalagarwal5614@gmail.com
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 text-sm"
                    disabled={isLoading}
                  />
                  <Button onClick={handleSend} size="icon" disabled={isLoading} className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{countWords(input)} / {MAX_WORDS} words</span>
                  <span>{MAX_QUESTIONS - questionCount} questions remaining</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
