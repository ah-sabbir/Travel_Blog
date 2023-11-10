import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/auth-pages/login-form";
import { path } from "@/constant";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage: NextPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) return redirect(path.dashboard);

  return <LoginForm />;
};

export const dynamic = "force-dynamic";

export default LoginPage;
