import { useContext } from "react";
import SessionContext from "../contexts/session.context";

const useSession = () => useContext(SessionContext);
export default useSession;
