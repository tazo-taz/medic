import { NextResponse } from "next/server"
import { ZodSchema } from "zod"

export const PATCH_REQUEST = (param: string, validator: ZodSchema, update: (id: any, product: any) => any) => {
    return async function (req: Request, { params }: { params: any }) {
        try {
            const id = params[param]

            const body = validator.parse(await req.json())
            await update(id, body)

            return new NextResponse("Success", { status: 200 })

        } catch (error: any) {
            console.log(error);
            return new NextResponse(error.message || "Internal error", { status: 500 })
        }
    }
}