import { Task } from "../../src/tasks/model/task.entity";
import { Priority } from "../../src/tasks/model/priority.enum";
import { TaskTag } from "../../src/tasks/model/task-tag.enum";

export const mockTasks: Task[] = [
  new Task({
    id: "task-001",
    title: "Implementar autenticação do usuário",
    dueDate: new Date("2024-01-15"),
    tags: [TaskTag.Trabalho, TaskTag.Afazeres],
    priority: Priority.High,
    completed: false,
  }),

  new Task({
    id: "task-002",
    title: "Revisar código da API REST",
    dueDate: new Date("2024-01-20"),
    tags: [TaskTag.Trabalho],
    priority: Priority.Medium,
    completed: true,
  }),

  new Task({
    id: "task-003",
    title: "Comprar ingredientes para jantar",
    dueDate: new Date("2024-01-10"),
    tags: [TaskTag.Pessoal, TaskTag.Afazeres],
    priority: Priority.Low,
    completed: false,
  }),

  new Task({
    id: "task-004",
    title: "Estudar React para projeto pessoal",
    dueDate: new Date("2024-01-25"),
    tags: [TaskTag.Pessoal, TaskTag.Afazeres],
    priority: Priority.Medium,
    completed: false,
  }),

  new Task({
    id: "task-005",
    title: "Reunião com equipe de desenvolvimento",
    dueDate: new Date("2024-01-12"),
    tags: [TaskTag.Trabalho, TaskTag.Outro],
    priority: Priority.High,
    completed: false,
  }),

  new Task({
    id: "task-006",
    title: "Organizar documentos fiscais",
    dueDate: new Date("2024-01-30"),
    tags: [TaskTag.Pessoal, TaskTag.Outro],
    priority: Priority.Low,
    completed: true,
  }),

  new Task({
    id: "task-007",
    title: "Fazer backup dos dados importantes",
    dueDate: new Date("2024-01-18"),
    tags: [TaskTag.Trabalho, TaskTag.Pessoal],
    priority: Priority.High,
    completed: false,
  }),

  new Task({
    id: "task-008",
    title: "Planejar férias de verão",
    dueDate: new Date("2024-02-01"),
    tags: [TaskTag.Pessoal],
    priority: Priority.Low,
    completed: false,
  }),

  new Task({
    id: "task-009",
    title: "Configurar ambiente de teste",
    dueDate: new Date("2024-01-22"),
    tags: [TaskTag.Trabalho, TaskTag.Afazeres],
    priority: Priority.Medium,
    completed: true,
  }),

  new Task({
    id: "task-010",
    title: "Atualizar perfil profissional LinkedIn",
    dueDate: new Date("2024-01-28"),
    tags: [TaskTag.Trabalho, TaskTag.Pessoal],
    priority: Priority.Low,
    completed: false,
  }),

  new Task({
    id: "task-011",
    title: "API de integração com sistema externo",
    dueDate: new Date("2024-01-16"),
    tags: [TaskTag.Trabalho],
    priority: Priority.High,
    completed: false,
  }),

  new Task({
    id: "task-012",
    title: "Limpar e organizar escritório em casa",
    dueDate: new Date("2024-01-14"),
    tags: [TaskTag.Pessoal, TaskTag.Afazeres],
    priority: Priority.Medium,
    completed: false,
  }),

  new Task({
    id: "task-013",
    title: "Revisar documentação técnica projeto",
    dueDate: new Date("2024-01-26"),
    tags: [TaskTag.Trabalho, TaskTag.Outro],
    priority: Priority.Medium,
    completed: true,
  }),

  new Task({
    id: "task-014",
    title: "Exercícios físicos - academia",
    dueDate: new Date("2024-01-11"),
    tags: [TaskTag.Pessoal],
    priority: Priority.Medium,
    completed: false,
  }),

  new Task({
    id: "task-015",
    title: "Desenvolver funcionalidade de relatórios",
    dueDate: new Date("2024-01-24"),
    tags: [TaskTag.Trabalho, TaskTag.Afazeres],
    priority: Priority.High,
    completed: false,
  }),
];

export const mockEmptyTasks: Task[] = [];

export const mockSingleTask: Task[] = [
  new Task({
    id: "single-task",
    title: "Única tarefa de teste",
    dueDate: new Date("2024-01-01"),
    tags: [TaskTag.Pessoal],
    priority: Priority.Medium,
    completed: false,
  }),
];

export const mockTasksWithSpecialCharacters: Task[] = [
  new Task({
    id: "special-001",
    title: "Configurar SSL/HTTPS para produção",
    dueDate: new Date("2024-01-15"),
    tags: [TaskTag.Trabalho],
    priority: Priority.High,
    completed: false,
  }),

  new Task({
    id: "special-002",
    title: "Análise & otimização de performance",
    dueDate: new Date("2024-01-20"),
    tags: [TaskTag.Trabalho, TaskTag.Afazeres],
    priority: Priority.Medium,
    completed: false,
  }),

  new Task({
    id: "special-003",
    title: "Setup CI/CD pipeline (Jenkins)",
    dueDate: new Date("2024-01-25"),
    tags: [TaskTag.Trabalho],
    priority: Priority.High,
    completed: true,
  }),
];

export const mockTasksWithAccents: Task[] = [
  new Task({
    id: "accent-001",
    title: "Configuração de autenticação",
    dueDate: new Date("2024-01-15"),
    tags: [TaskTag.Trabalho],
    priority: Priority.Medium,
    completed: false,
  }),

  new Task({
    id: "accent-002",
    title: "Revisão de código e documentação",
    dueDate: new Date("2024-01-20"),
    tags: [TaskTag.Trabalho],
    priority: Priority.Low,
    completed: true,
  }),

  new Task({
    id: "accent-003",
    title: "Implementação de funcionalidades",
    dueDate: new Date("2024-01-25"),
    tags: [TaskTag.Trabalho, TaskTag.Afazeres],
    priority: Priority.High,
    completed: false,
  }),
];
