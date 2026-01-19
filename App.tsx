import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { Icons } from './components/Icons';
import { FadeIn } from './components/FadeIn';

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-bold uppercase text-gray-900 tracking-wider">{label}</span>
      <span className="text-sm font-bold text-gray-900">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
      <div 
        className="bg-brand-gold h-1.5 rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    subtitle: "20 AÑOS DE EXPERIENCIA",
    title: "GESTIONA TU ENTRENAMIENTO DE FORMA EFICAZ",
    cta: "EMPEZAR AHORA"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
    subtitle: "PROFESIONALES CUALIFICADOS",
    title: "ALCANZA TUS METAS CON LOS MEJORES",
    cta: "VER CLASES"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    subtitle: "INSTALACIONES PREMIUM",
    title: "TU ESFUERZO MERECE EL MEJOR EQUIPO",
    cta: "VISÍTANOS"
  }
];

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Initialize theme from local storage
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Update HTML class and local storage
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Carousel Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="flex-grow pt-[64px]">
        
        {/* HERO CAROUSEL SECTION */}
        <section id="inicio" className="relative w-full h-[calc(100vh-64px)] md:h-[700px] overflow-hidden bg-black group">
          
          {/* Slides Container */}
          <div 
            className="flex h-full transition-transform duration-1000 ease-out will-change-transform"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide) => (
              <div key={slide.id} className="min-w-full h-full relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Gradient (Darker on sides/bottom) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto transform translate-y-0 transition-all duration-700 delay-300">
                    
                    {/* Subtitle with lines */}
                    <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up">
                      <div className="h-[2px] w-8 md:w-16 bg-brand-gold"></div>
                      <span className="text-brand-gold font-bold uppercase tracking-widest text-sm md:text-base whitespace-nowrap">
                        {slide.subtitle}
                      </span>
                      <div className="h-[2px] w-8 md:w-16 bg-brand-gold"></div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-tight font-heading drop-shadow-lg">
                      {slide.title}
                    </h1>

                    {/* CTA Button */}
                    <a 
                      href="#contacto"
                      className="inline-flex items-center gap-2 bg-brand-gold hover:bg-yellow-500 text-white font-bold py-4 px-10 rounded-sm uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                      {slide.cta}
                      <Icons.ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-brand-gold w-8' 
                    : 'bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </section>

        {/* ABOUT US SECTION (Matching Reference) */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
               
               {/* Left Content */}
               <div className="order-2 lg:order-1">
                 <FadeIn>
                   <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 font-heading tracking-tight">
                     Sobre Nosotros
                   </h2>
                   <p className="text-gray-600 mb-6 leading-relaxed text-lg font-light">
                     Drakkar Sports, ubicado en Xàtiva, es un centro integral de alto rendimiento que ofrece formación experta en artes marciales, desarrollo físico y preparación competitiva.
                   </p>
                   <p className="text-gray-600 mb-10 leading-relaxed text-lg font-light">
                     Nuestra experiencia estructurando planes de entrenamiento complejos mientras acomodamos diversos intereses personales, nos ha permitido alcanzar la excelencia en la formación de atletas.
                   </p>

                   <div className="mt-8 space-y-4">
                     <ProgressBar label="Técnica Marcial" percentage={95} />
                     <ProgressBar label="Acondicionamiento Físico" percentage={85} />
                     <ProgressBar label="Disciplina Mental" percentage={90} />
                   </div>
                 </FadeIn>
               </div>

               {/* Right Image */}
               <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                  <FadeIn delay={200} className="relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" 
                      alt="Fitness Athlete" 
                      className="max-h-[600px] w-full object-contain lg:object-cover drop-shadow-2xl"
                    />
                  </FadeIn>
               </div>
             </div>
          </div>
        </section>

        {/* UNIFIED SERVICES & ACADEMY SECTION */}
        <section id="academia" className="relative w-full py-24 overflow-hidden bg-[#0a0a0a]">
           {/* Unified Background Image & Overlay */}
           <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1517963879466-e925ac69aa18?q=80&w=2070&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover object-center"
              />
              {/* Deep Dark Overlay for consistency, reduced opacity so image shows */}
              <div className="absolute inset-0 bg-[#111]/80 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-black/40"></div>
           </div>

           <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* PART 1: SPECIFIC DISCIPLINES (Kick Boxing, Karate, Krav Maga, MMA) */}
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">Nuestras Disciplinas</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Formación especializada adaptada a todas las edades y niveles.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 border-b border-gray-800 pb-20">
                 {/* Kick Boxing */}
                 <FadeIn delay={100} className="flex flex-col items-center text-center group">
                    <div className="mb-6 p-5 border border-brand-gold/30 rounded-lg group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                      <Icons.Target size={40} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase mb-2 tracking-wide">KICK BOXING & K1</h3>
                    <span className="inline-block bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                      Niños y Adultos
                    </span>
                    <p className="text-gray-400 text-xs leading-relaxed px-2">
                      Mejora tu resistencia y agilidad. Clases dinámicas de golpeo y combate deportivo.
                    </p>
                 </FadeIn>

                 {/* Karate */}
                 <FadeIn delay={200} className="flex flex-col items-center text-center group">
                    <div className="mb-6 p-5 border border-brand-gold/30 rounded-lg group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                      <Icons.Education size={40} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase mb-2 tracking-wide">KARATE DO</h3>
                    <span className="inline-block bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                      Niños y Adultos
                    </span>
                    <p className="text-gray-400 text-xs leading-relaxed px-2">
                      Disciplina y respeto. Desarrollo psicomotriz infantil y técnica tradicional adulta.
                    </p>
                 </FadeIn>

                 {/* Krav Maga */}
                 <FadeIn delay={300} className="flex flex-col items-center text-center group">
                    <div className="mb-6 p-5 border border-brand-gold/30 rounded-lg group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                      <Icons.Shield size={40} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase mb-2 tracking-wide">KRAV MAGA</h3>
                    <span className="inline-block bg-gray-700 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                      Solo Adultos
                    </span>
                    <p className="text-gray-400 text-xs leading-relaxed px-2">
                      Defensa personal israelí. Eficacia y supervivencia ante situaciones de peligro real.
                    </p>
                 </FadeIn>

                 {/* MMA */}
                 <FadeIn delay={400} className="flex flex-col items-center text-center group">
                    <div className="mb-6 p-5 border border-brand-gold/30 rounded-lg group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                      <Icons.Fight size={40} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase mb-2 tracking-wide">MMA</h3>
                    <span className="inline-block bg-gray-700 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                      Solo Adultos
                    </span>
                    <p className="text-gray-400 text-xs leading-relaxed px-2">
                      Artes Marciales Mixtas. Combate total integrando golpeo, derribos y lucha de suelo.
                    </p>
                 </FadeIn>
              </div>

              {/* PART 2: ACADEMY PHILOSOPHY (Excelencia Marcial...) */}
              <FadeIn>
                 <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">
                     EXCELENCIA MARCIAL Y DISCIPLINA
                   </h2>
                   <div className="w-24 h-1 bg-brand-gold mx-auto mt-6"></div>
                 </div>
              </FadeIn>

              {/* 3 Columns Features (Preserved from previous design but integrated) */}
              <div className="grid md:grid-cols-3 gap-12 lg:gap-16 pt-8">
                 {/* Column 1 */}
                 <FadeIn delay={100} className="flex flex-col items-center text-center group">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                       <Icons.Gym size={56} className="text-white opacity-80 group-hover:text-brand-gold group-hover:opacity-100 transition-colors" strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase mb-4 tracking-wide">PONTE EN FORMA</h3>
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
                      Entrenamientos diseñados para transformar tu físico mientras aprendes habilidades útiles.
                    </p>
                 </FadeIn>

                 {/* Column 2 */}
                 <FadeIn delay={200} className="flex flex-col items-center text-center group">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                       <Icons.Medal size={56} className="text-white opacity-80 group-hover:text-brand-gold group-hover:opacity-100 transition-colors" strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase mb-4 tracking-wide">INSTRUCTORES TITULADOS</h3>
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
                      Equipo docente cualificado con años de experiencia en competición y enseñanza.
                    </p>
                 </FadeIn>

                 {/* Column 3 */}
                 <FadeIn delay={300} className="flex flex-col items-center text-center group">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                       <Icons.Chart size={56} className="text-white opacity-80 group-hover:text-brand-gold group-hover:opacity-100 transition-colors" strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase mb-4 tracking-wide">SUPERA TUS LÍMITES</h3>
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
                      Desarrolla una mentalidad inquebrantable que te servirá dentro y fuera del tatami.
                    </p>
                 </FadeIn>
              </div>
           </div>
        </section>

        {/* NEW SECTION: SOMOS DIFERENTES / NUESTRA MISION */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
               
               {/* Left Column: Somos Diferentes */}
               <div>
                  <FadeIn>
                    <h2 className="text-4xl font-black text-gray-900 mb-12 font-heading tracking-tight">
                      SOMOS DIFERENTES
                    </h2>
                    
                    <div className="space-y-10">
                       {/* Feature 1 */}
                       <div className="flex gap-6 group">
                          <div className="shrink-0">
                             <Icons.Chart className="w-12 h-12 text-brand-gold stroke-[1.5px]" />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold uppercase mb-2 text-gray-900">Evolución Constante</h3>
                             <p className="text-gray-600 leading-relaxed font-light">
                               Analizamos tu progreso día a día para garantizar resultados tangibles en tu técnica y condición física, adaptando la carga a tu nivel.
                             </p>
                          </div>
                       </div>

                       {/* Feature 2 */}
                       <div className="flex gap-6 group">
                          <div className="shrink-0">
                             <Icons.Notebook className="w-12 h-12 text-brand-gold stroke-[1.5px]" />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold uppercase mb-2 text-gray-900">Planificación Estructurada</h3>
                             <p className="text-gray-600 leading-relaxed font-light">
                               No improvisamos. Cada sesión sigue un programa técnico diseñado metodológicamente para maximizar tu aprendizaje y seguridad.
                             </p>
                          </div>
                       </div>

                       {/* Feature 3 */}
                       <div className="flex gap-6 group">
                          <div className="shrink-0">
                             <Icons.Search className="w-12 h-12 text-brand-gold stroke-[1.5px]" />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold uppercase mb-2 text-gray-900">Atención al Detalle</h3>
                             <p className="text-gray-600 leading-relaxed font-light">
                               Nuestros instructores corrigen y perfeccionan cada movimiento. La excelencia técnica es nuestra prioridad absoluta.
                             </p>
                          </div>
                       </div>
                    </div>
                  </FadeIn>
               </div>

               {/* Right Column: Nuestra Misión */}
               <div>
                  <FadeIn delay={200}>
                    <h2 className="text-4xl font-black text-gray-900 mb-12 font-heading tracking-tight">
                      NUESTRA MISIÓN
                    </h2>
                    
                    {/* Video Placeholder Wrapper with shadow/border like reference */}
                    <div className="bg-white p-2 shadow-xl rounded-sm">
                       <div className="aspect-video w-full bg-black relative group cursor-pointer overflow-hidden">
                          {/* Simulated Video Thumbnail */}
                          <img 
                            src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop" 
                            alt="Drakkar Sports Video" 
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-20 h-20 bg-brand-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                             </div>
                          </div>
                       </div>
                       <div className="p-4">
                         <p className="text-gray-500 text-sm italic">
                           "Formar personas fuertes, seguras y disciplinadas a través de los valores de las artes marciales."
                         </p>
                       </div>
                    </div>
                  </FadeIn>
               </div>

            </div>
          </div>
        </section>

        {/* PROGRAMS SECTION */}
        <Section id="programas" variant="light">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase mb-4 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-brand-red after:mt-4 after:mx-auto">
              NUESTROS PROGRAMAS
            </h2>
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              Adaptamos la enseñanza a tus necesidades, ya sea iniciación, perfeccionamiento o competición.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Enseñanza Individual", 
                desc: "Clases particulares personalizadas para acelerar tu aprendizaje técnico y táctico.",
                icon: <Icons.Target className="w-12 h-12 text-brand-red mb-4" />
              },
              { 
                title: "Enseñanza Colectiva", 
                desc: "Entrena en grupo, mejora tu condición física y aprende valores de compañerismo.",
                icon: <Icons.Users className="w-12 h-12 text-brand-red mb-4" />
              },
              { 
                title: "Clases Adaptadas", 
                desc: "Formación inclusiva adaptada a colectivos con necesidades y capacidades especiales.",
                icon: <Icons.Shield className="w-12 h-12 text-brand-red mb-4" />
              }
            ].map((card, idx) => (
              <FadeIn key={idx} delay={idx * 150} className="bg-white p-8 shadow-card hover:shadow-xl transition-all hover:transform hover:-translate-y-2 group border-t-4 border-transparent hover:border-brand-red">
                {card.icon}
                <h3 className="text-xl font-bold text-black mb-4 uppercase">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed font-body">{card.desc}</p>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* TRAINING / PROFESSIONALIZATION */}
        <Section id="formacion" variant="gray">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Carrera Deportiva</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 uppercase text-gray-900">Formación de Técnicos</h2>
              <div className="w-16 h-1 bg-brand-red mx-auto mt-4"></div>
            </div>

            <div className="grid gap-6">
               {[
                 "Cursos online y presenciales con certificación oficial.",
                 "Profesionalización de técnicos deportivos de nivel 1, 2 y 3.",
                 "Cursos homologados para cuerpos de seguridad del estado."
               ].map((item, idx) => (
                 <FadeIn key={idx} delay={idx * 100} className="flex items-center justify-between bg-white p-6 shadow-sm border-l-4 border-gray-200 hover:border-brand-red transition-all group cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center text-brand-red font-black text-xl">
                        {idx + 1}.
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 font-heading">{item}</h3>
                    </div>
                    <Icons.ArrowRight className="text-gray-400 group-hover:text-brand-red transition-colors" />
                 </FadeIn>
               ))}
            </div>
          </div>
        </Section>

        {/* FEDERATION */}
        <Section id="federacion" variant="dark" className="bg-[#111]">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="md:w-2/3">
               <h2 className="text-2xl md:text-4xl font-extrabold mb-4 uppercase leading-tight">
                 Federación Valenciana de Lucha
                 <span className="block text-brand-red text-xl mt-2 font-bold">Delegación Interior</span>
               </h2>
               <p className="text-gray-400 text-lg font-light leading-relaxed">
                 Sede oficial para la gestión, promoción y desarrollo de deportes de lucha en la zona interior. 
                 Garantía de calidad y oficialidad en grados y titulaciones.
               </p>
             </div>
             <div className="md:w-1/3 flex justify-center">
                <div className="w-40 h-40 border-8 border-brand-red rounded-full flex items-center justify-center text-white bg-black">
                  <Icons.Shield size={80} />
                </div>
             </div>
           </div>
        </Section>

        {/* COMPETITION */}
        <Section id="competicion" variant="light">
           <FadeIn>
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase mb-4">
                  NUESTROS ATLETAS
                </h2>
                <div className="w-16 h-1 bg-brand-red mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-3xl mx-auto font-body">
                  El trabajo técnico, la disciplina y el nivel mostrado refuerzan la posición del club como una referencia nacional.
                </p>
             </div>
           </FadeIn>

           {/* Team Photo */}
           <FadeIn delay={200} className="w-full">
             <div className="relative rounded-sm overflow-hidden shadow-2xl group aspect-[16/9] md:aspect-[21/9]">
               <img 
                 src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop" 
                 alt="Equipo Drakkar Sports" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
                  <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-widest text-shadow-lg">
                    Equipo de Competición
                  </h3>
               </div>
             </div>
           </FadeIn>
        </Section>

        {/* CONTACT */}
        <Section id="contacto" className="bg-[#1a1a1a] text-white">
           <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold uppercase">Contáctanos</h2>
               <div className="w-16 h-1 bg-brand-red mx-auto mt-4"></div>
             </div>

             <div className="grid md:grid-cols-2 gap-0 shadow-2xl">
               {/* Left Info */}
               <div className="bg-[#111] p-10 md:p-14 flex flex-col justify-center space-y-8">
                 <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 bg-brand-red flex items-center justify-center text-white shrink-0">
                     <Icons.Mail size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg text-white uppercase tracking-wider">Email</h3>
                     <a href="mailto:DRAKKARSPORTS@gmail.com" className="text-gray-400 group-hover:text-brand-red transition-colors">
                       DRAKKARSPORTS@gmail.com
                     </a>
                   </div>
                 </div>

                 <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 bg-brand-red flex items-center justify-center text-white shrink-0">
                     <Icons.Phone size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg text-white uppercase tracking-wider">Teléfono</h3>
                     <a href="tel:691801842" className="text-gray-400 group-hover:text-brand-red transition-colors">
                       691 801 842
                     </a>
                   </div>
                 </div>

                 <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 bg-brand-red flex items-center justify-center text-white shrink-0">
                     <Icons.MapPin size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg text-white uppercase tracking-wider">Ubicación</h3>
                     <p className="text-gray-400 group-hover:text-white transition-colors">
                       Calle Hort de l’Almunia N14, Xàtiva
                     </p>
                   </div>
                 </div>
               </div>

               {/* Right Form */}
               <div className="bg-white p-10 md:p-14">
                 <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                   <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre Completo</label>
                     <input type="text" className="w-full bg-gray-100 border-b-2 border-gray-200 p-3 text-gray-900 focus:border-brand-red outline-none transition-colors" placeholder="Tu nombre" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Teléfono</label>
                     <input type="tel" className="w-full bg-gray-100 border-b-2 border-gray-200 p-3 text-gray-900 focus:border-brand-red outline-none transition-colors" placeholder="Tu teléfono" />
                   </div>
                   <button className="w-full bg-brand-red text-white font-bold py-4 px-8 uppercase tracking-widest hover:bg-black transition-colors mt-4">
                     Enviar Mensaje
                   </button>
                 </form>
               </div>
             </div>
           </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="block font-black text-2xl tracking-tighter mb-2">DRAKKAR SPORTS</span>
              <p className="text-gray-500 text-sm max-w-md font-body">
                Forjando carácter y disciplina a través del deporte.
              </p>
            </div>
            <div className="text-gray-600 text-sm font-semibold uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Xàtiva
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;