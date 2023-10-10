import { NextResponse } from "next/server";

export const DELETE_REQUEST = (param: string, deleteFunc: (id: any) => any) => {
    return async function (req: Request, { params }: { params: any }) {
        try {
            const id = params[param]

            deleteFunc(id)

            return new NextResponse("Success", { status: 200 })

        } catch (error: any) {
            console.log(error);
            return new NextResponse(error.message || "Internal error", { status: 500 })
        }
    }
}
