import { SignInForm } from "@/features/auth/sign-in-form.server";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <>
      {" "}
      <div className="container relative  flex-col items-center justify-center self-center pt-24">
        <Card className="max-w-[350px] mx-auto">
          <CardHeader className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
                Login to account
            </h1>
          </CardHeader>
          <CardContent className="grid gap-4">
            <SignInForm />
            <p className="px-0 text-center text-sm text-muted-foreground">
                By clicking continue you agree to{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                User Agreement
              </Link>{" "}
              и{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}