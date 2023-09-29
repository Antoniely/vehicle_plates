import { Plate } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateToFormat = (date: Date) => format(date, "yyyy-MM-dd");


export const transformData = (plates: Plate[]) => {
  return plates.map(plate => {
    const { date_of_birth, ...args} = plate;
    const newDate = dateToFormat(new Date(date_of_birth))
    return {
      ...args,
      date_of_birth: newDate,
    }
  })
};