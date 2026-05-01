"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  fetchAllCopData,
  fetchCopDataByTitle,
  type copDatum,
} from "@/shared/data/copData";

type QualifiersType = {
  selectedCOP: string | undefined;
  skills_matrix?: { [skill: string]: string };
};

type QualifiersContextType = {
  copData: copDatum[];
  selectedCopData: copDatum | undefined;
  qualifiers: QualifiersType;
  updateQualifiers: (newQualifiers: QualifiersType) => void;
};

const initialQualifiers: QualifiersType = {
  selectedCOP: undefined,
  skills_matrix: {},
};

const QualifiersContext = createContext<QualifiersContextType | undefined>(
  undefined,
);

export const useQualifiersContext = () => {
  const context = useContext(QualifiersContext);
  if (!context) {
    throw new Error(
      "useQualifiersContext must be used within a QualifiersProvider",
    );
  }
  return context;
};

export const QualifiersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [copData, setCopData] = useState<copDatum[]>([]);
  const [selectedCopData, setSelectedCopData] = useState<copDatum | undefined>(
    undefined,
  );
  const [qualifiers, setQualifiers] = useState<QualifiersType>(initialQualifiers);

  // Hydrate from localStorage after mount - SSR cannot read localStorage,
  // so the initial state stays at the default and we promote any stored
  // value once the client takes over.
  useEffect(() => {
    const stored = window.localStorage.getItem("qualifiers");
    if (stored) {
      try {
        setQualifiers(JSON.parse(stored));
      } catch {
        // Stored value is malformed - fall back to initialQualifiers.
      }
    }
  }, []);

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  useEffect(() => {
    if (qualifiers.selectedCOP) {
      const selected = fetchCopDataByTitle(qualifiers.selectedCOP);
      setSelectedCopData(selected);
    }
  }, [qualifiers.selectedCOP]);

  const updateQualifiers = (newQualifiers: QualifiersType) => {
    setQualifiers(newQualifiers);
    window.localStorage.setItem("qualifiers", JSON.stringify(newQualifiers));
  };

  return (
    <QualifiersContext.Provider
      value={{ copData, qualifiers, selectedCopData, updateQualifiers }}
    >
      {children}
    </QualifiersContext.Provider>
  );
};
