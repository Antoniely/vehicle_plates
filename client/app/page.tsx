"use client";

import { FormAddPlate } from "@/components/Forms/FormAddPlate";
import { Modal } from "@/components/Modal";

import Tabla from "@/components/Tabla/Tabla";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex mt-10 flex-col items-center justify-center ">
      <div className="dark:bg-zinc-900 bg-zinc-100 rounded-3xl  w-full">
        
        {/* header */}
        <div className="border-b border-black/20 dark:border-white/10  border-x-0 p-8 flex justify-between">
          <h1 className="font-bold text-2xl">Placas vehiculares</h1>
          <Modal
            open={open}
            setOpen={setOpen}
            title="Agregar placa"
            description="Favor de llenar todos los campos"
            content={<FormAddPlate open={open} setOpen={setOpen}/>}
          />
        </div>

        {/* content */}
        <Tabla />
      </div>
    </section>
  );
}
