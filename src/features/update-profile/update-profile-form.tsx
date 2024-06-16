'use client';
import { useQuery } from '@tanstack/react-query';
import { ProfileForm } from './_ui/profile-form';
import { Spinner } from '@/shared/ui/spinner';
// import { getProfileQuery } from "@/entities/user/_queries";
import { useRouter } from 'next/navigation';

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  if (false) {
    return <Spinner aria-label="Profile's loading" />;
  }

  if (false) {
    return <div>Unable to load your profile, something went wrong</div>;
  }

  return (
    <ProfileForm
      //userId={userId}
      //   profile={profileQuery.data.profile}
      //   onSuccess={handleSuccess}
      submitText={callbackUrl ? 'Continue' : 'Save'}
    />
  );
}
