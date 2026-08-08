"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, Frown, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { generateSessionCode, GenQR,  } from "./action";

export default function QRCode() {
    const route = useRouter();
    const [qrResponse, setqrResponse] = useState<GenQR | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const hasGenerated = useRef(false);

    useEffect(() => {
        if (hasGenerated.current) return;

        hasGenerated.current = true;

        async function generateQR() {
            setIsLoading(true);

            try {
                const result = await generateSessionCode();
                setqrResponse(result);
            } catch (error) {
                setqrResponse({
                    success: false,
                    errorMessage: "Impossible de générer le QR Code.",
                });
            } finally {
                setIsLoading(false);
            }
        }

        generateQR();
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
                    {isLoading
                        ? <Loader2 className="h-7 aspect-square animate-spin"/>
                        : qrResponse?.success 
                            ?
                                <QRCodeSVG value={qrResponse.sessionId} className="h-full w-full" />
                            : (
                                <>
                                    <Frown className="h-30 aspect-square"/>
                                    <p>{qrResponse?.errorMessage}</p>
                                </>
                            )
                    }
                </div>

                <h1 className="text-center text-lg font-semibold lg:text-xl">
                    Génération du code QR
                </h1>
            </div>
        </div>
    )
}