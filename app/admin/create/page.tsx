/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWinner } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { winnerSchema } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Card,CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { mugColours } from "@/data/lecreuset-mugs";

export default function CreateWinner() {
  // upload thing state
  const [images, setImages] = useState<string>('');  // Change from string[] to string

  const [lastResult, action] = useFormState(createWinner, undefined);
  const [form, fields] = useForm({
    lastResult,
    // client side validation
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: winnerSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
  });
  return (
    <Container size={"twoxl"}>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex items-center gap-4 mb-5">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"/admin"}>
              <ChevronLeftIcon className="w-4 h-4" />
            </Link>
          </Button>

          <Heading size={"sm"} tracking={"tight"} fontWeight={"bold"}>
            New Winner
          </Heading>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Winner Details</CardTitle>
            <CardDescription>Add a new winner from the form</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>First Name</Label>
              <Input
                type="text"
                className="w-full"
                placeholder=" First Name"
                key={fields.firstName.key}
                name={fields.firstName.name}
                defaultValue={fields.firstName.initialValue}
              />
              <p className="text-rose-500">{fields.firstName.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Last Name</Label>
              <Input
                type="text"
                className="w-full"
                placeholder=" Last Name"
                key={fields.lastName.key}
                name={fields.lastName.name}
                defaultValue={fields.lastName.initialValue}
              />
              <p className="text-rose-500">{fields.lastName.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Email Address</Label>
              <Input
                type="text"
                className="w-full"
                placeholder=" Email"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
              />
              <p className="text-rose-500">{fields.email.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Mug Colour</Label>
              <Select
                key={fields.mugColour.key}
                name={fields.mugColour.name}
                defaultValue={fields.mugColour.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product Category" />
                </SelectTrigger>
                <SelectContent>
                  {mugColours.map((mug) => (
                    <SelectItem key={mug.id} value={mug.color}>
                      {mug.color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-rose-500">{fields.email.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
  <Label>Image</Label>
  <input
    type="hidden"
    value={images}
    key={fields.image.key}
    name={fields.image.name}
    defaultValue={fields.image.initialValue as any}
  />
  {images ? (
    <div className="relative w-[100px] h-[100px]">
      <Image
        height={100}
        width={100}
        src={images}  // Now using the single image URL
        alt="Product Image"
        className="w-full h-full object-cover rounded-lg border"
      />
      <button
        onClick={() => setImages('')}  // Clear the image when deleting
        type="button"
        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
      >
        <XIcon className="w-3 h-3" />
      </button>
    </div>
  ) : (
    <UploadDropzone
  endpoint="imageUploader"
  onClientUploadComplete={(res) => {
    setImages(res[0]?.url || '');  // Set only the first image URL or an empty string if undefined
  }}
  onUploadError={() => {
    alert("Something went wrong");
  }}
/>
  )}
  {/* <p className="text-red-500">{fields.images.errors}</p> */}
</div>


            </div>
          </CardContent>

        <CardFooter>
        <SubmitButton text="Create winner"/>
        </CardFooter>
        </Card>

      
      </form>
    </Container>
  );
}
