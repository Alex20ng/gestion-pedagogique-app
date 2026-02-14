import Link from "next/link"
import Image from "next/image"


export  default function MenuEtudiantPage () {
    return (
        <div className="min-h-dvh overflow-hidden flex flex-col p-6 bg-[#610b893f]">
            <div className="mb-auto lg:flex md:flex">
                <div className="hidden lg:block md:block relative w-28 max-w-xs aspect-square mr-auto">
                    <Image 
                        src="/images/udsn-logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-2xl font-bold lg:text-end md:text-end">Etudiant Hub</h1>
            </div>
            <div className="lg:grid lg:grid-cols-2 md:flex md:flex-row lg:items-center md:items-center">
                <div className="relative w-full max-w-md  mx-auto aspect-square order-1 lg:order-2 md:order-2 lg:ml-auto md:ml-auto lg:mr-0 md:mr-0">
                    <Image 
                        src="/images/learning.png"
                        alt="Illustration"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col gap-6 order-2 lg:order-1 md:order-1">
                    <Link href="/etudiant/cours" className="w-full h-fit bg-black/70 rounded-xl text-white text-xl p-5">Cours</Link>
                    <Link href="" className="w-full h-fit bg-black/70 rounded-xl text-white text-xl p-5">Scanner code QR</Link>
                </div>
            </div>
        </div>
    )
}