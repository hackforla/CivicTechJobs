import React, { createContext, useContext, useState, ReactNode } from "react";
import { copData, copDatum } from "api_data/copData";

// Types
type QualifiersType = {
  COPs: {
    [copName: string]: string[];
  };
  // availabilityTimeSlots: string[];
};

type QualifiersContextType = {
  copData: copDatum[];
  qualifiers: QualifiersType;
  updateQualifiers: (newQualifiers: QualifiersType) => void;
};

// Create the context
const QualifiersContext = createContext<QualifiersContextType | undefined>(
  undefined
);

// Custom hook to use the qualifiers context
export const useQualifiersContext = () => {
  const context = useContext(QualifiersContext);
  if (!context) {
    throw new Error(
      "useQualifiersContext must be used within a QualifiersProvider"
    );
  }
  return context;
};

// Provider component
export const QualifiersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initial state for qualifiers only for testing purposes, actual data should be fetched once the user has an account, and then used to setQualifiers, by using useEffect
  const initialState: QualifiersType = {
    COPs: {
      // // Uncomment data below for testing
      // "UI/UX": [
      //   "UI/UX Designer",
      //   "UX Researcher",
      //   "UX Writing",
      //   "UX Practice Lead",
      // ],
    },
    // availabilityTimeSlots: [],
  };

  const [qualifiers, setQualifiers] = useState<QualifiersType>(initialState);

  const updateQualifiers = (newQualifiers: QualifiersType) => {
    setQualifiers(newQualifiers);
  };

  return (
    <QualifiersContext.Provider
      value={{ copData, qualifiers, updateQualifiers }}
    >
      {children}
    </QualifiersContext.Provider>
  );
};
