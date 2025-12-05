"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'about', path: '/' },
  { name: 'blog', path: '/blog' },
  { name: 'projects', path: '/projects' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isBlogPage = pathname.startsWith('/blog');
  const isProjectsPage = pathname.startsWith('/projects');
  const shouldUseScrollBehavior = isBlogPage || (isProjectsPage && isMobile);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!shouldUseScrollBehavior) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }
      
      // Always show at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, shouldUseScrollBehavior]);

  return (
    <nav 
      className={`py-6 border-b border-muted/20 flex justify-center transition-all duration-300 ${
        shouldUseScrollBehavior
          ? `fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/70 backdrop-blur-md ${
              !isVisible ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
            }`
          : 'mb-12'
      }`}
    >
      <ul className="flex gap-6 text-base">
        {navItems.map((item) => {
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          
          return (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`transition-all duration-200 inline-block ${
                  isActive 
                    ? 'text-accent font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:-translate-y-0.5'
                }`}
                style={isActive ? { color: 'var(--accent)' } : undefined}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

