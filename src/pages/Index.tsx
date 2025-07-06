import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, User, Bot, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';
import FileUpload from '@/components/FileUpload';
import MessageAttachment from '@/components/MessageAttachment';

interface FileAttachment {
  name: string;
  url: string;
  type: 'image' | 'file';
  size: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachment?: FileAttachment;
}

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today? You can also share images and files with me!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string, hasAttachment?: boolean) => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective on that topic.",
      "Great question! Based on what you've shared, I'd suggest...",
      "I can help you with that. Let me break it down for you.",
      "That's a thoughtful inquiry. From my understanding..."
    ];
    
    const attachmentResponses = [
      "Thanks for sharing that file! I can see what you've uploaded.",
      "Interesting attachment! Let me take a look at what you've shared.",
      "I've received your file. Here's what I think about it...",
      "Great! I can see the attachment you've sent."
    ];
    
    const responseArray = hasAttachment ? attachmentResponses : responses;
    const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
    return `${randomResponse} (Note: This is a demo response. To get real AI responses, please connect your OpenAI API key and implement the API call.)`;
  };

  const handleFileSelect = (file: File, type: 'image' | 'file') => {
    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    
    // Create message with attachment
    const messageWithAttachment: Message = {
      id: Date.now().toString(),
      content: type === 'image' ? 'Shared an image' : 'Shared a file',
      sender: 'user',
      timestamp: new Date(),
      attachment: {
        name: file.name,
        url: fileUrl,
        type: type,
        size: file.size
      }
    };

    setMessages(prev => [...prev, messageWithAttachment]);
    setIsTyping(true);

    // Simulate AI response to attachment
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse('', true),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <div className={`backdrop-blur-sm border-b p-4 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700/50'
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  theme === 'dark'
                    ? 'from-purple-400 to-blue-400'
                    : 'from-blue-600 to-purple-600'
                }`}>
                  AI Chat Assistant
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Powered by OpenAI
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className={`transition-colors duration-300 ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 transition-colors duration-300 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-800 shadow-sm border border-gray-700 text-gray-100'
                        : 'bg-white shadow-sm border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.attachment && (
                        <MessageAttachment file={message.attachment} />
                      )}
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' 
                          ? 'text-green-100' 
                          : theme === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className={`shadow-sm border rounded-2xl px-4 py-3 transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          theme === 'dark' ? 'bg-gray-400' : 'bg-gray-400'
                        }`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          theme === 'dark' ? 'bg-gray-400' : 'bg-gray-400'
                        }`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          theme === 'dark' ? 'bg-gray-400' : 'bg-gray-400'
                        }`} style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input */}
        <div className={`backdrop-blur-sm border-t p-4 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700/50'
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="flex space-x-2">
            <FileUpload 
              onFileSelect={handleFileSelect}
              disabled={isTyping}
            />
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`flex-1 h-12 transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700/90 border-gray-600 text-white placeholder:text-gray-400'
                  : 'bg-white/90 border-gray-300'
              }`}
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={`h-12 w-12 transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
