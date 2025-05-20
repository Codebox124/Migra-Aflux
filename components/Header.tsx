'use client'
import { useState } from "react";
import { Search, Heart, Bell, User, Menu, X, Home,  } from "lucide-react";


export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">

                    <div className="flex items-center">
                        <div className="mr-2 h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center">
                            <Home className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold text-black">Migra Aflux</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-9 space-x-6">
                        <a href="/" className="font-medium text-black hover:text-blue-600">Home</a>
                        <a href="/properties" className="font-medium text-black hover:text-blue-600">Properties</a>
                        <a href="/marketplace" className="font-medium text-black hover:text-blue-600">Marketplace</a>



                        
                    </nav>


                    <div className="flex items-center space-x-4">
                      


                        <button className="flex items-center justify-center h-10 w-10 rounded-full hover:b-blacktext-black">
                            <User size={20} className="text-black" />
                        </button>
                        <button
                            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:b-blacktext-black"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
                        </button>
                    </div>
                </div>
            </div>


            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="container mx-auto px-4 py-3">
                        <div className="space-y-3">
                            <a href="/" className="block py-2 text-black hover:text-blue-600">Home</a>
                            <a href="/properties" className="block py-2 text-black hover:text-blue-600">Properties</a>
                            <a href="/marketplace" className="block py-2 text-black hover:text-blue-600">Marketplace</a>
                         
                         
                          
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};