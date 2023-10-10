import axios from "axios";
import { patientType } from "./types";

export const getPatients = async () => {
    const { data } = await axios.get<patientType[]>("/api/patients")
    return data
}