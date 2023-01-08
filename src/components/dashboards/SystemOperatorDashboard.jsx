import React from 'react'
import avatar2Image from "../../assets/images/avatar2.jpg";

function MayorDashboard({
  SystemOperatorProfile,
  displayRole
}) {
  const avatar2 =
    !SystemOperatorProfile?.firstName && !SystemOperatorProfile?.lastName
      ? avatar2Image
      : `https://ui-avatars.com/api/?name=${SystemOperatorProfile?.firstName}+${SystemOperatorProfile?.lastName}&bold=true`;

  return (
    <>
      {SystemOperatorProfile && (
        <div className="flex flex-col items-center w-full test-profile">
          <img src={avatar2} alt={`${SystemOperatorProfile.fullName}`}></img>
          <hr></hr>
          <h3 className="names">{SystemOperatorProfile.fullName}</h3>
          <h5 className="role">{displayRole}</h5>
        </div>
      )}
    </>
  )
}

export default MayorDashboard
