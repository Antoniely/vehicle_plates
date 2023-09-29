export type Plate = {
    id: number;
    first_name: string;
    last_name: string;
    dni: string;
    date_of_birth: string;
    type_of_car: string;
    type_of_people: string;
    type_of_plate: string;
    total_value_paid: number;
  };

export type PlateWhitoutId = Omit<Plate, "id">;

export type PlateResponse = {
    message: string
    data: Plate[]
}
