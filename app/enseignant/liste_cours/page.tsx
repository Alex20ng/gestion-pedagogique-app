"use client"

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ListCoursPage(){
    const route = useRouter();

    return (
        <div className="min-h-dvh flex flex-col p-6 gap-8 bg-[rgba(97,11,137,0.25)]">
            <button type="button" onClick={() => route.back()} >{<ArrowLeftIcon width={30} height={30}/>}</button>
            <h1 className="text-2xl font-bold lg:text-3xl">Tous les cours</h1>
            <div className="flex-1 gap-6 grid grid-cols-2">
                {[1,2].map((key) => <div key={key} className="w-full h-24 max-h-xs bg-black/70 rounded-xl text-white text-xl p-5"></div>)}
            </div>
        </div>
    )
}