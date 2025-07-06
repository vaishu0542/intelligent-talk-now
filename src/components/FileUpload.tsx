
import React, { useRef } from 'react';
import { Paperclip, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface FileUploadProps {
  onFileSelect: (file: File, type: 'image' | 'file') => void;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled = false }) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file, type);
    }
    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="flex space-x-1">
      <Button
        variant="outline"
        size="sm"
        onClick={handleImageClick}
        disabled={disabled}
        className={`h-10 w-10 p-0 transition-colors duration-300 ${
          theme === 'dark'
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Image className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleFileClick}
        disabled={disabled}
        className={`h-10 w-10 p-0 transition-colors duration-300 ${
          theme === 'dark'
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Paperclip className="w-4 h-4" />
      </Button>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'image')}
        className="hidden"
      />
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => handleFileChange(e, 'file')}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
