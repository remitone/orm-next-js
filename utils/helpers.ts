import { unsealData } from "iron-session/edge";
import { AuthSessionSchema } from "@/types/schema";

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "data" in error) {
    message = String(error.data);
  } else if (error && typeof error === "object" && "error" in error) {
    message = String(error.error);
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (error && typeof error === "object" && "statusText" in error) {
    message = String(error.statusText);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export async function getAuthSessionFromCookie(encryptedSession: string) {
  const session = encryptedSession
    ? await unsealData(encryptedSession, {
        password: process.env.COOKIE_SESSION_PASSWORD!,
      })
    : null;

  const authSession = AuthSessionSchema.safeParse(
    JSON.parse(session as unknown as string),
  );
  if (!authSession.success) {
    throw new Error(authSession.error.message);
  }

  return authSession.data;
}
