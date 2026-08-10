"use client";

import {
  CalendarDays,
  GraduationCap,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", icon: Home, ref: "/admin" },
  { label: "Emploi du temps", icon: CalendarDays, ref: "/admin/emploi-du-temps" },
  { label: "Classes", icon: GraduationCap, ref: "/admin/classes" },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-black/35 bg-[#2a003d] sm:hidden"
      aria-label="Menu principal"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.ref;

        return (
          <Link
            key={item.label}
            href={item.ref}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold text-white transition-colors",
              isActive ? "text-white" : "text-white/60 hover:text-white/85"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={cn(
                "grid place-items-center rounded-full px-3.5 py-1 transition-colors",
                isActive && "bg-[rgba(175,152,196,0.72)]"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </span>
            <span className="truncate px-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}