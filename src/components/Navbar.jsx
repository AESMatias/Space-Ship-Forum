
'use client'
import { useState } from 'react'; // Importa useState
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from "@/components/dark-toggle";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="w-full py-2 border-b-2"
            style={{
                backgroundColor: 'var(--backgroundNavbar)',
                borderBottomColor: 'var(--color-secondary)'
            }}>
            <div className="flex flex-row justify-between px-4 md:px-6 lg:px-8 ">
                <div className="flex flex-row justify-end w-7/12 items-center ">
                    <div className="flex-shrink-0">

                        <Image
                            src="/logo.jpeg"
                            width={50}
                            height={50}
                            alt="Forum Logo"
                            className='rounded-full self-center border-2 border-cyan-400 border-solid'
                        />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link href="/">
                                <button className="text-gray-300 hover:bg-teal-500/70 hover:text-white px-3 py-2 
                                rounded-md text-sm font-medium">Home</button>
                            </Link>
                            {/* <Link href="/Login">
                                <button className="text-gray-300 hover:bg-teal-500/70 hover:text-white px-3 py-2 
                                rounded-md text-sm font-medium">Login</button>
                            </Link> */}
                            <Link href="/Account">
                                <button className="text-gray-300 hover:bg-teal-500/70 hover:text-white px-3 py-2 
                                rounded-md text-sm font-medium">Account</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <ModeToggle />
                </div>
            </div>

            <div className={`md:hidden text-center`}>
                <div className="px-2 pt-2 pb-3 md:px-3">
                    <button className="block text-gray-300 w-full hover:bg-teal-500/70 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        onClick={toggleAccordion}>
                        {isOpen ? `Close menu` : `Open the Menu (Accordion)`}
                    </button>
                    {isOpen && (
                        <>
                            <Link href="/">
                                <button className="w-full block text-gray-300 hover:bg-teal-500/70
                                 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</button>
                            </Link>
                            <Link href="/Login">
                                <button className="w-full block text-gray-300 hover:bg-teal-500/70
                                 hover:text-white px-3 py-2 rounded-md text-base font-medium">Log in</button>
                            </Link>
                            <Link href="/Register">
                                <button className="w-full block text-gray-300 hover:bg-teal-500/70
                                 hover:text-white px-3 py-2 rounded-md text-base font-medium">Register</button>
                            </Link>
                            <Link href="/Account">
                                <button className="w-full block text-gray-300 hover:bg-teal-500/70
                                 hover:text-white px-3 py-2 rounded-md text-base font-medium">Account</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav >
    )
}

export default Navbar;