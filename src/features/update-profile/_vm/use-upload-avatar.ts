import { selectFile, validateFileSize } from '@/shared/lib/file';
import { useMutation } from '@tanstack/react-query';
import { AVATAR_FILE_KEY, MAX_AVATAR_SIZE_MB } from '../_constants';
import { uploadAvatarAction } from '../_actions/upload-avatar';

export const useUploadAvatar = ({
  onError,
  onSuccess,
}: {
  onError?: (type?: 'big-size') => void;
  onSuccess?: (avatarPath: string) => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadAvatarAction,
    onSuccess(data) {
      onSuccess?.(data.avatar.path);
      console.log(data);
    },
  });

  const handleFileSelect = async () => {
    const file = await selectFile('image/*');
    if (!validateFileSize(file, MAX_AVATAR_SIZE_MB)) {
      return onError?.('big-size');
    }

    const formData = new FormData();

    formData.set(AVATAR_FILE_KEY, file);

    await mutateAsync(formData);
  };

  return {
    isPending,
    handleFileSelect,
  };
};
