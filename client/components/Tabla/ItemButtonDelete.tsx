"use client";

import React, { FC } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useDeletePlate } from "@/hooks/usePlates";

interface ItemButtonDeleteProps {
  id: string;
}

const ItemButtonDelete: FC<ItemButtonDeleteProps> = ({ id }) => {
  const {
    mutate,
  } = useDeletePlate();

  const handelDelete = (id: string) => {
    mutate(id);
  };

  return (
    <DropdownMenuItem className="justify-center" onClick={() => handelDelete(id)}>
      Eliminar placa
    </DropdownMenuItem>
  );
};

export default ItemButtonDelete;
