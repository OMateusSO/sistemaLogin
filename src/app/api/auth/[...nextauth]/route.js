import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import connect from "@/utils/db";



const options = NextAuth({
  providers: [
    CredentialsProvider({
      id: "Credentials",
      async authorize(credentials){
        await connect();
        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user){
            const validPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (validPassword){
              return user;
            }else{
              throw new Error("Credenciais erradas!")
            }
          }else{
            throw new Error("Credenciais erradas!")
          }
        } catch (error) {
          throw new Error(error)
        }
      },
    })
  ],
  callbacks: {
  },
  secret: process.env.NEXTAUTH_URL,
  pages: {
    error: "login",
  },
});

export { options as GET, options as POST}