import React from 'react'
import avatar2Image from "../../assets/images/avatar2.jpg";

function MayorDashboard({
  MayorProfile,
  displayRole
}) {
  const avatar2 =
    !MayorProfile?.firstName && !MayorProfile?.lastName
      ? avatar2Image
      : `https://ui-avatars.com/api/?name=${MayorProfile?.firstName}+${MayorProfile?.lastName}&bold=true`;

  return (
    <>
      {MayorProfile && (
        <div className="flex flex-col items-center w-full test-profile">
          <img src={avatar2} alt={`${MayorProfile.fullName}`}></img>
          <hr></hr>
          <h3 className="names">{MayorProfile.fullName}</h3>
          <h5 className="role">{displayRole}</h5>
        </div>
      )}
    </>
  )
}

export default MayorDashboard
