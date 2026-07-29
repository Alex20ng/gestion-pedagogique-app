import { LoginForm } from "./loginForm";
import { login } from "./actions";
import Image from "next/image";

export default function ConnexionPage() {
    return (
        <main className="relative min-h-dvh overflow-hidden bg-[#610B894A] text-white lg:flex">
            {/* Décor — visible uniquement sur mobile */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-black/60 lg:hidden" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-black/50 lg:hidden" />

            {/* Panneau de marque — desktop uniquement */}
            <section className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center gap-8 px-16">
                <div className="relative h-56 w-56">
                    <Image src="/images/udsn-logo.png" alt="Logo UDSN" fill className="object-contain" />
                </div>
                <h1 className="max-w-sm text-center text-3xl font-bold leading-snug">
                    Bienvenue sur l&apos;espace Enseignant - Étudiant de l&apos;Université Denis Sassou-N&apos;Guesso
                </h1>
            </section>

            {/* Formulaire — base = mobile, enrichi en desktop */}
            <section className="relative z-10 flex min-h-dvh flex-col justify-end gap-8 px-6 pb-14 pt-24 lg:w-1/2 lg:justify-center lg:px-16 lg:pt-0">
                <div className="w-full lg:rounded-[2rem] lg:border lg:border-white/20 lg:bg-[#2d0a44]/90 lg:p-8 lg:shadow-2xl lg:shadow-black/20">
                    <h2 className="text-center text-3xl font-bold lg:mb-8 lg:text-2xl">Connexion</h2>
                    <div className="mt-8 lg:mt-0">
                        <LoginForm action={login} />
                    </div>
                </div>
            </section>
        </main>
    );
}