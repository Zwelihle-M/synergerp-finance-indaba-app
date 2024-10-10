import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import UserDropdown from "./user-dropdown";
import { Button } from "./ui/button";

export default async function CurrentSession() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <div className="flex items-center">
        {/* check if theres a valid ession */}

        {user ? (
          <>
          <div className="flex  items-center gap-x-4">
          <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
            <span className="text-lg">
              Session: {user.given_name as string}
            </span>
           
          </div>
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2 ml-10">
            <Button asChild size={"sm"}>
              <LogoutLink>Sign Out</LogoutLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
