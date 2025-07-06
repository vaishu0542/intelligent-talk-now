
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const { theme } = useTheme();
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className={`w-full max-w-md ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600'
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
            <Key className="w-6 h-6 text-white" />
          </div>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
            OpenAI API Key Required
          </CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Enter your OpenAI API key to start chatting with the AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
              }
            />
            <Button 
              type="submit" 
              className={`w-full ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
              disabled={!apiKey.trim()}
            >
              Start Chatting
            </Button>
          </form>
          <p className={`text-xs mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Your API key is stored locally and never sent to our servers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
