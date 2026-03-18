/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Video,
  Users,
  BrainCircuit,
  HeartHandshake
} from 'lucide-react';

const TYPEWRITER_WORDS = [
  "Hayatın zorluklarıyla",
  "Kaygı ve stresle",
  "İlişki sorunlarıyla",
  "Tükenmişlikle",
  "Geçmişin yüküyle"
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Typewriter state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentWord = TYPEWRITER_WORDS[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length <= 1) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        }
      }, 25); // Daha hızlı ve akıcı silme
    } else {
      if (currentText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // Bekleme süresi
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, 45); // Daha akıcı ve doğal yazma hızı
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-accent-200 selection:text-accent-900">
      {/* Floating WhatsApp Button - CRITICAL FOR CONVERSION */}
      <a 
        href="https://wa.me/905466821306" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="WhatsApp'tan Ulaşın"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Hemen Bilgi Alın
        </span>
      </a>

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-serif text-xl italic">
              K
            </div>
            <div>
              <h1 className="font-serif font-semibold text-xl leading-tight text-brand-900">Koçak Psikoloji</h1>
              <p className="text-xs text-brand-600 font-medium tracking-wider uppercase">Uzm. Kli. Psk. Büşra Sarıhan Koçak</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hizmetler')} className="text-sm font-medium text-brand-800 hover:text-accent-600 transition-colors">Hizmetler</button>
            <button onClick={() => scrollToSection('hakkimda')} className="text-sm font-medium text-brand-800 hover:text-accent-600 transition-colors">Hakkımda</button>
            <button onClick={() => scrollToSection('yorumlar')} className="text-sm font-medium text-brand-800 hover:text-accent-600 transition-colors">Danışan Yorumları</button>
            <button onClick={() => scrollToSection('sss')} className="text-sm font-medium text-brand-800 hover:text-accent-600 transition-colors">S.S.S.</button>
            
            <div className="flex items-center gap-4 ml-4">
              <a href="tel:+905466821306" className="flex items-center gap-2 text-sm font-semibold text-brand-900 hover:text-accent-600 transition-colors">
                <Phone size={16} />
                0546 682 13 06
              </a>
              <button 
                onClick={() => scrollToSection('iletisim')}
                className="bg-accent-600 hover:bg-accent-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Calendar size={16} />
                Randevu Al
              </button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <button onClick={() => scrollToSection('hizmetler')} className="text-left py-2 text-brand-800 font-medium border-b border-gray-50">Hizmetler</button>
                <button onClick={() => scrollToSection('hakkimda')} className="text-left py-2 text-brand-800 font-medium border-b border-gray-50">Hakkımda</button>
                <button onClick={() => scrollToSection('yorumlar')} className="text-left py-2 text-brand-800 font-medium border-b border-gray-50">Danışan Yorumları</button>
                <button onClick={() => scrollToSection('sss')} className="text-left py-2 text-brand-800 font-medium border-b border-gray-50">Sıkça Sorulan Sorular</button>
                
                <div className="mt-4 flex flex-col gap-3">
                  <a href="tel:+905466821306" className="flex items-center justify-center gap-2 text-brand-900 font-semibold py-3 border border-brand-200 rounded-xl">
                    <Phone size={18} />
                    0546 682 13 06
                  </a>
                  <button 
                    onClick={() => scrollToSection('iletisim')}
                    className="bg-accent-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Hemen Randevu Al
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Optimized for Conversion */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-brand-50"></div>
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-brand-100 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-accent-100 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-200 text-brand-700 text-sm font-medium mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online ve Yüz Yüze Randevular Açık
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium text-brand-950 leading-[1.2] mb-6">
                <span className="block h-[1.3em]">
                  <span className="relative inline-block pr-3 whitespace-nowrap">
                    {currentText}
                    <span className="absolute right-0 top-[10%] bottom-[10%] w-[3px] bg-brand-950 animate-[pulse_1s_ease-in-out_infinite]"></span>
                  </span>
                </span>
                <span className="text-accent-600 italic">tek başına</span> başa çıkmak zorunda değilsin.
              </h2>
              
              <p className="text-lg text-brand-700 mb-8 leading-relaxed max-w-lg">
                Bilimsel temelli terapi yöntemleriyle, daha huzurlu ve dengeli bir yaşama adım atın. İçsel yolculuğunuzda size rehberlik etmek için buradayım.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('iletisim')}
                  className="bg-brand-800 hover:bg-brand-900 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Ücretsiz 15 Dk. Ön Görüşme
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="https://wa.me/905466821306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-brand-900 border border-gray-200 px-8 py-4 rounded-full text-base font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  WhatsApp'tan Sor
                </a>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                <div className="flex items-center gap-6 text-sm text-brand-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={18} className="text-accent-600" />
                    <span>%100 Gizlilik</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="text-accent-600 fill-accent-600" />
                    <span>5.0 Değerlendirme</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto"
            >
              <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Koçak Psikoloji - Büşra Sarıhan Koçak" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent"></div>
                
                {/* Floating Trust Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-3">
                  <div className="flex -space-x-3 shrink-0">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover relative z-40" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Danışan" referrerPolicy="no-referrer" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover relative z-30" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Danışan" referrerPolicy="no-referrer" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover relative z-20" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="Danışan" referrerPolicy="no-referrer" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-accent-100 flex items-center justify-center text-xs font-bold text-accent-700 relative z-10">
                      500+
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-brand-950 leading-tight">500+ Mutlu Danışan</span>
                    <span className="text-[11px] text-brand-600 font-medium leading-tight mt-0.5">terapi sürecini başarıyla tamamladı</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-200 rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-brand-200 rounded-full -z-10"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-brand-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-2 text-brand-800 font-semibold text-lg">
              <CheckCircle2 className="text-accent-600" /> 10+ Yıl Deneyim
            </div>
            <div className="flex items-center gap-2 text-brand-800 font-semibold text-lg">
              <CheckCircle2 className="text-accent-600" /> EMDR Terapisti
            </div>
            <div className="flex items-center gap-2 text-brand-800 font-semibold text-lg">
              <CheckCircle2 className="text-accent-600" /> Bilişsel Davranışçı Terapi
            </div>
            <div className="flex items-center gap-2 text-brand-800 font-semibold text-lg">
              <CheckCircle2 className="text-accent-600" /> Türk Psikologlar Derneği Üyesi
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-3">Çalışma Alanları</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-brand-950 mb-6">Size Nasıl Yardımcı Olabilirim?</h3>
            <p className="text-brand-700 text-lg">Her bireyin hikayesi biriciktir. İhtiyaçlarınıza en uygun, bilimsel olarak kanıtlanmış terapi yöntemleriyle yanınızdayım.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-brand-100 group">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <BrainCircuit size={28} />
              </div>
              <h4 className="text-xl font-serif font-semibold text-brand-950 mb-3">Bireysel Terapi</h4>
              <p className="text-brand-600 mb-6 line-clamp-3">Anksiyete, depresyon, stres yönetimi, özgüven sorunları ve travma gibi konularda içsel potansiyelinizi keşfetmenize yardımcı oluyoruz.</p>
              <button onClick={() => scrollToSection('iletisim')} className="text-accent-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Detaylı Bilgi <ArrowRight size={16} />
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-brand-100 group">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <HeartHandshake size={28} />
              </div>
              <h4 className="text-xl font-serif font-semibold text-brand-950 mb-3">Çift ve Evlilik Terapisi</h4>
              <p className="text-brand-600 mb-6 line-clamp-3">İletişim problemleri, güven sorunları, çatışma çözümü ve ilişkiyi güçlendirme üzerine güvenli bir alanda çalışıyoruz.</p>
              <button onClick={() => scrollToSection('iletisim')} className="text-accent-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Detaylı Bilgi <ArrowRight size={16} />
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-brand-100 group">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Video size={28} />
              </div>
              <h4 className="text-xl font-serif font-semibold text-brand-950 mb-3">Online Terapi</h4>
              <p className="text-brand-600 mb-6 line-clamp-3">Mekandan bağımsız, evinizin konforunda ve güvenliğinde, yüz yüze terapi ile aynı etkililiğe sahip psikolojik destek.</p>
              <button onClick={() => scrollToSection('iletisim')} className="text-accent-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Detaylı Bilgi <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimda" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-full overflow-hidden border-8 border-brand-50">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop" 
                  alt="Psikolog Ofisi" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute top-10 right-0 lg:-right-10 bg-brand-800 text-white w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white">
                <span className="text-3xl font-serif font-bold">10+</span>
                <span className="text-xs font-medium uppercase tracking-wider text-brand-200">Yıllık Tecrübe</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-3">Hakkımda</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-medium text-brand-950 mb-6">Uzm. Kli. Psk. Büşra Sarıhan Koçak</h3>
              
              <div className="space-y-4 text-brand-700 text-lg mb-8">
                <p>
                  2017 yılında Başkent Üniversitesi Eğitim Fakültesi Rehberlik ve Psikolojik Danışmanlık Bölümü’nden lisans derecesini aldı. 2019 yılında Ufuk Üniversitesi Sosyal Bilimler Enstitüsü’nde Rehberlik ve Psikolojik Danışmanlık alanında tezli yüksek lisansını tamamladı.
                </p>
                <p>
                  2022 yılında Ankara Üniversitesi Sağlık Bilimleri Enstitüsü’nde Aile Danışmanlığı alanında yüksek lisansını bitirdi. Şu anda Ankara Üniversitesi Eğitim Bilimleri Enstitüsü’nde doktora eğitimine devam etmektedir.
                </p>
                <p>
                  Büşra Sarıhan Koçak, 2019 yılından itibaren Abdülkadir Özbek Psikodrama Enstitüsü’nde Psikodrama Grup Yöneticiliği alanında halen eğitimine devam etmektedir ve Psikodrama Grup Yöneticiliği Asistanlığı derecesini almıştır.
                </p>
              </div>

              <div className="space-y-3 mb-10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-600 shrink-0 mt-1" size={20} />
                  <span className="text-brand-800 font-medium">Başkent Üniversitesi - Lisans</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-600 shrink-0 mt-1" size={20} />
                  <span className="text-brand-800 font-medium">Ufuk & Ankara Üniversitesi - Yüksek Lisans</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-600 shrink-0 mt-1" size={20} />
                  <span className="text-brand-800 font-medium">Ankara Üniversitesi - Doktora (Devam Ediyor)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-600 shrink-0 mt-1" size={20} />
                  <span className="text-brand-800 font-medium">Psikodrama Grup Yöneticiliği Asistanı</span>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection('iletisim')}
                className="bg-brand-100 hover:bg-brand-200 text-brand-900 px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center gap-2"
              >
                Sertifikalarım ve Özgeçmişim <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Social Proof) */}
      <section id="yorumlar" className="py-24 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent-400 font-semibold tracking-wider uppercase text-sm mb-3">Danışan Yorumları</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">Değişime Tanıklık Edin</h3>
            <p className="text-brand-200 text-lg">Gizlilik prensipleri gereği isimler gizlenmiş veya değiştirilmiştir.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Yıllardır süren anksiyete problemim için başvurdum. Büşra Hanım'ın profesyonel yaklaşımı ve EMDR terapisi sayesinde hayat kalitem inanılmaz arttı. Kendimi artık çok daha güçlü hissediyorum.",
                author: "M. K., 34",
                type: "Bireysel Terapi"
              },
              {
                text: "Evliliğimizin bitme noktasına geldiği bir dönemde çift terapisine başladık. İletişim kurmayı yeniden öğrendik. Bize güvenli bir alan açtığı için minnettarız.",
                author: "A. & S. Çifti",
                type: "Çift Terapisi"
              },
              {
                text: "Online terapi konusunda önyargılarım vardı ama Büşra Hanım'ın sıcaklığı ekranı aşıyor. Yoğun iş tempomda evden terapi alabilmek benim için büyük bir şans oldu.",
                author: "Z. B., 28",
                type: "Online Terapi"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-brand-800 p-8 rounded-3xl border border-brand-700 relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-brand-100 mb-8 text-lg leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-brand-400">{testimonial.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="sss" className="py-24 bg-brand-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-3">Merak Edilenler</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-brand-950">Sıkça Sorulan Sorular</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Terapi seansları ne kadar sürüyor?",
                a: "Bireysel terapi seanslarımız 50 dakika, çift terapisi seanslarımız ise 75 dakika sürmektedir."
              },
              {
                q: "Ücretsiz ön görüşmede ne yapıyoruz?",
                a: "15 dakikalık ücretsiz online ön görüşmede, terapi sürecinin nasıl işlediğini konuşuyor, beklentilerinizi değerlendiriyor ve birlikte çalışıp çalışamayacağımıza karar veriyoruz. Bu görüşme tamamen tanışma amaçlıdır."
              },
              {
                q: "Online terapi yüz yüze terapi kadar etkili mi?",
                a: "Evet, yapılan birçok bilimsel araştırma online terapinin yüz yüze terapi kadar etkili olduğunu göstermektedir. Özellikle EMDR ve BDT gibi yöntemler online platformda da başarıyla uygulanabilmektedir."
              },
              {
                q: "Anlattıklarım gizli kalacak mı?",
                a: "Kesinlikle. Türk Psikologlar Derneği Etik Yönetmeliği gereği, seanslarda konuşulan her şey danışan ve terapist arasında kesin bir gizlilik içinde kalır."
              },
              {
                q: "Ne sıklıkla gelmem gerekiyor?",
                a: "Genellikle başlangıçta haftada bir seans önerilir. Ancak bu durum, yaşadığınız sorunun yoğunluğuna ve ihtiyacınıza göre ilk seansımızda birlikte belirlenir."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-semibold text-brand-900 pr-8">{faq.q}</span>
                  <ChevronDown 
                    className={`text-brand-500 shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-brand-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="iletisim" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-900 rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                İyileşme yolculuğunuza <br className="hidden md:block"/> bugün başlayın.
              </h2>
              <p className="text-brand-200 text-lg mb-10 max-w-2xl mx-auto">
                Ertelemeyin. Kendinize yapacağınız en büyük yatırım, ruh sağlığınıza ayırdığınız zamandır. İlk adımı atmak için hemen iletişime geçin.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://wa.me/905466821306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp'tan Randevu Al
                </a>
                <a 
                  href="tel:+905466821306"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  0546 682 13 06
                </a>
              </div>
              <p className="mt-6 text-brand-300 text-sm">
                * Ücretsiz 15 dakikalık ön görüşme talebinizi mesajınızda belirtebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-950 text-brand-300 py-16 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-brand-800 rounded-full flex items-center justify-center text-white font-serif text-xl italic">
                  K
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-xl text-white">Koçak Psikoloji</h4>
                  <p className="text-xs text-brand-400 uppercase tracking-wider">Uzm. Kli. Psk. Büşra Sarıhan Koçak</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Bilimsel temelli terapi yaklaşımlarıyla, yetişkin ve çiftlere yönelik profesyonel psikolojik danışmanlık hizmeti.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">İletişim</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="text-accent-500 shrink-0" />
                  <div>
                    <p className="text-white font-medium">Telefon & WhatsApp</p>
                    <a href="tel:+905466821306" className="hover:text-white transition-colors">0546 682 13 06</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={20} className="text-accent-500 shrink-0" />
                  <div>
                    <p className="text-white font-medium">E-Posta</p>
                    <a href="mailto:info@kocakpsikoloji.com" className="hover:text-white transition-colors">info@kocakpsikoloji.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={20} className="text-accent-500 shrink-0" />
                  <div>
                    <p className="text-white font-medium">Çalışma Saatleri</p>
                    <p>Pzt - Cmt: 09:00 - 20:00</p>
                    <p className="text-sm text-brand-500">Pazar günleri kapalıdır.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Klinik Adresi</h4>
              <p className="mb-4 leading-relaxed">
                Varlık Mahallesi, Tanzimat Caddesi,<br/>
                No:33/5<br/>
                Yenimahalle / Ankara
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-accent-500 hover:text-accent-400 font-medium transition-colors"
              >
                Google Haritalar'da Aç <ArrowRight size={16} />
              </a>
            </div>

          </div>

          <div className="border-t border-brand-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-500">
            <p>&copy; {new Date().getFullYear()} Koçak Psikoloji. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
