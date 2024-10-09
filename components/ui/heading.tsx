import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    size: {
      sm: "text-2xl md:text-4xl",
      md: "text-5xl md:text-7xl",
      lg: "text-5xl md:text-8xl",
      xl: "text-9xl md:text-9xl",
    },
    animation: {
      animatedGradient:
        "bg-gradient-to-r from-traditionalViolet  via-iris to-warmMagenta text-transparent bg-clip-text bg-300% animate-gradient",
    },

    fontVariant: {
      telegraf: "font-[family-name:var(--font-telegraf)]",
      telegrafLight: "font-[family-name:var(--font-telegrafLight)]",
      
    },
    tracking: {
      tight: "tracking-tight",
      tighter: "tracking-tighter",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    },
    fontWeight: {
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold:"font-extrabold"
    },

    lineheight: {
      sm: "leading-3",
      md: "leading-4",
      lg: "leading-5",
    },
    spacing: {
      sm: "mb-5",
      md: "mb-10",
      lg: "mb-20",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  href?: string;
}

const Heading = React.forwardRef<HTMLHeadingElement, ButtonProps>(
  (
    {
      className,
      children,
      size,
      animation,
      fontVariant,
      tracking,
      fontWeight,
      spacing,
      ...props
    },
    ref
  ) => {
    return (
      <h1
        className={cn(
          headingVariants({
            size,
            animation,
            fontVariant,
            tracking,
            fontWeight,
            spacing,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
