// External Imports
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import { Button, Chip } from "components/components";
import { QualifierNav, QualifierTitle } from "./QualifierComponents";
import { useQualifiersContext } from "context/QualifiersContext";
import { onKey } from "components/Utility/utils";

const QualifierPageRoles: React.FC = () => {
  // Call useContext at the top level of your component to read and subscribe to context
  const { copData, qualifiers, updateQualifiers } = useQualifiersContext();

  const navigate = useNavigate();

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
      const allSelected = roles.every((role) => {
        const cleanRoleName = role.replace(/\s+/g, "_");
        return prevState[copName]?.[cleanRoleName];
      }); // Check if all roles are selected
      const updatedRolesState = roles.reduce(
        (acc: { [key: string]: boolean }, role) => {
          const cleanRoleName = role.replace(/\s+/g, "_");
          acc[cleanRoleName] = !allSelected; // Set all roles to true if not all are currently selected, otherwise set all to false
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
        {copData.map((cop, index) => {
          const cleanCopName = cop.title.replace(/\s+/g, "_");

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
                      <span className="title-4 ml-1">
                        {cleanCopName.replace(/_/g, " ")}
                      </span>
                    </div>
                    <span
                      className="links"
                      tabIndex={0}
                      role="button"
                      aria-pressed={
                        selectedRoles[cleanCopName] &&
                        Object.values(selectedRoles[cleanCopName]).every(
                          (role) => role
                        )
                      }
                      onClick={() => handleSelectAll(cleanCopName, cop.roles)}
                      onKeyDown={(e) =>
                        onKey(
                          () => handleSelectAll(cleanCopName, cop.roles),
                          "Enter"
                        )(e)
                      }
                    >
                      {selectedRoles[cleanCopName] &&
                      Object.values(selectedRoles[cleanCopName]).every(
                        (role) => role
                      )
                        ? "Deselect All"
                        : "Select All"}
                    </span>
                  </div>
                  <div>
                    {cop.roles.map((role, index) => {
                      const cleanRoleName = role.replace(/\s+/g, "_");

                      return (
                        <Chip
                          key={index}
                          variant="multi"
                          addClass="mr-4 mb-4"
                          checked={
                            selectedRoles[cleanCopName]?.[cleanRoleName] ||
                            false
                          }
                          value={role.replace(/_/g, " ")}
                          onClick={() => {
                            handleRoleSelect(cleanCopName, cleanRoleName);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {index < copData.length - 1 && (
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
