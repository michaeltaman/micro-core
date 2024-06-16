import { Button } from '@/shared/ui/button';
import { useMutation } from '@tanstack/react-query';
//import { selectFile } from "@/shared/lib/file";
import { Spinner } from '@/shared/ui/spinner';
import { ProfileAvatar } from '@/entities/user/profile';
//import { useUploadAvatar } from "../_vm/use-upload-avatar";

export function AvatarField({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value?: string) => void;
}) {
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
    </Button>
  );
}