import { Profile } from '../_domain/types';
import { getProfileDisplayName } from './get-profile-display-name';

//

export const getProfileLetters = (profile: Profile) => {
  const displayName = getProfileDisplayName(profile);

  const digits = displayName.match(/\d+/g);
  if (digits) {
    return digits.join('').slice(0, 2);
  } else {
    const [a, b] = displayName.split('@')[0].split(/\.|\s|-|_/);

    if (!b) {
      return `${a[0]?.toUpperCase() ?? ''}${a[1]?.toUpperCase() ?? ''}`;
    }

    return `${a[0]?.toUpperCase() ?? ''}${b[0]?.toUpperCase() ?? ''}`;
  }
};
