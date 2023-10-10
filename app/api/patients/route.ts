import { GET_REQUEST } from "@/lib/api/get";
import { POST_REQUEST } from "@/lib/api/post";
import { genderEnum } from "@/lib/constants";
import { patientSchema, patientSchemaType } from "@/lib/form-schema/patient";
import { patientType } from "@/lib/types";

let patients: patientType[] = []

const generateIndex = () => (patients.length ? Math.max(...patients.map(item => item.id)) : 0) + 1

const getPatients = () => patients

const addPatient = (patient: patientSchemaType) => patients.push({ id: generateIndex(), ...patient })

export const updatePatient = (id: number, data: patientSchemaType) => {
    const patient = patients.find(patient => patient.id == id)

    if (!patient) return
    for (let [key, value] of Object.entries(data)) {
        patient[key] = value
    }
}

export const deletePatient = (id: number) => {
    patients = patients.filter(item => item.id != id)
}

const GET = GET_REQUEST(getPatients)
const POST = POST_REQUEST(patientSchema, addPatient)

export { GET, POST };
