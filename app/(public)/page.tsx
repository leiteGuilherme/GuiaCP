"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  BookOpen,
  Crosshair,
  Smartphone,
  GraduationCap,
  Box,
  Activity,
  Zap,
  Droplet,
  Smile,
  Settings,
  Layers,
  Network,
  GitBranch,
  MessageSquare,
  Check,
  Star,
  ChevronRight,
  Skull
} from 'lucide-react';

export default function Home() {
  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4', 'translate-x-4', 'translate-x-[-20px]', 'translate-x-[20px]');
          entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3D Card Effect
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -1 * ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/hero-anatomy.jpg"
            alt="Anatomia de Cabeça e Pescoço"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl animate-on-scroll opacity-0 translate-y-4 transition-all duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 text-brand text-xs font-bold uppercase tracking-wider mb-6 border border-brand/10">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
              Liga Acadêmica de Anatomia de Cabeça e Pescoço - UFS
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">
              A anatomia de <br />
              <span className="text-brand bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light">Cabeça e Pescoço</span>
              <br /> ao seu alcance.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              GuiaCP é o seu portal definitivo para estudos anatômicos. Ciência, precisão e didática unidas para estudantes e profissionais da saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#conteudos" className="px-8 py-4 bg-brand text-white rounded-full hover:bg-brand-light transition-all shadow-xl shadow-brand/25 font-medium flex items-center justify-center gap-2">
                Explorar Conteúdos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#sobre" className="px-8 py-4 bg-white text-brand border border-brand/20 rounded-full hover:bg-brand/5 transition-all font-medium flex items-center justify-center">
                Saiba Mais
              </Link>
            </div>
            <p className="mt-8 text-xs text-slate-400 uppercase tracking-widest">
              Desenvolvido por Guilherme Leite de Oliveira
            </p>
          </div>


        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-brand-surface">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O que é o GuiaCP?</h2>
            <div className="w-20 h-1 bg-brand mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 text-lg">
              Um portal criado por estudantes para estudantes. Nossa missão é desmistificar a anatomia de cabeça e pescoço através de uma abordagem visual, direta e cientificamente embasada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Didática", desc: "Linguagem acessível sem perder o rigor técnico necessário para a formação acadêmica." },
              { icon: Crosshair, title: "Precisão", desc: "Referências anatômicas baseadas nas principais bibliografias mundiais de odontologia." },
              { icon: Smartphone, title: "Acesso Rápido", desc: "Estude onde estiver. Plataforma otimizada para celular, tablet e computador." },

            ].map((feature, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 group animate-on-scroll opacity-0 translate-y-4 delay-${(index + 1) * 100}`}>
                <div className="w-14 h-14 bg-brand/5 rounded-xl flex items-center justify-center text-brand mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="conteudos" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-on-scroll opacity-0 translate-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Explore por Categorias</h2>
              <p className="text-slate-500">Navegue pelos sistemas anatômicos fundamentais.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center text-brand font-semibold hover:text-brand-light transition-colors mt-4 md:mt-0">
              Ver todo o acervo <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Box, mainIcon: Skull, title: "Crânio", desc: "Osteologia completa: Mandíbula, Maxila, Zigomático e mais." },
              { icon: Layers, mainIcon: Activity, title: "Músculos", desc: "Mímica facial, mastigação e musculatura cervical detalhada." },
              { icon: Network, mainIcon: Zap, title: "Inervação", desc: "Trajetos, inervação e relevância clínica dos XII pares cranianos." },
              { icon: GitBranch, mainIcon: Droplet, title: "Vascularização", desc: "Principais artérias e veias. Carótidas, Jugulares e ramificações." },
              { icon: MessageSquare, mainIcon: Smile, title: "Cavidade Oral", desc: "Língua, palato, glândulas salivares e estruturas intraorais." },
              { icon: Settings, mainIcon: Settings, title: "ATM", desc: "Articulação Temporomandibular." }

            ].map((category, index) => (
              <Link key={index} href={`/categoria/${encodeURIComponent(category.title)}`} className="group bg-white rounded-2xl border border-slate-200 p-8 card-hover-effect relative overflow-hidden animate-on-scroll opacity-0 translate-y-4">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <category.mainIcon className="w-24 h-24 text-brand" />
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-brand mb-6 border border-slate-100">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-brand transition-colors">{category.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{category.desc}</p>
                <span className="text-brand text-sm font-semibold flex items-center">Acessar <ChevronRight className="w-4 h-4 ml-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="vantagens" className="py-24 bg-brand text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-on-scroll opacity-0 translate-y-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Por que desenvolvemos o GuiaCP para seus estudos?</h2>
            <p className="text-brand-surface/80 text-lg">
              Para que você possa utilizar uma metodologia que une a teoria da sala de aula com o digital, possibilitando uma experiencia visual necessária para a excelência na Odontologia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Conteúdo Exclusivo da Liga da UFS", desc: "Material curado por membros da liga e revisado por professores doutores." },
              { title: "Visual Moderno e Intuitivo", desc: "Esqueça os atlas antigos e confusos. Navegação limpa e direta." },
              { title: "Foco Absoluto em Cabeça e Pescoço", desc: "Não somos um atlas geral. Somos especialistas na sua área de atuação." }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-4" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white/20 p-3 rounded-full mb-4"><Check className="w-6 h-6 text-white" /></div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Team Section */}
      <section id="equipe" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Quem faz o GuiaCP</h2>

          <div className="flex flex-wrap justify-center gap-10">
            {[
              { name: "LAACAP", role: "Liga Acadêmica", image: "/laacap-logo.jpg" },
              { name: "Dr. Paulo Galvanini", role: "Professor Orientador", image: "/professor.png" }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-slate-100 group-hover:border-brand transition-colors mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover bg-slate-50"
                  />
                </div>
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-brand uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-slate-500 max-w-2xl mx-auto">
            A LAACAP é comprometida com a extensão, pesquisa e ensino, levando conhecimento de qualidade para além dos muros da universidade.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para dominar a anatomia?</h2>

          <Link href="#conteudos" className="px-8 py-4 bg-brand hover:bg-brand-light text-white rounded-full font-bold transition-all inline-flex items-center gap-2 shadow-glow">
            Começar a Estudar Agora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
