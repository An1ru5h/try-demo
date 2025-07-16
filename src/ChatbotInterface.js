import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, Trash2, ClipboardCopy, FileText, Plus, ChevronDown, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Chatbot Component
 * Handles UI, chat history, message sending, and Gemini API interaction.
 */
const Chatbot = ({
  themeClasses,
  onOpenCodingCanvas,
  isMinimalMode = false,
  initialChatPrompt,
  onCodeGenerated,
  codeGenerationAPI
}) => {
  // State management
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gemini-2.0-flash'); // Default AI model
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  // Effect: Handle initial prompt (e.g., coding canvas request)
  useEffect(() => {
    if (initialChatPrompt && chatHistory.length === 0) {
      const initialMessage = { role: "user", text: initialChatPrompt };
      setChatHistory([initialMessage]);
      handleSendMessage(initialChatPrompt, true);
    }
  }, [initialChatPrompt]); // run once on mount

  // Effect: Scroll chat to bottom when history updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  /**
   * Call Gemini API to get AI response.
   * @param {string} userMessage - User input message
   * @param {string} currentModel - AI model name
   * @param {boolean} isSummaryRequest - Summarization flag
   * @param {boolean} isDeepResearch - Deep research flag
   * @returns {Promise<string>} AI response text
   */
  const callGeminiAPI = useCallback(async (userMessage, currentModel, isSummaryRequest = false, isDeepResearch = false) => {
    setIsLoading(true);
    let chatHistoryToSend = [];

    // Prepare payload depending on request type
    if (isSummaryRequest) {
      chatHistory.forEach(msg => {
        chatHistoryToSend.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
      });
      chatHistoryToSend.push({ role: "user", parts: [{ text: "Please summarize the entire conversation concisely." }] });
    } else if (userMessage.startsWith("Generate startup ideas for:")) {
      chatHistoryToSend.push({ role: "user", parts: [{ text: userMessage }] });
    } else if (userMessage.startsWith("Generate JavaScript code for:")) {
      if (codeGenerationAPI) {
        const generatedCode = await codeGenerationAPI(userMessage.replace("Generate JavaScript code for:", "").trim());
        if (onCodeGenerated) {
          onCodeGenerated(generatedCode.code);
        }
        return `Code generated successfully!\n\n${generatedCode.explanation}`;
      }
    } else if (isDeepResearch) {
      chatHistoryToSend.push({ role: "user", parts: [{ text: `Perform market research on: "${userMessage}"` }] });
    } else {
      chatHistoryToSend.push({ role: "user", parts: [{ text: userMessage }] });
    }

    try {
      const payload = { contents: chatHistoryToSend };
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates?.length > 0 && result.candidates[0].content?.parts?.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected Gemini API response:', result);
        return "Error: Could not get a valid response from the AI model.";
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return `Error: Failed to connect to the AI model. ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory, codeGenerationAPI, onCodeGenerated]);

  /**
   * Send user message and get AI response
   * @param {string} msgContentParam - message to send
   * @param {boolean} isInitial - initial message flag (skip adding to history)
   */
  const handleSendMessage = useCallback(async (msgContentParam = message, isInitial = false) => {
    const msgContent = String(msgContentParam).trim();
    if (msgContent === '' && !isInitial) return;

    const newUserMessage = { role: "user", text: msgContent };
    if (!isInitial) {
      setChatHistory(prev => [...prev, newUserMessage]);
    }
    setMessage('');

    const botResponseText = await callGeminiAPI(newUserMessage.text, model);
    setChatHistory(prev => [...prev, { role: "model", text: botResponseText }]);
  }, [message, callGeminiAPI, model]);

  // Summarize conversation
  const handleSummarizeConversation = useCallback(async () => {
    if (chatHistory.length === 0) {
      setChatHistory(prev => [...prev, { role: "model", text: "No conversation to summarize." }]);
      return;
    }
    setChatHistory(prev => [...prev, { role: "user", text: "Please summarize our conversation." }]);
    const summary = await callGeminiAPI("Please summarize the entire conversation concisely.", model, true);
    setChatHistory(prev => [...prev, { role: "model", text: summary }]);
  }, [chatHistory, callGeminiAPI, model]);

  // Perform market research
  const handleDeepResearch = useCallback(async () => {
    const topic = message.trim();
    if (topic === '') {
      setChatHistory(prev => [...prev, { role: "model", text: "Please type a topic before clicking 'Market Research'." }]);
      return;
    }

    setChatHistory(prev => [...prev, { role: "user", text: `Market Research: "${topic}"` }]);
    setMessage('');
    const researchResult = await callGeminiAPI(topic, model, false, true);
    setChatHistory(prev => [...prev, { role: "model", text: researchResult }]);
  }, [message, callGeminiAPI, model]);

  // Copy last bot message to clipboard
  const handleCopyToClipboard = useCallback(() => {
    const lastBotMessage = [...chatHistory].reverse().find(msg => msg.role === 'model');
    if (lastBotMessage) {
      navigator.clipboard.writeText(lastBotMessage.text);
      console.log("Copied to clipboard:", lastBotMessage.text);
    } else {
      console.log("No bot message to copy.");
    }
  }, [chatHistory]);

  // Handle Enter key to send message
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== '') {
        handleSendMessage();
      }
    }
  }, [message, handleSendMessage]);

  // Clear chat history
  const handleClearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  // Generate startup ideas
  const handleGenerateIdeas = useCallback(async () => {
    const topic = message.trim();
    if (topic === '') {
      setChatHistory(prev => [...prev, { role: "model", text: "Please type a topic before clicking 'Generate'." }]);
      return;
    }

    setChatHistory(prev => [...prev, { role: "user", text: `Generate startup ideas for: "${topic}"` }]);
    setMessage('');
    const ideas = await callGeminiAPI(`Generate startup ideas for: "${topic}"`, model);
    setChatHistory(prev => [...prev, { role: "model", text: ideas }]);
  }, [message, callGeminiAPI, model]);

  // Trigger hidden file input click
  const handlePlusClick = () => {
    if (!isMinimalMode) {
      fileInputRef.current?.click();
    } else {
      console.log("File input disabled in minimal mode.");
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFileName(files[0].name);
      setChatHistory(prev => [...prev, { role: "user", text: `File selected: ${files[0].name} (File handling is local, not sent to AI)` }]);
    }
    event.target.value = null; // Reset file input
  };

  // Clear selected file
  const handleClearSelectedFile = useCallback(() => {
    setSelectedFileName(null);
  }, []);

  // Font size based on model name length
  const getModelFontSizeClass = (modelName) => {
    const length = String(modelName || '').length;
    if (length <= 14) return 'text-sm';
    if (length <= 20) return 'text-xs';
    return 'text-xs';
  };

  const textareaMinHeightPx = isMinimalMode ? 64 : 32;
  const textareaMinHeight = `${textareaMinHeightPx}px`;

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} ${isMinimalMode ? '' : 'relative'}`}>
      {!isMinimalMode && (
        <div className="flex justify-end space-x-2 mb-2">
          <button
            onClick={handleClearChat}
            className={`${themeClasses.buttonSecondaryBg} ${themeClasses.buttonSecondaryHoverBg} ${themeClasses.textPrimary} w-8 h-8 p-0 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleSummarizeConversation}
            disabled={isLoading || chatHistory.length === 0}
            className={`${themeClasses.buttonSecondaryBg} ${themeClasses.buttonSecondaryHoverBg} ${themeClasses.textPrimary} w-8 h-8 p-0 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
            title="Summarize Conversation"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopyToClipboard}
            disabled={isLoading || chatHistory.length === 0}
            className={`${themeClasses.buttonSecondaryBg} ${themeClasses.buttonSecondaryHoverBg} ${themeClasses.textPrimary} w-8 h-8 p-0 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
            title="Copy Last Response"
          >
            <ClipboardCopy className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Chat History */}
      <div className={`flex-1 overflow-y-auto pr-2 space-y-3 text-sm pb-[100px] ${themeClasses.textPrimary} hide-scrollbar-vertical`}>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? `${themeClasses.accentBg} ${themeClasses.accentText}`
                  : `${themeClasses.cardBg} ${themeClasses.textPrimary}`
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`max-w-[85%] p-3 rounded-lg ${themeClasses.cardBg} ${themeClasses.textPrimary}`}>
              <div className="dot-flashing" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div
        className={`${isMinimalMode ? 'w-full' : 'absolute bottom-0 left-0 right-0'} py-4 px-4 ${themeClasses.appBg} flex flex-col items-center z-10`}
        style={{ '--textarea-min-height': `${textareaMinHeightPx}px` }}
      >
        {selectedFileName && (
          <div
            className={`flex items-center self-start mb-2 px-3 py-1 rounded-full ${themeClasses.cardBg} text-sm ${themeClasses.textSecondary} shadow-md`}
          >
            <FileText className="w-4 h-4 mr-2" />
            <span>{selectedFileName}</span>
            <button onClick={handleClearSelectedFile} className={`ml-2 ${themeClasses.textTertiary} hover:text-white`}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-end w-full relative">
          {!isMinimalMode && (
            <button
              onClick={handleGenerateIdeas}
              disabled={isLoading}
              className="bg-gradient-to-br from-blue-400 to-purple-600 text-white w-8 min-h-[var(--textarea-min-height)] rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
              title="Generate Ideas"
              style={{ height: 'var(--textarea-current-height, var(--textarea-min-height))' }}
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
          <textarea
            className={`flex-grow px-4 py-2 ${isMinimalMode ? 'rounded-[5px]' : 'rounded-full'} bg-transparent ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden text-base border ${themeClasses.borderColor} text-left`}
            rows="1"
            placeholder="Type Here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
              e.target.closest('.flex-col').style.setProperty('--textarea-current-height', `${e.target.scrollHeight}px`);
            }}
            onKeyDown={handleKeyDown}
            style={{ minHeight: textareaMinHeight, maxHeight: '120px' }}
          />
          {!isMinimalMode && (
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`${themeClasses.accentBg} ${themeClasses.accentText} w-8 min-h-[var(--textarea-min-height)] rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-2`}
              title="Send Message"
              style={{ height: 'var(--textarea-current-height, var(--textarea-min-height))' }}
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex items-center space-x-2">
            <button
              className={`flex items-center justify-center w-8 min-h-[var(--textarea-min-height)] rounded-full ${themeClasses.cardBg}/60 ${themeClasses.textSecondary} ${themeClasses.buttonSecondaryHoverBg} transition-colors shadow-lg backdrop-blur-md backdrop-brightness-75 border ${themeClasses.borderColor}`}
              onClick={handlePlusClick}
              title="Attach File / Submit Prompt"
              style={{ height: 'var(--textarea-current-height, var(--textarea-min-height))' }}
            >
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={handleDeepResearch}
              disabled={isLoading}
              className="px-4 py-2 rounded-full text-sm font-medium
                         bg-gradient-to-r from-purple-500 to-pink-500 text-white
                         hover:from-purple-600 hover:to-pink-600 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center text-center"
              title="Perform Market Research"
            >
              Market Research
            </button>
          </div>

          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={`${themeClasses.buttonSecondaryBg} ${themeClasses.textPrimary} rounded-full pl-2 pr-6 py-0.5 ${getModelFontSizeClass(model)} appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-pro">Gemini Pro</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="claude">Claude</option>
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-1.5 flex items-center ${themeClasses.textTertiary}`}>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Styles for scrollbar hiding and loading dots */}
      <style>{`
        .hide-scrollbar-vertical::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar-vertical {
          scrollbar-width: none;
        }
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }
        .dot-flashing::before, .dot-flashing::after {
          content: '';
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          animation: dotFlashing 1s infinite linear alternate;
        }
        .dot-flashing::before {
          left: -15px;
        }
        .dot-flashing::after {
          left: 15px;
          animation-delay: 1s;
        }
        @keyframes dotFlashing {
          0% { background-color: #9880ff; }
          50%, 100% { background-color: #eee; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
