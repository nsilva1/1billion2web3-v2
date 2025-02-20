import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import menu from '@/images/menu.svg'
import { sideMenuItems } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";


export default function DashboardLayout({children}: {children: ReactNode}){
    const router = useRouter();

    // let activeStyling = `${router.pathname === item.href ? 'bg-gray-200 font-bold' : ''}`

    return (
        <div className="grid grid-cols-6 h-screen">
        {/* Mobile Navbar/Sidebar */}
        <div className="col-span-6 bg-gray-800 text-white p-4 md:hidden flex justify-between items-center">
          <span className="font-bold">My App</span> {/* Your app name */}
          <button>
            <Image src={menu} alt="menu" className="h-6 w-6" />
          </button>
        </div>
  
        {/* Sidebar (Hidden on mobile by default) */}
        <aside className={`md:col-span-1 bg-gray-100 md:flex md:flex-col transition-transform duration-300 ease-in-out z-10 md:z-0`} style={{height: "100vh"}}>
          <div className="md:flex md:flex-col md:h-full"> {/* Added for full height on desktop */}
            <div className="p-4 md:p-6">
              {/* Sidebar Content */}
              <h2 className="text-lg font-bold mb-4 hidden md:block">Sidebar</h2> {/* Title hidden on mobile */}
              <ul className="menu">
                {sideMenuItems.map((item) => (
                  <li
                    key={item.id}
                    // href={item.href}
                    className={`block px-4 py-2 rounded hover:bg-gray-200 md:mb-2`} // Active p styling
                  >
                    <details>
                        <summary className="cursor-pointer">{item.title}</summary>
                        <ul className='my-4'>
                            {
                                item.modules.map((module) => (
                                    <li key={module.name} className="my-4 pl-4">
                                        <Link href={module.path}>{module.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
            {/* Optional: Add footer content to the sidebar */}
            <div className="mt-auto p-4 md:p-6 hidden md:block">
              <p>&copy; 2023 My Company</p>
            </div>
          </div>
        </aside>
  
        {/* Main Content */}
        <main className="md:col-span-5 bg-white p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    );
}