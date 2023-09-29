"use client";

import { usePlates } from "@/hooks/usePlates";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { transformData } from "@/lib/utils";



export default function Tabla() {
  const { data: plates } = usePlates();

  return (
    <section className="container mx-auto py-10">
      <DataTable columns={columns} data={transformData(plates?.data ?? []) ?? []} />
    </section>
  );
}
