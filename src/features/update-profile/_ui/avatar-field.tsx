import React, { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { ProfileAvatar } from '@/entities/user/profile';
import { useUploadAvatar } from '../_vm/use-upload-avatar';

export function AvatarField({
  id,
  value,
  onChange,
  autoComplete,
}: {
  id?: string;
  value?: string;
  onChange: (value?: string) => void;
  autoComplete?: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleFileSelect: originalHandleFileSelect, isPending } = useUploadAvatar({
    onSuccess: onChange,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onChange(URL.createObjectURL(file));
      setShowDebugInfo(true);
      setDebugInfo(`Selected file: ${file.name}, size: ${file.size}, type: ${file.type}`);
      originalHandleFileSelect();
    } else {
      setShowDebugInfo(false);
      setDebugInfo(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {showDebugInfo && debugInfo && <div>{debugInfo}</div>}

      <Button
        variant="ghost"
        className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
        type="button"
        onClick={handleButtonClick}
      >
        {isPending && (
          <div className="inset-0 absolute flex items-center justify-center z-10">
            <Spinner className="w-10 h-10" aria-label="New avatar loading ..." />
          </div>
        )}
        <ProfileAvatar
          className="w-full h-full"
          profile={{ email: 'mictrwork@gmail.com', image: value }}
        />
        <input
          type="file"
          id={id}
          onChange={handleFileChange}
          autoComplete={autoComplete}
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </Button>
    </div>
  );
}