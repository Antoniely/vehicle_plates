"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ModalProps = {
  title: string;
  description: string;
  content: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  variant?:
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};
export function Modal({
  title,
  description,
  content,
  open,
  setOpen,
  variant = "outline",
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
