import { useContext } from "react";
import { AuthContext } from "@/services/providers/AuthSessionProvider";

export const useAuthSession = (): AuthSession => {
  const session = useContext(AuthContext);

  return session!;
};
