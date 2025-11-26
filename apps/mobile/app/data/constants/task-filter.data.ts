export const taskFilterData = {
  today: {
    title: "Tarefas de Hoje",
    color: "#DC2626",
    icon: "sun" as const,
  },
  week: {
    title: "Tarefas da Semana",
    color: "#2563EB",
    icon: "calendar" as const,
  },
  all: {
    title: "Todas as Tarefas",
    color: "#7C3AED",
    icon: "list" as const,
  },
  completed: {
    title: "Tarefas Concluídas",
    color: "#16A34A",
    icon: "check" as const,
  },
  search: {
    title: "Pesquisar Tarefas",
    color: "#9CA3AF",
    icon: "search" as const,
  },
  tag: {
    Trabalho: {
      title: "Tarefas de Trabalho",
      color: "#4F46E5",
      icon: "briefcase" as const,
    },
    Pessoal: {
      title: "Tarefas Pessoais",
      color: "#DB2777",
      icon: "heart" as const,
    },
    Afazeres: {
      title: "Afazeres Gerais",
      color: "#D97706",
      icon: "shopping-cart" as const,
    },
    Outro: {
      title: "Outras Tarefas",
      color: "#0D9488",
      icon: "box" as const,
    },
  },
};
