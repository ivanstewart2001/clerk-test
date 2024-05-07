import { SignUp, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          router.push("/signUp");
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
