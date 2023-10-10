import { z } from "zod";
import { genderEnum } from "../constants";

export const patientSchema = z
    .object({
        fullName: z.string({ required_error: "შეიყვანეთ სახელი" }).min(1, { message: "შეიყვანეთ სახელი" }),
        date: z.string({ required_error: "შეიყვანეთ დაბადების თარიღი" }).min(1, { message: "შეიყვანეთ დაბადების თარიღი" }),
        phone: z.string({ required_error: "შეიყვანეთ პაციენტის ნომერი" }).refine((value) => {
            if (value && value.length && !value.includes("9")) return false
            return true
        }, { message: "ნომერში არ არის რიცხვი 9" }),
        address: z.string().min(1, { message: "შეიყვანეთ პაციენტის მისამართი" }),
        gender: z.nativeEnum(genderEnum, { errorMap: () => ({ message: "შეიყვანეთ პაციენტის სქესი" }) }),
        mail: z.string().refine((value) => {
            // Use a regular expression to check if it's a valid email or an empty string
            return value === '' || /\S+@\S+\.\S+/.test(value);
        }, { message: "შეიყვანეთ სწორი მეილი" }),
        idNumber: z.string(),
    })

export type patientSchemaType = z.infer<typeof patientSchema>;