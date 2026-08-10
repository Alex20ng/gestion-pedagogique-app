"use client"

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { toast } from "sonner";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#0D0710] font-semibold text-white transition hover:bg-[#160B1A] disabled:cursor-not-allowed disabled:opacity-70 lg:bg-black/70 lg:hover:bg-black/60"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connexion...
                </>
            ) : (
                "Se connecter"
            )}
        </button>
    );
}

export const LoginForm = ({action}: {action: any}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);


    async function handleSubmit(formData: FormData){ 
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        if (!email) {
            toast.error("Veuillez saisir votre adresse e-mail.");
            return;
        }

        if (!password) {
            toast.error("Veuillez saisir votre mot de passe.");
            return;
        }

        const result = await action(formData);
        if(result?.error){
            toast.error("Email ou mot de passe incorrect.")
            return
        }

        toast.success("Connexion réussie")
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-white/80">Adresse mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#DA2A2A] bg-[#D9D9D980] px-3 text-white outline-none placeholder:text-white/40 lg:border-transparent lg:bg-black/70"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium text-white/80">Mot de passe</label>
                <div className="relative">
                    <input
                        type={isVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full rounded-xl border border-[#DA2A2A] bg-[#D9D9D980] px-3 pr-10 text-white outline-none placeholder:text-white/40 lg:border-transparent lg:bg-black/70"
                    />
                    <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {isVisible ? <Eye width={18} height={18} /> : <EyeOff width={18} height={18} />}
                    </button>
                </div>
            </div>

            <SubmitButton/>

            <div className="flex items-center justify-between text-3xs text-white/70">
                <Link href="">Pas de compte ?</Link>
                <Link href=""> </Link>
            </div>
        </form>
    )
}