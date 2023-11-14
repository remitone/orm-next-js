import LoginForm from "@/components/login-form";
import { getSession } from "@/services/authentication/CookieSession";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session?.sessionToken != null) {
    redirect("/dashboard");
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
}
