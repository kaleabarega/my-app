import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const API_KEY = process.env.API_KEY || 'YOUR_API_KEY';
const API_URL = process.env.API_URL || 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are an autonomous debugging agent for a React + Vite + TailwindCSS FRONTEND APPLICATION ONLY.

🚨 HARD CONSTRAINT:
You are ONLY allowed to modify existing React frontend files.
You MUST NOT:
- Create new unrelated .js utilities
- Generate backend code
- Change project structure
- Add random scripts
- Write non-React files

🎯 GOAL:
Fix UI and frontend-related bugs ONLY so the React app runs correctly.

🧠 SCOPE RULE:
You are working ONLY inside:
- React components (.jsx / .tsx)
- index.css / global.css
- tailwind.config.js (ONLY if needed)
- vite.config.js (ONLY if needed)
DO NOT go outside this scope.

🔧 ALLOWED ACTIONS:
✔ Fix React components
✔ Fix Tailwind class issues
✔ Fix CSS imports
✔ Fix Vite/Tailwind config issues
✔ Fix runtime frontend errors

🚫 FORBIDDEN ACTIONS:
✖ Creating new standalone JS apps
✖ Writing backend/server code
✖ Rebuilding project structure
✖ Adding unrelated helper libraries
✖ Generating full new projects

🧠 BEHAVIOR RULES:
1. Always modify existing files first
2. Never replace the whole app unless required
3. Preserve UI structure and design intent
4. Only fix what is broken
5. Do not “rebuild”, only “repair”

⚙️ TAILWIND ERROR RULE:
If error involves Tailwind classes:
- Fix class usage OR config
- DO NOT rewrite entire UI
- DO NOT remove React structure

📤 OUTPUT FORMAT:
You MUST return ONLY valid JSON in the exact format below:
{
  "step_log": "What file/component you are fixing",
  "analysis": "Root cause",
  "strategy": "Minimal fix approach",
  "fixed_files": [
    {
      "file": "path/to/file",
      "content": "FULL corrected file content"
    }
  ],
  "changes": "What exactly was changed",
  "status": "success | retry",
  "confidence": "high | medium | low"
}`;

async function askLLM(errorMsg, filesContext) {
  const userPrompt = `ERROR:\n${errorMsg}\n\nCODEBASE FILES:\n${filesContext}`;
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1
    })
  });
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

function loadFrontendFiles() {
  const filesToRead = [
    'src/App.jsx',
    'src/main.jsx',
    'src/index.css',
    'vite.config.js'
  ];
  
  let context = '';
  for (const file of filesToRead) {
    if (existsSync(file)) {
      context += `\n--- ${file} ---\n${readFileSync(file, 'utf-8')}\n`;
    }
  }
  return context;
}

function extractJSON(text) {
  try {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match) return JSON.parse(match[1]);
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Failed to parse LLM response as JSON. Raw response:\n" + text);
  }
}

async function runDebugger(errorMessage) {
  console.log(`🔍 Analyzing Error: ${errorMessage}`);
  const filesContext = loadFrontendFiles();
  
  try {
    console.log(`🤖 Asking Debugging Agent...`);
    const responseText = await askLLM(errorMessage, filesContext);
    const result = extractJSON(responseText);
    
    console.log(`\n📝 Step Log: ${result.step_log}`);
    console.log(`🧠 Analysis: ${result.analysis}`);
    console.log(`💡 Strategy: ${result.strategy}`);
    console.log(`⚙️  Confidence: ${result.confidence.toUpperCase()}`);
    console.log(`📈 Status: ${result.status.toUpperCase()}`);
    console.log(`\n🔄 Applying Fixes: ${result.changes}`);
    
    if (result.fixed_files && result.fixed_files.length > 0) {
      for (const fix of result.fixed_files) {
        const filePath = resolve(process.cwd(), fix.file);
        
        // Security constraint: Only allow modifying frontend files
        if (filePath.includes('src') || filePath.endsWith('vite.config.js') || filePath.endsWith('tailwind.config.js') || filePath.endsWith('index.css') || filePath.endsWith('global.css')) {
          writeFileSync(filePath, fix.content);
          console.log(`✅ Patched: ${fix.file}`);
        } else {
          console.log(`⚠️ Security Block: Agent attempted to modify forbidden out-of-scope file: ${fix.file}`);
        }
      }
    } else {
      console.log('ℹ️ No file changes proposed by the agent.');
    }
    
  } catch (error) {
    console.error(`💥 Debugger crashed:`, error.message);
  }
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node frontend-debugger.js "<error message>"');
  process.exit(1);
}

runDebugger(args[0]);
