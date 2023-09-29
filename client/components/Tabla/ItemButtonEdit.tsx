"use client";

import React, { FC, useState } from "react";
import { Plate } from "@/types/types";
import { Modal } from "../Modal";
import { FormEditPlate } from "../Forms/FormEditPlate";

interface ItemButtonEditProps {
  plate: Plate;
}

const ItemButtonEdit: FC<ItemButtonEditProps> = ({ plate }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      variant="ghost"
      title="Editar placa"
      description="Favor de llenar todos los campos"
      content={<FormEditPlate open={open} setOpen={setOpen} plate={plate}/>}
    />
  );
};

export default ItemButtonEdit;
