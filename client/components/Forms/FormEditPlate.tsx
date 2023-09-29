"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, dateToFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { TYPE_OF_PLATE, TYPE_OF_CAR, TYPE_OF_PEOPLE } from "../../constants";
import { Plate } from "@/types/types";
import { useUpdatePlate } from "@/hooks/usePlates";
import { Dispatch, SetStateAction } from "react";

const FormSchema = z.object({
  fn: z.string({
    required_error: "Nombre requerido.",
  }),
  ln: z.string({
    required_error: "Apellidos requerido.",
  }),
  dn: z
    .string({ required_error: "Cédula requerido." })
    .min(11, { message: "Debe contener al menos 11 caracteres" })
    .max(11, { message: "Debe contener al menos 11 caracteres" }),
  dob: z.date({
    required_error: "Fecha de nacimiento requerida.",
  }),
  tp: z.string({
    required_error: "Tipo de placa requerido.",
  }),
  tpl: z.string({
    required_error: "Tipo de persona requerido.",
  }),
  tc: z.string({
    required_error: "Tipo de automóvil requerido.",
  }),
  tv: z
    .string({
      required_error: "Valor total pagado requerido.",
    })
    .min(1, { message: "Debe contener al menos 1 caracteres" }),
});

interface FormAddPlateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  plate: Plate;
}

export function FormEditPlate({ open, setOpen, plate }: FormAddPlateProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { mutate } = useUpdatePlate();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newPlaca: Plate = {
      id: plate.id,
      first_name: data.fn,
      last_name: data.ln,
      dni: data.dn,
      date_of_birth: dateToFormat(data.dob),
      type_of_car: data.tc,
      type_of_plate: data.tpl,
      type_of_people: data.tp,
      total_value_paid: parseFloat(data.tv),
    };
    mutate(newPlaca, {
      onSuccess: () => {
        setOpen(!open);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-4 ">
          <FormField
            control={form.control}
            defaultValue={plate.first_name}
            name="fn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre"
                    {...field}
                    defaultValue={plate.first_name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={plate.last_name}
            name="ln"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apellidos"
                    {...field}
                    defaultValue={plate.last_name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={plate.dni}
            name="dn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cédula</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cédula"
                    {...field}
                    type="number"
                    defaultValue={plate.dni}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={new Date(plate.date_of_birth)}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {plate.date_of_birth ? (
                          format(new Date(plate.date_of_birth), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(plate.date_of_birth)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={plate.type_of_plate}
            name="tpl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tipo de placa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={plate.type_of_plate}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de placa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-96">
                    {TYPE_OF_PLATE.map((value, i) => (
                      <SelectItem key={value + i} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={plate.type_of_people}
            name="tp"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tipo de persona</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={plate.type_of_people}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de persona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TYPE_OF_PEOPLE.map((value, i) => (
                      <SelectItem key={value + i} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={plate.type_of_car}
            name="tc"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tipo de automóvil</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={plate.type_of_car}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de automóvil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TYPE_OF_CAR.map((value, i) => (
                      <SelectItem key={value + i} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={plate.total_value_paid.toString()}
            name="tv"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Valor Total Pagado Por placas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Valor Total Pagado"
                    {...field}
                    defaultValue={plate.total_value_paid}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Actualizar</Button>
      </form>
    </Form>
  );
}
