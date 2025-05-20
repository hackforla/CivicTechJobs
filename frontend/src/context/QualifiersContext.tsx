import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  fetchAllCopData,
  fetchCopDataByTitle,
  copDatum,
} from "api_data/copData";

// Individual Qualifier Type
type QualifiersType = {
  selectedCOP: string | undefined;
  skills_matrix?: { [skill: string]: string };
  // availabilityTimeSlots: string[];
};

// Entire Context Type
type QualifiersContextType = {
  copData: copDatum[];
  selectedCopData: copDatum | undefined;
  qualifiers: QualifiersType;
  updateQualifiers: (newQualifiers: QualifiersType) => void;
};

// Create the context
const QualifiersContext = createContext<QualifiersContextType | undefined>(
  undefined,
);

// hook to use the qualifiers context
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
  const [copData, setCopData] = useState<copDatum[]>([]);
  const [selectedCopData, setSelectedCopData] = useState<copDatum | undefined>(
    undefined,
  );

  // Store qualifiers in state with initial local storage to persist data across sessions
  const [qualifiers, setQualifiers] = useState<QualifiersType>(() => {
    const storedQualifiers = localStorage.getItem("qualifiers");
    return storedQualifiers
      ? JSON.parse(storedQualifiers)
      : { selectedCOP: undefined, skills_matrix: {} };
  });

  const setFetchedCopData = async () => {
    try {
      // TODO: Replace this with your actual API call to fetch COP data
      const data = await fetchAllCopData(); // Await the resolution of fetchAllCopData
      setCopData(data);

      // Update selectedCopData as well if selectedCOP exists
      if (qualifiers.selectedCOP) {
        const selected = await fetchCopDataByTitle(qualifiers.selectedCOP); // Await the resolution of fetchCopDataByTitle
        setSelectedCopData(selected);
      }
    } catch (error) {
      console.error("Error fetching COP data:", error);
    }
  };

  const updateQualifiers = (newQualifiers: QualifiersType) => {
    console.log("Updated Qualifiers:", newQualifiers); // Log the updated qualifiers TO DELETE
    setQualifiers(newQualifiers);
    localStorage.setItem("qualifiers", JSON.stringify(newQualifiers));
  };

  useEffect(() => {
    setFetchedCopData();
    console.log("COP Data fetched:", copData); // Log the fetched COP data TO DELETE
  }, [setFetchedCopData]);

  useEffect(() => {
    if (qualifiers.selectedCOP) {
      const selected = fetchCopDataByTitle(qualifiers.selectedCOP);
      setSelectedCopData(selected);
    }
  }, [qualifiers.selectedCOP]);

  return (
    <QualifiersContext.Provider
      value={{ copData, qualifiers, selectedCopData, updateQualifiers }}
    >
      {children}
    </QualifiersContext.Provider>
  );
};
