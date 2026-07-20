import { LoginForm } from "./loginForm";
import { login } from "./actions";
import Image from "next/image";

export default function ConnexionPage() {
    return (
        <main className="relative min-h-dvh overflow-hidden bg-[#610B894A] text-white">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-black/40 blur-sm" />
            <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-black/40 blur-sm" />

            <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-12">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="relative mb-6 h-32 w-32 lg:h-48 lg:w-48">
                        <Image src="/images/udsn-logo.png" alt="Logo UDSN" fill className="object-contain" />
                    </div>
                    <h1 className="text-4xl font-bold lg:text-5xl">
                        Bienvenue à l'Université Denis Sassou-N'Guesso
                    </h1>
                    <p className="mt-4 text-lg text-white/80 lg:text-xl">
                        Espace Enseignant - Étudiant
                    </p>
                </div>

                <div className="w-full max-w-md rounded-[2rem] border border-white/20 bg-[#2d0a44]/90 p-8 shadow-2xl shadow-black/20">
                    <h2 className="mb-8 text-center text-2xl font-semibold">Connexion</h2>
                    <LoginForm action={login} />
                </div>
            </section>
        </main>
    );
}
