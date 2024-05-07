import { getAuth, clerkClient } from "@clerk/nextjs/server";

export function routeValidation(getServerSideProps: any) {
  return async (context: any) => {
    console.log("in routeValidation");
    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY as string;

    try {
      if (!CLERK_SECRET_KEY) {
        throw new Error("CLERK_SECRET_KEY is not set");
      }

      const userId = getAuth(context.req, {
        secretKey: CLERK_SECRET_KEY,
      }).userId;

      const accessToken = await getAuth(context.req, {
        secretKey: CLERK_SECRET_KEY,
      }).getToken();

      if (!userId || !accessToken) {
        throw new Error("User is not authenticated");
      }

      throw new Error("User is authenticated");

      context.userId = JSON.stringify(userId);
      context.accessToken = JSON.stringify(accessToken);

      return await getServerSideProps(context); // Continue on to call `getServerSideProps` logic
    } catch (error: any) {
      const sessionId = getAuth(context.req, {
        secretKey: CLERK_SECRET_KEY,
      }).sessionId;

      if (sessionId) {
        await clerkClient.sessions.revokeSession(sessionId);
      }

      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
        // `as never` is required for correct type inference
        // by InferGetServerSidePropsType below
        props: {} as never,
      };
    }
  };
}
