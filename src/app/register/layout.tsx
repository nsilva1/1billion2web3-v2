import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
// import styles from "@/styles";

export default function LoginLayout({children}: {children: ReactNode}) {
    return (
        <section>
            <Navbar />
            <div className='p-6'>
                {children}
            </div>
        </section>
    )
}