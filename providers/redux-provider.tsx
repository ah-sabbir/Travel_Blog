"use client";

import { Provider as StateProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: Props) => {
  return (
    <StateProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </StateProvider>
  );
};
