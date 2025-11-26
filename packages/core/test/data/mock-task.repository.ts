import { Task, TaskRepository } from "../../src";

interface TaskWithUser {
  task: Task;
  userId: string;
}

export class MockTaskRepository implements TaskRepository {
  private tasksWithUsers: TaskWithUser[] = [];
  private deletedTaskIds: string[] = [];
  private findByIdCalls: Array<{ id: string; userId: string }> = [];
  private deleteCalls: Array<{ id: string; userId: string }> = [];
  private saveCalls: Array<{ task: Task; userId: string }> = [];

  constructor(
    initialTasks: Task[] = [],
    defaultUserId: string = "default-user"
  ) {
    this.tasksWithUsers = initialTasks.map((task) => ({
      task,
      userId: defaultUserId,
    }));
  }

  async findByUser(userId: string): Promise<Task[]> {
    return this.tasksWithUsers
      .filter((item) => item.userId === userId)
      .map((item) => item.task);
  }

  async findById(id: string, userId: string): Promise<Task | null> {
    this.findByIdCalls.push({ id, userId });
    const item = this.tasksWithUsers.find(
      (item) => item.task.id === id && item.userId === userId
    );
    return item ? item.task : null;
  }

  async save(task: Task, userId: string): Promise<void> {
    this.saveCalls.push({ task, userId });

    const existingIndex = this.tasksWithUsers.findIndex(
      (item) => item.task.id === task.id && item.userId === userId
    );

    if (existingIndex >= 0) {
      this.tasksWithUsers[existingIndex] = { task, userId };
    } else {
      this.tasksWithUsers.push({ task, userId });
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    this.deleteCalls.push({ id, userId });

    const initialLength = this.tasksWithUsers.length;
    this.tasksWithUsers = this.tasksWithUsers.filter(
      (item) => !(item.task.id === id && item.userId === userId)
    );

    if (this.tasksWithUsers.length < initialLength) {
      this.deletedTaskIds.push(id);
    }
  }

  // Test helper methods
  getDeletedTaskIds(): string[] {
    return [...this.deletedTaskIds];
  }

  getFindByIdCalls(): Array<{ id: string; userId: string }> {
    return [...this.findByIdCalls];
  }

  getDeleteCalls(): Array<{ id: string; userId: string }> {
    return [...this.deleteCalls];
  }

  getSaveCalls(): Array<{ task: Task; userId: string }> {
    return [...this.saveCalls];
  }

  reset(): void {
    this.tasksWithUsers = [];
    this.deletedTaskIds = [];
    this.findByIdCalls = [];
    this.deleteCalls = [];
    this.saveCalls = [];
  }

  setTasks(tasks: Task[], userId: string = "user-123"): void {
    // Filter out tasks for this user first, then add new ones
    this.tasksWithUsers = this.tasksWithUsers.filter(
      (item) => item.userId !== userId
    );
    this.tasksWithUsers.push(...tasks.map((task) => ({ task, userId })));
  }

  getTasks(userId?: string): Task[] {
    if (userId) {
      return this.tasksWithUsers
        .filter((item) => item.userId === userId)
        .map((item) => item.task);
    }
    return this.tasksWithUsers.map((item) => item.task);
  }

  addTaskForUser(task: Task, userId: string): void {
    this.tasksWithUsers.push({ task, userId });
  }

  getTasksWithUsers(): TaskWithUser[] {
    return [...this.tasksWithUsers];
  }
}
