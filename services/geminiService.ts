import { TOPICS } from "../constants";
import { GeneratedQuestion, TopicData, TopicId } from "../types";

/**
 * Local Simulation Service
 * Returns structured responses with navigation links.
 */

interface ServiceResponse {
  text: string;
  topicId?: TopicId;
}

// Keyword matching helper
const findBestMatch = (query: string, currentTopic?: TopicData): ServiceResponse | null => {
  const q = query.toLowerCase().trim();
  
  // 1. Check for greetings
  if (/^(hello|hi|مرحبا|اهلا|سلام|السلام)/.test(q)) {
    return {
      text: "أهلاً بك في نظام LMS لصيدليات المتحدة. اسألني عن كيفية رفع الملفات، إنشاء الكورسات، أو إدارة المستخدمين، وسأنقلك للقسم المناسب فوراً."
    };
  }

  // 2. Search in Current Topic Context first (High Priority)
  if (currentTopic) {
    // Check FAQs
    const faqMatch = currentTopic.faq.find(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    if (faqMatch) return {
       text: `💡 **إجابة سريعة من القسم الحالي:**\n\n${faqMatch.answer}`,
       topicId: currentTopic.id
    };
    
    // Check Steps
    const stepMatch = currentTopic.steps.find(s => s.toLowerCase().includes(q));
    if (stepMatch) return {
       text: `✅ **وجدت هذه الخطوة في القسم الحالي:**\n\n${stepMatch}`,
       topicId: currentTopic.id
    };
  }

  // 3. Global Search across all topics
  for (const topic of TOPICS) {
    // Check Title - High confidence match
    if (topic.title.toLowerCase().includes(q)) {
      return {
        text: `وجدت قسماً بعنوان "**${topic.title}**".\n\nالوصف: ${topic.description}\n\nهل تريد الذهاب إليه؟`,
        topicId: topic.id
      };
    }

    // Check Tips
    const tipMatch = topic.tips.find(t => t.toLowerCase().includes(q));
    if (tipMatch) return {
       text: `💡 **نصيحة متعلقة ببحثك:**\n\n"${tipMatch}"\n\nموجودة في قسم: ${topic.title}`,
       topicId: topic.id
    };

    // Check Steps globally
    const stepMatch = topic.steps.find(s => s.toLowerCase().includes(q));
    if (stepMatch) return {
       text: `✅ **هذه الخطوة موجودة في شرح ${topic.title}:**\n\n"${stepMatch}"`,
       topicId: topic.id
    };

    // Check FAQs globally
    const faqMatch = topic.faq.find(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    if (faqMatch) return {
       text: `❓ **سؤال شائع في قسم ${topic.title}:**\n\nس: ${faqMatch.question}\nج: ${faqMatch.answer}`,
       topicId: topic.id
    };
  }

  return null;
};

export const sendMessageToGemini = async (message: string, currentTopic?: TopicData): Promise<ServiceResponse> => {
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 600));

  const match = findBestMatch(message, currentTopic);

  if (match) {
    return match;
  }

  // Fallback response
  return {
    text: "عذراً، لم أجد تطابقاً دقيقاً. جرب البحث عن كلمات مثل 'فيديو'، 'كويز'، 'تقرير'، أو اختر موضوعاً من القائمة."
  };
};

export const generateQuizQuestions = async (input: string, currentTopic?: TopicData): Promise<GeneratedQuestion[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (currentTopic && currentTopic.quizzes && currentTopic.quizzes.length > 0) {
    return [...currentTopic.quizzes].sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  return [
    {
      question: "ما هو الغرض الرئيسي من نظام LMS؟",
      options: ["إدارة المخزون", "إدارة التعليم والتدريب", "المحاسبة", "المبيعات"],
      correctAnswer: "إدارة التعليم والتدريب"
    }
  ];
};