import Link from "next/link"

export  default function MenuEnseignantPage () {
    return (
        <div className="h-dvh overflow-hidden min-w-screen flex flex-col p-[10%] bg-[#610b893f]">
            <h1 className="text-2xl mb-auto">Enseignant Hub</h1>
            <img src="./images/learning.png" alt="chargement" className="w-md"/>
            <div className="flex flex-col gap-6">
                <Link href="/" className="w-full h-fit bg-[#050505a8] rounded-xl text-white text-xl p-5">Cours</Link>
                <Link href="/" className="w-full h-fit bg-[#050505a8] rounded-xl text-white text-xl p-5">Generer code QR</Link>
            </div>
        </div>
    )
}