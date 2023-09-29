"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Plate } from "@/types/types";
import ItemButtonDelete from "./ItemButtonDelete";
import ItemButtonEdit from "./ItemButtonEdit";

export const columns: ColumnDef<Plate>[] = [
  {
    accessorKey: "first_name",
    header: "Nombre",
  },
  {
    accessorKey: "last_name",
    header: "Apellido",
  },
  {
    accessorKey: "dni",
    header: "Cédula",
  },
  {
    accessorKey: "date_of_birth",
    header: "Fecha de nacimiento",
  },
  {
    accessorKey: "type_of_plate",
    header: "Tipo de placa",
  },
  {
    accessorKey: "type_of_car",
    header: "Tipo de automóvil",
  },
  {
    accessorKey: "type_of_people",
    header: "Tipo Personas",
  },
  {
    accessorKey: "total_value_paid",
    header: "Total Pagado",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ItemButtonEdit plate={plate} />
            <DropdownMenuSeparator />
            <ItemButtonDelete id={plate.id.toString()} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
