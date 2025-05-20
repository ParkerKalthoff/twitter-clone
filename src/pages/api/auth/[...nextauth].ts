// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/app/lib/db/pool";
import { getUserByEmail } from '@/app/lib/db/user_queries'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      try {

        const email = user.email;
        const name = user.name;
        const google_id = user.id;

        if(email == null){
          return false;
        }

        const res = await getUserByEmail(email);

        if (res.rows.length === 0) {
          await query(
            'INSERT INTO users (name, email) VALUES ($1, $2)',
            [name, email]
          );
          console.log(`User ${email} created in DB`);
        }

        return true;

      } catch (error) {
        
        console.error("Error creating user in DB:", error);

        return false;
      }
    },
  },
});