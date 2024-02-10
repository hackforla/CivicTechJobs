// External Imports
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import { Button, Chip } from "components/components";
import { QualifierNav, QualifierTitle } from "./QualifierComponents";
import { fetchAllCopData, copDatum } from "api_data/copData";
import { useQualifiersContext } from "context/QualifiersContext";
import { onKey } from "components/Utility/utils";

const QualifierPageRoles: React.FC = () => {
  // Call useContext at the top level of your component to read and subscribe to context
  const { qualifiers, updateQualifiers } = useQualifiersContext();

  const navigate = useNavigate();

  const [data, setData] = useState<copDatum[]>([] as copDatum[]);
  useEffect(() => {
    setData(fetchAllCopData());
  }, []);

  // Initialize selectedRoles state with COP qualifiers from the context
  const [selectedRoles, setSelectedRoles] = useState<{
    [copName: string]: { [roleName: string]: boolean };
  }>(() => {
    // Convert qualifiers.COP to selectedRoles format
    const selectedRolesFromQualifiers: {
      [copName: string]: { [roleName: string]: boolean };
    } = {};
    for (const copName in qualifiers.COPs) {
      selectedRolesFromQualifiers[copName] = {};
      qualifiers.COPs[copName].forEach((role: string) => {
        selectedRolesFromQualifiers[copName][role] = true;
      });
    }
    return selectedRolesFromQualifiers;
  });

  // Toggle role selection
  const handleRoleSelect = (copName: string, roleName: string) => {
    setSelectedRoles((prevState) => ({
      ...prevState,
      [copName]: {
        ...prevState[copName],
        [roleName]: !prevState[copName]?.[roleName],
      },
    }));
  };

  // Toggle "Select all"/"Deselect all" within each COP
  const handleSelectAll = (copName: string, roles: string[]) => {
    setSelectedRoles((prevState) => {
      const allSelected = roles.every((role) => prevState[copName]?.[role]); // Check if all roles are selected
      const updatedRolesState = roles.reduce(
        (acc: { [key: string]: boolean }, role) => {
          acc[role] = !allSelected; // Set all roles to true if not all are currently selected, otherwise set all to false
          return acc;
        },
        {}
      );
      return {
        ...prevState,
        [copName]: updatedRolesState,
      };
    });
  };

  // Update qualifiers in the context
  const handleUpdateCopQualifiers = () => {
    const updatedCopQualifiers: { [copName: string]: string[] } = {};

    for (const copName in selectedRoles) {
      // console.log(`Cop Name: ${copName}`);
      const roles = selectedRoles[copName];
      // console.log("Roles:");

      for (const roleName in roles) {
        // console.log(`${roleName} (${typeof roleName}): ${roles[roleName]}`);
        if (roles[roleName]) {
          // If role is true, add it to the roles array
          updatedCopQualifiers[copName] = updatedCopQualifiers[copName] || [];
          updatedCopQualifiers[copName].push(roleName);
        }
      }
    }

    // console.log("Updated Cop Qualifiers:", updatedCopQualifiers);
    // console.log("Old Qualifiers:", qualifiers);
    const newQualifiers = { ...qualifiers, COPs: updatedCopQualifiers };

    console.log("New Qualifiers:", newQualifiers);
    updateQualifiers(newQualifiers); // Update qualifiers
  };

  return (
    <Fragment>
      <QualifierTitle title="What type of role are you looking for?">
        Select as many roles as you'd like to find opportunities in.
      </QualifierTitle>
      <div className="flex-center-x">
        {data.map((cop, index) => {
          return (
            <Fragment key={index}>
              <div className="row fill flex-center-x my-1">
                <div className="col-8">
                  <div className="row align-center my-3 justify-between">
                    <div className="flex items-center">
                      <cop.icon
                        fill="black"
                        strokeWidth="0.2"
                        height="21"
                        aria-hidden="true"
                      />
                      <span className="title-4 ml-1">{cop.title}</span>
                    </div>
                    <span
                      className="links"
                      tabIndex={0}
                      role="button"
                      aria-pressed={
                        selectedRoles[cop.title] &&
                        Object.values(selectedRoles[cop.title]).every(
                          (role) => role
                        )
                      }
                      onClick={() => handleSelectAll(cop.title, cop.roles)}
                      onKeyDown={(e) =>
                        onKey(
                          () => handleSelectAll(cop.title, cop.roles),
                          "Enter"
                        )(e)
                      }
                    >
                      {selectedRoles[cop.title] &&
                      Object.values(selectedRoles[cop.title]).every(
                        (role) => role
                      )
                        ? "Deselect All"
                        : "Select All"}
                    </span>
                  </div>
                  <div>
                    {cop.roles.map((role, index) => {
                      return (
                        <Chip
                          key={index}
                          variant="multi"
                          addClass="mr-4 mb-4"
                          checked={selectedRoles[cop.title]?.[role] || false}
                          value={role}
                          onClick={() => {
                            handleRoleSelect(cop.title, role);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {index < data.length - 1 && (
                <hr className="row col-8 qroles-border"></hr>
              )}
            </Fragment>
          );
        })}
      </div>
      <QualifierNav addClass="justify-right">
        <Button
          size="lg"
          length="long"
          color="primary"
          onClick={() => {
            handleUpdateCopQualifiers();
            navigate("../2");
          }}
        >
          Next
        </Button>
      </QualifierNav>
    </Fragment>
  );
};

export default QualifierPageRoles;
