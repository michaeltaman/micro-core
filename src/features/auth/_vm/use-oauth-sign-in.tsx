import { useMutation } from '@tanstack/react-query';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { useSafeSearchParams } from './useSafeSearchParams';

export function useOAuthSignIn(provider: ClientSafeProvider) {
  const searchParams = useSafeSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const oauthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(provider.id, {
        callbackUrl: callbackUrl ?? undefined,
      }),
  });

  return {
    isPending: oauthSignInMutation.isPending,
    signIn: oauthSignInMutation.mutate,
  };
}