import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Instagram, Twitter, MoveRight } from "lucide-react";

import { trackContactSubmit, trackProductView, trackAddToCart } from "@/lib/analytics";

import heroImg from "../assets/images/hero.jpg";
import look1Img from "../assets/images/look-1.jpg";
import shoes1Img from "../assets/images/shoes-1.jpg";
import lifestyle1Img from "../assets/images/lifestyle-1.jpg";
import look2Img from "../assets/images/look-2.jpg";
import shoes2Img from "../assets/images/shoes-2.jpg";
import grid1Img from "../assets/images/grid-1.jpg";
import grid2Img from "../assets/images/grid-2.jpg";
import shoes3Img from "../assets/images/shoes-3.jpg";
import look3Img from "../assets/images/look-3.jpg";

const FadeIn = ({
  children,
  delay = 0,
  onViewportEnter,
}: {
  children: React.ReactNode;
  delay?: number;
  onViewportEnter?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    onViewportEnter={onViewportEnter}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 flex items-center justify-between ${
          isScrolled ? "bg-background/90 backdrop-blur-md py-4" : "bg-transparent text-white mix-blend-difference"
        }`}
      >
        <div className="flex-1 hidden md:block">
          <ul className="flex space-x-8 text-sm uppercase tracking-widest font-medium">
            <li><a href="#collection" className="hover:text-secondary transition-colors">Collection</a></li>
            <li><a href="#shoes" className="hover:text-secondary transition-colors">Footwear</a></li>
            <li><a href="#atelier" className="hover:text-secondary transition-colors">Atelier</a></li>
          </ul>
        </div>
        
        <div className="flex-1 text-center font-serif text-3xl md:text-4xl tracking-widest font-bold">
          <a href="#">MAISON</a>
        </div>
        
        <div className="flex-1 flex justify-end">
          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex space-x-6 text-sm uppercase tracking-widest font-medium items-center">
            <a href="#about" className="hover:text-secondary transition-colors">House</a>
            <button className="border-b border-current pb-1 hover:text-secondary hover:border-secondary transition-all">
              Boutique
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 z-50 bg-background flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-end pt-2">
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-8 h-8 text-foreground" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8 text-center font-serif text-4xl">
              <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
              <a href="#shoes" onClick={() => setMenuOpen(false)}>Footwear</a>
              <a href="#atelier" onClick={() => setMenuOpen(false)}>Atelier</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>The House</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const featuredProduct = {
    item_id: "look-structure-fluidity",
    item_name: "Structure & Fluidity — Ready-to-Wear Look",
    price: 1290,
    currency: "USD",
    category: "Ready-to-Wear",
  };

  const handleAddToCart = () => {
    trackAddToCart(featuredProduct, 1);
  };

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY }}
        >
          <img 
            src={heroImg} 
            alt="Maison Automne-Hiver" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4"
          >
            Automne—Hiver 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none mb-6 tracking-tight"
          >
            L'Essence
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-widest rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-16 bg-white/50 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Manifesto / Introduction */}
      <section id="about" className="py-32 md:py-48 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-foreground">
            Dressing is not merely about covering the body. It is an act of <span className="italic text-secondary">self-expression</span>, a quiet rebellion against the ordinary.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed md:text-lg">
            At MAISON, we reside at the intersection of Parisian minimalism and modern edge. Every silhouette, every seam, and every chosen material is a deliberate statement designed for those who treat getting dressed as an art form.
          </p>
        </FadeIn>
      </section>

      {/* 3. Editorial Look 1 */}
      <section id="collection" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-5/12 order-2 md:order-1">
            <FadeIn onViewportEnter={() => trackProductView(featuredProduct)}>
              <h3 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1]">Structure &<br/>Fluidity</h3>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                The tension between rigid tailoring and flowing textiles creates a dynamic that demands attention. Our ready-to-wear pieces are constructed with absolute precision.
              </p>
              <button onClick={handleAddToCart} className="flex items-center gap-4 uppercase tracking-widest text-sm font-medium hover:text-secondary transition-colors group pb-2 border-b border-foreground w-max">
                Discover the Look
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </FadeIn>
          </div>
          <div className="w-full md:w-7/12 order-1 md:order-2">
            <FadeIn delay={0.2}>
              <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                <img 
                  src={look1Img} 
                  alt="Structure and Fluidity" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Collection Grid */}
      <section className="py-32 px-4 md:px-8 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none overflow-hidden h-full w-full flex items-center justify-end">
          <motion.span 
            className="font-serif text-[25vw] leading-none whitespace-nowrap"
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            MAISON
          </motion.span>
        </div>
        
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex justify-between items-end mb-24 px-4 border-b border-background/20 pb-8">
              <h2 className="font-serif text-5xl md:text-7xl">Curated<br/>Moments</h2>
              <p className="hidden md:block text-sm uppercase tracking-[0.3em] text-background/60">Archive 01</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FadeIn delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden group">
                <img src={grid1Img} alt="Collection piece" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white uppercase tracking-widest border-b border-white pb-1">View Details</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="relative aspect-[4/5] overflow-hidden group md:mt-24">
                <img src={grid2Img} alt="Collection piece" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white uppercase tracking-widest border-b border-white pb-1">View Details</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="relative aspect-[4/5] overflow-hidden group">
                <img src={look3Img} alt="Collection piece" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white uppercase tracking-widest border-b border-white pb-1">View Details</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Focus: The Shoes */}
      <section id="shoes" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 text-secondary">The Accessories</h2>
            <h3 className="font-serif text-5xl md:text-7xl">Designed to be Noticed</h3>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-5">
            <FadeIn>
              <div className="aspect-[4/5] overflow-hidden group">
                <img src={shoes1Img} alt="Premium Loafers" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="mt-6">
                <h4 className="font-serif text-3xl">The Riviera Loafer</h4>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Aged Calfskin</p>
              </div>
            </FadeIn>
          </div>
          
          <div className="md:col-span-4 md:mt-32">
            <FadeIn delay={0.2}>
              <div className="aspect-[3/4] overflow-hidden group">
                <img src={shoes2Img} alt="Stiletto Boots" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="mt-6">
                <h4 className="font-serif text-3xl">Midnight Stiletto</h4>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Structured Leather</p>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-3 md:-mt-16 hidden lg:block">
            <FadeIn delay={0.4}>
              <div className="aspect-[4/5] overflow-hidden group">
                <img src={shoes3Img} alt="Edgy Boots" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="mt-6">
                <h4 className="font-serif text-2xl">Vanguard Boot</h4>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Heavy Sole</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. Atelier / Lifestyle */}
      <section id="atelier" className="relative py-48 md:py-64 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src={lifestyle1Img} alt="Atelier Behind the Scenes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-background">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">The Artisan's Touch</h2>
            <p className="text-lg md:text-xl text-background/80 leading-relaxed font-light">
              True luxury cannot be rushed. In our Parisian atelier, time is a material as vital as the textiles we source. Every garment carries the invisible signature of the hands that shaped it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 7. Look 2 - Edge & Elegance */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <FadeIn>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={look2Img} alt="Midnight Blue Suit" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <FadeIn delay={0.2}>
              <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 text-secondary">Signature Tailoring</h2>
              <h3 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Uncompromising<br/>Elegance</h3>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                The midnight blue suit redefines formalwear. With sharp shoulders and a modern silhouette, it offers an aesthetic that is both timeless and strikingly contemporary.
              </p>
              <button className="flex items-center gap-4 text-foreground border-b border-foreground pb-2 uppercase tracking-widest text-sm font-medium hover:text-secondary hover:border-secondary transition-colors group">
                Explore Tailoring
                <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. Newsletter / Invitation */}
      <section className="py-32 bg-secondary/10 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Join the Maison</h2>
            <p className="text-muted-foreground mb-12">
              Receive invitations to private viewings, early access to collections, and exclusive editorial content.
            </p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); trackContactSubmit("newsletter"); }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-transparent border-b border-foreground/30 px-4 py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
              />
              <button type="submit" className="bg-foreground text-background px-8 py-3 uppercase tracking-widest text-sm hover:bg-secondary transition-colors">
                Subscribe
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-foreground text-background py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl mb-6">MAISON</h2>
            <p className="text-background/60 max-w-xs text-sm leading-relaxed">
              Parisian minimalism and modern edge. A luxury ready-to-wear label for people who treat getting dressed as a form of self-expression.
            </p>
          </div>
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-background/50">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Footwear</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">The Atelier</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Boutiques</a></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-background/50">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-background/80 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background/80 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-background/80 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-background/80 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/20 text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} MAISON. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-background transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-background transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
