import { Profile } from '../_domain/types';

// export const getProfileDisplayName = (profile: Profile) => {
//   return profile.name ? profile.name : profile.email;
// };

export const getProfileDisplayName = (profile: Profile) => {
  return profile.name && profile.name.length > 1 ? profile.name : profile.email;
};
