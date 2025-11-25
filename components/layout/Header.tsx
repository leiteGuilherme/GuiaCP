"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Skull, Menu, X } from 'lucide-react';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-2 shadow-md' : 'glass-nav py-4'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white">
                        <Skull className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-brand-dark">
                        Guia<span className="text-slate-900">CP</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link href="/#sobre" className="hover:text-brand transition-colors">Sobre</Link>
                    <Link href="/#conteudos" className="hover:text-brand transition-colors">Conteúdos</Link>
                    <Link href="/#vantagens" className="hover:text-brand transition-colors">Diferenciais</Link>
                    <Link href="/#equipe" className="hover:text-brand transition-colors">A Liga</Link>
                    <Link
                        href="/admin/login"
                        className="px-5 py-2.5 bg-brand text-white rounded-full hover:bg-brand-light transition-all shadow-lg shadow-brand/20"
                    >
                        Login
                    </Link>
                    <span className="text-xs text-gray-400">V1.0.0</span>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg flex flex-col p-6 gap-4">
                    <Link href="/#sobre" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Sobre</Link>
                    <Link href="/#conteudos" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Conteúdos</Link>
                    <Link href="/#vantagens" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Diferenciais</Link>
                    <Link href="/#equipe" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>A Liga</Link>
                    <Link
                        href="/admin/login"
                        className="mt-2 px-5 py-3 bg-brand text-center text-white rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Acessar Portal
                    </Link>
                </div>
            )}
        </header>
    );
}
