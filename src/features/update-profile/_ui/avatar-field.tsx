import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { ProfileAvatar } from '@/entities/user/profile';

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

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      type="button"
    >
      {false && (
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
        style={{ display: 'none' }}
      />
    </Button>
  );
}