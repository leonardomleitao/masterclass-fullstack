import { useCallback, useEffect, useState } from "react";
import useAPI from "./use-api.hook";
import useMessages from "./use-messages.hook";
import useSession from "./use-session.hook";
import { User } from "@taskmaster/core";

export default function useProfile() {
  const { addError, addSuccess } = useMessages();
  const { httpGet, httpPost } = useAPI();

  const { user: loggedUser } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(
    async function() {
      try {
        const fetchedUser = await httpGet("user");
        setUser(new User(fetchedUser));
      } catch (error: any) {
        addError(error.message);
      }
    },
    [httpGet, addError],
  );

  async function changeName() {
    try {
      await httpPost("user/change-name", { name: user?.name });
      addSuccess("Nome alterado com sucesso!");
    } catch (error: any) {
      addError(error.message);
    }
  }

  useEffect(() => {
    if (loggedUser) {
      fetchUser();
    }
  }, [loggedUser, fetchUser]);

  return {
    name: user?.name ?? "",
    setName: (name: string) => {
      setUser((u) => (u ? User.draft({ ...u.data, name }) : u));
    },
    changeName,
  };
}
