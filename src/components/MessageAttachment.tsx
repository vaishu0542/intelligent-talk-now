
import React from 'react';
import { FileImage, Paperclip } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface MessageAttachmentProps {
  file: {
    name: string;
    url: string;
    type: 'image' | 'file';
    size?: number;
  };
}

const MessageAttachment: React.FC<MessageAttachmentProps> = ({ file }) => {
  const { theme } = useTheme();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (file.type === 'image') {
    return (
      <div className="mt-2">
        <img
          src={file.url}
          alt={file.name}
          className="max-w-xs max-h-48 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(file.url, '_blank')}
        />
        <p className={`text-xs mt-1 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {file.name}
        </p>
      </div>
    );
  }

  return (
    <div className={`mt-2 p-3 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${
      theme === 'dark'
        ? 'bg-gray-700 border-gray-600'
        : 'bg-gray-50 border-gray-200'
    }`}
    onClick={() => window.open(file.url, '_blank')}
    >
      <div className="flex items-center space-x-2">
        <FileImage className="w-5 h-5 text-blue-500" />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {file.name}
          </p>
          {file.size && (
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatFileSize(file.size)}
            </p>
          )}
        </div>
        <Paperclip className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default MessageAttachment;
