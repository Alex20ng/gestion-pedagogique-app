"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export const LoginForm = ({ action }: { action: any }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const result = await action(formData);
        if (result?.error) {
            toast.error("Email ou mot de passe incorrect.");
            return;
        }
        router.push("/etudiant");
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-white/90">
                    Adresse mail
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="astra@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/50 focus:border-white/50"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-white/90">
                    Mot de passe
                </label>
                <div className="relative">
                    <input
                        type={isVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 pr-12 text-white outline-none placeholder:text-white/50 focus:border-white/50"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
                        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {isVisible ? <Eye width={18} height={18} /> : <EyeOff width={18} height={18} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-[#4f0d6a] shadow-lg transition hover:bg-[#f3e7ff]"
            >
                Se connecter
            </button>

            <div className="flex flex-col items-center gap-2 text-center">
                <Link href="#" className="text-sm text-white/80 transition hover:text-white">
                    Mot de passe oublié ?
                </Link>
                <Link href="#" className="text-sm text-white/80 transition hover:text-white">
                    Vous n&apos;avez pas de compte ?
                </Link>
            </div>
        </form>
    );
};