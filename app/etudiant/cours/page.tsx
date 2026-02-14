"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, DownloadIcon } from "lucide-react";

export  default function CoursPage () {
    const route = useRouter();

    return (
        <div className="min-h-dvh flex flex-col p-6 bg-[#610b893f]">
            <div className="mb-auto lg:flex md:flex">
                <div className="hidden lg:block md:block relative w-28 max-w-xs aspect-square mr-auto">
                    <Image 
                        src="/images/udsn-logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <button type="button" onClick={() => route.back()} >{<ArrowLeftIcon width={30} height={30}/>}</button>
            </div>
            <div className="lg:grid lg:grid-cols-2 md:flex md:flex-row lg:items-center md:items-center">
                <div className="relative w-full max-w-md mx-auto aspect-square mb-6 lg:mr-auto md:mr-auto lg:ml-0 md:ml-0">
                    <Image 
                        src="/images/learning_etudiant.png"
                        alt="Illustration"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col gap-6">
                   {[1,2,3].map((key) => (
                        <div key={key} className="flex flex-cols">
                            <div className="w-full h-fit bg-black/70 rounded-xl text-white text-xl p-5">Cours.pdf</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}