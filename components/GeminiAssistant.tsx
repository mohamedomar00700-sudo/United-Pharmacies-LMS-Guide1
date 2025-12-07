import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, Mic, BrainCircuit, MessageCircle, ExternalLink } from 'lucide-react';
import { ChatMessage, GeneratedQuestion, TopicData, TopicId } from '../types';
import { sendMessageToGemini, generateQuizQuestions } from '../services/geminiService';

interface GeminiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: TopicData;
  onNavigate: (id: TopicId) => void; // Added prop
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ isOpen, onClose, currentTopic, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz'>('chat');
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'مرحباً بك! أنا المساعد الآلي. ابحث عن أي موضوع (مثل "رفع فيديو" أو "التقارير") وسأوجهك للخطوات الصحيحة.' }
  ]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Quiz Generator State
  const [quizInput, setQuizInput] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuestion[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Focus input
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, activeTab]);

  const handleSendChat = async () => {
    if (!input.trim() || isChatLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsChatLoading(true);

    // Send with context
    const response = await sendMessageToGemini(input, currentTopic);

    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      topicId: response.topicId 
    }]);
    setIsChatLoading(false);
  };

  const handleNavigateClick = (id: TopicId) => {
    onNavigate(id);
    onClose();
  };

  const handleGenerateQuiz = async () => {
    if (isQuizLoading) return;
    setIsQuizLoading(true);
    // Note: In local mode, we ignore the text input and fetch relevant topic quizzes
    const questions = await generateQuizQuestions(quizInput, currentTopic);
    setGeneratedQuiz(questions);
    setIsQuizLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendChat();
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      recognition.start();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        if (activeTab === 'chat') {
          setInput(speechResult);
        } else {
          setQuizInput(speechResult);
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      alert("عذراً، المتصفح لا يدعم الكتابة بالصوت.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] animate-fade-in-up border border-slate-200 dark:border-slate-700">

        {/* Header */}
        <div className="bg-gradient-to-r from-up-blue to-up-teal p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold">المساعد الذكي (Offline)</h3>
              <p className="text-xs text-teal-100 opacity-90">Context: {currentTopic.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'chat' ? 'border-up-teal text-up-teal dark:text-teal-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
          >
            <MessageCircle size={16} /> محادثة
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'quiz' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
          >
            <BrainCircuit size={16} /> الاختبارات
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 relative">

          {/* Chat Mode */}
          {activeTab === 'chat' && (
            <div className="p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`
                  max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap
                  ${msg.role === 'user'
                        ? 'bg-up-teal text-white rounded-br-none'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                      }
                `}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Navigation Button Action */}
                  {msg.role === 'model' && msg.topicId && (
                    <button 
                      onClick={() => handleNavigateClick(msg.topicId!)}
                      className="mt-2 mr-2 bg-up-blue/5 hover:bg-up-blue/10 text-up-blue dark:bg-up-teal/10 dark:hover:bg-up-teal/20 dark:text-teal-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-up-blue/10 dark:border-up-teal/30"
                    >
                      <ExternalLink size={14} />
                      الذهاب إلى قسم الشرح
                    </button>
                  )}
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-up-teal" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">جاري البحث...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Quiz Generator Mode */}
          {activeTab === 'quiz' && (
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800 mb-4">
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    سيقوم النظام بتوليد أسئلة اختبار بناءً على محتوى القسم الحالي: <strong>{currentTopic.title}</strong>
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerateQuiz}
                    disabled={isQuizLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-base font-bold disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    {isQuizLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                    بدء الاختبار
                  </button>
                </div>
              </div>

              {generatedQuiz.length > 0 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 dark:text-white">أسئلة القسم:</h4>
                  </div>
                  {generatedQuiz.map((q, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-xl shadow-sm">
                      <p className="font-bold text-slate-700 dark:text-slate-200 mb-3 text-sm leading-relaxed">{idx + 1}. {q.question}</p>
                      <ul className="space-y-2">
                        {q.options.map((opt, i) => (
                          <li key={i} className={`text-sm px-3 py-2 rounded-lg border transition-colors ${opt === q.correctAnswer 
                            ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300' 
                            : 'bg-slate-50 border-slate-100 text-slate-600 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400'}`}>
                            {opt === q.correctAnswer && "✅ "} {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Input Area (Only for Chat) */}
        {activeTab === 'chat' && (
          <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shrink-0">
            <div className="flex items-center gap-2 relative">
              <button
                onClick={startListening}
                className={`p-3 rounded-xl transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                <Mic size={18} />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ابحث في الدليل..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:border-up-teal focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 outline-none transition-all bg-slate-50"
                disabled={isChatLoading}
              />
              <button
                onClick={handleSendChat}
                disabled={!input.trim() || isChatLoading}
                className="p-3 bg-up-teal text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Send size={18} className={document.dir === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default GeminiAssistant;