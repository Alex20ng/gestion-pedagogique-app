import BottomBar from "@/components/ui/bottomBar";
import SideBar from "@/components/ui/sideBar";


export default function AdminLayout({children}: {children:React.ReactNode}){
    return (
        <>
            <div className="flex min-h-screen">
                <div className="hidden sm:flex">
                    <SideBar />
                </div>

                <div className="min-w-0 flex-1 pb-24 sm:pb-0">
                    {children}
                </div>
            </div>

            <BottomBar />
        </>
    )
}
