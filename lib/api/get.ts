import { NextResponse } from "next/server";


export const GET_REQUEST = (get: () => any) => {
    return async function (req: Request) {
        try {
            const data = await get()

            return NextResponse.json(data)

        } catch (error: any) {
            console.log(error);
            return new NextResponse(error.message || "Internal error", { status: 500 })
        }
    }
}
