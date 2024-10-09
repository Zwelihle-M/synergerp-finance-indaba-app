import React from "react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { mugColours } from "@/data/lecreuset-mugs";
import Link from "next/link";
import {ExternalLink  } from "lucide-react";
import { Button } from "./ui/button";

export default function MugsPag() {
  return (
    <Container className=" py-10">
       <div className="pt-10 mb-10">
        <p className="mb-10">
          Stand a chance to win a beautiful Le Creuset mug! Simply enter by
          filling out our form, and you’ll automatically be entered into our
          lucky draw. Don’t miss your opportunity to add a touch of elegance to
          your daily routine—enter now!
        </p>
        <Link
          href={"https://share.hsforms.com/1sz101ey6RAC9zTw7dyb4Pg58qan"}
          target="_blank"
        >
          <Button className="flex items-center">
            <ExternalLink  className="mr-2" /> Competition
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {mugColours.map((mug) => (
          <div key={mug.id} className="flex flex-col items-center">
            {mug.image ? (
              <Image
                src={mug.image}
                alt={mug.color}
                width={400}
                height={400}
                className="object-cover rounded-md shadow-lg"
              />
            ) : (
              <div className="w-[400px] h-[400px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md shadow-lg">
                No Image
              </div>
            )}
            <h3 className="mt-4 text-lg font-medium">{mug.color}</h3>
          </div>
        ))}
      </div>
    </Container>
  );
}
