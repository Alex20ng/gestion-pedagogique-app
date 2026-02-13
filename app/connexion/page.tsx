"use client"

import { SubmitEventHandler, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import  { useRouter } from "next/navigation";


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
            <div className="absolute  lg:hidden -left-40  -top-8 w-xs aspect-square rounded-full bg-black/70"></div>
            <div className="bg-black/70 w-xs h-32 rounded-2xl">
                <h1 className="absolute left-1/2 -translate-x-1/2 top-1/3 text-4xl text-center font-bold  ">Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="absolute text-xs top-45/100">Adresse mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="alex@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="absolute top-48/100 w-xs h-12 bg-black/70 rounded-xl px-3"
                    />
                    <label htmlFor="password" className="absolute text-xs top-58/100 font-courrier">Mot de passe</label>
                        <div className="absolute top-61/100">
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
                    <button
                        type="submit"
                        className="absolute top-75/100 w-xs h-12 font-semibold bg-black/70 rounded-3xl px-3"
                        >Se connexion
                    </button>
                </form>
                </div>
            <div className="absolute lg: hidden -right-30  -bottom-40 w-2xs aspect-square rounded-full bg-black/70"></div>
        </div>
    )
}