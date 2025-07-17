// CodingCanvas.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Eye, Bug, Image, CheckCircle, XCircle } from 'lucide-react'; // Import necessary Lucide icons
import Editor from "@monaco-editor/react"; // Import Monaco Editor

// CodingCanvasSection Component - Implemented interactive coding canvas with view modes
const CodingCanvasSection = ({ themeClasses, code, setCode, addToast }) => {
  const [codeOutput, setCodeOutput] = useState(''); // For successful code execution output
  const [codeError, setCodeError] = useState(''); // For errors during code execution
  const [detectedLanguage, setDetectedLanguage] = useState('javascript'); // New state for detected language
  const [currentView, setCurrentView] = useState('code'); // 'code', 'output'
  const [htmlOutputContent, setHtmlOutputContent] = useState(''); // New state to store HTML string for iframe
  const codeEditorRef = useRef(null); // Re-introducing ref for Monaco Editor instance

  // Function to detect the programming language based on code content
  const detectLanguage = useCallback((code) => {
    const trimmedCode = code.trim();

    // Basic heuristics for language detection
    if (trimmedCode.startsWith('<') && trimmedCode.endsWith('>')) {
      if (/<html|<body|<div|<p|<span|<a|<img/.test(trimmedCode.toLowerCase())) {
        return 'html';
      }
    }
    if (/(def\s|import\s|class\s|print\(|for\s.*in\s|if\s.*:|elif\s.*:|else:|#.*python)/.test(trimmedCode.toLowerCase())) {
      return 'python';
    }
    if (/(function\s|let\s|const\s|var\s|console\.log|document\.|window\.|fetch\()/.test(trimmedCode.toLowerCase())) {
      return 'javascript';
    }
    // Simple CSS detection (looks for rules, but avoids confusion with HTML or JS)
    if (/(^\s*\.[a-zA-Z0-9_-]+\s*\{|^\s*#[a-zA-Z0-9_-]+\s*\{|\s*[^\{]*\{.*\})/s.test(trimmedCode) && !trimmedCode.includes('<') && !trimmedCode.includes('function') && !trimmedCode.includes('def')) {
      return 'css';
    }
    return 'unknown';
  }, []);

  // Effect to update detected language when code changes (from internal or external updates)
  useEffect(() => {
    const newDetectedLanguage = detectLanguage(code);
    setDetectedLanguage(newDetectedLanguage);
    // Clear HTML output if the language is no longer HTML
    if (newDetectedLanguage !== 'html') {
      setHtmlOutputContent('');
    }
  }, [code, detectLanguage]);


  const handleRunCode = () => {
    setCodeOutput('');
    setCodeError('');
    setHtmlOutputContent('');
    // No explicit currentView change here, as it's triggered by the Output tab click

    if (detectedLanguage === 'html') {
      setHtmlOutputContent(code);
      return;
    }

    let capturedOutput = '';
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      capturedOutput += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') + '\n';
    };

    try {
      if (detectedLanguage === 'javascript') {
        new Function(code)();
      } else if (detectedLanguage === 'css') {
        capturedOutput = "CSS code detected. Direct execution or live preview of standalone CSS is not supported in this environment. You can paste it into an HTML structure to see its effect.";
      } else if (detectedLanguage === 'python') {
        capturedOutput = "Python code detected. Direct execution of Python in the browser is not supported without a backend server or a client-side WebAssembly interpreter (e.g., Pyodide).";
      } else {
        capturedOutput = `Unsupported language detected. This environment currently supports direct execution of JavaScript and rendering of HTML.`;
      }
    } catch (e) {
      setCodeError(e.message);
    } finally {
      console.log = originalConsoleLog; // Restore console.log

      setCodeOutput(capturedOutput);
      if (!codeError && detectedLanguage === 'javascript' && !capturedOutput) { // For JS without errors or captured output
        setCodeOutput("Execution completed with no console output.");
      }
    }
  };

  // Handlers for new buttons
  const handleReviewCode = async () => {
    addToast({ message: "Reviewing code with AI...", type: "info" });
    try {
      const res = await fetch('http://localhost:5000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      addToast({ message: "Review complete. See output.", type: "success" });
      setCodeOutput(data.result);
      setCurrentView('output');
    } catch (err) {
      addToast({ message: "Review failed.", type: "error" });
      console.error(err);
    }
  };

  const handleFixBug = async () => {
    addToast({ message: "Fixing code with AI...", type: "info" });
    try {
      const res = await fetch('http://localhost:5000/api/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      addToast({ message: "Bug fix complete. See output.", type: "success" });
      setCodeOutput(data.result);
      setCurrentView('output');
    } catch (err) {
      addToast({ message: "Bug fix failed.", type: "error" });
      console.error(err);
    }
  };

  const handleImageToCode = () => {
    addToast({ message: "Simulating image to code conversion...", type: "info" });
    // In a real app, this would open a file input for an image and then send it to an AI model for code generation.
  };

  // Drag-and-Drop Snippet Injection Logic
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    try {
      const { type, name, codeSnippet } = JSON.parse(data);
      if (type === 'tool' && codeSnippet && codeEditorRef.current) {
        const editor = codeEditorRef.current;
        const selection = editor.getSelection();
        const id = { major: 1, minor: 1 }; // Unique operation ID
        editor.executeEdits(id, [{
          range: selection,
          text: codeSnippet,
          forceMoveMarkers: true
        }]);
        editor.focus(); // Focus the editor after dropping
      }
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Necessary to allow dropping
  }, []);


  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.appBg} ${themeClasses.textPrimary} relative overflow-hidden w-full`}>
      {/* Top Bar for View Modes and New Buttons */}
      <div className={`flex justify-between items-center px-4 py-2 bg-gray-900 border-b ${themeClasses.borderColor} flex-shrink-0`}>
        {/* Language display on the left */}
        <span className={`text-sm ${themeClasses.textTertiary}`}>Language: <span className="font-semibold capitalize">{detectedLanguage}</span></span>

        {/* Group for all buttons on the right */}
        <div className="flex items-center space-x-2">
          {/* Code Button */}
          <button
            onClick={() => { setCurrentView('code'); }}
            className={`${currentView === 'code' ? 'bg-blue-600 text-white' : 'text-white'} px-3 py-1 rounded-md text-sm font-semibold`}
          >
            Code
          </button>
          {/* Output Button - Now triggers code execution */}
          <button
            onClick={() => {
              setCurrentView('output');
              handleRunCode(); // Execute code when output tab is clicked
            }}
            className={`${currentView === 'output' ? 'bg-blue-600 text-white' : 'text-white'} px-3 py-1 rounded-md text-sm font-semibold`}
          >
            Output
          </button>
          {/* New Buttons */}
          <button
            onClick={handleReviewCode}
            className={`text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center ${themeClasses.buttonSecondaryBg} hover:${themeClasses.buttonSecondaryHoverBg}`}
            title="Review Code"
          >
            <Eye className="w-4 h-4 mr-1" /> Review
          </button>
          <button
            onClick={handleFixBug}
            className={`text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center ${themeClasses.buttonSecondaryBg} hover:${themeClasses.buttonSecondaryHoverBg}`}
            title="Fix Bug"
          >
            <Bug className="w-4 h-4 mr-1" /> Fix Bug
          </button>
          <button
            onClick={handleImageToCode}
            className={`text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center ${themeClasses.buttonSecondaryBg} hover:${themeClasses.buttonSecondaryHoverBg}`}
            title="Image to Code"
          >
            <Image className="w-4 h-4 mr-1" /> Image to Code
          </button>
        </div>
      </div>

      {/* Content Area based on currentView */}
      <div className="flex-grow w-full h-full flex flex-col">
        {currentView === 'code' && (
          <div
            onDrop={handleDrop} // Added onDrop handler
            onDragOver={handleDragOver} // Added onDragOver handler
            className="w-full h-full flex flex-col bg-gray-900"
          >
            <Editor
              height="100%" // Monaco Editor takes full height of its container
              defaultLanguage={detectedLanguage || 'javascript'} // Set language dynamically, using defaultLanguage
              value={code} // Bind to the code state
              onChange={(value) => setCode(value || '')} // Update code state on change, handling null/undefined
              theme="vs-dark" // Dark theme for the editor
              options={{
                minimap: { enabled: false }, // Disable the minimap
                fontSize: 14, // Set font size
                fontFamily: 'monospace', // Use a monospace font for code
                wordWrap: 'on', // Enable word wrapping
                scrollBeyondLastLine: false, // Don't scroll past the last line
                automaticLayout: true, // Automatically resize editor when container changes
              }}
              onMount={(editor, monaco) => {
                // Save ref to editor instance if needed
                codeEditorRef.current = editor;
              }}
              // Removed onDrop and onDragOver from Editor directly, now handled by parent div
            />
          </div>
        )}

        {currentView === 'output' && (
          <div className={`w-full h-full bg-gray-800 flex flex-col p-4 text-sm font-mono custom-scrollbar overflow-y-auto`}>
            <h3 className={`font-semibold mb-2 ${themeClasses.textPrimary}`}>
              {detectedLanguage === 'html' ? 'HTML Preview' : 'Code Output:'}
            </h3>
            {htmlOutputContent ? (
              <iframe
                title="HTML Preview"
                srcDoc={htmlOutputContent}
                sandbox="allow-scripts allow-same-origin" // Basic sandbox for security
                className="flex-grow border-none w-full h-full bg-white rounded-md"
              ></iframe>
            ) : (
              <>
                <pre className="whitespace-pre-wrap text-green-400">{codeOutput}</pre>
                {codeError && <pre className="text-red-400 mt-2 whitespace-pre-wrap">Error: {codeError}</pre>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingCanvasSection;
