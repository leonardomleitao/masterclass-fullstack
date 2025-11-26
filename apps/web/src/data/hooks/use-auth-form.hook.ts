import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSession from "./use-session.hook";
import useAPI from "./use-api.hook";
import useMessages from "./use-messages.hook";

export default function useAuthForm() {
  const { addError } = useMessages();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { httpPost } = useAPI();
  const { user, startSession } = useSession();

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (user?.email) {
      const destination = params.get("destination") as string;
      router.push(destination ? destination : "/");
    }
  }, [user, router, params]);

  function toggleMode() {
    setMode(mode === "login" ? "register" : "login");
  }

  async function submit() {
    try {
      if (mode === "login") {
        await login();
      } else {
        await registerUser();
        await login();
      }
      clearForm();
    } catch (error: any) {
      addError(error.message);
    }
  }

  async function login() {
    const token = await httpPost("auth/login", { email, password });
    startSession(token);
  }

  async function registerUser() {
    await httpPost("auth/register", { name, email, password });
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setMode("login");
  }

  return {
    mode,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    toggleMode,
    submit,
  };
}
