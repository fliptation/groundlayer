"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signUp } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const t = useTranslations("auth.signUp");
  const tCommon = useTranslations("common");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error: authError } = await signUp.email({ name, email, password });

    if (authError) {
      setError(authError.message || t("defaultError"));
      setLoading(false);
      return;
    }

    router.push("/collaborate");
    router.refresh();
  }

  return (
    <article className="max-w-md mx-auto px-6 lg:px-10 py-20 md:py-28">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-deep mb-3 font-display">
          {t("heading")}
        </h1>
        <p className="text-brown/60 text-sm font-sans">
          {t("subtitle")}
        </p>
      </div>

      <Card className="bg-warm-white border-brown-light/12">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("nameLabel")}</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder={t("namePlaceholder")}
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("passwordLabel")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder={t("passwordPlaceholder")}
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm font-sans">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brown-dark hover:bg-terracotta rounded-full"
            >
              {loading ? t("submitting") : t("submitButton")}
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-center text-sm text-brown/50 font-sans">
            {t("hasAccount")}{" "}
            <Link href="/auth/signin" className="text-terracotta font-semibold hover:text-terracotta-dark">
              {tCommon("signIn")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </article>
  );
}
