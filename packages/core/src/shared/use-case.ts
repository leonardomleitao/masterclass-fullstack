import { User } from "../users";

export default interface UseCase<IN, OUT> {
  execute(data: IN, loggedUser?: User): Promise<OUT>;
}
