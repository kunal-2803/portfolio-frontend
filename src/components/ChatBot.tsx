import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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


const handleSend = async () => {
  if (!input.trim() || isLoading) return;

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
            <p className="text-xs md:text-sm opacity-90">Ask me anything!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
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
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button onClick={handleSend} size="icon" disabled={isLoading} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
