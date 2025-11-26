"use client";
import MiniForm from "@/components/shared/form/mini-form.component";
import Title from "@/components/template/title.component";
import useProfile from "@/data/hooks/use-profile.hook";
import useSession from "@/data/hooks/use-session.hook";

export default function Profile() {
  const { user } = useSession();
  const { name, setName, changeName } = useProfile();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Title title="Perfil de Usuário" />
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <span>Email: </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{user?.email}</span>
        </div>
      </div>
      <div>
        <MiniForm
          title="Alterar Nome"
          description="Informe o nome com no mínimo 3 caracteres e um sobrenome."
          buttonLabel="Alterar"
          value={name}
          onChange={setName}
          onSubmit={changeName}
        />
      </div>
    </div>
  );
}
