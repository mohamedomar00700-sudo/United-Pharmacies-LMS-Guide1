import { TOPICS } from "../constants";
import { GeneratedQuestion, TopicData } from "../types";

/**
 * Local Simulation Service
 * This replaces the Google GenAI API with local logic to ensure the app works 
 * on GitHub Pages without API keys or quota limits.
 */

// Keyword matching helper
const findBestMatch = (query: string, currentTopic?: TopicData): string | null => {
  const q = query.toLowerCase().trim();
  
  // 1. Check for greetings
  if (/^(hello|hi|مرحبا|اهلا|سلام|السلام)/.test(q)) {
    return "أهلاً بك في نظام LMS لصيدليات المتحدة. اسألني عن كيفية رفع الملفات، إنشاء الكورسات، أو إدارة المستخدمين.";
  }

  // 2. Search in Current Topic Context first (High Priority)
  if (currentTopic) {
    // Check FAQs
    const faqMatch = currentTopic.faq.find(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    if (faqMatch) return `💡 **من الأسئلة الشائعة في قسم ${currentTopic.title}:**\n\n${faqMatch.question}\n\nالإجابة: ${faqMatch.answer}`;
    
    // Check Steps
    const stepMatch = currentTopic.steps.find(s => s.toLowerCase().includes(q));
    if (stepMatch) return `✅ **خطوة موجودة في ${currentTopic.title}:**\n\n${stepMatch}`;
  }

  // 3. Global Search across all topics
  for (const topic of TOPICS) {
    // Check Title
    if (topic.title.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q)) {
      return `📄 **وجدت قسماً قد يهمك:**\n\n${topic.title}: ${topic.description}\n\nيمكنك الانتقال إليه من القائمة الجانبية للتفاصيل.`;
    }

    // Check Tips
    const tipMatch = topic.tips.find(t => t.toLowerCase().includes(q));
    if (tipMatch) return `💡 **نصيحة مفيدة من قسم ${topic.title}:**\n\n${tipMatch}`;

    // Check Steps globally
    const stepMatch = topic.steps.find(s => s.toLowerCase().includes(q));
    if (stepMatch) return `✅ **خطوة في قسم ${topic.title}:**\n\n${stepMatch}`;
  }

  return null;
};

export const sendMessageToGemini = async (message: string, currentTopic?: TopicData): Promise<string> => {
  // Simulate network delay for "AI" feel
  await new Promise(resolve => setTimeout(resolve, 800));

  const match = findBestMatch(message, currentTopic);

  if (match) {
    return match;
  }

  // Fallback response
  return "عذراً، لم أجد إجابة دقيقة في قاعدة البيانات. يرجى تجربة كلمات مثل 'رفع فيديو'، 'كويز'، 'تقارير'، أو تصفح الأقسام من القائمة.";
};

export const generateQuizQuestions = async (input: string, currentTopic?: TopicData): Promise<GeneratedQuestion[]> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In local mode, we return the pre-defined quizzes for the current topic
  // ignoring the "input" text since we can't generate new questions on the fly without an LLM.
  // However, this ensures 100% accuracy which is better for an LMS guide.
  
  if (currentTopic && currentTopic.quizzes && currentTopic.quizzes.length > 0) {
    // Return random 3 questions or all of them
    return [...currentTopic.quizzes].sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  // Fallback if no topic selected or no quizzes
  return [
    {
      question: "ما هو الغرض الرئيسي من نظام LMS؟",
      options: ["إدارة المخزون", "إدارة التعليم والتدريب", "المحاسبة", "المبيعات"],
      correctAnswer: "إدارة التعليم والتدريب"
    }
  ];
};