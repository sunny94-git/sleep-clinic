import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: '관리자 로그인',
      credentials: {
        adminId: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const adminId = credentials?.adminId as string;
        const password = credentials?.password as string;

        if (!adminId || !password) return null;

        const storedAdminId = process.env.ADMIN_ID;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!storedAdminId || !adminPasswordHash) return null;
        if (adminId !== storedAdminId) return null;

        const isValid = await compare(password, adminPasswordHash);
        if (!isValid) return null;

        return {
          id: 'admin',
          email: storedAdminId,
          name: '관리자',
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        (session.user as unknown as Record<string, unknown>).role = token.role;
      }
      return session;
    },
  },
});
