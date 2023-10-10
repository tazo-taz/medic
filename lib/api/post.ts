import { NextResponse } from "next/server";
import { ZodSchema } from "zod";


export const POST_REQUEST = (validator: ZodSchema, create: (product: any) => any) => {
    return async function (req: Request) {
        try {
            const data = await req.json()

            const body = validator.parse(data)
            await create(body)

            return new NextResponse("Success", { status: 200 })

        } catch (error: any) {
            console.log(error);
            return new NextResponse(error.message || "Internal error", { status: 500 })
        }
    }
}
