"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

// npm install html5-qrcode
export default function ScannerPage() {
  const route = useRouter();
  const scannerRegionId = "qr-reader";
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [message, setMessage] = useState("Place le QR Code de la salle dans le cadre.");
  const html5QrCodeRef = useRef<any>(null);

  useEffect(() => {
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
            setMessage("Présence enregistrée avec succès !");
            // TODO: Pour vous l'équipe du backend,ici appeler le nouveau backend pour enregistrer
            // decodedText et  l'horodatage, une fois branché
          },
          () => {
            // erreurs de lecture image par image, ignorées silencieusement
          }
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
  }, []);

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
        <button type="button" onClick={() => route.back()}>
          <ArrowLeftIcon width={30} height={30} />
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-2 md:flex md:flex-row lg:items-center md:items-center">
        <div className="relative w-full max-w-md mx-auto aspect-square mb-6 order-1 lg:order-2 md:order-2 lg:mr-auto md:mr-auto lg:ml-0 md:ml-0">
          <Image
            src="/images/learning_etudiant.png"
            alt="Illustration"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-6 order-2 lg:order-1 md:order-1">
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
        </div>
      </div>
    </div>
  );
}