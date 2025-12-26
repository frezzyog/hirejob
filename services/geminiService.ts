
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Job, JobSearchParams } from "../types";

// The GoogleGenAI instance should be created right before making an API call 
// to ensure it uses the most up-to-date API key.

const searchJobsFunctionDeclaration: FunctionDeclaration = {
  name: 'searchJobs',
  parameters: {
    type: Type.OBJECT,
    description: 'Search for jobs based on various criteria extracted from the user query.',
    properties: {
      title: { type: Type.STRING, description: 'Job title or role name' },
      location: { type: Type.STRING, description: 'Preferred location (e.g., Remote, Austin, New York)' },
      job_type: { type: Type.STRING, description: 'Type of job: Full-time, Part-time, Remote, Contract' },
      min_salary: { type: Type.NUMBER, description: 'Minimum expected yearly salary' },
      experience_level: { type: Type.STRING, description: 'Experience level: Entry, Mid, Senior, Lead' },
    },
    required: [],
  },
};

export class CareerAssistant {
  private systemPrompt: string;

  constructor(userProfile?: any) {
    this.systemPrompt = `
      You are "HireAI Assistant", a friendly and professional career advisor.
      Your goal is to help users find their dream job by searching through available listings.
      ${userProfile ? `The user's profile: Name: ${userProfile.name}, Skills: ${userProfile.skills.join(', ')}, Experience: ${userProfile.experience_years} years.` : ''}
      
      Instructions:
      1. Use the searchJobs tool when the user asks for jobs or provides criteria.
      2. If you find jobs, summarize them nicely.
      3. If no criteria are given, ask clarifying questions about title, location, and salary.
      4. Provide career advice based on their skills.
      5. Always be encouraging and helpful.
    `;
  }

  async processMessage(userMessage: string, availableJobs: Job[]) {
    try {
      // Create a new instance right before the call as per guidelines
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: this.systemPrompt,
          tools: [{ functionDeclarations: [searchJobsFunctionDeclaration] }],
        },
      });

      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        const fc = functionCalls[0];
        if (fc.name === 'searchJobs') {
          const args = fc.args as JobSearchParams;
          const filteredJobs = availableJobs.filter(job => {
            if (args.title && !job.title.toLowerCase().includes(args.title.toLowerCase())) return false;
            if (args.location && !job.location.toLowerCase().includes(args.location.toLowerCase())) return false;
            if (args.job_type && !job.job_type.toLowerCase().includes(args.job_type.toLowerCase())) return false;
            if (args.experience_level && !job.experience_level.toLowerCase().includes(args.experience_level.toLowerCase())) return false;
            return true;
          });

          // Second pass to integrate results back to Gemini context
          // Using parts structure for multiple items in contents
          const finalResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
              parts: [
                { text: userMessage },
                { text: `I found ${filteredJobs.length} jobs matching these criteria: ${JSON.stringify(args)}. Here is the job data: ${JSON.stringify(filteredJobs)}` }
              ]
            },
            config: {
              systemInstruction: this.systemPrompt,
            }
          });

          return {
            text: finalResponse.text || "I found some matching jobs for you!",
            foundJobs: filteredJobs
          };
        }
      }

      return {
        text: response.text || "I'm not sure how to help with that, could you rephrase?",
        foundJobs: []
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { text: "Sorry, I'm having trouble connecting to my brain right now. Please try again.", foundJobs: [] };
    }
  }
}
