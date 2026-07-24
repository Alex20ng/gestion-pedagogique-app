"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { generateSessionCode } from "./action";

export default function QRCode() {
    const route = useRouter();
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        generateSessionCode().then(({ sessionId }) => setSessionId(sessionId));
    }, []);

    return (
        <div className="min-h-dvh flex flex-col gap-8 p-6 bg-[#610b893f] lg:items-center lg:justify-center">
            <button
                type="button"
                onClick={() => route.back()}
                className="self-start lg:absolute lg:left-6 lg:top-6"
                aria-label="Retour"
            >
                <ArrowLeftIcon width={30} height={30} />
            </button>

            <div className="flex flex-col items-center gap-8 lg:w-full lg:max-w-sm">
                <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl bg-white p-6 lg:max-w-sm">
                    {sessionId ? (
                        <QRCodeSVG value={sessionId} className="h-full w-full" />
                    ) : (
                        <p className="text-center text-sm text-black/60">Génération en cours…</p>
                    )}
                </div>

                <div className="flex items-center justify-center gap-3 text-center">
                    <CheckCircle2 className="h-7 w-7 flex-shrink-0 text-green-400" />
                    <h1 className="text-lg font-semibold lg:text-xl">Code QR généré avec succès</h1>
                </div>
            </div>
        </div>
    )
}