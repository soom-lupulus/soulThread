import { NextResponse } from "next/server";
import { pinata } from "@/utils/config"

export async function POST(request: Request) {
    const groupId = `63510681-b210-471c-b65f-a394e854a8f0`
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const upload = await pinata.upload.public.file(file).group(groupId)
        const url = await pinata.gateways.public.convert(upload.cid);
        return NextResponse.json({
            url,
            cid: upload.cid,
            upload
        }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: e },
            { status: 500 }
        );
    }
}