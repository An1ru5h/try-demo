import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bot, Sparkles, DollarSign, Users, BookOpen, Settings, Search, Trash2, ClipboardCopy, FileText, Plus, ChevronDown, Send, Wrench, CheckCircle, XCircle, Book, FolderOpen, Info, Code, X, Square, Cloud, MessageSquare, Palette, BrainCircuit, Blocks, Play, HardDrive, Shield, BellRing, GitBranch, LayoutDashboard, UserCog, Database, Zap, BarChart2, Eye, Bug, Image } from 'lucide-react'; // Changed MessageSquareText to MessageSquare
import ChatbotInterface from './ChatbotInterface'; // Import the new ChatbotInterface component


/**
 * Note: To use this component, you need to have React and Tailwind CSS set up.
 * You also need to install the lucide-react library:
 * npm install lucide-react
 */
// Custom Gradient LayoutDashboard Icon component
const GradientLayoutDashboardIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Removed the gradient definition and set stroke and fill to white directly */}
    <rect width="7" height="9" x="3" y="3" rx="1" stroke="white" fill="white"/>
    <rect width="7" height="5" x="14" y="3" rx="1" stroke="white" fill="white"/>
    <rect width="7" height="9" x="14" y="12" rx="1" stroke="white" fill="white"/>
    <rect width="7" height="5" x="3" y="16" rx="1" stroke="white" fill="white"/>
  </svg>
);

// An array of objects to define the navigation links for easier management and rendering.
const menuItems = [
  { id: 'workspace', icon: Sparkles, label: 'Workspace' },
  { id: 'tools', icon: Code, label: 'Tools' },
  { id: 'funding', icon: DollarSign, label: 'Funding' },
  { id: 'resources', icon: BookOpen, label: 'Resources' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'admin-tab', icon: LayoutDashboard, label: 'Admin' }, // Consolidated Admin Tab
  { id: 'settings', icon: Settings, label: 'Settings' },
];

// Helper to get theme-specific classes
const getThemeClasses = (theme) => {
  switch (theme) {
    case 'day':
      return {
        appBg: 'bg-gray-100', // Light background
        sidebarBg: 'bg-gray-200',
        cardBg: 'bg-white',
        cardHoverBg: 'hover:bg-gray-50',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-500',
        borderColor: 'border-gray-300',
        accentBg: 'bg-blue-600',
        accentText: 'text-white',
        buttonSecondaryBg: 'bg-gray-300',
        buttonSecondaryHoverBg: 'hover:bg-gray-400',
      };
    case 'midnight':
      return {
        appBg: 'bg-indigo-950', // Dark indigo
        sidebarBg: 'bg-indigo-900',
        cardBg: 'bg-indigo-800',
        cardHoverBg: 'hover:bg-indigo-700',
        textPrimary: 'text-white',
        textSecondary: 'text-indigo-200',
        textTertiary: 'text-indigo-300',
        borderColor: 'border-indigo-700',
        accentBg: 'bg-purple-600', // Different accent for midnight
        accentText: 'text-white',
        buttonSecondaryBg: 'bg-indigo-700',
        buttonSecondaryHoverBg: 'hover:bg-indigo-600',
      };
    case 'night': // Default (current)
    default:
      return {
        appBg: 'bg-[#0A0C10]',
        sidebarBg: 'bg-[#111317]',
        cardBg: 'bg-gray-800',
        cardHoverBg: 'hover:bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        borderColor: 'border-gray-700',
        accentBg: 'bg-blue-600',
        accentText: 'text-white',
        buttonSecondaryBg: 'bg-gray-600',
        buttonSecondaryHoverBg: 'hover:bg-gray-700',
      };
  }
};

// AI Sidebar component
const AISidebar = ({ activeItem, onSidebarItemClick, themeClasses }) => {
  const linkBaseClasses = "relative flex flex-col items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 ease-in-out text-center";

  return (
    <aside className={`w-[60px] ${themeClasses.sidebarBg} ${themeClasses.textTertiary} p-1 font-sans flex flex-col items-center relative`}>
      {/* Company Logo Placeholder - Replaced with image */}
      {/* Added an anchor tag around the logo for redirection */}
      <a href="https://mvio-six.vercel.app/" className="w-10 h-10 mt-3 mb-4 rounded-full flex items-center justify-center overflow-hidden shadow-md">
        <img
          src="./Logo.png" // Placeholder image URL
          alt="Company Logo"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/555/FFF?text=Error'; }} // Fallback on error
        />
      </a>
      <div className="flex-grow w-full">
        <nav className="w-full">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-1">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onSidebarItemClick(item.id); }}
                  className={`${linkBaseClasses} ${activeItem === item.id ? `${themeClasses.accentBg} ${themeClasses.accentText} shadow-lg` : `${themeClasses.cardHoverBg}`}`}
                >
                  {/* Render Lucide React component directly */}
                  {React.createElement(item.icon, { className: "h-5 w-5 flex-shrink-0" })}
                  <span className="absolute left-[65px] top-1/2 -translate-y-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 opacity-0 hover:opacity-100 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
       <div className={`mt-auto p-1 text-center text-xs ${themeClasses.textTertiary} w-full`}>
          <p className="hidden md:block">&copy; 2025</p>
      </div>
    </aside>
  );
};

// Funding Section Component
const FundingSection = ({ themeClasses }) => {
  const [industry, setIndustry] = useState('Healthcare');
  const [stage, setStage] = useState('Seed');
  const [location, setLocation] = useState('United States');
  const [investmentSize, setInvestmentSize] = useState('$100k - $500k');
  const [filteredInvestors, setFilteredInvestors] = useState([]);

  // Dummy data for investor profiles
  const allInvestors = [
    { name: 'Gaia Capital', details: 'Healthcare, Biotech', logo: 'G', industry: 'Healthcare', stage: 'Seed', location: 'United States', investment: '$100k - $500k' },
    { name: 'Blue Horizon Ventures', details: 'Digital Health, Sustainability', logo: 'BH', industry: 'Digital Health', stage: 'Series A', location: 'Europe', investment: '$500k - $1M' },
    { name: 'Maverick Angels', details: 'Healthcare, Early-stage', logo: 'M', industry: 'Healthcare', stage: 'Early-stage', location: 'United States', investment: '$1M - $5M' },
    { name: 'Ignition Partners', details: 'SaaS, Fintech', logo: 'I', industry: 'Fintech', stage: 'Seed', location: 'Canada', investment: '$100k - $500k' },
    { name: 'Sequoia Capital', details: 'AI, Consumer Tech', logo: 'S', industry: 'AI', stage: 'Series B', location: 'United States', investment: '$5M+' },
    { name: 'Growth Ventures', details: 'EdTech, SaaS', logo: 'GV', industry: 'SaaS', stage: 'Seed', location: 'Europe', investment: '$100k - $500k' },
    { name: 'Innovation Hub', details: 'Robotics, AI', logo: 'IH', industry: 'AI', stage: 'Early-stage', location: 'Asia', investment: '$500k - $1M' },
    { name: 'HealthBridge', details: 'Telemedicine, Healthcare', logo: 'HB', industry: 'Healthcare', stage: 'Series A', location: 'United States', investment: '$1M - $5M' },
  ];

  // Function to filter investors based on selected criteria
  const applyFilters = () => {
    const newFilteredInvestors = allInvestors.filter(investor => {
      return (
        (industry === '' || investor.industry.includes(industry)) &&
        (stage === '' || investor.stage === stage) &&
        (location === '' || investor.location === location) &&
        (investmentSize === '' || investor.investment === investmentSize)
      );
    });
    setFilteredInvestors(newFilteredInvestors);
  };

  // Apply filters on initial component mount
  useEffect(() => {
    applyFilters();
  }, [industry, stage, location, investmentSize]); // Re-run when filters change

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-4`}>
      {/* Message at the top of the search bar */}
      <p className={`text-sm ${themeClasses.textTertiary} mb-4`}>
        This is a simulated environment for demonstration purposes.
      </p>

      {/* Filters Section - Reduced gap and padding */}
      <div className="flex flex-wrap gap-2 mb-4 items-end justify-between">
        <FilterDropdown label="Industry" value={industry} onChange={setIndustry} options={['', 'Healthcare', 'Fintech', 'AI', 'SaaS', 'Digital Health']} themeClasses={themeClasses} />
        <FilterDropdown label="Stage" value={stage} onChange={setStage} options={['', 'Seed', 'Series A', 'Series B', 'Early-stage']} themeClasses={themeClasses} />
        <FilterDropdown label="Location" value={location} onChange={setLocation} options={['', 'United States', 'Europe', 'Asia', 'Canada']} themeClasses={themeClasses} />
        <FilterDropdown label="Investment Size" value={investmentSize} onChange={setInvestmentSize} options={['', '$100k - $500k', '$500k - $1M', '$1M - $5M', '$5M+']} themeClasses={themeClasses} />
      </div>

      {/* Investors List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="space-y-2"> {/* Reduced space-y */}
          {filteredInvestors.length > 0 ? (
            filteredInvestors.map((investor, index) => (
              <InvestorCard key={index} investor={investor} themeClasses={themeClasses} />
            ))
          ) : (
            <p className={`${themeClasses.textTertiary} text-center py-4 text-sm`}>No investors found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Filter Dropdown Component
const FilterDropdown = ({ label, value, onChange, options, themeClasses }) => {
  return (
    <div className="flex flex-col flex-grow min-w-[100px]">
      <label className={`text-xs ${themeClasses.textTertiary} mb-0.5`}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-1.5 px-2 rounded-md ${themeClasses.cardBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 pr-6`}
        >
          {options.map((option) => (
            <option key={option} value={option}>{option === '' ? 'All' : option}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-400">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Investor Card Component
const InvestorCard = ({ investor, themeClasses }) => {
  return (
    <div className={`flex items-center justify-between ${themeClasses.cardBg} rounded-lg p-3 shadow-sm`}>
      <div className="flex items-center">
        {/* Logo/Initial Placeholder */}
        <div className={`w-8 h-8 flex items-center justify-center ${themeClasses.buttonSecondaryBg} ${themeClasses.textPrimary} font-bold rounded-full mr-3 text-base`}>
          {investor.logo}
        </div>
        <div>
          <div className={`font-semibold ${themeClasses.textPrimary} text-base`}>{investor.name}</div>
          <div className={`text-xs ${themeClasses.textTertiary}`}>{investor.details}</div>
        </div>
      </div>
      <button className={`${themeClasses.accentBg} ${themeClasses.accentText} px-3 py-1.5 rounded-md font-semibold text-sm transition-colors duration-200`}>
        Request Intro
      </button>
    </div>
  );
};


// Resources Section Component
const ResourcesSection = ({ themeClasses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for resource cards, mimicking the image
  const allResources = [
    { title: 'Startup Fundamentals', description: 'Idea validation, Lean startup methodology, MVP development', tags: ['Guides'] },
    { title: 'Pitch Deck Templates', description: 'Pre-made pitch deck templates', tags: ['Templates'] },
    { title: 'No-code / Low-code Tools', description: 'Platforms for building with little to no coding', tags: ['Toolkits'] },
    { title: 'Business Basics', description: 'Business model types, Market research strategies, Revenue models', tags: ['Guides'] },
    { title: 'Interactive Startup Courses', description: 'Video or micro-learning modules', tags: ['Learning'] },
    { title: 'Startup accelerators', description: 'Links to Y Combinator, Techstars, more', tags: ['Links'] },
    { title: 'Customer Interview Templates', description: 'Ready-made templates for customer interviews', tags: ['Templates'] },
    { title: 'Upcoming Startup Webinars', description: 'Online events for founders', tags: ['Events'] },
    { title: 'Legal & IP Guide', description: 'Understanding intellectual property and legal structures for startups', tags: ['Guides', 'Legal'] },
    { title: 'Marketing Strategies', description: 'Digital marketing, content marketing, growth hacking', tags: ['Guides', 'Marketing'] },
    // New Developer Resources
    { title: 'API Documentation', description: 'Comprehensive guides for integrating with our platform APIs.', tags: ['Developer', 'API'] },
    { title: 'SDKs & Libraries', description: 'Download and use our official SDKs for various programming languages.', tags: ['Developer', 'SDK'] },
    { title: 'Code Snippet Library', description: 'Collection of reusable code snippets for common AI tasks.', tags: ['Developer', 'Code'] },
    { title: 'Contributing Guidelines', description: 'How to contribute to our open-source projects and community.', tags: ['Developer', 'Community'] },
  ];

  const filteredResources = allResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-4`}>
      {/* Message at the top of the search bar */}
      <p className={`text-sm ${themeClasses.textTertiary} mb-4`}>
        This is a simulated environment for demonstration purposes.
      </p>

      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Resources</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources"
            className={`pl-8 pr-3 py-1.5 rounded-md ${themeClasses.cardBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${themeClasses.textTertiary}`} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard
                key={resource.title}
                resource={resource}
                themeClasses={themeClasses}
              />
            ))
          ) : (
            <p className={`${themeClasses.textTertiary} text-center py-4 text-sm`}>No resources found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ resource, themeClasses }) => {
  return (
    <div className={`flex items-center justify-between ${themeClasses.cardBg} rounded-lg p-3 shadow-sm`}>
      <div>
        <h3 className={`font-semibold ${themeClasses.textPrimary} text-base mb-1.5`}>{resource.title}</h3>
        <p className={`text-xs ${themeClasses.textTertiary} mb-2`}>{resource.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {resource.tags.map((tag, index) => (
          <span key={index} className={`${themeClasses.buttonSecondaryBg} ${themeClasses.textSecondary} text-xs px-1.5 py-0.5 rounded-full`}>
            /{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Community Section Component
const CommunitySection = ({ themeClasses }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const allCommunities = [
    { id: 1, name: 'AI Innovators Hub', industry: 'Artificial Intelligence', description: 'A community for AI startup founders and enthusiasts.', members: 1200, link: '#' },
    { id: 2, name: 'HealthTech Founders', industry: 'Healthcare', description: 'Connect with other founders in the digital health space.', members: 850, link: '#' },
    { id: 3, name: 'Fintech Forward', industry: 'Fintech', description: 'Discussions on financial technology innovations and challenges.', members: 1500, link: '#' },
    { id: 4, name: 'SaaS Scale-Up Collective', industry: 'SaaS', description: 'Share strategies for growing your SaaS business.', members: 1000, link: '#' },
    { id: 5, name: 'Clean Energy Startups', industry: 'Sustainability', description: 'Dedicated to startups in renewable energy and sustainability.', members: 400, link: '#' },
    { id: 6, name: 'Biotech Pioneers', industry: 'Biotechnology', description: 'For biotech entrepreneurs exploring new frontiers.', members: 600, link: '#' },
    { id: 7, name: 'Robotics Revolution', industry: 'Robotics', disclaimer: "I'm sorry, I cannot fulfill this request.", members: 300, link: '#' },
    { id: 8, name: 'EdTech Elevate', industry: 'EdTech', description: 'Advancing education through technology.', members: 720, link: '#' },
    { id: 9, name: 'Crypto & Web3 Builders', industry: 'Crypto', description: 'Connect with founders and developers in blockchain and Web3.', members: 950, link: '#' }, // Added Crypto community
  ];

  const availableIndustries = ['', ...new Set(allCommunities.map(c => c.industry))].sort();

  const filteredCommunities = allCommunities.filter(community =>
    (selectedIndustry === '' || community.industry === selectedIndustry) &&
    (community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     community.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-4`}>
      {/* Message at the top of the search bar */}
      <p className={`text-sm ${themeClasses.textTertiary} mb-4`}>
        This is a simulated environment for demonstration purposes.
      </p>

      {/* Combined search and filter into a single line at the top - Reduced margin and padding */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow w-full sm:w-auto sm:mr-3 mb-3 sm:mb-0">
          <input
            type="text"
            placeholder="Search communities"
            className={`w-full pl-8 pr-3 py-1.5 rounded-md ${themeClasses.cardBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${themeClasses.textTertiary}`} />
        </div>
        <div className="w-full sm:w-auto">
          <FilterDropdown
            label="Industry"
            value={selectedIndustry}
            onChange={setSelectedIndustry}
            options={availableIndustries}
            themeClasses={themeClasses}
          />
        </div>
      </div>

      <div className="flex-1 pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCommunities.length > 0 ? (
            filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} themeClasses={themeClasses} />
            ))
          ) : (
            <p className={`${themeClasses.textTertiary} text-center py-4 text-sm`}>No communities found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Community Card Component
const CommunityCard = ({ community, themeClasses }) => {
  return (
    <div className={`flex items-center justify-between ${themeClasses.cardBg} rounded-lg p-3 shadow-sm`}>
      <div className="flex items-center">
        {/* Logo/Initial Placeholder */}
        <div className={`w-8 h-8 flex items-center justify-center ${themeClasses.buttonSecondaryBg} ${themeClasses.textPrimary} font-bold rounded-full mr-3 text-base`}>
          {community.logo}
        </div>
        <div>
          <div className={`font-semibold ${themeClasses.textPrimary} text-base mb-1.5`}>{community.name}</div>
          <p className={`text-xs ${themeClasses.textTertiary} mb-2`}>{community.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <span className={`text-xs ${themeClasses.textTertiary}`}>{community.members} Members</span>
        <a href={community.link} className={`${themeClasses.accentBg} ${themeClasses.accentText} px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200`}>
          Join
        </a>
      </div>
    </div>
  );
};


// Shadcn-like components (simplified for direct inclusion)
const Card = ({ children, className, themeClasses }) => {
  // Determine paddingBottom based on whether details are shown or not.
  // The 'details' prop is passed to CardContent, which then passes it to the Card.
  // So, we need to inspect children to see if details are present and active.
  const cardContent = React.Children.toArray(children).find(child => child.type === CardContent);
  const showDetails = cardContent?.props.details && cardContent?.props.showDetails; // Pass showDetails state from CardContent

  // Reduced base padding to 4rem and expanded padding to 7rem
  return (
    <div
      className={`${themeClasses.cardBg} rounded-lg shadow-md ${className} relative transition-all duration-200 ${themeClasses.cardHoverBg}`}
      style={{ paddingBottom: showDetails ? '7rem' : '4rem' }}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className, onAddTool, onTryDemo, onRemoveTool, toolName, isAdded, details, themeClasses }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State for showing detailed info
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine title color based on themeClasses.textPrimary
  const titleColorClass = themeClasses.textPrimary;

  return (
    <div className={`p-4 ${className}`}>
      {/* Tool Name is now the primary content */}
      <h3 className={`font-bold text-base mb-1.5 ${titleColorClass}`}>{toolName}</h3>
      {/* Removed the tool.description paragraph here */}

      {/* Details section, appears above buttons */}
      {details && (
        <div className="mb-2"> {/* Margin below details, before buttons */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-left text-xs text-gray-400 hover:underline flex items-center mb-2"
          >
            <Info className="w-3 h-3 mr-1" />
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          {showDetails && (
            <div className="bg-gray-700/50 rounded-md p-2 text-xs text-gray-300">
              <p className="mb-1"><strong>What it is:</strong> {details.whatItIs}</p>
              <p className="mb-1"><strong>Functions:</strong> {details.functions}</p>
              <p><strong>Differences:</strong> {details.differences}</p>
            </div>
          )}
        </div>
      )}

      {/* Buttons container - now always visible */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 px-4">
        <button
          onClick={() => onTryDemo(toolName)}
          className={`${(details && showDetails) ? 'mt-auto ' : ''}bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors duration-200 flex-1`}
        >
          Try Demo
        </button>

        {/* Dropdown for Actions */}
        <div className="relative flex-1" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`${(details && showDetails) ? 'mt-auto ' : ''}w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors duration-200 flex items-center justify-between`}
          >
            <span>Actions</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10 mb-2 overflow-hidden">
              {!isAdded ? (
                <button
                  onClick={() => { onAddTool(toolName); setDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1 text-xs text-white hover:bg-gray-600 flex items-center" // Reduced padding and font size
                >
                  <Plus className="w-3 h-3 mr-1" /> Connect Tool {/* Reduced icon size and margin */}
                </button>
              ) : (
                <button
                  className="w-full text-left px-3 py-1 text-xs text-green-400 cursor-not-allowed flex items-center" // Reduced padding and font size
                  disabled
                >
                  <CheckCircle className="w-3 h-3 mr-1" /> Connected {/* Reduced icon size and margin */}
                </button>
              )}
              <button
                onClick={() => { onTryDemo(toolName); setDropdownOpen(false); }}
                className="w-full text-left px-3 py-1 text-xs text-white hover:bg-gray-600 flex items-center" // Reduced padding and font size
                >
                <Book className="w-3 h-3 mr-1" /> View Docs {/* Reduced icon size and margin */}
              </button>
              {isAdded && (
                <button
                  onClick={() => { onRemoveTool(toolName); setDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1 text-xs text-red-400 hover:bg-gray-600 flex items-center" // Reduced padding and font size
                >
                  <XCircle className="w-3 h-3 mr-1" /> Remove from Project {/* Reduced icon size and margin */}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const ScrollArea = ({ children, className }) => {
  return (
    <div className={`overflow-y-auto custom-scrollbar ${className}`}>
      {children}
    </div>
  );
};


// Toast Component
const Toast = ({ message, type, id, onDismiss }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : (type === 'error' ? 'bg-red-500' : 'bg-gray-700');
  const icon = type === 'success' ? <CheckCircle className="w-4 h-4 mr-2" /> : (type === 'error' ? <XCircle className="w-4 h-4 mr-2" /> : null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 3000); // Dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-3 rounded-lg text-white shadow-lg ${bgColor} transition-opacity duration-300 ease-out`}
         style={{ opacity: 1, transform: 'translateY(0)' }}>
      {icon}
      <span>{message}</span>
    </div>
  );
};


// Original Data for the Tools section
const originalToolData = {
  "AI APIs & Platforms": [
    { name: "OpenAI API / ChatGPT", description: "Text & image generation" },
    { name: "Anthropic Claude API", description: "Safer large language models" },
    { name: "Google Vertex AI", description: "AutoML, NLP, vision models" },
    { name: "Amazon Bedrock", description: "Foundation model access" },
    { name: "Cohere / AI21 Labs", description: "Language models for generation and classification" },
  ],
  "Prompt Engineering Tools": [
    { name: "LangSmith / PromptLayer", description: "Prompt testing & evaluation" },
    { name: "Flowise / LangFlow", description: "Visual pipeline builder for LLM apps" },
    { name: "PromptPerfect / Promptable", description: "Prompt optimization & management" },
    { name: "ChainForge", description: "Prompt experimentation & A/B testing" },
  ],
  "LLM Integration Frameworks": [
    { name: "LangChain", description: "Chain LLMs with external data/tools" },
    { name: "LlamaIndex (GPT Index)", description: "Connect LLMs to custom data" },
    { name: "Haystack", description: "Open-source framework for search & QA apps" },
  ],
  "AI for UI/UX & Content": [
    { name: "DALL·E / Midjourney / Leonardo.AI", description: "AI image generation" },
    { name: "RunwayML / Kaiber / Pika Labs", description: "AI video generation" },
    { name: "Copy.ai / Jasper / Writesonic", "description": "Marketing & website copy" },
    { name: "Uizard / Galileo AI", description: "Convert wireframes to UI code" },
  ],
  "AutoML & Model Training": [
    { name: "Google AutoML / Azure AutoML / AWS SageMaker", description: "No-code model training" },
    { name: "DataRobot / H2O.ai", description: "End-to-end AutoML platforms" },
    { name: "PyCaret", description: "Low-code Python library for ML" },
  ],
  "Natural Language Processing (NLP)": [
    { name: "spaCy / NLTK", description: "Classic NLP libraries" },
    { name: "Hugging Face Transformers", description: "Pretrained LLMs (BERT, T5, etc.)" },
    { name: "Rasa / Dialogflow", description: "Chatbot development frameworks" },
  ],
};

// Function to process toolData to split names with '/' and add detailed info
const processToolData = (data) => {
  const newToolData = {};
  for (const category in data) {
    // Skip "AI Development Assistants" and "Security, Compliance & Ethics" categories
    if (category === "AI Development Assistants" || category === "Security, Compliance & Ethics") {
      continue;
    }
    newToolData[category] = [];
    data[category].forEach(tool => {
      // Manual detailed info for the first few tools.
      // This would ideally come from a more robust data source or API.
      const toolDetails = {};
      let mockCodeSnippet = `// Code for ${tool.name} tool.\n// This is a placeholder. Integrate actual API calls here.\nconsole.log("Using ${tool.name} tool functionality.");`;

      if (tool.name.includes("OpenAI API")) {
        toolDetails.whatItIs = "A comprehensive platform providing access to OpenAI's advanced AI models like GPT-4, DALL·E, and Whisper.";
        toolDetails.functions = "Text generation, image creation, code generation, content summarization, translation, conversational AI, and data extraction.";
        toolDetails.differences = "Offers pre-trained models, customizable via fine-tuning, simple API interface, scalable infrastructure, and advanced function calling for structured outputs. Known for ease of use and versatility compared to building models from scratch.";
        mockCodeSnippet = `// OpenAI API Integration
const openaiApiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual key
async function callOpenAI(promptText) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${openaiApiKey}\`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Or another model like "gpt-4"
        messages: [{ role: "user", content: promptText }]
      })
    });
    const data = await response.json();
    console.log("OpenAI Response:", data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error: Could not get response from OpenAI.";
  }
}`;
      } else if (tool.name.includes("ChatGPT")) {
        toolDetails.whatItIs = "An advanced conversational AI model developed by OpenAI, based on the GPT architecture.";
        toolDetails.functions = "Engaging in human-like conversations, answering questions, generating creative content, writing code, summarizing texts, and assisting with various writing tasks.";
        toolDetails.differences = "Designed specifically for conversational interaction, offering a highly natural and fluent user experience. While it uses the OpenAI API internally, it's presented as an end-user application for direct interaction.";
        mockCodeSnippet = `// ChatGPT Interaction (simulated)
function sendChatMessage(message) {
  console.log("Sending message to ChatGPT:", message);
  // In a real app, this would involve a backend call or direct API integration.
  setTimeout(() => {
    console.log("ChatGPT responded: 'That's an interesting query! How else can I help?'");
  }, 1500);
}`;
      }
      else if (tool.name.includes("Anthropic Claude API")) {
        toolDetails.whatItIs = "An AI language model developed by Anthropic, focusing on safety and steerability.";
        toolDetails.functions = "Processing and generating human-like text, advanced reasoning, vision analysis (interpreting visual data), code generation, and multilingual processing. Used in customer service and content creation.";
        toolDetails.differences = "Emphasizes safety and responsible AI development. Its Claude 3 Opus model excels in complex tasks, showing high fluency and human-like understanding. Features like 'extended thinking' and citations for verifiable outputs differentiate it.";
        mockCodeSnippet = `// Anthropic Claude API Integration
const claudeApiKey = "YOUR_CLAUDE_API_KEY"; // Replace with your actual key
async function callClaude(promptText) {
  try {
    // This is a simplified mock. Actual Claude API might differ.
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: promptText }]
      })
    });
    const data = await response.json();
    console.log("Claude Response:", data.content[0].text);
    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    return "Error: Could not get response from Claude.";
  }
}`;
      } else if (tool.name.includes("Google Vertex AI")) {
        toolDetails.whatItIs = "Google Cloud's unified machine learning platform for building, deploying, and managing ML models and AI applications.";
        toolDetails.functions = "Training, tuning, and deploying ML models (AutoML or custom code), generative AI app building with Gemini, model monitoring, data preparation, and MLOps tools.";
        toolDetails.differences = "Unifies various AI services into a single platform, providing end-to-end ML lifecycle management. Offers strong support for custom models and seamless integration with Google Cloud services, making it ideal for enterprise-grade projects.";
        mockCodeSnippet = `// Google Vertex AI Integration (Simplified Client-Side Mock)
async function predictWithVertexAI(modelName, inputData) {
  console.log(\`Sending data to Vertex AI model \${modelName}:\`, inputData);
  // In a real application, this would involve a server-side call to Vertex AI Prediction.
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Vertex AI Mock Response: Prediction successful.");
      resolve({ prediction: "Mock Result for " + modelName });
    }, 2000);
  });
}`;
      } else if (tool.name.includes("LangSmith")) {
        toolDetails.whatItIs = "A platform for debugging, testing, evaluating, and monitoring large language model (LLM) applications.";
        toolDetails.functions = "Tracing LLM calls, prompt testing and evaluation, dataset management, experiment tracking, and monitoring LLM application performance in production.";
        toolDetails.differences = "Part of the LangChain ecosystem, providing integrated tools for LLM development. Key differences from alternatives like Arize Phoenix often include its closed-source nature (vs. open-source for some), self-hosting policies, and deep integration with LangChain framework.";
        mockCodeSnippet = `// LangSmith Integration (Observability Mock)
function logToLangSmith(eventDetails) {
  console.log("Logging event to LangSmith:", eventDetails);
  // In a real application, this would send data to the LangSmith platform.
}`;
      } else if (tool.name.includes("PromptLayer")) {
        toolDetails.whatItTo = "A platform for prompt management and experimentation for LLMs.";
        toolDetails.functions = "Tracking prompt versions, A/B testing prompts, logging API calls, and collaborating on prompt engineering workflows.";
        toolDetails.differences = "Focuses specifically on prompt management and experimentation, allowing teams to version control, test, and optimize their prompts effectively. It acts as a wrapper for popular LLM APIs to add observability.";
        mockCodeSnippet = `// PromptLayer Integration (Prompt Management Mock)
function executePromptLayerPrompt(promptName, variables) {
  console.log(\`Executing prompt '\${promptName}' with variables:\`, variables);
  // In a real application, PromptLayer would fetch the prompt template and execute it.
}`;
      } else if (tool.name.includes("Flowise")) {
        toolDetails.whatItIs = "An open-source, low-code platform for building custom LLM applications and AI agents with a visual drag-and-drop interface.";
        toolDetails.functions = "Connecting various AI models, data sources, APIs, and UI components to create chatbots, virtual assistants, and intelligent automation tools without extensive coding.";
        toolDetails.differences = "Offers rapid prototyping of LLM-powered applications, especially for conversational AI and chatbots. Its visual builder appeals to non-developers and technical users who prefer a node-based interface for chaining LLMs and tools.";
        mockCodeSnippet = `// Flowise API Endpoint Call (Mock)
async function callFlowiseEndpoint(flowId, inputData) {
  console.log(\`Calling Flowise endpoint \${flowId} with:\`, inputData);
  // This would typically call a deployed Flowise API endpoint.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ response: "Flowise Flow executed successfully with mock data." });
    }, 1800);
  });
}`;
      } else if (tool.name.includes("LangFlow")) {
        toolDetails.whatItIs = "A UI for LangChain, enabling users to visually build and experiment with LLM applications.";
        toolDetails.functions = "Creating and managing complex LLM chains, integrating various components like models, prompts, and tools through a graphical interface, and visualizing the flow of data.";
        toolDetails.differences = "Provides a visual layer over LangChain, making it easier for developers to design, debug, and deploy LLM applications without writing extensive code for chain construction. It offers a more intuitive development experience for LangChain users.";
        mockCodeSnippet = `// LangFlow Generated Code Snippet (Conceptual)
// This represents code you'd get from a visual LangFlow export.
// It would likely involve LangChainJS classes and calls.
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });
async function runLangFlowChain(userQuery) {
  const messages = [
    new SystemMessage("You are an AI assistant powered by a LangFlow chain."),
    new HumanMessage(userQuery),
  ];
  const result = await model.invoke(messages);
  console.log("LangFlow Chain Result:", result.content);
  return result.content;
}`;
      } else if (tool.name.includes("LangChain")) {
        toolDetails.whatItIs = "A framework designed to simplify the creation of applications powered by large language models (LLMs).";
        toolDetails.functions = "Chaining LLMs with external data sources, interacting with APIs, memory management for conversational bots, agent creation, and more.";
        toolDetails.differences = "Provides a structured, modular approach to building complex LLM applications, abstracting away much of the boilerplate code for integrations and logic flows. It enables developers to combine LLMs with other computational or knowledge sources.";
        mockCodeSnippet = `// LangChain Integration (Basic Example)
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const chat = new ChatOpenAI({
  apiKey: "YOUR_OPENAI_API_KEY", // Replace with your API key
  model: "gpt-4", // Or "gpt-3.5-turbo"
  temperature: 0.7,
});

async function runLangChainExample(userQuestion) {
  try {
    const response = await chat.invoke([
      new SystemMessage("You are a helpful AI assistant that provides concise answers."),
      new HumanMessage(userQuestion),
    ]);
    console.log("LangChain AI Response:", response.content);
    return response.content;
  } catch (error) {
    console.error("Error running LangChain example:", error);
    return "Error: LangChain execution failed.";
  }
}`;
      }
      else {
        // Default details for other tools or placeholder
        toolDetails.whatItIs = `A tool for ${tool.description.toLowerCase()}.`;
        toolDetails.functions = "Specific functions vary based on the tool's core purpose.";
        toolDetails.differences = "Often distinguishes itself through unique features, target audience, or underlying technology compared to competitors.";
      }

      if (tool.name.includes('/')) {
        const names = tool.name.split('/').map(name => name.trim());
        names.forEach(singleName => {
          newToolData[category].push({
            name: singleName,
            description: tool.description,
            details: toolDetails, // Assign the same details to split tools for simplicity
            codeSnippet: mockCodeSnippet // Add the mock code snippet
          });
        });
      } else {
        newToolData[category].push({
          name: tool.name,
          description: tool.description,
          details: toolDetails, // Assign details here
          codeSnippet: mockCodeSnippet // Add the mock code snippet
        });
      }
    });
  }
  return newToolData;
};

// Process the tool data once when the component loads
const processedToolData = processToolData(originalToolData);

// DraggableToolMenu component
const DraggableToolMenu = ({ isOpen, onClose, toolsData, themeClasses }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Initial position
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    // Only allow drag if clicking on the header, not content
    if (e.target.closest('.draggable-handle') || e.target.classList.contains('draggable-handle')) {
      setIsDragging(true);
      if (menuRef.current) {
        offset.current = {
          x: e.clientX - menuRef.current.getBoundingClientRect().left,
          y: e.clientY - menuRef.current.getBoundingClientRect().top,
        };
      }
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isOpen) return null;

  const handleDragStart = (e, tool) => {
    // Set data for drag and drop: type, name, and code snippet
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'tool',
      name: tool.name,
      codeSnippet: tool.codeSnippet
    }));
    e.dataTransfer.effectAllowed = 'copy'; // Indicate that a copy operation is allowed
  };


  return (
    <div
      ref={menuRef}
      className={`fixed z-50 rounded-lg shadow-2xl overflow-hidden
                  ${themeClasses.cardBg} border ${themeClasses.borderColor}
                  flex flex-col resize overflow-auto`} /* Added resize and overflow-auto */
      style={{ left: position.x, top: position.y, minWidth: '300px', minHeight: '200px', width: '350px', height: '400px' }}
    >
      {/* Draggable Header */}
      <div
        className={`draggable-handle flex items-center justify-between p-3 cursor-grab
                    ${themeClasses.sidebarBg} ${themeClasses.textPrimary} text-lg font-semibold border-b ${themeClasses.borderColor}`}
        onMouseDown={handleMouseDown}
      >
        <span>Tool Menu</span>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tool List */}
      <div className="flex-1 p-3 custom-scrollbar overflow-y-auto">
        {Object.entries(toolsData).map(([categoryName, toolsArray]) => (
          <div key={categoryName} className="mb-4">
            <h4 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-2 border-b ${themeClasses.borderColor} pb-1`}>
              {categoryName}
            </h4>
            <div className="space-y-2">
              {toolsArray.map((tool, index) => (
                <div
                  key={index}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, tool)}
                  className={`p-2 rounded-md ${themeClasses.buttonSecondaryBg} ${themeClasses.textSecondary}
                              hover:bg-blue-700 hover:text-white transition-colors duration-200 cursor-grab text-sm`}
                >
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ToolsSection Component - Now displays the coding canvas and natural language input directly
const ToolsSection = ({
  addToast,
  themeClasses,
  setIsToolMenuOpen,
  canvasCode,
  setCanvasCode,
  naturalLangPrompt,
  setNaturalLangPrompt,
  handleGenerateCodeFromPrompt,
  naturalLangPromptRef
}) => {
  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-5`}>
      {/* Removed the <h2> "Developer Playground" header */}

      {/* Coding Interface - separate flex container below the heading */}
      <div className="flex flex-row h-full space-x-4 flex-grow">
          {/* Left Column: Natural Language Prompt Input */}
          <div className={`w-[30%] flex-shrink-0 flex flex-col relative`}>
              {/* Redesigned input box for natural language prompt */}
              <div className={`
                absolute bottom-4 left-4 right-4 flex items-end w-auto rounded-2xl p-2
                ${themeClasses.appBg} border ${themeClasses.borderColor}
              `}>
                  {/* Plus Button */}
                  <button
                    className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 mr-2
                                ${themeClasses.textSecondary} border ${themeClasses.borderColor}
                                hover:bg-gray-700 transition-colors
                    `}
                    onClick={() => { /* Handle file input for tools if needed */ }}
                    title="Attach File"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <textarea
                    ref={naturalLangPromptRef} // Assign the ref here
                    value={naturalLangPrompt}
                    onChange={(e) => {
                      setNaturalLangPrompt(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onKeyDown={(e) => { // Modified onKeyDown to pass naturalLangPrompt
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerateCodeFromPrompt(naturalLangPrompt);
                      }
                    }}
                    placeholder="Type Here..."
                    className={`flex-grow font-sans text-lg bg-transparent outline-none resize-none overflow-hidden
                                ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')}
                                text-left
                    `}
                    rows="1"
                    style={{ minHeight: '150px', maxHeight: '300px', padding: '0', border: 'none', background: 'transparent' }}
                  />
                  {/* Tool Button - toggles the DraggableToolMenu */}
                  <button
                    onClick={() => setIsToolMenuOpen(prev => !prev)}
                    className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm
                                bg-transparent text-white
                                hover:${themeClasses.cardBg.replace('bg-', 'bg-')} transition-colors duration-200
                                border border-${themeClasses.borderColor.replace('border-', '')}
                                disabled:opacity-50 disabled:cursor-not-allowed ml-2 flex items-center justify-center
                    `}
                    title="Open Tool Menu"
                    style={{height: 'var(--textarea-current-height, var(--textarea-min-height))'}} /* Dynamic height */
                  >
                    <Wrench className="w-4 h-4 mr-2" /> Tool
                  </button>
                  {/* Send Button */}
                  <button
                    onClick={() => handleGenerateCodeFromPrompt(naturalLangPrompt)}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                                hover:from-blue-600 hover:to-cyan-600 transition-colors duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed ml-2
                    `}
                    title="Generate Code"
                  >
                    <Send className="w-5 h-5 -rotate-90" /> {/* Upward-facing arrow */}
                  </button>
              </div>
          </div>

          {/* Right Column: Coding Canvas Section */}
          <div className="w-[70%] h-full flex flex-col">
              <CodingCanvasSection key="coding-canvas-section" themeClasses={themeClasses}
                                   code={canvasCode} setCode={setCanvasCode}
                                   addToast={addToast} // Pass addToast to CodingCanvasSection
              />
          </div>
      </div>
    </div>
  );
};

// MailManagementSection Component
const MailManagementSection = ({ themeClasses, addToast }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendMail = () => {
    if (!to || !subject || !body) {
      addToast({ message: 'Please fill in all email fields.', type: 'error' });
      return;
    }
    // Simulate sending email
    addToast({ message: `Email sent to ${to} with subject "${subject}"! (Mock Send)`, type: 'success' });
    console.log('Sending email:', { to, subject, body });
    // In a real application, this would integrate with an email API (e.g., SendGrid, Mailgun)
    setTo('');
    setSubject('');
    setBody('');
  };

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-6`}>
      <h1 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Mail Management</h1>
      <div className={`flex-1 ${themeClasses.cardBg} rounded-lg p-6 shadow-md overflow-y-auto custom-scrollbar`}>
        <p className={`${themeClasses.textTertiary} mb-4 text-sm`}>
          This section provides a plug-and-play interface for sending emails. In a real application, you would connect to email service APIs (e.g., SendGrid, Mailgun, AWS SES) here.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="mail-to" className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}>To:</label>
            <input
              type="email"
              id="mail-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={`w-full p-2 rounded-md ${themeClasses.appBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
              placeholder="recipient@example.com"
            />
          </div>
          <div>
            <label htmlFor="mail-subject" className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}>Subject:</label>
            <input
              type="text"
              id="mail-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`w-full p-2 rounded-md ${themeClasses.appBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
              placeholder="Your email subject"
            />
          </div>
          <div>
            <label htmlFor="mail-body" className={`block text-sm font-medium ${themeClasses.textPrimary} mb-1`}>Message Body:</label>
            <textarea
              id="mail-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="8"
              className={`w-full p-2 rounded-md ${themeClasses.appBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm resize-y`}
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            onClick={handleSendMail}
            className={`${themeClasses.accentBg} ${themeClasses.accentText} px-5 py-2 rounded-md font-semibold text-base transition-colors duration-200 hover:bg-blue-700`}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

// AdminOverviewSection Component (formerly AdminOverviewSubSection)
const AdminOverviewSection = ({ themeClasses }) => (
  <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
    <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Admin Overview</h2>
    <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
      This dashboard provides a high-level overview of system health, AI resource utilization, and user activity, crucial for operational monitoring.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md`}>
        <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 flex items-center`}><Cloud className="w-5 h-5 mr-2" /> System Status</h3>
        <ul className={`${themeClasses.textSecondary} text-sm space-y-1`}>
          <li>Uptime: <span className="font-medium text-green-400">99.9%</span></li>
          <li>API Latency: <span className="font-medium">150ms</span></li>
          <li>Database Connections: <span className="font-medium">50/100</span></li>
        </ul>
      </div>
      <div className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md`}>
        <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 flex items-center`}><BrainCircuit className="w-5 h-5 mr-2" /> AI Resource Usage</h3>
        <ul className={`${themeClasses.textSecondary} text-sm space-y-1`}>
          <li>Total Tokens Consumed (last 30 days): <span className="font-medium">1.2M</span></li>
          <li>Most Used Model: <span className="font-medium">Gemini 2.0 Flash</span></li>
          <li>GPU Utilization: <span className="font-medium">65%</span></li>
        </ul>
      </div>
      <div className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md`}>
        <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 flex items-center`}><Users className="w-5 h-5 mr-2" /> User Accounts</h3>
        <ul className={`${themeClasses.textSecondary} text-sm space-y-1`}>
          <li>Total Active Users: <span className="font-medium">1,234</span></li>
          <li>New Sign-ups (Today): <span className="font-medium">15</span></li>
          <li>Admin Users: <span className="font-medium">5</span></li>
        </ul>
      </div>
    </div>
  </div>
);

// IntegrationsSection Component (formerly IntegrationsSubSection)
const IntegrationsSection = ({ themeClasses, addToast }) => { // Removed db, userId props
  // Static initial integration data - no real-time listener or Firestore interaction
  const [integrations, setIntegrations] = useState([
    { id: 'salesforce', name: 'Salesforce CRM', icon: 'Blocks', status: 'Connected', action: 'Connected' },
    { id: 'github', name: 'GitHub', icon: 'GitBranch', status: 'Not Configured', action: 'Connect' },
    { id: 'okta', name: 'Okta SSO', icon: 'Shield', status: 'Configured', action: 'Configured' },
    { id: 'jira', name: 'Jira Project Management', icon: 'Play', status: 'Not Configured', action: 'Connect' },
    { id: 'google_analytics', name: 'Google Analytics', icon: 'BarChart2', status: 'Connected', action: 'Connected' },
    { id: 'slack', name: 'Slack Notifications', icon: 'MessageSquare', status: 'Not Configured', action: 'Connect' }, // Changed icon to MessageSquare
  ]);

  // Removed useEffect for Firestore listener and initial population

  const handleConnect = (integrationId, currentStatus) => {
    if (currentStatus === 'Connected' || currentStatus === 'Configured') {
      addToast({ message: 'Integration is already connected or configured.', type: 'warning' });
      return;
    }

    // Simulate an async connection process by updating local state
    addToast({ message: `Connecting to ${integrationId}... (Simulated)`, type: 'info', duration: 1500 });

    setTimeout(() => {
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration =>
          integration.id === integrationId
            ? { ...integration, status: 'Connected', action: 'Connected' }
            : integration
        )
      );
      addToast({ message: `${integrationId} connected successfully! (Simulated)`, type: 'success' });
    }, 1000); // Simulate API call delay
  };


  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
      <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Integrations</h2>
      <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
        Seamlessly integrate with your existing enterprise tools to streamline workflows and data synchronization.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div key={integration.id} className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md flex items-center justify-between`}>
            <div className="flex items-center">
              {React.createElement(
                {
                  Blocks: Blocks,
                  GitBranch: GitBranch,
                  Shield: Shield,
                  Play: Play,
                  BarChart2: BarChart2,
                  MessageSquare: MessageSquare, // Changed icon to MessageSquare
                }[integration.icon],
                { className: `w-5 h-5 mr-3 ${themeClasses.textPrimary}` }
              )}
              <div>
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{integration.name}</h3>
                <p className={`text-sm ${themeClasses.textSecondary}`}>{integration.status}</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect(integration.id, integration.status)}
              className={`${integration.action === 'Connected' || integration.action === 'Configured' ? 'bg-green-600 cursor-not-allowed' : themeClasses.accentBg} ${themeClasses.accentText} px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200`}
              disabled={integration.action === 'Connected' || integration.action === 'Configured'}
            >
              {integration.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// AuditLogsSection Component (formerly AuditLogsSubSection)
const AuditLogsSection = ({ themeClasses }) => {
  const auditLogs = [
    { timestamp: '2025-07-09 10:30:00', user: 'admin@yourstartup.com', action: 'Updated Funding Data', status: 'Success', details: 'Changed Series A amount to $12M' },
    { timestamp: '2025-07-09 09:45:10', user: 'dev.team@yourstartup.com', action: 'Connected new AI Tool', status: 'Success', details: 'Connected "LangChain" to Project Alpha' },
    { timestamp: '2025-07-08 17:00:05', user: 'user@yourstartup.com', action: 'Ran Market Research', status: 'Failed', details: 'Query exceeded rate limit' },
    { timestamp: '2025-07-08 14:15:30', user: 'admin@yourstartup.com', action: 'Configured SSO', status: 'Success', details: 'Enabled Okta integration' },
    { timestamp: '2025-07-07 11:20:40', user: 'dev.team@yourstartup.com', action: 'Deployed AI Model', status: 'Success', details: 'Deployed "Sentiment Analyzer v2.1"' },
  ];

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
      <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Audit Logs</h2>
      <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
        Comprehensive audit trails for all system activities, ensuring accountability and compliance.
      </p>
      <div className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md overflow-x-auto custom-scrollbar`}>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textTertiary} uppercase tracking-wider`}>Timestamp</th>
              <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textTertiary} uppercase tracking-wider`}>User</th>
              <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textTertiary} uppercase tracking-wider`}>Action</th>
              <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textTertiary} uppercase tracking-wider`}>Status</th>
              <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textTertiary} uppercase tracking-wider`}>Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {auditLogs.map((log, index) => (
              <tr key={index}>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.timestamp}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.user}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.action}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${log.status === 'Success' ? 'text-green-400' : 'text-red-400'}`}>{log.status}</td>
                <td className={`px-4 py-2 text-sm ${themeClasses.textTertiary}`}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// AIModelManagementSection Component (formerly AIModelManagementSubSection)
const AIModelManagementSection = ({ themeClasses, addToast }) => {
  const models = [
    { name: 'Gemini 2.0 Flash', version: 'v1.2', status: 'Online', lastDeployed: '2025-06-20', type: 'LLM' },
    { name: 'Custom Sentiment Analyzer', version: 'v0.5', status: 'Online', lastDeployed: '2025-07-01', type: 'NLP' },
    { name: 'Image Recognition API', version: 'v3.0', status: 'Online', lastDeployed: '2025-05-10', type: 'Vision' },
    { name: 'Forecast Model (Sales)', version: 'v1.0', status: 'Offline', lastDeployed: '2025-04-01', type: 'Time-Series' },
  ];

  const handleDeploy = (modelName) => {
    addToast({ message: `Simulating deployment of ${modelName} to production!`, type: 'info' });
    // In a real app, this would trigger an MLOps pipeline
  };

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
      <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>AI Model Management</h2>
      <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
        Manage your deployed AI models, monitor their status, and initiate new deployments.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model, index) => (
          <div key={index} className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md flex flex-col justify-between`}>
            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-1 flex items-center`}><BrainCircuit className="w-5 h-5 mr-2" /> {model.name}</h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Version: <span className="font-medium">{model.version}</span></p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Type: <span className="font-medium">{model.type}</span></p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Status: <span className={`font-medium ${model.status === 'Online' ? 'text-green-400' : 'text-red-400'}`}>{model.status}</span></p>
              <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>Last Deployed: <span className="font-medium">{model.lastDeployed}</span></p>
            </div>
            <button
              onClick={() => handleDeploy(model.name)}
              className={`${themeClasses.accentBg} ${themeClasses.accentText} px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 hover:bg-blue-700`}
            >
              Deploy New Version (Mock)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// NotificationsSection Component (formerly NotificationsSubSection)
const NotificationsSection = ({ themeClasses, addToast }) => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(true);

  const handleToggle = (settingName, currentState, setter) => {
    setter(!currentState);
    addToast({ message: `${settingName} notifications ${!currentState ? 'enabled' : 'disabled'}! (Mock Update)`, type: 'info' });
  };

  const ToggleSwitch = ({ label, enabled, onToggle, themeClasses }) => (
    <div className="flex items-center justify-between py-2">
      <span className={`${themeClasses.textPrimary} text-base`}>{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={enabled} onChange={onToggle} />
        <div className={`w-11 h-6 ${enabled ? 'bg-blue-600' : 'bg-gray-400'} rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
      </label>
    </div>
  );

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
      <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Notifications</h2>
      <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
        Configure how you receive important alerts and updates from the platform.
      </p>
      <div className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md`}>
        <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-3 flex items-center`}><BellRing className="w-5 h-5 mr-2" /> Notification Channels</h3>
        <ToggleSwitch
          label="Email Alerts for System Errors"
          enabled={emailEnabled}
          onToggle={() => handleToggle('Email', emailEnabled, setEmailEnabled)}
          themeClasses={themeClasses}
        />
        <ToggleSwitch
          label="Slack Notifications for Deployments"
          enabled={slackEnabled}
          onToggle={() => handleToggle('Slack', slackEnabled, setSlackEnabled)}
          themeClasses={themeClasses}
        />
        <ToggleSwitch
          label="In-App Prompts for New Features"
          enabled={inAppEnabled}
          onToggle={() => handleToggle('In-App', inAppEnabled, setInAppEnabled)}
          themeClasses={themeClasses}
        />
      </div>
      <p className={`${themeClasses.textTertiary} text-xs mt-4`}>
        Note: Some critical system alerts may override your preferences to ensure timely communication.
      </p>
    </div>
  );
};


// RBACSubSection Component (remains within Settings, but could be its own top-level if needed)
const RBACSubSection = ({ themeClasses }) => {
  const roles = [
    { name: 'Admin', description: 'Full access to all platform features, user management, and system configurations.', permissions: ['Manage Users', 'Deploy Models', 'View All Data', 'Configure Integrations'] },
    { name: 'Developer', description: 'Access to coding tools, AI model training, and project-specific data.', permissions: ['Access Tools', 'Train Models', 'View Project Data', 'Manage Code'] },
    { name: 'Analyst', description: 'Read-only access to data, reports, and AI model performance metrics.', permissions: ['View Reports', 'Access Analytics', 'View AI Usage'] },
    { name: 'Viewer', description: 'Limited read-only access to public project information and community forums.', permissions: ['View Public Projects', 'Participate in Community'] },
  ];

  return (
    <React.Fragment>
      <div className="space-y-6">
        <p className={`${themeClasses.textTertiary} text-sm`}>
          Define and manage user roles with granular permissions to ensure secure and appropriate access across your organization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role, index) => (
            <div key={index} className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md`}>
              <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 flex items-center`}><UserCog className="w-5 h-5 mr-2" /> {role.name}</h3>
              <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>{role.description}</p>
              <h4 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-1`}>Key Permissions:</h4>
              <ul className={`${themeClasses.textTertiary} text-xs list-disc pl-5 space-y-0.5`}>
                {role.permissions.map((perm, pIndex) => (
                  <li key={pIndex}>{perm}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={`${themeClasses.textTertiary} text-xs mt-4`}>
          Note: In a production environment, role assignments and detailed permission configurations would be managed via your enterprise identity provider (e.g., Okta, Azure AD) integrated with our platform.
        </p>
      </div>
    </React.Fragment>
  );
};

// Settings Section Component - Now simplified
const SettingsSection = ({ themeClasses, theme, setTheme, addToast, userId }) => { // Added userId prop
  const [activeSettingTab, setActiveSettingTab] = useState('general'); // Default to 'general'

  const settingTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'rbac', label: 'Access Control', icon: UserCog }, // RBAC remains here
  ];

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-6`}>
      <h1 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Settings</h1>

      {/* Sub-navigation for settings */}
      <div className={`flex flex-wrap gap-2 mb-6 border-b ${themeClasses.borderColor} pb-3`}>
        {settingTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSettingTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center
              ${activeSettingTab === tab.id ? `${themeClasses.accentBg} ${themeClasses.accentText}` : `${themeClasses.buttonSecondaryBg} ${themeClasses.textPrimary} hover:${themeClasses.buttonSecondaryHoverBg}`}
            `}
          >
            {React.createElement(tab.icon, { className: 'w-4 h-4 mr-2' })}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on active sub-tab */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {activeSettingTab === 'general' && (
          <div className="mb-6">
            <label htmlFor="theme-select" className={`block text-lg font-semibold ${themeClasses.textPrimary} mb-2`}>
              Choose Theme:
            </label>
            <div className="relative w-full max-w-xs">
              <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`w-full py-2 px-3 pr-8 rounded-md ${themeClasses.cardBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} text-base appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="day">Day (Light)</option>
                <option value="night">Night (Dark)</option>
                <option value="midnight">Midnight (Indigo)</option>
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${themeClasses.textTertiary}`}>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
            {/* Display userId here */}
            {userId && (
              <div className={`mt-4 text-sm ${themeClasses.textTertiary}`}>
                Your User ID: <span className={`${themeClasses.textPrimary} font-semibold`}>{userId}</span>
              </div>
            )}
            <p className={`${themeClasses.textTertiary} mt-4`}>This is where you can manage various general application settings.</p>
          </div>
        )}

        {activeSettingTab === 'rbac' && <RBACSubSection themeClasses={themeClasses} />}
      </div>
    </div>
  );
};


// CodingCanvasSection Component - Implemented interactive coding canvas with view modes
const CodingCanvasSection = ({ themeClasses, code, setCode, addToast }) => { // Now receives code and setCode as props
  const [codeOutput, setCodeOutput] = useState(''); // For successful code execution output
  const [codeError, setCodeError] = useState(''); // For errors during code execution
  const [detectedLanguage, setDetectedLanguage] = useState('javascript'); // New state for detected language
  const [currentView, setCurrentView] = useState('code'); // 'code', 'output'
  const [htmlOutputContent, setHtmlOutputContent] = useState(''); // New state to store HTML string for iframe
  const codeEditorRef = useRef(null); // Ref for the textarea to manage cursor position


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

  // Drop handler for code insertion
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    console.log("Dropped data:", data); // Log the received data

    // Add a check to ensure data is not empty before parsing
    if (!data) {
      console.error("Dropped data is empty or invalid.");
      return;
    }

    try {
      const { type, name, codeSnippet } = JSON.parse(data);
      if (type === 'tool' && codeSnippet) {
        const textarea = codeEditorRef.current;
        if (!textarea) return;

        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const newCode = code.substring(0, startPos) + codeSnippet + code.substring(endPos, code.length);
        setCode(newCode);

        // Position cursor after the inserted snippet
        const newCursorPos = startPos + codeSnippet.length;
        // Need to wait for React to update the DOM, then set cursor position
        requestAnimationFrame(() => {
          textarea.selectionStart = newCursorPos;
          textarea.selectionEnd = newCursorPos;
          textarea.focus();
        });
      }
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
  }, [code, setCode]);

  // Drag over handler to allow dropping
  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Necessary to allow a drop
    e.dataTransfer.dropEffect = 'copy'; // Indicate a copy operation
  }, []);

  // Handlers for new buttons
  const handleReviewCode = () => {
    addToast({ message: "Simulating code review process...", type: "info" });
    // In a real app, this would send code to an AI model or a code analysis tool.
  };

  const handleFixBug = () => {
    addToast({ message: "Simulating bug fixing with AI assistance...", type: "info" });
    // In a real app, this would send code to an AI model for bug identification and suggestion.
  };

  const handleImageToCode = () => {
    addToast({ message: "Simulating image to code conversion...", type: "info" });
    // In a real app, this would open a file input for an image and then send it to an AI model for code generation.
  };


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
          <div className="w-full h-full flex flex-col bg-gray-900">
            <textarea
              ref={codeEditorRef} // Assign ref to textarea
              value={code} // Uses prop value
              onChange={(e) => setCode(e.target.value)} // Uses prop setter
              onDragOver={handleDragOver} // Allow dropping
              onDrop={handleDrop} // Handle the drop event
              placeholder="Write your code here or drag a tool snippet..."
              className="flex-grow p-4 font-mono text-sm bg-transparent outline-none resize-none custom-scrollbar"
              style={{ color: themeClasses.textPrimary }}
              spellCheck="false" // Disable browser spell check for code
            ></textarea>
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


// Workspace Section Component - Now directly rendering ChatbotInterface, no sub-tabs
const WorkspaceSection = ({ themeClasses, onOpenCodingCanvas }) => { // Pass onOpenCodingCanvas prop
  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-6`}>
      <div className="flex-1 flex flex-col">
        <ChatbotInterface themeClasses={themeClasses} onOpenCodingCanvas={onOpenCodingCanvas} /> {/* Pass the handler to ChatbotInterface */}
      </div>
    </div>
  );
};

// AdminTabSection Component: New component to house all admin-related sub-sections
const AdminTabSection = ({ themeClasses, addToast }) => { // Removed db, userId props
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('admin-overview'); // Default to 'admin-overview'

  const adminSubTabs = [
    { id: 'admin-overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'integrations', label: 'Integrations', icon: Blocks },
    { id: 'audit-logs', label: 'Audit Logs', icon: HardDrive },
    { id: 'ai-models', label: 'AI Models', icon: BrainCircuit },
    { id: 'notifications', label: 'Notifications', icon: BellRing },
  ];

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-6`}>
      <h1 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Admin Panel</h1>

      {/* Sub-navigation for admin tabs */}
      <div className={`flex flex-wrap gap-2 mb-6 border-b ${themeClasses.borderColor} pb-3`}>
        {adminSubTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminSubTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center
              ${activeAdminSubTab === tab.id ? `${themeClasses.accentBg} ${themeClasses.accentText}` : `${themeClasses.buttonSecondaryBg} ${themeClasses.textPrimary} hover:${themeClasses.buttonSecondaryHoverBg}`}
            `}
          >
            {React.createElement(tab.icon, { className: 'w-4 h-4 mr-2' })}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on active sub-tab */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {activeAdminSubTab === 'admin-overview' && <AdminOverviewSection themeClasses={themeClasses} />}
        {activeAdminSubTab === 'integrations' && <IntegrationsSection themeClasses={themeClasses} addToast={addToast} />}
        {activeAdminSubTab === 'audit-logs' && <AuditLogsSection themeClasses={themeClasses} />}
        {activeAdminSubTab === 'ai-models' && <AIModelManagementSection themeClasses={themeClasses} addToast={addToast} />}
        {activeAdminSubTab === 'notifications' && <NotificationsSection themeClasses={themeClasses} addToast={addToast} />}
      </div>
    </div>
  );
};


// The main application component
const App = () => {
  // State to track the currently active menu item in the sidebar
  const [activeSidebarItem, setActiveSidebarItem] = useState('workspace'); // Changed default to 'workspace'
  const [toasts, setToasts] = useState([]); // State for managing toast notifications
  const nextToastId = useRef(0);
  const [theme, setTheme] = useState('night'); // State for current theme
  const [codePromptForCanvas, setCodePromptForCanvas] = useState(''); // New state to pass prompt to canvas
  const [isToolMenuOpen, setIsToolMenuOpen] = useState(false); // State for the draggable tool menu

  // New state for code on canvas and the natural language prompt
  const [canvasCode, setCanvasCode] = useState(`console.log("Hello, world!");\n\n// Describe the code you want to generate in the box below.`);
  const [naturalLangPrompt, setNaturalLangPrompt] = useState('');
  const naturalLangPromptRef = useRef(null); // Ref for the natural language prompt textarea

  // Firebase states - REMOVED
  const [userId, setUserId] = useState('mock-user-id-12345'); // Mock user ID for demonstration


  const themeClasses = getThemeClasses(theme);

  // Moved addToast and dismissToast before functions that use them
  const addToast = useCallback(({ message, type = 'info' }) => {
    const id = nextToastId.current++;
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Firebase Initialization and Auth Listener - REMOVED
  // Replaced with a simple mock user ID for demonstration purposes.
  useEffect(() => {
    // Simulate a delay for "authentication" and then set a mock user ID
    const timer = setTimeout(() => {
      setUserId('mock-user-id-' + Math.random().toString(36).substring(2, 9)); // Generate a random mock ID
    }, 500);
    return () => clearTimeout(timer);
  }, []);


  // Common function for generating code and explanation, used by both input areas
  const generateCodeAndExplanation = useCallback(async (prompt) => {
    // Ensure prompt is a string before calling .trim()
    const safePrompt = String(prompt || '');
    let generatedCode = '';
    let explanation = '';
    const lowerPrompt = safePrompt.toLowerCase();

    if (lowerPrompt.includes("javascript") && lowerPrompt.includes("counter")) {
        generatedCode = `let count = 0;
function increment() {
    count++;
    console.log("Count:", count);
}
// Call increment() to test
increment();
increment();`;
        explanation = "I've generated a simple JavaScript counter. It includes a `count` variable and an `increment` function that increases the count and logs it to the console.";
    } else if (lowerPrompt.includes("html") && lowerPrompt.includes("button")) {
        generatedCode = `<!DOCTYPE html>
<html>
<head>
<title>My Page</title>
<style>
  body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f0f0f0; }
  button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
</style>
</head>
<body>
  <button onclick="alert('Button clicked!')">Click Me</button>
</html>`;
        explanation = "Here's a basic HTML page with a 'Click Me' button. Clicking it will trigger an alert. The button is styled with some basic CSS for centering.";
    } else if (lowerPrompt.includes("css") && lowerPrompt.includes("red button")) {
        generatedCode = `/* Apply this CSS to an HTML button */
button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}
button:hover {
  background-color: #cc0000;
}`;
        explanation = "This CSS code styles a button to be red with white text and a subtle hover effect. You can apply this to an HTML button element.";
    }
    else {
        generatedCode = `// AI could not generate code for: "${safePrompt}"
// Please try a different prompt or be more specific.`;
        explanation = "I couldn't generate specific code for that request. Please try rephrasing or being more precise with your requirements.";
    }
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { code: generatedCode, explanation: explanation };
  }, []);


  // Handler for sidebar item clicks
  const handleSidebarItemClick = (id) => {
    setActiveSidebarItem(id);
    setCodePromptForCanvas(''); // Clear prompt when switching tabs, unless it's explicitly to a coding task
  };

  const handleOpenCodingCanvas = useCallback((prompt) => {
    setCodePromptForCanvas(prompt); // Set the prompt from the chatbot
    setActiveSidebarItem('tools'); // Navigate to the Tools tab
  }, []);

  const handleGenerateCodeFromPrompt = useCallback(async (prompt) => { // Made async to use await for generateCodeAndExplanation
    // Ensure prompt is a string before calling .trim()
    const safePrompt = String(prompt || '');
    if (safePrompt.trim() === '') return;
    const { code, explanation } = await generateCodeAndExplanation(safePrompt);
    setCanvasCode(code);
    addToast({ message: `Code generated! ${explanation}`, type: 'success', duration: 5000 });
  }, [generateCodeAndExplanation, setCanvasCode, addToast]);


  const handleNaturalLangPromptKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      if (naturalLangPrompt.trim() !== '') {
        handleGenerateCodeFromPrompt(naturalLangPrompt);
      }
    }
  }, [naturalLangPrompt, handleGenerateCodeFromPrompt]);


  return (
    <div className={`flex w-full h-screen ${themeClasses.appBg}`}>
       {/* Inject Google Font Link here, normally in public/index.html */}
       <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
       <style>{`
        body {
          font-family: 'Urbanist', sans-serif;
        }
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${themeClasses.sidebarBg};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${themeClasses.borderColor};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${themeClasses.textTertiary};
        }
        /* Dot flashing animation for loading states */
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }

        .dot-flashing::before, .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          animation: dotFlashing 1s infinite linear alternate;
        }

        .dot-flashing::after {
          left: 15px;
          animation-delay: 1s;
        }

        @keyframes dotFlashing {
          0% {
            background-color: #9880ff;
          }
          50%,
          100% {
            background-color: #eee;
          }
        }
       `}</style>
       {/* Sidebar component */}
       <AISidebar activeItem={activeSidebarItem} onSidebarItemClick={handleSidebarItemClick} themeClasses={themeClasses} />

       {/* Main content area wrapper - now conditionally applies width */}
       <main className={`p-4 ${themeClasses.textPrimary} flex flex-col overflow-y-auto flex-grow`}>
           {/* Removed userId display from here */}
           {activeSidebarItem === 'funding' ? (
             <FundingSection themeClasses={themeClasses} />
           ) : activeSidebarItem === 'resources' ? (
             <ResourcesSection themeClasses={themeClasses} />
           ) : activeSidebarItem === 'community' ? (
             <CommunitySection themeClasses={themeClasses} />
           ) : activeSidebarItem === 'workspace' ? (
             <WorkspaceSection themeClasses={themeClasses} onOpenCodingCanvas={handleOpenCodingCanvas} />
           ) : activeSidebarItem === 'tools' ? (
             // Tools tab: This is the main section for the developer playground
             <ToolsSection themeClasses={themeClasses}
                           addToast={addToast}
                           setIsToolMenuOpen={setIsToolMenuOpen}
                           canvasCode={canvasCode}
                           setCanvasCode={setCanvasCode}
                           naturalLangPrompt={naturalLangPrompt}
                           setNaturalLangPrompt={setNaturalLangPrompt}
                           handleGenerateCodeFromPrompt={handleGenerateCodeFromPrompt}
                           naturalLangPromptRef={naturalLangPromptRef}
             />
           ) : activeSidebarItem === 'admin-tab' ? ( // Admin Tab: New consolidated section
             <AdminTabSection themeClasses={themeClasses} addToast={addToast} />
           ) : activeSidebarItem === 'settings' ? (
             <SettingsSection themeClasses={themeClasses} theme={theme} setTheme={setTheme} addToast={addToast} userId={userId} />
           ) : (
             <div className="flex flex-col items-center justify-center h-full">
               <h2 className={`text-xl ${themeClasses.textPrimary}`}>Select an option from the sidebar.</h2>
             </div>
           )}
         </main>

       {/* Toast Notifications Container */}
       <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
         {toasts.map((toast) => (
           <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
         ))}
       </div>

       {/* Draggable Tool Menu - Rendered directly by App */}
       <DraggableToolMenu
         isOpen={isToolMenuOpen}
         onClose={() => setIsToolMenuOpen(false)}
         toolsData={processedToolData}
         themeClasses={themeClasses}
       />
    </div>
  )
}
export default App;
