import Link from "next/link"

export default function QRCode() {
    return (
        <div className="flex flex-col items-center justify-center h-dvh overflow-hidden min-w-screen p-[5%] bg-[#610b893f]">
            <div className="w-xs h-70 bg-pink-400 rounded-2xl"></div>
            <div className="flex justify-center gap-4 mt-[5%]">
                <div className="h-7 w-7 bg-green-400 rounded-full"></div>
                <h1 className="text-xl font-semibold">Code QR généré avec succès</h1>
            </div>
        </div>
    )
}