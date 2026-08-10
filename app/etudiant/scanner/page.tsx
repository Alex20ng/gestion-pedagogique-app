"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { scanQr } from "./action";
import { toast } from "sonner";

export default function ScannerPage() {
  const route = useRouter();
  const scannerRegionId = "qr-reader";
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const html5QrCodeRef = useRef<any>(null);
  const scanningRef = useRef(false);
  const scannerStateEnumRef = useRef<typeof import("html5-qrcode").Html5QrcodeScannerState | null>(null);

  // Détecte desktop vs mobile pour bloquer le scan sur PC
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDesktop !== false) return;

    let isMounted = true;

    async function startScanner() {
      const { Html5Qrcode, Html5QrcodeScannerState } = await import("html5-qrcode");
      scannerStateEnumRef.current = Html5QrcodeScannerState;

      if (!isMounted) return;

      const html5QrCode = new Html5Qrcode(scannerRegionId);
      html5QrCodeRef.current = html5QrCode;
      setStatus("scanning");

      async function safeStop() {
        try {
          const state = html5QrCode.getState();
          if (
            state === Html5QrcodeScannerState.SCANNING ||
            state === Html5QrcodeScannerState.PAUSED
          ) {
            await html5QrCode.stop();
          }
        } catch {}
      }

      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          async (decodedText: string) => {
            if (scanningRef.current) return;
            scanningRef.current = true;

            await safeStop();

            try {
              const result = await scanQr(decodedText);

              if (!isMounted) return;

              if (result.success) {
                setStatus("success");
                toast.success("Présence enregistrée");
              } else {
                setStatus("error");
                scanningRef.current = false;
                toast.error(result.message);
              }
            } catch {
              if (!isMounted) return;
              setStatus("error");
              scanningRef.current = false;
              toast.error("Une erreur est survenue.");
            }
          },
          () => {}
        );

        if (!isMounted) {
          await safeStop();
          html5QrCodeRef.current?.clear().catch(() => {});
        }
      } catch (err) {
        if (!isMounted) return;
        setStatus("error");
        toast.error("Impossible d'accéder à la caméra. Vérifie les autorisations.");
      }
    }

    startScanner();

    return () => {
      isMounted = false;

      const instance = html5QrCodeRef.current;
      const StateEnum = scannerStateEnumRef.current;
      if (!instance || !StateEnum) return;

      try {
        const state = instance.getState();
        if (state === StateEnum.SCANNING || state === StateEnum.PAUSED) {
          instance
            .stop()
            .then(() => instance.clear())
            .catch(() => {});
        } else {
          instance.clear().catch(() => {});
        }
      } catch {}
    };
  }, [isDesktop]);

  return (
    <div className="min-h-dvh flex flex-col p-6 bg-[#2a003d]">
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
          </>
        )}
      </div>
    </div>
  );
}