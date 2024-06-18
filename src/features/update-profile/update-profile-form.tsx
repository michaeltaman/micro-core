'use client';
import { useQuery } from '@tanstack/react-query';
import { ProfileForm } from './_ui/profile-form';
import { Spinner } from '@/shared/ui/spinner';
import { useRouter } from 'next/navigation';
import { getProfileQuery } from '@/entities/user/_queries';

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const router = useRouter();

  const profileQuery = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Profile's loading" />;
  }

  if (!profileQuery.data) {
    return <div>Unable to load your profile, something went wrong</div>;
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data.profile}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? 'Continue' : 'Save'}
    />
  );
}
