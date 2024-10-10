import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import ShuffleWinner from "@/components/shuffle";
import CurrentSession from "@/components/current-session";

async function fetchWinnersData() {
  const data = await prisma.winner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function AdminPage() {
  noStore();
  const data = await fetchWinnersData();
  return (
    <Container size={"twoxl"}>

<div className="pt-5 pb-5">
      <CurrentSession/>
      </div>
      <Card className="mt-5 pb-10">
        <CardHeader>
          <CardTitle>Winners</CardTitle>

          <CardDescription>Manage your Mug winners</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mug Colour</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.image ? (
                      <Image
                        alt="Product Image"
                        src={item.image}
                        height={64}
                        width={64}
                        className="rounded-md object-cover h-16 w-16"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="truncate">
                    {" "}
                    {/* {item.createdAt.toString()} */}
                    {new Intl.DateTimeFormat("en-ZA").format(item.createdAt)}
                  </TableCell>
                  <TableCell>{item.mugColour}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <MoreHorizontal className="" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <Button className="flex items-center gap-x-2" asChild size={"sm"}>
            <Link href={"/admin/create"}>
              <PlusCircle />
              <span> New Winner</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div>
        <ShuffleWinner />
      </div>

      

    </Container>
  );
}
