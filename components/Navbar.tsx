import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Academia', href: '#academia' },
  { label: 'Programas', href: '#programas' },
  { label: 'Competición', href: '#competicion' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Material', href: '#material' },
  { label: 'Colabora', href: '#colabora' },
];

export const Navbar: React.FC<{ darkMode: boolean; toggleTheme: () => void }> = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white py-3 shadow-sm' 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-red rounded-md flex items-center justify-center text-white font-bold text-lg group-hover:bg-brand-gold transition-colors shadow-sm">
              D
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 font-heading">
              DRAKKAR
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-xs font-bold uppercase tracking-wide transition-colors text-gray-700 hover:text-brand-red"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={() => handleNavClick('#contacto')}
              className="bg-brand-red hover:bg-black text-white px-4 py-1.5 rounded-none font-bold text-xs uppercase tracking-wide transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-900"
            >
              {isOpen ? <Icons.Close size={24} /> : <Icons.Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-[60px] bg-white shadow-xl transition-all duration-300 ease-in-out origin-top transform ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-lg font-bold text-gray-900 hover:text-brand-red w-full text-center py-2 uppercase"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contacto')}
            className="w-full bg-brand-red text-white py-3 font-bold uppercase tracking-wide mt-4"
          >
            Contactar
          </button>
        </div>
      </div>
    </header>
  );
};