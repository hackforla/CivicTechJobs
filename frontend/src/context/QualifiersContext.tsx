import React, { createContext, useContext, useState, ReactNode } from "react";
import { copData, copDatum } from "api_data/copData";

// Types
type QualifiersType = {
  COPs: {
    [copName: string]: string[];
  };
  selectedCOP?: string;
  skills_matrix?: { [skill: string]: string };
  // availabilityTimeSlots: string[];
};

type QualifiersContextType = {
  copData: copDatum[];
  qualifiers: QualifiersType;
  updateQualifiers: (newQualifiers: QualifiersType) => void;
};

// Create the context
const QualifiersContext = createContext<QualifiersContextType | undefined>(
  undefined,
);

// Custom hook to use the qualifiers context
export const useQualifiersContext = () => {
  const context = useContext(QualifiersContext);
  if (!context) {
    throw new Error(
      "useQualifiersContext must be used within a QualifiersProvider",
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
      // Uncomment data below for testing
      // "UI/UX": [
      //   "UI/UX_Designer",
      //   "UX_Researcher",
      //   "UX_Writing",
      //   "UX_Practice_Lead",
      // ],
      // Data_Science: ["Data_Scientist", "Data_Analyst"],
    },
    // availabilityTimeSlots: [],
  };

  const [qualifiers, setQualifiers] = useState<QualifiersType>(initialState);

  const updateQualifiers = (newQualifiers: QualifiersType) => {
    console.log("Updated Qualifiers:", newQualifiers); // Log the updated qualifiers TO DELETE
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
