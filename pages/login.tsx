import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import "dotenv/config";

export default function Home() {
  return (
    <div>
      <h1>Login Page</h1>

      <SignedOut>
        <SignInButton
          fallbackRedirectUrl={"/newPage"}
          forceRedirectUrl={"/newPage"}
          signUpFallbackRedirectUrl={"/newPage"}
          signUpForceRedirectUrl={"/newPage"}
        />
      </SignedOut>
      <SignedIn>
        <SignOutButton
          signOutOptions={{
            redirectUrl: "/newPage",
          }}
        />
      </SignedIn>
    </div>
  );
}
