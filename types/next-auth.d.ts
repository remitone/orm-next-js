import { getServerSession } from "next-auth";

declare module "next-auth" {
  import { Remitter } from "./remitter";

  interface User {
    session_token: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session extends DefaultSession {
    session_token: string;
    remitter?: Remitter | undefined;
  }

  export default getServerSession;
}
