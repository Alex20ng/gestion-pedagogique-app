"use client"

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export const LoginForm = ({action}: {action: any}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isVisible, setIsVisible] = useState<boolean>(false);

    async function handleSubmit(formData: FormData){
        const result = await action(formData);
        if(result?.error){
            toast.error("Email ou mot de passe incorrect.")
        }
    }

    return (
        <form action={handleSubmit}>
            <label htmlFor="email" className="absolute text-xs top-45/100 md:top-43/100 left-12/100  lg:left-49/100 md:left-53/100">Adresse mail</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="alex@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="absolute top-48/100 w-xs lg:w-sm md:w-2xs lg:h-12 h-12 md:h-10 bg-black/70 rounded-xl px-3 lg:left-63/100 md:left-53/100 lg:-translate-x-1/2"
            />
            <label htmlFor="password" className="absolute text-xs top-58/100 md:top-61/100 font-courrier lg:left-49/100 md:left-53/100">Mot de passe</label>
                <div className="absolute top-61/100 md:top-65/100 lg:left-63/100 md:left-53/100 lg:-translate-x-1/2">
                    <input
                        type={isVisible ? "text": "password"}
                        id="password"
                        name="password"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=" w-xs lg:w-sm lg:h-12 md:w-2xs md:h-10 h-12 bg-black/70 rounded-xl px-3 pr-6"
                    />
                    <button
                        type="button"
                        onClick={()=> setIsVisible(!isVisible)}
                        className="absolute right-2  top-1/2 -translate-y-1/2"
                    >{isVisible ? <Eye width={18} height={18}/>: <EyeOff width={18} height={18}/>}
                    </button>
                </div>
                <Link href="" className="absolute text-xs top-83/100 md:top-89/100 lg:top-87/100 font-courrier left-1/10 lg:left-49/100 md:left-53/100 text-black/70">Mot de passe oublié ?</Link>
            <button
                type="submit"
                className="absolute top-75/100 md:top-79/100 w-xs md:w-2xs md:h-10 h-12 lg:h-12 lg:w-sm font-semibold bg-black/70 rounded-3xl px-3 lg:left-63/100 md:left-53/100 lg:-translate-x-1/2"
                >Se connexion
            </button>
            <div className="absolute top-85/100 left-49/100 lg:top-90/100 lg:left-58/100">
                <Link href="" className="text-xs text-black/70">Vous n'avez pas de compte ?</Link>
            </div>
        </form>
    )
}