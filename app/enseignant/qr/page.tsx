"use client"

import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react";

export default function QRCode() {
    const route = useRouter();

    return (
        <div className="flex flex-col gap-8 h-dvh overflow-hidden  p-6 bg-[#610b893f]">
            <button type="button" onClick={() => route.back()} >{<ArrowLeftIcon width={30} height={30}/>}</button>
            <div className="w-xs h-70 bg-pink-400 rounded-2xl mx-auto"></div>
            <div className="flex justify-center gap-4 mt-[5%]">
                <div className="h-7 w-7 bg-green-400 rounded-full"></div>
                <h1 className="text-xl font-semibold">Code QR généré avec succès</h1>
            </div> 
        </div>
    )
}