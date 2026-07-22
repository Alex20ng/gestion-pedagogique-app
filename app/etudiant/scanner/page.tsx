"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

// npm install html5-qrcode
export default function ScannerPage() {
  const route = useRouter();
  const scannerRegionId = "qr-reader";
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [message, setMessage] = useState("Place le QR Code de la salle dans le cadre.");
  const html5QrCodeRef = useRef<any>(null);

  // Détecte desktop vs mobile pour bloquer le scan sur PC
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDesktop !== false) return; // n'active la caméra que sur mobile (< 1024px)

    let isMounted = true;

    async function startScanner() {
      const { Html5Qrcode } = await import("html5-qrcode");
      if (!isMounted) return;

      const html5QrCode = new Html5Qrcode(scannerRegionId);
      html5QrCodeRef.current = html5QrCode;
      setStatus("scanning");

      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          async (decodedText: string) => {
            await html5QrCode.stop();
            setStatus("success");
            setMessage("Présence enregistrée ✓");
            // TODO: appeler le nouveau backend pour enregistrer decodedText + l'horodatage
          },
          () => {}
        );
      } catch (err) {
        setStatus("error");
        setMessage("Impossible d'accéder à la caméra. Vérifie les autorisations.");
      }
    }

    startScanner();

    return () => {
      isMounted = false;
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, [isDesktop]);

  return (
    <div className="min-h-dvh flex flex-col p-6 bg-[#610b893f]">
      <div className="mb-auto flex items-center justify-between">
        <button type="button" onClick={() => route.back()} aria-label="Retour">
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <h1 className="text-xl font-bold text-white">Scanner</h1>
        <span className="w-7" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {isDesktop ? (
          <div className="max-w-sm rounded-xl bg-black/70 p-6 text-center text-white">
            <p className="font-semibold">Fonctionnalité indisponible sur ordinateur</p>
            <p className="mt-2 text-sm text-white/70">
              Le scan du QR Code de présence nécessite la caméra d&apos;un téléphone.
              Ouvre cette page depuis ton mobile pour scanner.
            </p>
          </div>
        ) : (
          <>
            <div
              id={scannerRegionId}
              className="aspect-square w-full max-w-sm overflow-hidden rounded-xl border-2 border-white/30 bg-black/70"
            />
            <p
              className={`text-center text-sm font-medium ${
                status === "success" ? "text-white" : status === "error" ? "text-red-300" : "text-white/80"
              }`}
              role="status"
            >
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}