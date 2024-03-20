"use Client"

import { UserButton } from "@clerk/nextjs";

const DashboardPage  = () => {
  return (
  <div>
    <p>Dashboard</p>
    <UserButton afterSignOutUrl="/"/>
  </div>
  )
}

export default  DashboardPage;
