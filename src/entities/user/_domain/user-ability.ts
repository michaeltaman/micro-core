import { boolean } from 'zod';
import { ROLES, SessionEntity, UserId } from './types';

export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId): boolean => {
    return session.user.id === userId || session.user.role === ROLES.ADMIN;
  },
});
