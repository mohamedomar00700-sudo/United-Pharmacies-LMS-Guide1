import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(onStart, 500); // Wait for animation
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-up-blue via-[#1a4c8a] to-up-teal text-white transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-up-teal rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        
        {/* Logo Container */}
        <div className="mb-8 relative group">
           <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
           <div className="relative bg-white p-6 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
             {/* United Pharmacy Logo - Local Asset */}
             <img 
               src="assets/united_pharmacy_logo.png" 
               alt="United Pharmacy Logo" 
               className="w-48 h-auto object-contain"
             />
           </div>
           {/* Floating Sparkle */}
           <div className="absolute -top-4 -right-4 bg-up-orange text-white p-2 rounded-full shadow-lg animate-bounce">
             <Sparkles size={20} />
           </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">صيدلية المتحدة</h1>
        <p className="text-teal-100 text-lg md:text-xl font-medium mb-8">بوابة التعليم الإلكتروني (LMS)</p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-2">
            <BookOpen size={24} className="text-up-teal" />
            <span className="text-xs font-bold">شروحات مصورة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-2">
            <ShieldCheck size={24} className="text-up-teal" />
            <span className="text-xs font-bold">يعمل بدون إنترنت</span>
          </div>
        </div>

        {/* Start Button */}
        <button 
          onClick={handleStart}
          className="group relative w-full bg-white text-up-blue font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:bg-teal-50 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
        >
          <span className="relative z-10 text-lg">ابدأ التصفح</span>
          <ArrowLeft className="relative z-10 group-hover:-translate-x-1 transition-transform" size={24} />
          
          {/* Button Shine Effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-up-teal opacity-20 group-hover:animate-shine" />
        </button>

        <p className="mt-8 text-xs text-white/50 font-mono">الإصدار 2.1 &bull; دليل تفاعلي</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;