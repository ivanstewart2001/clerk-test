import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import "dotenv/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/login"
      signInFallbackRedirectUrl="/page1"
      signUpFallbackRedirectUrl="/newPage"
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
