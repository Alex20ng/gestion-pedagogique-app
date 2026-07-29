"use client";

import {
  CalendarDays,
  GraduationCap,
  Home,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const navItems = [
  { label: "Accueil", icon: Home, ref: "/admin"},
  { label: "Emploi du temps", icon: CalendarDays, ref: "/admin/emploi-du-temps"},
  { label: "Classe", icon: GraduationCap, ref: "/admin/classes"},
];

export default function SideBar(){
    const  pathname = usePathname();

    return (
        <aside className="min-h-screen w-fit sm:flex flex-col border-r border-black/35 bg-[#2a003d] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:border-black/35" aria-label="Navigation principale">
            <div className="flex min-h-20 items-center gap-2.75 border-b border-black/30 px-4 py-3 max-[700px]:min-h-0">
                <div className="grid h-15.5 w-13.5 shrink-0 place-items-center overflow-hidden">
                    <Image
                    src="/images/retard-clock.png"
                    alt=" gestion des retards"
                    width={54}
                    height={54}
                    className="h-11.5 w-11.5 object-contain"
                    priority
                    />
                </div>
                <div className="grid gap-px font-bold leading-[1.08] text-white">
                    <h1 className="text-3xs font-semibold">Espace administrateur</h1>
                </div>
            </div>

            <span className="px-2 pb-2 pt-3 text-[12px] leading-none text-white/70">Menu principal</span>

            <nav className="grid gap-3 px-2.5 py-3 max-[700px]:grid-cols-3 max-[460px]:grid-cols-1" aria-label="Menu principal">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.ref;

                    return (
                        <Link
                            key={item.label}
                            href={item.ref}
                            className={cn("flex min-h-10.5 items-center gap-3.5 rounded px-2.5 text-[13px] font-bold text-white transition-colors hover:bg-white/10",
                            isActive ? "bg-[rgba(175,152,196,0.72)]" : "text-white hover:bg-white/10")}
                        >
                            <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}