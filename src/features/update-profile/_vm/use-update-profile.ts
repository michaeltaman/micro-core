import { useMutation } from '@tanstack/react-query';
import { updateProfileAction } from '../_actions/update-profile';
import { useAppSession } from '@/entities/user/session';
import { useInvalidateProfile } from '@/entities/user/_queries';

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async ({ profile }, { userId }) => {
      await invalidateProfile(userId);
      await updateSession({ user: profile });
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
