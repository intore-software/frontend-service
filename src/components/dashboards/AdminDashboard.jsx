import React from 'react'
import avatar2Image from "../../assets/images/avatar2.jpg";

function AdminDashboard({
  AdminProfile,
  displayRole
}) {
  const avatar2 =
    !AdminProfile?.firstName && !AdminProfile?.lastName
      ? avatar2Image
      : `https://ui-avatars.com/api/?name=${AdminProfile?.firstName}+${AdminProfile?.lastName}&bold=true`;

  return (
    <>
      {AdminProfile && (
        <div className="flex flex-col items-center w-full test-profile">
          <img src={avatar2} alt={`${AdminProfile.fullName}`}></img>
          <hr></hr>
          <h3 className="names">{AdminProfile.fullName}</h3>
          <h5 className="role">{displayRole}</h5>
        </div>
      )}
    </>
  )
}

export default AdminDashboard
