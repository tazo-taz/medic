import { PATCH_REQUEST } from "@/lib/api/patch";
import { patientSchema } from "@/lib/form-schema/patient";
import { deletePatient, updatePatient } from "../route";
import { DELETE_REQUEST } from "@/lib/api/delete";

const PATCH = PATCH_REQUEST("patient-id", patientSchema, updatePatient)
const DELETE = DELETE_REQUEST("patient-id", deletePatient)

export { PATCH, DELETE };
