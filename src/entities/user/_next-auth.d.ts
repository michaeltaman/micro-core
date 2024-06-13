import NextAuth from 'next-auth';
import { session, UserEntity } from '@/entities/user/_domain/types';

declare module 'next-auth' {
  interface Session {
    user: SessionEntity['user'];
  }
  interface User extends UserEntity {}
}
