import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("", {
  variants: {
    size: {
      // max-width: 640px;
      sm: "min-h-screen max-w-screen-sm	mx-auto px-6 md:px-10 xl:px-16",
      // max-width: 768px;
      md: "min-h-screen max-w-screen-md	mx-auto px-6 md:px-10 xl:px-16",
      // max-width: 1024px;
      lg: "min-h-screen max-w-screen-lg mx-auto px-6 md:px-10 xl:px-16",
      // max-width: 1280px; default page size
      xl: "min-h-screen max-w-screen-xl mx-auto px-6 md:px-10 xl:px-16",
      // max-width: 1536px;
      twoxl: "min-h-screen max-w-screen-2xl mx-auto px-6 md:px-10 xl:px-16 bg-transparent",
    },
    position: {
      left: "text-left md:text-left",
      center: "flex flex-col space-y-8 items-center justify-center text-center",
    },
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  href?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size, position, ...props }, ref) => {
    return (
      <section
        className={cn(containerVariants({ size, position, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
