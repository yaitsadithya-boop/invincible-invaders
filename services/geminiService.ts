
import { GoogleGenAI, Type, Modality } from "@google/genai";
import type {
  AnalysisResults,
  SkillGapAnalysis,
  Resources,
  ResumeAnalysis,
  RewrittenResume,
  PersonalizedRoadmap,
} from '../types';
import { COMPREHENSIVE_SKILLS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const YOUTUBE_RECOMMENDATIONS_LIST = `
# English Language Resources

## SET 1 — DSA, Problem Solving & Core CS
### DSA Channels
- Striver – Take U Forward: https://www.youtube.com/@takeUforward
- NeetCode: https://www.youtube.com/@NeetCode
- GFG (GeeksforGeeks): https://www.youtube.com/@GeeksforGeeksVideos
- Kunal Kushwaha: https://www.youtube.com/@KunalKushwaha
- CodeWithHarry: https://www.youtube.com/@CodeWithHarry
- CS Dojo: https://www.youtube.com/@CSDojo
- Abdul Bari Algorithms: https://www.youtube.com/@abdul_bari
### DSA Playlists
- Striver A2Z DSA: https://www.youtube.com/playlist?list=PLgUwDviBIf0pSqrP8Dgj1T0bFZYC7_yzW
- Striver SDE Sheet: https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY
- NeetCode Blind 75: https://www.youtube.com/playlist?list=PLot-Xpze53leU0Ec0WpRbb3b5ZFO3tQwD
- GFG DSA Full Course: https://www.youtube.com/playlist?list=PLqM7alHXFySEQDk2MDfbwEdJD9npL9XgG
- Kunal Kushwaha DSA Bootcamp: https://www.youtube.com/playlist?list=PL9gnSGHSqcnojfS6xQS3qfC9Er51DvtkF
- MIT 6.006 Algorithms: https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_FPPmL3R5v9A
### Core CS, Debugging & Internals
- Neso Academy OS: https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9XU7vWeN3mKrmJ0A0xHBO
- Neso DBMS: https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMTafhBz3RERp-9yjtWf6-
- Gate Smashers CN: https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y
- CodeVault C++ Internals: https://www.youtube.com/@CodeVault
- Low Level Learning: https://www.youtube.com/@LowLevelLearning
- Dave’s Garage: https://www.youtube.com/@DavesGarage
- CS50 Full Course: https://www.youtube.com/@cs50

## SET 2 — System Design, Backend, Databases
### System Design Channels
- Gaurav Sen: https://www.youtube.com/@gkcs
- CodeKarle: https://www.youtube.com/@CodeKarle
- ByteByteGo: https://www.youtube.com/@ByteByteGo
- System Design Interview: https://www.youtube.com/@systemdesigninterview
- Hussein Nasser: https://www.youtube.com/@hnasr
### System Design Playlists
- Gaurav Sen SD Playlist: https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX
- CodeKarle LLD: https://www.youtube.com/playlist?list=PLyMom0n-MBqpKkH9U2WWKBOoTLC-8M17C
- CodeKarle HLD: https://www.youtube.com/playlist?list=PLyMom0n-MBqpjsDFtGdW8sELC2x-KYVam
### Backend, Databases, APIs & Microservices
- Amigoscode: https://www.youtube.com/@amigoscode
- Mosh (Programming with Mosh): https://www.youtube.com/@programmingwithmosh
- Traversy Media: https://www.youtube.com/@TraversyMedia
- TechTFQ: https://www.youtube.com/@TechTFQ
- Alex The Analyst SQL: https://www.youtube.com/@AlexTheAnalyst
- Neso Academy DBMS: https://www.youtube.com/@NesoAcademy
- TechTFQ SQL: https://www.youtube.com/playlist?list=PLn1PnoIOq3mVnD3RnbZ0wwewPhJ3zXf8g
- Alex The Analyst SQL Course: https://www.youtube.com/playlist?list=PLUaB-1hjhk8H48Pj32Y0E2WW4B1-m3Fso
- Java Brains: https://www.youtube.com/@JavaBrainsChannel
- Spring Boot Full Course: https://www.youtube.com/playlist?list=PLqq-6Pq4lTTa-d0iZg41U2RDqECol9C5B
- Success In Tech: https://www.youtube.com/@successintech
- Simplilearn System Design: https://www.youtube.com/@SimplilearnOfficial

## SET 3 — Cloud, DevOps, Git, Linux
### Cloud & DevOps Channels
- AWS Official: https://www.youtube.com/@AmazonWebServices
- Google Cloud Tech: https://www.youtube.com/@GoogleCloudPlatform
- Azure Official: https://www.youtube.com/@MicrosoftAzure
- TechWorld With Nana: https://www.youtube.com/@TechWorldwithNana
- KodeKloud: https://www.youtube.com/@KodeKloud
- Anton Putra: https://www.youtube.com/@AntonPutra
- Stephane Maarek AWS: https://www.youtube.com/@StephaneMaarek
### Cloud & DevOps Playlists & Courses
- freeCodeCamp AWS Course: https://www.youtube.com/watch?v=3hLmDS179YE
- Nana Docker: https://www.youtube.com/playlist?list=PLy7NrYWoggjwV7qC8r0xUo1F0Mi2B8PVv
- Nana Kubernetes: https://www.youtube.com/playlist?list=PLy7NrYWoggjwA3F4rFUwP5C0SXh4G35c7
- KodeKloud DevOps: https://www.youtube.com/playlist?list=PLW-rM0fA4LqhUAsEHAAQj8UWMJO3ay7k-
- AWS Beginner Playlist: https://www.youtube.com/playlist?list=PLhr1KZpdzukcOr_6j_zsVgZWXWzILMl0H
### Git, Linux & CI/CD
- freeCodeCamp Git Full Course: https://www.youtube.com/watch?v=RGOj5yH7evk
- Kunal Kushwaha Git: https://www.youtube.com/watch?v=apGV9Kg7ics
- NetworkChuck Linux: https://www.youtube.com/watch?v=VbEx7B_PTOE
- Learn Linux TV: https://www.youtube.com/@LearnLinuxTV
- The Linux Foundation: https://www.youtube.com/@TheLinuxFoundation
- GitHub Actions Full: https://www.youtube.com/watch?v=R8_veQiYBjI
- Jenkins Tutorial: https://www.youtube.com/watch?v=6YZvp2GwT0A

## SET 4 — AI, ML, LLMs, Python
### AI/ML Channels
- Krish Naik: https://www.youtube.com/@krishnaik06
- Codebasics: https://www.youtube.com/@codebasics
- Abhishek Thakur: https://www.youtube.com/@AbhishekThakurAbhi
- Sentdex: https://www.youtube.com/@sentdex
- DeepLearningAI: https://www.youtube.com/@DeepLearningAI
- Two Minute Papers: https://www.youtube.com/@TwoMinutePapers
- Microsoft AI Engineering: https://www.youtube.com/@MicrosoftAIE
- OpenAI Dev Playlist: https://www.youtube.com/@OpenAI
- PyTorch Official: https://www.youtube.com/@pytorch
### AI/ML Playlists & Courses
- freeCodeCamp ML: https://www.youtube.com/watch?v=7eh4d6sabA0
- freeCodeCamp PyTorch: https://www.youtube.com/watch?v=V_xro1bcAuA
- Andrew Ng ML Course: https://www.youtube.com/playlist?list=PLA89DCFA6ADACE599
- DeepLearningAI TensorFlow: https://www.youtube.com/playlist?list=PLQY2H8rRoyvwKQ_a7HTlOZ7BB52fK_fZp
- Krish Naik Projects: https://www.youtube.com/playlist?list=PLZoTAELRMXVN_8-9L6T1t0Aq1T5d022Zm
- Codebasics ML Roadmap: https://www.youtube.com/watch?v=4CqBkzHUcXE
- Python for ML – Krish Naik: https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm
- DL Specialization – Andrew Ng: https://www.youtube.com/playlist?list=PLkDaE6sCZn6Gl29AoE31nwk3w8eQ_fh5x
### Python
- CodeWithHarry Python: https://www.youtube.com/watch?v=gfDE2a7MKjA
- Corey Schafer Python: https://www.youtube.com/@coreyms

## SET 5 — Web Dev, Cybersecurity, Mobile, Soft Skills
### Web Development
- Web Dev Simplified: https://www.youtube.com/@WebDevSimplified
- Fireship: https://www.youtube.com/@Fireship
- Traversy Media: https://www.youtube.com/@TraversyMedia
- The Net Ninja: https://www.youtube.com/@NetNinja
- React Full Course – Net Ninja: https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
- freeCodeCamp React: https://www.youtube.com/watch?v=4UZrsTqkcW4
- Mosh Node.js: https://www.youtube.com/watch?v=TlB_eWDSMt4
- Django Full Course: https://www.youtube.com/watch?v=F5mRW0jo-U4
### Cybersecurity
- NetworkChuck: https://www.youtube.com/@NetworkChuck
- HackerSploit: https://www.youtube.com/@HackerSploit
- John Hammond: https://www.youtube.com/@_johnhammond
- Professor Messer: https://www.youtube.com/@professormesser
- TryHackMe YouTube: https://www.youtube.com/@TryHackMe
- NetworkChuck Hacking Playlist: https://www.youtube.com/playlist?list=PLIhvC56v63IL2OjFvv_PI0B2yAXGfJLMI
### Mobile Development
- CodeWithChris (iOS): https://www.youtube.com/@CodeWithChris
- Flutter – Net Ninja: https://www.youtube.com/playlist?list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzOoDg1x
- Android Developers: https://www.youtube.com/@AndroidDevelopers
### Soft Skills
- Akshat Shrivastava: https://www.youtube.com/@AkshatShrivastava
- TED Talks: https://www.youtube.com/@TED
- Harshvardhan Jain: https://www.youtube.com/@HarshvardhanJainOfficial

# Hindi Language Resources

## DSA & CS (Hindi)
- CodeWithHarry: https://www.youtube.com/@CodeWithHarry
- Apna College: https://www.youtube.com/@ApnaCollegeOfficial
- Love Babbar: https://www.youtube.com/@LoveBabbar
- Gate Smashers: https://www.youtube.com/@GateSmashers
- Harshit Vashisth: https://www.youtube.com/@HarshitVashisth
- Love Babbar DSA Sheet Hindi: https://www.youtube.com/playlist?list=PL5tcWHG-UPH1KCk8Z3Fi-ihy4Q7K296c3
- Gate Smashers DBMS: https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p
- Apna College Java DSA: https://www.youtube.com/playlist?list=PLfqMhTWNBTe0h3GIcPyR7lF8YKmZP7LzI

## System Design (Hindi)
- Anuj Bhaiya: https://www.youtube.com/@AnujBhaiya
- Harkirat Singh: https://www.youtube.com/@harkirat1
- Anuj Bhaiya System Design Hindi: https://www.youtube.com/playlist?list=PLfqMhTWNBTe3B1Z0K2cFBFXzJdYfSuFqZ
- Harkirat Backend + SD: https://www.youtube.com/playlist?list=PLRIMoAKpG4depKsDaPNcWQS7SiBo2_I_v

## DevOps, Cloud, Linux (Hindi)
- Hitesh Choudhary: https://www.youtube.com/@HiteshChoudharydotcom
- Simplilearn Hindi: https://www.youtube.com/@SimplilearnHindi
- WsCubeTech: https://www.youtube.com/@wscubetech
- Linux in Hindi – Hitesh: https://www.youtube.com/playlist?list=PLRAV69dS1uWSx7G3nFY8E96XNgIrtJ2HB
- Docker in Hindi – WsCube: https://www.youtube.com/playlist?list=PLjVLYmrlmjGckTje5vJ4EJw2p2YlzGdz0
- AWS in Hindi – WsCube: https://www.youtube.com/playlist?list=PLjVLYmrlmjGdM0pB4vdc3IC0urx_tCwrA

## AI, ML, Python (Hindi)
- WsCubeTech AI: https://www.youtube.com/@wscubetech
- CampusX: https://www.youtube.com/@campusx-official
- ML in Hindi – CampusX: https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH
- Python Hindi – Harry: https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkWc2jR5
- AI/ML Hindi – Wscube: https://www.youtube.com/playlist?list=PLjVLYmrlmjGe-xLyoFdJ7hB1-g6HLWl4h

## Web Development (Hindi)
- Web Dev Hindi – Harry: https://www.youtube.com/playlist?list=PLu0W_9lII9ag1gA0T5qheC5qgdoFHZLKK
- Full Stack Hindi – Apna College: https://www.youtube.com/playlist?list=PLfqMhTWNBTe0k-eZvLrZvzZ-ZQ2kKuj9k
- MERN Hindi – WsCube: https://www.youtube.com/playlist?list=PLjVLYmrlmjGfGLShoW9_LX4gK1kQy_cHH
`;

const WEBSITE_RECOMMENDATIONS_LIST = `
# SET 1 — Coding, DSA, and Competitive Programming
- LeetCode: https://leetcode.com
- GeeksforGeeks: https://www.geeksforgeeks.org
- HackerRank: https://www.hackerrank.com
- CodeChef: https://www.codechef.com
- Codeforces: https://codeforces.com
- TopCoder: https://www.topcoder.com
- AtCoder: https://atcoder.jp
- SPOJ: https://www.spoj.com
- BinarySearch: https://binarysearch.com
- InterviewBit: https://www.interviewbit.com
- Scaler Topics: https://www.scaler.com/topics
- NeetCode: https://neetcode.io
- USACO Guide: https://usaco.guide
- CodingNinjas CodeStudio: https://www.codingninjas.com/codestudio
- HackerEarth: https://www.hackerearth.com
- Project Euler: https://projecteuler.net
- Exercism: https://exercism.org
- Edabit: https://edabit.com
- Advent of Code: https://adventofcode.com
- Kattis: https://www.kattis.com
- Coderbyte: https://www.coderbyte.com
- AlgoMonster: https://algo.monster
- CP-Algorithms: https://cp-algorithms.com
- VisuAlgo: https://visualgo.net
- FullStack.Cafe: https://www.fullstack.cafe
- Byte by Byte: https://www.byte-by-byte.com
- Big-O Cheat Sheet: https://www.bigocheatsheet.com
- Tech Interview Handbook: https://www.techinterviewhandbook.org
- Replit: https://replit.com

# SET 2 — AI, ML, Deep Learning, and Data Science
- TensorFlow: https://www.tensorflow.org
- PyTorch: https://pytorch.org
- Scikit-learn: https://scikit-learn.org
- Keras: https://keras.io
- Hugging Face: https://huggingface.co
- Kaggle: https://www.kaggle.com
- Google Colab: https://colab.research.google.com
- fast.ai: https://www.fast.ai
- OpenAI Research: https://www.openai.com/research
- arXiv: https://arxiv.org
- Papers with Code: https://paperswithcode.com
- DeepMind: https://deepmind.google
- mlcourse.ai: https://mlcourse.ai
- Weights & Biases: https://wandb.ai
- Dataquest: https://www.dataquest.io
- DataCamp: https://www.datacamp.com
- Towards Data Science: https://towardsdatascience.com
- Analytics Vidhya: https://www.analyticsvidhya.com
- Machine Learning Mastery: https://machinelearningmastery.com
- KDnuggets: https://www.kdnuggets.com
- NVIDIA Deep Learning AI: https://www.nvidia.com/deep-learning-ai
- Google AI: https://ai.google
- OpenAI Platform: https://platform.openai.com
- Distill: https://distill.pub
- StatQuest: https://www.statquest.org
- Evidently AI: https://www.evidentlyai.com

# SET 3 — System Design, Backend, Cloud, DevOps
- System Design Primer (GitHub): https://github.com/donnemartin/system-design-primer
- ByteByteGo: https://www.bytebytego.com
- AWS: https://aws.amazon.com
- Google Cloud: https://cloud.google.com
- Azure: https://azure.microsoft.com
- DigitalOcean: https://www.digitalocean.com
- NGINX: https://www.nginx.com
- Kubernetes: https://kubernetes.io
- Docker: https://www.docker.com
- Prometheus: https://prometheus.io
- Grafana: https://grafana.com
- Terraform: https://www.terraform.io
- Cloud Resume Challenge: https://cloudresumechallenge.dev
- roadmap.sh: https://roadmap.sh
- Dev.to: https://dev.to
- HashiCorp: https://www.hashicorp.com
- Cloudflare Learning: https://www.cloudflare.com/learning
- 12-Factor App: https://12factor.net
- Microservices.io: https://microservices.io
- gRPC: https://grpc.io
- Redis: https://redis.io
- MongoDB: https://www.mongodb.com
- PostgreSQL: https://www.postgresql.org
- Apache Cassandra: https://cassandra.apache.org
- RabbitMQ: https://www.rabbitmq.com
- Apache Kafka: https://kafka.apache.org
- Elasticsearch: https://elasticsearch.org

# SET 4 — Placement Prep, Aptitude, Resume, Career
- GeeksforGeeks Aptitude: https://www.geeksforgeeks.org/aptitude
- IndiaBIX: https://indiabix.com
- LeetCode Interview Explore: https://leetcode.com/explore/interview
- interviewing.io: https://interviewing.io
- Pramp: https://www.pramp.com
- Gainlo: https://www.gainlo.co
- Glassdoor: https://glassdoor.com
- Exponent: https://www.exponent.com
- ResumeNerd: https://www.resumenerd.com
- Standard Resume: https://standardresume.co
- FlowCV: https://flowcv.com
- Jobscan: https://www.jobscan.co
- LinkedIn: https://www.linkedin.com
- Levels.fyi: https://levels.fyi
- Angel.co (Wellfound): https://wellfound.com

# SET 5 — Full-Stack Development, Web Dev, CS Courses
- MDN Web Docs: https://developer.mozilla.org
- W3Schools: https://www.w3schools.com
- freeCodeCamp: https://www.freecodecamp.org
- Codecademy: https://www.codecademy.com
- Udemy: https://www.udemy.com
- Coursera: https://www.coursera.org
- edX: https://www.edx.org
- Udacity: https://www.udacity.com
- Frontend Mentor: https://frontendmentor.io
- CSS-Tricks: https://css-tricks.com
- javascript.info: https://javascript.info
- React: https://reactjs.org
- Next.js: https://nextjs.org
- Vue.js: https://vuejs.org
- Angular: https://angular.io
- Node.js: https://nodejs.org
- Express.js: https://expressjs.com
- Supabase: https://supabase.com
- Firebase: https://firebase.google.com
- Prisma: https://prisma.io
- Spring: https://spring.io
- Go: https://go.dev
- Rust: https://rust-lang.org
- CS50: https://cs50.harvard.edu
- MIT OpenCourseWare: https://ocw.mit.edu
- Teach Yourself Computer Science: https://teachyourselfcs.com
- Refactoring.Guru: https://refactoring.guru
- web.dev: https://web.dev
`;

export const generateBackgroundImage = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        text: 'A realistic, vibrant photo of a diverse group of university students collaborating and smiling around a table in a modern, sunlit library or common area. They are engaged in a lively discussion, with laptops and notebooks open. The atmosphere is positive, inspiring, and focused on learning and teamwork.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No image data found in response.");

    } catch (e) {
        console.error("Error generating background image:", e);
        throw new Error("Failed to generate a background image from the AI model.");
    }
};

export const generateSectionBackgroundImage = async (sectionName: string): Promise<string> => {
    let promptText = '';
    switch (sectionName) {
        case 'Skill Gaps':
            promptText = 'A professional, abstract, and minimalist background image representing skill gap analysis. Feature subtle, elegant data visualizations like faint bar charts or network graphs in shades of blue and gray. The style should be clean, corporate, and high-resolution.';
            break;
        case 'Learning Resources':
            promptText = 'A realistic, high-quality photo of a modern, well-organized bookshelf filled with technical and programming books. The lighting should be soft and warm, creating a studious and inviting atmosphere. The focus should be slightly blurred to act as a background.';
            break;
        case 'Resume Review':
            promptText = 'A close-up, top-down photo of a professional resume document on a clean, dark wood desk. Next to the resume, place a stylish fountain pen and a cup of black coffee. The style is minimalist, sharp, and professional, suitable for a corporate setting.';
            break;
        case 'Personalized Roadmap':
            promptText = 'An inspiring and realistic image of a winding, paved road leading towards a bright, hopeful horizon at sunrise. The landscape should be beautiful and serene, symbolizing a clear path forward in a career journey. The colors should be vibrant but not distracting.';
            break;
        default:
            promptText = 'A clean, modern, and abstract background with geometric shapes and a soft gradient of blue and purple colors. The style should be professional and minimalist.';
            break;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: promptText }] },
            config: { responseModalities: [Modality.IMAGE] },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        throw new Error("No image data found in response for section background.");
    } catch (e) {
        console.error(`Error generating background image for ${sectionName}:`, e);
        throw new Error(`Failed to generate a background image for ${sectionName}.`);
    }
};


const generateWithSchema = async <T,>(prompt: string, schema: any, modelName: string, thinkingBudget?: number): Promise<T> => {
    let responseText = '';
    let jsonStringToParse = '';
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                ...(thinkingBudget && { thinkingConfig: { thinkingBudget } }),
            },
        });
        
        responseText = response.text.trim();
        jsonStringToParse = responseText;
        
        if (jsonStringToParse.startsWith('```json') && jsonStringToParse.endsWith('```')) {
            jsonStringToParse = jsonStringToParse.substring(7, jsonStringToParse.length - 3).trim();
        }

        const firstBrace = jsonStringToParse.indexOf('{');
        const lastBrace = jsonStringToParse.lastIndexOf('}');
        
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            jsonStringToParse = jsonStringToParse.substring(firstBrace, lastBrace + 1);
        }
        
        return JSON.parse(jsonStringToParse) as T;
    } catch (e) {
        console.error(`Error parsing JSON from model ${modelName}:`, e);
        console.error(`Original response text from ${modelName}:`, responseText);
        console.error(`String that failed to parse:`, jsonStringToParse);
        throw new Error(`Failed to get a valid JSON response from the AI model (${modelName}). The model may have returned an incomplete or malformed response. Please try again.`);
    }
};

const analyzeSkillGaps = (resumeText: string, targetRole: string): Promise<SkillGapAnalysis> => {
  const prompt = `
    As a senior tech recruiter, analyze the following resume for a person applying for a "${targetRole}" position.
    Your task is to identify missing skills by comparing the resume against a comprehensive list of required skills.
    Use Google Search to understand current industry expectations for a "${targetRole}" to ensure your analysis is up-to-date.

    Resume Text:
    ---
    ${resumeText}
    ---
    
    Comprehensive Skill Lists:
    ${JSON.stringify(COMPREHENSIVE_SKILLS, null, 2)}
    
    Instructions:
    1.  Carefully read the resume.
    2.  Review the "Core Skills Companies Expect" and "Skills from Reddit Insights" sections from the provided skill list. Identify all skills from these two sections that are MISSING from the resume. List these under the 'missingCoreSkills' key. Be thorough.
    3.  Review the "Most Demanding Skills (2025)" section. Identify all skills from this section that are MISSING from the resume. List these under the 'missingDemandingSkills' key.
    
    Provide the final output as a single, valid JSON object with two keys: 'missingCoreSkills' and 'missingDemandingSkills'.
    Each key must contain an array of the missing skill strings. For "Core Skills", you can mention the sub-skill, e.g., "Dynamic Programming" or "System Design: Scalability".
    If no skills are missing from a category, provide an empty array.
    Do not add any commentary, explanations, or introductory text. Respond ONLY with the valid JSON object.
  `;
  
  return ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        thinkingConfig: { thinkingBudget: 32768 },
      },
  }).then(response => {
      const text = response.text.trim();
      let jsonString = text;

      if (jsonString.startsWith('```json') && jsonString.endsWith('```')) {
          jsonString = jsonString.substring(7, jsonString.length - 3).trim();
      }
      
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');
      
      if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
          console.error("Could not find a valid JSON object in the skill gap response:", text);
          throw new Error("Received an invalid response from the AI for skill gap analysis.");
      }

      jsonString = jsonString.substring(firstBrace, lastBrace + 1);

      try {
          return JSON.parse(jsonString) as SkillGapAnalysis;
      } catch (e) {
          console.error("Failed to parse extracted JSON for skill gaps:", jsonString, e);
          throw new Error("Failed to parse the skill gaps from the AI response.");
      }
  });
};


const getLearningResources = (skills: string[], resumeText: string, targetRole: string): Promise<{ resources: Resources }> => {
  const prompt = `
    Based on the user's resume, target role, and identified skill gaps, generate a curated list of learning resources for each skill.
    
    Target Role: "${targetRole}"
    
    Resume Text:
    ---
    ${resumeText}
    ---

    Skills to find resources for: ${skills.join(', ')}

    For each skill, provide a JSON object with the following keys:

    1.  'practiceQuestions': An array of 3 objects, each with 'text' (e.g., "Two Sum"), 'link' (a direct URL to the problem), and 'platform' (e.g., "LeetCode"). Use Google Search to find highly-rated, relevant problems.
    2.  'projectIdeas': **This is the most critical section.** Generate an array of 2-3 skill-specific, highly personalized project ideas. Analyze the user's resume to understand their existing experience and technologies. Then, devise projects that bridge their skill gaps by building directly upon what they already know. For example, if they know Python/Django and lack "Cloud Skills", suggest: "Deploy your existing Django portfolio to AWS Elastic Beanstalk, implement a CI/CD pipeline with GitHub Actions, and integrate S3 for media storage." This personalization is mandatory.
    3.  'learningResources': An array of 2-3 objects, each with 'title' and 'link'. Select the MOST RELEVANT websites for the specific skill from the 'Comprehensive List of Websites' provided below. The title should be the name of the website.
    4.  'youtubeRecommendations': An array of 1-2 objects, each with 'channelName', 'playlistName', and 'playlistLink'. Select the MOST RELEVANT channels and playlists for the specific skill from the 'Comprehensive List of YouTube Channels & Playlists' provided below.

    **Comprehensive List of Websites:**
    ---
    ${WEBSITE_RECOMMENDATIONS_LIST}
    ---

    **Comprehensive List of YouTube Channels & Playlists:**
    ---
    ${YOUTUBE_RECOMMENDATIONS_LIST}
    ---
    
    IMPORTANT: Respond with ONLY the JSON object, without any introductory text, markdown formatting, or explanations. The response must be a single valid JSON object where keys are the skill names.
  `;
  
    return ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}],
        },
    }).then(response => {
        const text = response.text.trim();
        let jsonString = text;

        if (jsonString.startsWith('```json') && jsonString.endsWith('```')) {
            jsonString = jsonString.substring(7, jsonString.length - 3).trim();
        }
        
        const firstBrace = jsonString.indexOf('{');
        const lastBrace = jsonString.lastIndexOf('}');
        
        if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
            console.error("Could not find a valid JSON object in the response:", text);
            throw new Error("Received an invalid response from the AI for learning resources.");
        }

        jsonString = jsonString.substring(firstBrace, lastBrace + 1);

        try {
            const parsedJson = JSON.parse(jsonString);
            return { resources: parsedJson };
        } catch (e) {
            console.error("Failed to parse extracted JSON:", jsonString, e);
            throw new Error("Failed to parse the learning resources from the AI response.");
        }
    });
};

const scoreResume = (resumeText: string, targetRole: string): Promise<{ resumeAnalysis: ResumeAnalysis }> => {
  const prompt = `
    As an expert career coach and resume writer specializing in the tech industry, analyze the provided resume for a job seeker targeting a "${targetRole}" position. Your analysis must be rigorous and geared towards maximizing their chances of passing Applicant Tracking Systems (ATS) and impressing human recruiters.

    Resume Text:
    ---
    ${resumeText}
    ---

    Perform the following actions and structure your response as a JSON object:

    1.  **ATS Score Calculation:** Provide a numerical ATS score out of 100. Be critical. A good resume should be above 85. A resume below 90 requires significant improvements.

    2.  **Score Breakdown:** For each of the following categories, provide a detailed analysis:
        *   **Clarity:** A concise, one-sentence analysis of the resume's readability and clarity.
        *   **Impact:** A concise, one-sentence analysis on the use of strong action verbs and quantified achievements.
        *   **ATS Friendliness:** This must be an object with four keys:
            *   'summary': A one-sentence analysis of the resume's overall ATS compatibility.
            *   'formattingSummary': A specific, one-sentence analysis of formatting pitfalls. Mention issues like unusual fonts, graphics, or tables and explain how they can hurt ATS parseability. If the formatting is good, state that.
            *   'missingKeywords': An array of 5-7 crucial keywords for a "${targetRole}" that are MISSING from the resume. For each keyword, provide an object with 'keyword' and 'integrationSuggestion'.
            *   'keywordDensity': An array of 5-7 of the MOST CRUCIAL keywords that SHOULD BE PRESENT. For each, provide an object with 'keyword', 'count' (the number of times it appears in the resume), and 'importance' ('High', 'Medium', or 'Low').

    3.  **Suggested Improvements:** If the score is below 90–95, provide a list of highly specific, actionable suggestions for improvement. Your suggestions should focus on: 
        *   **Missing Keywords:** Identify essential skills or technologies for a "${targetRole}" that are absent.
        *   **Weak Descriptions:** Pinpoint vague statements in project or experience descriptions that lack impact.
        *   **Poor Structure:** Comment on organizational flaws that hinder readability.
        *   **Vague Statements & Missed Opportunities:** Highlight where a project's impact could be better quantified or explained.
        
        For each suggestion, provide:
        *   **area:** The specific part of the resume that needs work (e.g., "Experience Section - Job Title at Company X", "Skills Section", "Project Y Description").
        *   **suggestion:** Explain *what* should be done and *why*. For example: "Quantify the impact of this project by including metrics like user growth, performance improvement percentage, or revenue generated. Vague statements like 'worked on backend' are ignored by recruiters."
        *   **example:** Provide a concrete "before and after" example. Find a weak phrase in the original resume and show exactly how to rewrite it. The 'after' part MUST use a strong action verb (e.g., Engineered, Optimized, Led) and include a quantifiable metric (e.g., "...resulting in a 20% reduction in load times."). For instance, "Before: 'Responsible for the backend.' After: 'Engineered a new caching layer for the main application, decreasing average API response time by 300ms and improving user satisfaction scores by 15%.'"

    Your final output must be a single JSON object matching the specified schema.
  `;
  const schema = {
    type: Type.OBJECT,
    properties: {
      resumeAnalysis: {
        type: Type.OBJECT,
        properties: {
          atsScore: { type: Type.NUMBER },
          scoreBreakdown: {
            type: Type.OBJECT,
            properties: {
              clarity: { type: Type.STRING },
              impact: { type: Type.STRING },
              ats_friendliness: {
                type: Type.OBJECT,
                properties: {
                  summary: { type: Type.STRING },
                  formattingSummary: { type: Type.STRING },
                  missingKeywords: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        keyword: { type: Type.STRING },
                        integrationSuggestion: { type: Type.STRING },
                      },
                      required: ['keyword', 'integrationSuggestion'],
                    },
                  },
                  keywordDensity: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        keyword: { type: Type.STRING },
                        count: { type: Type.NUMBER },
                        importance: { type: Type.STRING },
                      },
                      required: ['keyword', 'count', 'importance'],
                    },
                  },
                },
                required: ['summary', 'formattingSummary', 'missingKeywords', 'keywordDensity'],
              },
            },
          },
          suggestedFixes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                area: { type: Type.STRING },
                suggestion: { type: Type.STRING },
                example: { type: Type.STRING },
              },
            },
          },
        },
      },
    },
  };
  return generateWithSchema<{ resumeAnalysis: ResumeAnalysis }>(prompt, schema, 'gemini-flash-lite-latest');
};

const rewriteResume = (resumeText: string, targetRole: string, fixes: ResumeAnalysis['suggestedFixes']): Promise<{ rewrittenResume: RewrittenResume }> => {
  const prompt = `
    As an expert resume writer, your task is to rewrite the following resume for a candidate targeting a "${targetRole}" position. Your goal is to create a document that is highly impactful, professional, and optimized for Applicant Tracking Systems (ATS).

    **Original Resume:**
    ---
    ${resumeText}
    ---

    **Key Areas for Improvement (based on a previous analysis):**
    ${JSON.stringify(fixes)}

    **Instructions for Rewrite:**
    1.  **Incorporate All Fixes:** Directly address every suggestion provided in the "Key Areas for Improvement" list.
    2.  **Use Stronger, Clearer Wording:** Replace passive language and vague phrases with strong, active verbs (e.g., "Engineered," "Spearheaded," "Optimized," "Architected"). Ensure every sentence is concise and professional.
    3.  **Create More Impactful Project Descriptions:** For each project or experience, quantify achievements with specific metrics (e.g., "reduced latency by 30%", "increased user base by 10,000", "improved code coverage from 70% to 95%"). If the original resume lacks numbers, make reasonable, professional-sounding estimates based on the context to showcase impact.
    4.  **Add Relevant Skills & Optimize for ATS:** Intelligently integrate missing keywords and skills identified in the analysis. If a dedicated 'Technical Skills' section is weak or missing, create or enhance it. Ensure the resume is rich with keywords and technologies highly relevant to a "${targetRole}" role.
    5.  **Improve Formatting and Structure:** Maintain a clean, professional, and easily parsable format. Use standard section headers (e.g., "Experience", "Projects", "Education", "Skills"). The output should be only the rewritten text, without any introductory comments.

    **Final Output:**
    After rewriting the resume, provide a new estimated ATS score. This score **MUST be higher than the original score** to reflect the significant improvements made. The entire response must be a single JSON object with two keys: 'rewrittenText' (the full text of the improved resume) and 'newAtsScore'.
  `;
  const schema = {
    type: Type.OBJECT,
    properties: {
      rewrittenResume: {
        type: Type.OBJECT,
        properties: {
          rewrittenText: { type: Type.STRING },
          newAtsScore: { type: Type.NUMBER },
        },
      },
    },
  };
  return generateWithSchema<{ rewrittenResume: RewrittenResume }>(prompt, schema, 'gemini-2.5-pro', 32768);
};

const generateRoadmap = (targetRole: string, gaps: string[]): Promise<PersonalizedRoadmap> => {
  const prompt = `
    Create a personalized 4-week learning roadmap for a student aiming for a "${targetRole}" role.
    Their identified skill gaps are: ${gaps.join(', ')}.

    Use Google Search to find the most effective and up-to-date learning strategies and tasks for these skills.

    Structure the output as a JSON object with a single key 'roadmap' which contains an array of 4 week objects.
    Each week object should have a 'week' number, a 'focus' theme, and a 'dailyPlan' array.
    Each dailyPlan object should have a 'day' (e.g., "Day 1-2") and an array of 'tasks'.
    
    Tasks should be specific and actionable. For learning tasks, you MUST include markdown links to relevant videos or playlists from the 'Comprehensive List of YouTube Resources' provided below. For example: "Watch the [Striver A2Z DSA](https://www.youtube.com/playlist?list=PLgUwDviBIf0pSqrP8Dgj1T0bFZYC7_yzW) playlist on Trees." For practice tasks, link to specific LeetCode problems, e.g., "Solve 3 medium LeetCode problems on Dynamic Programming like [House Robber](https://leetcode.com/problems/house-robber/) and [Coin Change](https://leetcode.com/problems/coin-change/)."

    Comprehensive List of YouTube Resources:
    ---
    ${YOUTUBE_RECOMMENDATIONS_LIST}
    ---

    The plan should be realistic, progressive, and incorporate current best practices for learning and interview preparation for a "${targetRole}".
    
    IMPORTANT: Respond with ONLY the JSON object, without any introductory text, markdown formatting, or explanations. The response must be a single valid JSON object.
  `;
  
  return ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
  }).then(response => {
      const text = response.text.trim();
      let jsonString = text;

      if (jsonString.startsWith('```json') && jsonString.endsWith('```')) {
          jsonString = jsonString.substring(7, jsonString.length - 3).trim();
      }
      
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');
      
      if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
          console.error("Could not find a valid JSON object in the roadmap response:", text);
          throw new Error("Received an invalid response from the AI for the roadmap.");
      }

      jsonString = jsonString.substring(firstBrace, lastBrace + 1);

      try {
          return JSON.parse(jsonString) as PersonalizedRoadmap;
      } catch (e) {
          console.error("Failed to parse extracted JSON for roadmap:", jsonString, e);
          throw new Error("Failed to parse the roadmap from the AI response.");
      }
  });
};

export const analyzeResume = async (
  resumeText: string,
  targetRole: string,
  addMessage: (msg: string) => void
): Promise<AnalysisResults> => {
    addMessage("Analyzing skill gaps with Google Search...");
    const skillGaps = await analyzeSkillGaps(resumeText, targetRole);
    const allGaps = [...(skillGaps.missingCoreSkills || []), ...(skillGaps.missingDemandingSkills || [])];
    
    addMessage("Finding learning resources...");
    const { resources } = allGaps.length > 0 ? await getLearningResources(allGaps, resumeText, targetRole) : { resources: {} };
    
    addMessage("Scoring your resume...");
    const { resumeAnalysis } = await scoreResume(resumeText, targetRole);
    
    addMessage("Generating resume improvements...");
    const { rewrittenResume } = await rewriteResume(resumeText, targetRole, resumeAnalysis.suggestedFixes);
    
    addMessage("Building your personalized roadmap...");
    const roadmap = allGaps.length > 0 ? await generateRoadmap(targetRole, allGaps) : { roadmap: [] };
    
    addMessage("Finalizing your report...");
    return {
        skillGaps,
        resources,
        resumeAnalysis,
        rewrittenResume,
        roadmap,
    };
};
