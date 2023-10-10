import { patientSchemaType } from "./form-schema/patient";

export type patientType = patientSchemaType & {
    id: number
}