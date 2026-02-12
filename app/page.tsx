import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-dvh font-sans dark:bg-[#610b893f]">
        <Link href="/enseignant" className="w-fit h-fit bg-[#050505a8] rounded-xl text-white text-xl p-5">Connexion</Link>
    </div>
  );
}
