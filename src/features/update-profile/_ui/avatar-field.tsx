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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(URL.createObjectURL(file));
    }
  };

  const { handleFileSelect, isPending } = useUploadAvatar({
    onSuccess: onChange,
  });

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      type="button"
      onClick={handleFileSelect}
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
      {/* This input element is used for file upload operations.
  Do not remove it overwise you will have warnings into browser's console with html elements
  : autoComplete*/}
      <input
        type="file"
        id={id}
        onChange={handleFileChange}
        autoComplete={autoComplete}
        style={{ display: 'none' }}
      />
    </Button>
  );
}
