import { LoginForm } from "./loginForm"
import { login } from "./actions"
import Image from "next/image"

export default function ConnexionPage(){
    
    return (
        <div className="relative overflow-hidden min-h-dvh flex flex-col p-6 gap-8 text-white bg-[#610b893f]">
            <div className="absolute -left-40 -top-8 w-xs aspect-square rounded-full bg-black/70 lg:hidden md:hidden"></div>
            <div className="flex flex-row pl-6 mx-auto">
                <div className="w-md mr-0 ml-auto order-2 h-screen max-h-fit lg:w-xl md:w-xs lg:bg-black/70 md:bg-black/70 rounded-2xl">
                    <h1 className="absolute left-1/2 -translate-x-1/2 lg:left-57/100 md:left-7/10 lg:translate-0 top-1/4 text-4xl lg:text-4xl md:text-3xl text-center font-bold">Connexion</h1>
                   <LoginForm action={login} />
                </div>
                <div className="hidden lg:block md:block w-xs aspect-square pt-8 mr-6">
                    <div className="relative lg:w-2xs md:w-40 aspect-square my-auto">
                        <Image
                            src="/images/udsn-logo.png" 
                            alt="Logo" 
                            fill
                            className="object-containt"
                        />
                    </div>
                    <p className="hidden lg:block md:block lg:text-xl md:text-xs font-bold pt-6">Bienvenu sur l’espace Enseignant - Etudiant de l’université Denis Sassous N’GUESSO</p>
                </div>
                {/**/}
            </div>
            <div className="absolute -right-30  -bottom-40 w-2xs aspect-square rounded-full bg-black/70 lg:hidden md:hidden"></div>
        </div>
    )
}