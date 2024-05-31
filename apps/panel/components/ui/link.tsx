import React from "react";
import LinkNext from "next/link";
import { cn } from "@/lib/utils";

// import { Container } from './styles';
type TProps = {
  href: string;
  children: any;
  type?: "primary";
};

const Link: React.FC<TProps> = ({ href, children, type }: TProps) => {
  return (
    <LinkNext
      href={href}
      className={cn("font-medium text-sm", type && "text-primary")}
    >
      {children}
    </LinkNext>
  );
};

export default Link;
