import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { sideMenuItems } from "@/lib/constants";

import Link from "next/link"
import 'react-toastify/dist/ReactToastify.css';


export default function DashboardLayout({children}: {children: ReactNode}){
    // const router = useRouter();

    return (
        <div className="grid grid-cols-6 h-screen">
        <aside className={`hidden md:col-span-1 bg-gray-100 md:flex md:flex-col transition-transform duration-300 ease-in-out z-10 md:z-0 h-full`} style={{height: "100vh"}}>
          <div className="md:flex md:flex-col md:h-full">
            <div className="p-4 md:p-6">
              {/* Sidebar Content */}
              <h2 className="text-lg font-bold mb-4 hidden md:block">Modules</h2> {/* Title hidden on mobile */}
              <ul className="menu">
                {sideMenuItems.map((item) => (
                  <li
                    key={item.id}
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
              <p>&copy; 1Billion2Web3</p>
            </div>
          </div>
        </aside>

        <main className="md:col-span-5 col-span-full bg-white p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    );
}