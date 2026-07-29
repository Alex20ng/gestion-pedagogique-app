import SideBar from "@/components/ui/sideBar";


export default function AdminLayout({children}: {children:React.ReactNode}){
    return (
        <>
            {/* Desktop */}
            <div className="hidden sm:flex min-h-screen">
                <SideBar />
                <main className="flex-1">{children}</main>
            </div>

            {/* Mobile */}
            <div className="sm:hidden">
                {children}
            </div>
        </>
    )
}