"use client";
import EmailField from "../shared/form/email-field.component";
import Logo from "../template/logo.component";
import PasswordField from "../shared/form/password-field.component";
import TextField from "../shared/form/text-field.component";
import ThemeToggle from "../template/theme-toggle.component";
import useAuthForm from "@/data/hooks/use-auth-form.hook";

export default function AuthForm() {
  const {
    mode,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    toggleMode,
    submit,
  } = useAuthForm();

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100 dark:bg-zinc-900 relative">
      {/* Theme Toggle no canto superior direito */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div
        className="
          flex flex-col justify-center items-center
          bg-white dark:bg-zinc-800 w-96 rounded-xl p-8 shadow-lg
        "
      >
        <Logo big />
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {mode === "login"
              ? "Entre com suas credenciais."
              : "Preencha os dados para criar sua conta."}
          </p>
        </div>
        <div className="flex flex-col gap-1 w-80 mt-6">
          {mode === "register" && (
            <TextField placeholder="Nome" value={name} onChangeText={setName} />
          )}
          <EmailField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <PasswordField
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
          />
          <div className="flex gap-2 mt-6">
            <button onClick={submit} className="button flex-1 bg-violet-600">
              {mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </div>
          <div className="flex mt-6">
            <button
              onClick={toggleMode}
              className="flex-1 text-sm cursor-pointer text-zinc-700 dark:text-zinc-300"
            >
              {mode === "login" ? (
                <div>
                  Não tem uma conta?{" "}
                  <span className="text-violet-600 dark:text-violet-400 font-bold">Cadastre-se</span>
                </div>
              ) : (
                <div>
                  Já tem uma conta?{" "}
                  <span className="text-violet-600 dark:text-violet-400 font-bold">Entrar!</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
