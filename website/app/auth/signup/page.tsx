import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — Ground Layer",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
