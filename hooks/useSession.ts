import { useContext } from "react";
import { AuthContext } from "@/services/providers/AuthSessionProvider";
import { AuthSession } from "@/types/schema";

export const useAuthSession = (): AuthSession => {
  const session = useContext(AuthContext);

  return session!;
};
