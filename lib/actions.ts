"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { winnerSchema } from "./zodSchemas";
import prisma from "./db";

export async function createWinner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "zwelihle408@gmail.com") {
    redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: winnerSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }



  await prisma.winner.create({
    data:{
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      email: submission.value.email,
      mugColour: submission.value.mugColour,
      image: submission.value.image,
      

    }
  })

  redirect("/admin");
}
