import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import React from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Blobs from "@/components/animation/blobs";

export default function SignInPage() {
  return (
    <Container size={"twoxl"} position={"center"}>
      <Blobs/>
      <Heading size={"sm"}>Admin Sign in page</Heading>

      <div className="flex gap-x-2">
        <Button>
          <LoginLink>Sign in</LoginLink>
        </Button>

        <Button>
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </Container>
  );
}
