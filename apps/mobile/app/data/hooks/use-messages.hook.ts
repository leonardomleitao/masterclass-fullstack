import { useContext } from "react";
import { MessageContext } from "../contexts/message.context";

const useMessages = () => useContext(MessageContext);
export default useMessages;
