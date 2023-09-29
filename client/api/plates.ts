import { Plate, PlateWhitoutId } from "@/types/types";
import axios from "axios";

const API_URL = 'http://localhost:3002/api'

export const getAllPlates = async () => {
  const { data } = await axios.get(`${API_URL}/get-all-plates`);
  return data;
};

export const createPlate = async (newPlate: PlateWhitoutId) => {
  const { data } = await axios.post(`${API_URL}/create`, newPlate);
  return data;
};

export const updatePlate = async (newPlate : Plate) => {
  const { data } = await axios.put(`${API_URL}/update`, newPlate);
  return data;
};

export const deletePlate = async (id : string) => {
  const { data } = await axios.delete(`${API_URL}/delete/${id}`);
  return data;
};
