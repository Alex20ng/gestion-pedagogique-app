import { LoginForm } from "./loginForm";
import { login } from "./actions";
import Image from "next/image";

export default function ConnexionPage() {
    return (
        <main className="relative min-h-dvh overflow-hidden bg-[#610B894A] text-white">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-black/40 blur-sm lg:hidden" />
            <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-black/40 blur-sm lg:hidden" />

            <section className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-12 pt-16 lg:hidden">
                <div className="mb-8">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="relative h-12 w-12">
                            <Image src="/images/udsn-logo.png" alt="Logo UDSN" fill className="object-contain" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">UDSN</p>
                            <p className="text-xs text-white/70">Espace enseignant - étudiant</p>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">Connexion</h1>
                    <p className="mt-2 text-sm text-white/80">Accédez à votre espace de travail</p>
                </div>

                <LoginForm action={login} />
            </section>

            <section className="hidden min-h-dvh lg:flex">
                <div className="flex w-1/2 flex-col items-center justify-center px-16 py-16">
                    <div className="relative mb-12 h-72 w-72">
                        <Image src="/images/udsn-logo.png" alt="Logo UDSN" fill className="object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold leading-tight text-center max-w-sm">
                        Bienvenu sur l'espace Enseignant - Etudiant de l'université Denis Sassous N'GUESSO
                    </h1>
                </div>

                <div className="flex w-1/2 items-center justify-center px-16 py-16">
                    <div className="w-full max-w-md rounded-[2rem] border border-white/20 bg-[#2d0a44]/90 p-8 shadow-2xl shadow-black/20">
                        <h2 className="mb-8 text-center text-2xl font-semibold">Connexion</h2>
                        <LoginForm action={login} />
                    </div>
                </div>
            </section>
        </main>
    );
}
