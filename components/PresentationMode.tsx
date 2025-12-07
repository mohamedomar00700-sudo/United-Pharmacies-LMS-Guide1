import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Circle } from 'lucide-react';
import { TopicData } from '../types';

interface PresentationModeProps {
  topic: TopicData;
  onClose: () => void;
}

const PresentationMode: React.FC<PresentationModeProps> = ({ topic, onClose }) => {
  // Slide 0 is the Title/Intro slide. 
  // Slides 1 to N are the steps.
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = topic.steps.length + 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Space': // Space usually goes next
        case 'Enter':
        case 'ArrowLeft': // In RTL, Left Arrow logically means "Next" (moving forward in reading direction)
          nextSlide();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Backspace':
        case 'ArrowRight': // In RTL, Right Arrow logically means "Back"
          // However, physical keys depend on user expectation. 
          // Usually: Left Key -> Go Left (Next in RTL). Right Key -> Go Right (Prev in RTL).
          // Let's stick to standard slideshow logic: Right Key -> Next Slide, Left Key -> Prev Slide usually, 
          // but for RTL UX, visual arrows are flipped.
          // Let's implement intuitive directional navigation:
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    // Simplified handler to avoid RTL confusion in code logic
    const simpleKeyHandler = (e: KeyboardEvent) => {
       if (e.key === 'Escape') onClose();
       if (e.key === 'ArrowLeft') nextSlide(); // RTL: Next slide is to the left
       if (e.key === 'ArrowRight') prevSlide(); // RTL: Prev slide is to the right
       if (e.key === 'Space' || e.key === 'Enter') nextSlide();
       if (e.key === 'Backspace') prevSlide();
    };

    window.addEventListener('keydown', simpleKeyHandler);
    return () => window.removeEventListener('keydown', simpleKeyHandler);
  }, [nextSlide, prevSlide, onClose]);

  // Calculate progress percentage
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900 text-white flex flex-col font-cairo animate-fade-in-content text-base">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3 opacity-80">
          <div className="bg-white/10 p-2 rounded-lg">
            <topic.icon size={20} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide">{topic.title}</span>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Exit Presentation (Esc)"
        >
          <X size={24} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800">
        <div 
          className="h-full bg-up-teal transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 relative overflow-hidden">
        
        {/* Navigation Areas (Clickable sides) */}
        {/* Left Side (Next in RTL) */}
        <div className="absolute inset-y-0 left-0 w-1/6 z-10 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-start pl-4 group" onClick={nextSlide}>
           <ChevronLeft size={48} className="text-white/20 group-hover:text-white/50 transition-colors" />
        </div>
        
        {/* Right Side (Prev in RTL) */}
        <div className="absolute inset-y-0 right-0 w-1/6 z-10 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-end pr-4 group" onClick={prevSlide}>
           <ChevronRight size={48} className="text-white/20 group-hover:text-white/50 transition-colors" />
        </div>

        {/* Slide Content */}
        <div className="max-w-4xl w-full text-center z-20">
          
          {currentSlide === 0 ? (
            // Title Slide
            <div className="animate-fade-in-content space-y-8">
              <div className="inline-block p-8 rounded-full bg-gradient-to-br from-up-blue to-up-teal shadow-2xl mb-4 ring-8 ring-white/10">
                <topic.icon size={80} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 leading-tight">
                {topic.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {topic.description}
              </p>
              <div className="pt-8">
                <button 
                  onClick={nextSlide}
                  className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-up-teal hover:text-white transition-all transform hover:scale-105"
                >
                  ابدأ العرض
                </button>
              </div>
            </div>
          ) : (
            // Step Slide
            <div key={currentSlide} className="animate-fade-in-content">
               <div className="mb-6 flex justify-center">
                 <span className="bg-up-teal/20 text-up-teal px-4 py-1 rounded-full text-sm font-bold border border-up-teal/30">
                   خطوة {currentSlide} من {topic.steps.length}
                 </span>
               </div>
               
               <h2 className="text-3xl md:text-5xl font-bold leading-relaxed md:leading-normal text-white drop-shadow-lg">
                 {topic.steps[currentSlide - 1]}
               </h2>

               {/* Decorative dots for visual balance */}
               <div className="flex justify-center gap-2 mt-12 opacity-30">
                 {topic.steps.map((_, idx) => (
                   <Circle 
                    key={idx} 
                    size={8} 
                    className={idx === currentSlide - 1 ? "fill-white text-white" : "text-slate-500"} 
                   />
                 ))}
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Bar / Controls */}
      <div className="p-6 flex items-center justify-between text-slate-500 text-sm">
        <div className="hidden md:flex gap-4">
          <span className="flex items-center gap-1"><kbd className="bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">Esc</kbd> للخروج</span>
          <span className="flex items-center gap-1"><kbd className="bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">&larr;</kbd> <kbd className="bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">&rarr;</kbd> للتنقل</span>
        </div>
        
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white border border-slate-700"
            title="السابق"
          >
             <ChevronRight size={20} className="rtl:rotate-0" /> {/* RTL: Prev is Right visually */}
          </button>
          
          <span className="font-mono font-bold text-white min-w-[3rem] text-center">
            {currentSlide + 1} / {totalSlides}
          </span>

          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white border border-slate-700"
            title="التالي"
          >
             <ChevronLeft size={20} className="rtl:rotate-0" /> {/* RTL: Next is Left visually */}
          </button>
        </div>
      </div>

    </div>
  );
};

export default PresentationMode;