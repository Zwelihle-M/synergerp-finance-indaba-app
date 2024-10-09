// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";
// import React from "react";
// import { unstable_noStore as noStore } from "next/cache";
// export default async function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   noStore();
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   // check if the admin is authenticated
//   if (!user || user.email !== "zwelihle408@gmail.com") {
//     return redirect("/");
//   }
//   return <main className="my-5 ">{children}</main>;
// }








import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // List of allowed emails
  const allowedEmails = ["zwelihle408@gmail.com", "mondlim@synergerp.com", "joyb@synergerp.com","senzom@synergerp.com"];

  // Check if the admin is authenticated and email is in the allowed list
  if (!user || !user.email || !allowedEmails.includes(user.email)) {
    return redirect("/signin");
  }

  return <main className="my-5 ">{children}</main>;
}

