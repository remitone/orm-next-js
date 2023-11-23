"use client";
import { Remitter } from "@/types/remitter";
import { useState, createContext, useContext } from "react";
import { create } from "zustand";

const createStore = (remitter: Remitter) =>
  create<{
    remitter: Remitter;
    setRemitter: (remitter: Remitter) => void;
  }>((set) => ({
    remitter,
    setRemitter(remitter: Remitter) {
      set({ remitter });
    },
  }));

const RemitterContext = createContext<ReturnType<typeof createStore> | null>(
  null
);

export const useRemitter = () => {
  if (!RemitterContext)
    throw new Error("useRemitter must be used within a RemitterUserProvider");
  return useContext(RemitterContext)!;
};

const RemitterUserProvider = ({
  remitter,
  children,
}: {
  remitter: Remitter;
  children: React.ReactNode;
}) => {
  const [remitterUser] = useState(() => createStore(remitter));
  return (
    <RemitterContext.Provider value={remitterUser}>
      {children}
    </RemitterContext.Provider>
  );
};

export default RemitterUserProvider;
