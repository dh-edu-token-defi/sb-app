import React, { ReactNode, useContext } from "react";

type CurrentYeeterContextType = {
  shamanAddress?: string;
};

export const CurrentYeeterContext =
  React.createContext<CurrentYeeterContextType>({
    shamanAddress: undefined,
  });

type CurrentYeeterContextProps = {
  children: ReactNode;
  shamanAddress?: string;
};

export const CurrentYeeterProvider = ({
  children,
  shamanAddress,
}: CurrentYeeterContextProps) => {
  return (
    <CurrentYeeterContext.Provider
      value={{
        shamanAddress,
      }}
    >
      {children}
    </CurrentYeeterContext.Provider>
  );
};

export const useCurrentYeeter = () => useContext(CurrentYeeterContext);
