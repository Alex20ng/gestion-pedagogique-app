"use client"

import { SubmitEventHandler, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import  { useRouter } from "next/navigation";
import Image from "next/image";

export default function ConnexionPage(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const route = useRouter();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> =  (e) => {
        e.preventDefault();
        if (!email || !password){
            toast.error("Veuillez remplir tous les champs");
            return;
        }
        toast.success("Connexion réussie");
        route.push("/enseignant");
    }

    return (
        <div className="relative overflow-hidden min-h-dvh flex flex-col p-6 gap-8 text-white bg-[#610b893f]">
            <div className="absolute -left-40 -top-8 w-xs aspect-square rounded-full bg-black/70 lg:hidden"></div>
            <div className="flex flex-row pl-6 mx-auto">
                <div className="w-md mr-0 ml-auto order-2 h-screen max-h-fit lg:bg-black/70 rounded-2xl">
                    <h1 className="absolute left-1/2 -translate-x-1/2 lg:left-3/5 lg:translate-0 top-1/4 text-4xl text-center font-bold">Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="absolute text-xs top-45/100 left-1/10  lg:left-55/100">Adresse mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="alex@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="absolute top-48/100 w-xs h-12 bg-black/70 rounded-xl px-3 lg:left-67/100 lg:-translate-x-1/2"
                        />
                        <label htmlFor="password" className="absolute text-xs top-58/100 font-courrier lg:left-55/100">Mot de passe</label>
                            <div className="absolute top-61/100 lg:left-67/100 lg:-translate-x-1/2">
                                <input
                                    type={isVisible ? "text": "password"}
                                    id="password"
                                    placeholder="Saisissez votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=" w-xs h-12 bg-black/70 rounded-xl px-3 pr-6"
                                />
                                <button
                                    type="button"
                                    onClick={()=> setIsVisible(!isVisible)}
                                    className="absolute right-2  top-1/2 -translate-y-1/2"
                                >{isVisible ? <Eye width={18} height={18}/>: <EyeOff width={18} height={18}/>}
                                </button>
                            </div>
                            <p className="absolute text-xs top-83/100 lg:top-82/100 font-courrier left-1/10 lg:left-55/100 text-black/70">Mot de passe oublié ?</p>
                        <button
                            type="submit"
                            className="absolute top-75/100 w-xs h-12 font-semibold bg-black/70 rounded-3xl px-3 lg:left-67/100 lg:-translate-x-1/2"
                            >Se connexion
                        </button>
                    </form>
                </div>
                <div className="hidden lg:block w-md aspect-square pt-8">
                    <div className="relative w-2xs aspect-square my-auto">
                        *<Image
                            src="/images/udsn-logo.png" 
                            alt="Logo" 
                            fill
                            className="object-containt"
                        />
                    </div>
                    <p className="hidden lg:block text-xl font-bold pt-6">Bienvenu sur l’espace Enseignant - Etudiant de l’université Denis Sassous N’GUESSO</p>
                </div>
            </div>
            <div className="absolute -right-30  -bottom-40 w-2xs aspect-square rounded-full bg-black/70 lg:hidden"></div>
        </div>
    )
}