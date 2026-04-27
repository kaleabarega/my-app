import { execSync } from 'child_process';
import { writeFileSync, unlinkSync, existsSync } from 'fs';

const API_KEY = process.env.API_KEY || 'YOUR_API_KEY';
const API_URL = process.env.API_URL || 'https://api.openai.com/v1/chat/completions';

/**
 * Sends messages to the LLM API and retrieves the response content.
 */
async function askLLM(messages) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.MODEL || 'gpt-4o',
      messages: messages,
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

/**
 * Extracts code from markdown blocks.
 */
function extractCode(text) {
  const match = text.match(/```(?:\w+)?\n([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
}

/**
 * Validates syntax by compiling/checking the code locally without executing harmful side effects.
 */
function checkSyntax(code, language) {
  const ext = language === 'python' ? 'py' : language === 'react' ? 'jsx' : 'js';
  const filename = `temp_check.${ext}`;
  writeFileSync(filename, code);
  
  try {
    if (language === 'python') {
      // Python syntax check
      execSync(`python -m py_compile ${filename}`, { stdio: 'pipe' });
    } else if (language === 'react' || language === 'javascript' || language === 'js') {
      // Node syntax check for JS. For JSX/React, we rely on standard parsers or just fallback to basic checks
      execSync(`node -c ${filename}`, { stdio: 'pipe' });
    } else {
      console.warn(`[!] No syntax checker configured for language: ${language}. Skipping strict verification.`);
    }
    return { success: true };
  } catch (error) {
    const errorMsg = error.stderr ? error.stderr.toString() : error.message;
    return { success: false, error: errorMsg };
  } finally {
    if (existsSync(filename)) {
      unlinkSync(filename);
    }
  }
}

/**
 * The core autonomous loop: WRITE -> CHECK -> FIX -> REPEAT
 */
async function runAutonomousAgent(task, language, maxAttempts = 5) {
  const systemPrompt = `You are an autonomous coding agent whose ONLY mission is: WRITE -> CHECK -> FIX -> REPEAT until the code is syntactically correct and runnable. 
Return FINAL code that has ZERO syntax errors, undefined variables, or missing imports. Output ONLY the raw code inside a single markdown block. Do not explain. Do not ask questions.`;
  
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `TASK: ${task}\nLANGUAGE: ${language}` }
  ];
  
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    console.log(`\n[Loop ${attempts + 1}/${maxAttempts}] Generating code...`);
    const response = await askLLM(messages);
    const code = extractCode(response);
    
    console.log(`[Loop ${attempts + 1}/${maxAttempts}] Checking syntax for ${language}...`);
    const checkResult = checkSyntax(code, language);
    
    if (checkResult.success) {
      console.log('✅ SUCCESS! Code is syntactically valid.');
      const ext = language === 'python' ? 'py' : language === 'react' ? 'jsx' : 'js';
      const outFilename = `final_output.${ext}`;
      writeFileSync(outFilename, code);
      console.log(`💾 Saved to ${outFilename}`);
      return code;
    } else {
      console.log(`❌ Syntax error detected. Appending error to memory and looping...`);
      messages.push({ role: 'assistant', content: response });
      messages.push({ 
        role: 'user', 
        content: `The code contains the following syntax error. Fix it and output the FULL corrected code ONLY.\nERROR:\n${checkResult.error}` 
      });
    }
    attempts++;
  }
  
  console.log('\n❌ FAILED: Maximum iteration loops reached without achieving zero-error syntax.');
  process.exit(1);
}

// CLI Entry Point
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node agent.js "<feature to build>" <language>');
  process.exit(1);
}

const [task, language] = args;
runAutonomousAgent(task, language.toLowerCase()).catch(err => {
  console.error('\n💥 Critical failure:', err.message);
  process.exit(1);
});
