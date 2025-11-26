import Title from "@/components/template/title.component";

export default async function Dashboard(props: any) {
  const { period } = await props.params;

  const periodTitleMap: { [key: string]: string } = {
    today: "Tarefas de Hoje",
    week: "Tarefas da Semana",
    all: "Todas as Tarefas",
    completed: "Tarefas Concluídas",
  };

  const title = periodTitleMap[period] || "Tarefas";

  return (
    <div className="flex flex-col gap-6">
      <Title title={title} />
    </div>
  );
}
