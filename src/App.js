import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bot, Sparkles, DollarSign, Users, BookOpen, Settings, Search, Trash2, ClipboardCopy, FileText, Plus, ChevronDown, Send, Wrench, CheckCircle, XCircle, Book, FolderOpen, Info, Code, X, Square } from 'lucide-react'; // Import Square icon for stop button

/**
 * Note: To use this component, you need to have React and Tailwind CSS set up.
 * You also need to install the lucide-react library:
 * npm npm install lucide-react
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
  { id: 'tools', icon: Wrench, label: 'Tools' }, // Using Wrench icon
  { id: 'funding', icon: DollarSign, label: 'Funding' },
  { id: 'resources', icon: BookOpen, label: 'Resources' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'settings', icon: Settings, label: 'Settings' }, // Renamed from 'account' to 'settings'
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
      <div className={`w-10 h-10 mt-3 mb-4 rounded-full flex items-center justify-center overflow-hidden shadow-md`}>
        <img
          src="./Logo.png" // Placeholder image URL
          alt="Company Logo"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/555/FFF?text=Error'; }} // Fallback on error
        />
      </div>
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
                  <item.icon className="h-5 w-5 flex-shrink-0" />
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
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
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
  ];

  const filteredResources = allResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
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
  "No-Code / Low-Code AI Builders": [
    { name: "Pinecone / ChromaDB", description: "Vector databases for AI memory" },
    { name: "Bubble + OpenAI Plugin", description: "Build AI apps visually" },
    { name: "Zapier / Make (Integromat)", description: "Connect AI APIs with apps" },
    { name: "Replit AI / Anysphere", description: "AI-assisted coding platforms" },
  ],
  "AI Development Assistants": [
    { name: "GitHub Copilot / CodeWhisperer", description: "AI pair programming" },
    { name: "Codeium / Tabnine", description: "Lightweight coding autocompletion" },
    { name: "Cursor", description: "AI-powered IDE" },
  ],
  "Natural Language Processing (NLP)": [
    { name: "spaCy / NLTK", description: "Classic NLP libraries" },
    { name: "Hugging Face Transformers", description: "Pretrained LLMs (BERT, T5, etc.)" },
    { name: "Rasa / Dialogflow", description: "Chatbot development frameworks" },
  ],
  "Security, Compliance & Ethics": [
    { name: "Snyk / SonarQube", description: "Secure coding & vulnerability scans" },
    { name: "Fairlearn / AI Fairness 360", description: "Bias & fairness audits" },
    { name: "Truera", description: "Explainability & model governance" },
  ],
};

// Function to process toolData to split names with '/' and add detailed info
const processToolData = (data) => {
  const newToolData = {};
  for (const category in data) {
    newToolData[category] = [];
    data[category].forEach(tool => {
      // Manual detailed info for the first few tools.
      // This would ideally come from a more robust data source or API.
      const toolDetails = {};
      if (tool.name.includes("OpenAI API")) {
        toolDetails.whatItIs = "A comprehensive platform providing access to OpenAI's advanced AI models like GPT-4, DALL·E, and Whisper.";
        toolDetails.functions = "Text generation, image creation, code generation, content summarization, translation, conversational AI, and data extraction.";
        toolDetails.differences = "Offers pre-trained models, customizable via fine-tuning, simple API interface, scalable infrastructure, and advanced function calling for structured outputs. Known for ease of use and versatility compared to building models from scratch.";
      } else if (tool.name.includes("ChatGPT")) {
        toolDetails.whatItIs = "An advanced conversational AI model developed by OpenAI, based on the GPT architecture.";
        toolDetails.functions = "Engaging in human-like conversations, answering questions, generating creative content, writing code, summarizing texts, and assisting with various writing tasks.";
        toolDetails.differences = "Designed specifically for conversational interaction, offering a highly natural and fluent user experience. While it uses the OpenAI API internally, it's presented as an end-user application for direct interaction.";
      }
      else if (tool.name.includes("Anthropic Claude API")) {
        toolDetails.whatItIs = "An AI language model developed by Anthropic, focusing on safety and steerability.";
        toolDetails.functions = "Processing and generating human-like text, advanced reasoning, vision analysis (interpreting visual data), code generation, and multilingual processing. Used in customer service and content creation.";
        toolDetails.differences = "Emphasizes safety and responsible AI development. Its Claude 3 Opus model excels in complex tasks, showing high fluency and human-like understanding. Features like 'extended thinking' and citations for verifiable outputs differentiate it.";
      } else if (tool.name.includes("Google Vertex AI")) {
        toolDetails.whatItIs = "Google Cloud's unified machine learning platform for building, deploying, and managing ML models and AI applications.";
        toolDetails.functions = "Training, tuning, and deploying ML models (AutoML or custom code), generative AI app building with Gemini, model monitoring, data preparation, and MLOps tools.";
        toolDetails.differences = "Unifies various AI services into a single platform, providing end-to-end ML lifecycle management. Offers strong support for custom models and seamless integration with Google Cloud services, making it ideal for enterprise-grade projects.";
      } else if (tool.name.includes("LangSmith")) {
        toolDetails.whatItIs = "A platform for debugging, testing, evaluating, and monitoring large language model (LLM) applications.";
        toolDetails.functions = "Tracing LLM calls, prompt testing and evaluation, dataset management, experiment tracking, and monitoring LLM application performance in production.";
        toolDetails.differences = "Part of the LangChain ecosystem, providing integrated tools for LLM development. Key differences from alternatives like Arize Phoenix often include its closed-source nature (vs. open-source for some), self-hosting policies, and deep integration with LangChain framework.";
      } else if (tool.name.includes("PromptLayer")) {
        toolDetails.whatItIs = "A platform for prompt management and experimentation for LLMs.";
        toolDetails.functions = "Tracking prompt versions, A/B testing prompts, logging API calls, and collaborating on prompt engineering workflows.";
        toolDetails.differences = "Focuses specifically on prompt management and experimentation, allowing teams to version control, test, and optimize their prompts effectively. It acts as a wrapper for popular LLM APIs to add observability.";
      } else if (tool.name.includes("Flowise")) {
        toolDetails.whatItIs = "An open-source, low-code platform for building custom LLM applications and AI agents with a visual drag-and-drop interface.";
        toolDetails.functions = "Connecting various AI models, data sources, APIs, and UI components to create chatbots, virtual assistants, and intelligent automation tools without extensive coding.";
        toolDetails.differences = "Offers rapid prototyping of LLM-powered applications, especially for conversational AI and chatbots. Its visual builder appeals to non-developers and technical users who prefer a node-based interface for chaining LLMs and tools.";
      } else if (tool.name.includes("LangFlow")) {
        toolDetails.whatItIs = "A UI for LangChain, enabling users to visually build and experiment with LLM applications.";
        toolDetails.functions = "Creating and managing complex LLM chains, integrating various components like models, prompts, and tools through a graphical interface, and visualizing the flow of data.";
        toolDetails.differences = "Provides a visual layer over LangChain, making it easier for developers to design, debug, and deploy LLM applications without writing extensive code for chain construction. It offers a more intuitive development experience for LangChain users.";
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
            details: toolDetails // Assign the same details to split tools for simplicity
          });
        });
      } else {
        newToolData[category].push({
          name: tool.name,
          description: tool.description,
          details: toolDetails // Assign details here
        });
      }
    });
  }
  return newToolData;
};

// Process the tool data once when the component loads
const processedToolData = processToolData(originalToolData);


// ToolsSection Component - Now displays categorized AI tools using a dropdown
const ToolsSection = ({ addToast, themeClasses }) => { // Receive addToast prop
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [addedTools, setAddedTools] = useState({}); // State to track added tools
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term


  // Filtered tools based on selected category and search term
  const filteredCategories = Object.entries(processedToolData)
    .filter(([categoryName]) =>
      selectedCategory === 'All Categories' || categoryName === selectedCategory
    )
    .map(([categoryName, toolsArray]) => {
      const filteredTools = toolsArray.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return [categoryName, filteredTools];
    })
    .filter(([, toolsArray]) => toolsArray.length > 0); // Only show categories with matching tools


  const handleAddTool = (toolName) => {
    if (addedTools[toolName]) {
      addToast({ message: `${toolName} is already connected!`, type: 'info' });
      return;
    }
    setAddedTools(prev => ({ ...prev, [toolName]: true }));
    addToast({ message: `${toolName} connected!`, type: 'success' });
  };

  const handleRemoveTool = (toolName) => {
    if (!addedTools[toolName]) {
      addToast({ message: `${toolName} is not in your project.`, type: 'info' });
      return;
    }
    setAddedTools(prev => {
      const newState = { ...prev };
      delete newState[toolName];
      return newState;
    });
    addToast({ message: `${toolName} removed from project.`, type: 'error' }); // Changed type to error for removal
  };

  const handleViewDocs = (toolName) => {
    addToast({ message: `Viewing documentation for ${toolName}...`, type: 'info' });
    // In a real app, you would navigate to documentation or open a modal
  };


  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-5`}>
      {/* Search and Dropdown for filtering categories */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tools..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-md ${themeClasses.cardBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${themeClasses.textTertiary}`} />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full py-1.5 px-3 pr-7 rounded-md ${themeClasses.cardBg} ${themeClasses.borderColor} border ${themeClasses.textPrimary} text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            <option value="All Categories">All Categories</option>
            {Object.keys(processedToolData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-400">
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(([categoryName, toolsArray]) => (
              <div key={categoryName} className="col-span-full">
                {selectedCategory === 'All Categories' && (
                  <h3 className={`font-semibold text-sm ${themeClasses.textPrimary} mb-2 border-b ${themeClasses.borderColor} pb-1.5`}>
                    {categoryName}
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {toolsArray.map((tool, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-200" themeClasses={themeClasses}>
                      <CardContent
                        className="p-4"
                        onAddTool={handleAddTool}
                        onTryDemo={handleViewDocs}
                        onRemoveTool={handleRemoveTool}
                        toolName={tool.name}
                        isAdded={addedTools[tool.name]}
                        details={tool.details} // Pass the new details prop
                        themeClasses={themeClasses} // Pass themeClasses to CardContent
                      >
                        {/* Tool Name is now the primary content */}
                        <h3 className={`font-bold text-base mb-1.5 ${themeClasses.textPrimary}`}>{tool.name}</h3>
                        {/* Removed the tool.description paragraph here */}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className={`${themeClasses.textTertiary} text-center py-4 text-sm col-span-full`}>No tools found matching your criteria.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

// Settings Section Component
const SettingsSection = ({ themeClasses, theme, setTheme }) => {
  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} p-6`}>
      <h1 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Settings</h1> {/* Changed text-3xl to text-2xl */}

      {/* Theme Selection Dropdown */}
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
      </div>

      {/* Add more settings content here as needed */}
      <p className={`${themeClasses.textTertiary}`}>This is where you can manage various application settings.</p>
    </div>
  );
};

// New CodingCanvasSection Component
const CodingCanvasSection = ({ themeClasses, onClose, initialCodePrompt }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [activeView, setActiveView] = useState('code'); // 'code' or 'preview'
  const outputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // New state for generation loading
  const [isCodeRunning, setIsCodeRunning] = useState(false); // New state for code execution

  // Function to call Gemini API for code generation
  const callGeminiAPIForCode = useCallback(async (promptContent) => {
    setIsGenerating(true);
    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: `Generate JavaScript code for the following: ${promptContent}. Provide only the code, no explanations or markdown wrappers.` }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // API key will be provided by Canvas
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        let generatedCode = result.candidates[0].content.parts[0].text;

        // Clean up markdown fences if they are present
        generatedCode = generatedCode.replace(/```javascript\n|```/g, '').trim();

        // Add a comment to indicate it was AI-generated
        generatedCode = `// AI-generated code based on prompt: "${promptContent}"\n\n${generatedCode}`;

        return generatedCode;
      } else {
        console.error('Gemini API response structure unexpected:', result);
        return `// Error: Could not generate code. Unexpected API response.`;
      }
    } catch (error) {
      console.error('Error calling Gemini API for code generation:', error);
      return `// Error: Failed to generate code. ${error.message}`;
    } finally {
      setIsGenerating(false);
    }
  }, []);


  // Function to simulate code execution (very basic, for demonstration)
  const runCode = useCallback(() => {
    setIsCodeRunning(true); // Set code running state
    setIsLoading(true); // Set loading to true when code starts running
    try {
      // Clear previous output
      setOutput('');
      // This is a *very* simplistic and unsafe way to run arbitrary JS.
      // In a real application, you would send code to a secure sandbox (e.g., a web worker, iframe with limited permissions, or a backend).
      // For this demo, we'll capture console.log and execute using new Function().
      let capturedOutput = '';
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ') + '\n';
      };

      // Execute user's JavaScript code using new Function()
      // This addresses the 'direct-eval' warning by avoiding direct eval,
      // but still executes arbitrary code, so security considerations apply.
      const func = new Function(code);
      const result = func();

      console.log = originalConsoleLog; // Restore original console.log

      if (result !== undefined) {
        capturedOutput += 'Result: ' + (typeof result === 'object' ? JSON.stringify(result) : String(result)) + '\n';
      }
      setOutput(capturedOutput);
      setActiveView('preview'); // Switch to preview after running code

    } catch (e) {
      setOutput(`Error: ${e.message}`);
      setActiveView('preview'); // Switch to preview to show error
    } finally {
      setIsLoading(false); // Set loading to false after execution (success or error)
      setIsCodeRunning(false); // Reset code running state
    }
  }, [code]);

  // Use useEffect to trigger code generation and auto-run when initialCodePrompt changes
  useEffect(() => {
    if (initialCodePrompt) {
      const generateAndSetCode = async () => {
        const generatedCode = await callGeminiAPIForCode(initialCodePrompt);
        setCode(generatedCode);
        // Automatically run the code after generation
        // Ensure that `code` state is updated before calling runCode in the next tick
        setTimeout(() => runCode(), 0);
      };
      generateAndSetCode();
    }
  }, [initialCodePrompt, callGeminiAPIForCode, runCode]); // Added runCode to dependencies

  const clearCode = useCallback(() => {
    setCode('');
    setOutput('');
    setIsLoading(false); // Also reset loading when clearing
    setIsGenerating(false); // Also reset generating state
    setIsCodeRunning(false); // Reset code running state
    setActiveView('code'); // Reset to code view
  }, []);

  useEffect(() => {
    // Scroll to bottom of output on new output
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.cardBg} ${themeClasses.textPrimary} relative`}>
      {/* Top Bar for Code/Preview and Close Button */}
      <div className={`flex justify-between items-center px-4 py-2 bg-gray-900 border-b ${themeClasses.borderColor}`}>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('code')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200 ${
              activeView === 'code' ? 'bg-blue-600 text-white' : `${themeClasses.buttonSecondaryBg} ${themeClasses.textSecondary}`
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setActiveView('preview')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200 ${
              activeView === 'preview' ? 'bg-blue-600 text-white' : `${themeClasses.buttonSecondaryBg} ${themeClasses.textSecondary}`
            }`}
          >
            Preview
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={runCode}
            disabled={isLoading || isGenerating || isCodeRunning}
            className={`bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isCodeRunning ? "Stop Code" : "Run Code"}
          >
            {isCodeRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />} {/* Dynamic Icon */}
          </button>
          <button
            onClick={onClose}
            className={`${themeClasses.buttonSecondaryBg} ${themeClasses.buttonSecondaryHoverBg} ${themeClasses.textPrimary} w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200`}
            title="Close Canvas"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area (Code Editor or Preview) */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeView === 'code' ? (
          <textarea
            id="code-input"
            className={`w-full h-full p-3 rounded-md border ${themeClasses.borderColor} ${themeClasses.cardBg} ${themeClasses.textPrimary} resize-none font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 custom-scrollbar`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`console.log("Hello, Canvas!");\n// Generated code will appear here. Try writing some JavaScript!`}
          />
        ) : (
          <pre
            id="code-output"
            ref={outputRef}
            className={`w-full h-full p-3 rounded-md border ${themeClasses.borderColor} ${themeClasses.sidebarBg} ${themeClasses.textPrimary} overflow-auto font-mono text-sm whitespace-pre-wrap custom-scrollbar`}
          >
            {output || "Run your code to see output here..."}
          </pre>
        )}
      </div>
      
       {/* Small animation to demonstrate a "running" state */}
      {(isLoading || isGenerating) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 rounded-lg">
          <div className="dot-flashing"></div>
        </div>
      )}
    </div>
  );
};

// Helper Icon for Play
const Play = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);


// Placeholder Chatbot Interface component
const ChatbotInterface = ({ themeClasses, onOpenCodingCanvas, isMinimalMode = false }) => { // Receive onOpenCodingCanvas prop and new isMinimalMode prop
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gemini-2.0-flash'); // Reintroduced model state
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Function to call Gemini API
  const callGeminiAPI = useCallback(async (userMessage, currentModel, isSummaryRequest = false) => {
    setIsLoading(true);
    let chatHistoryToSend = [];

    if (isSummaryRequest) {
        // For summarization, send the entire current chat history
        chatHistory.forEach(msg => {
            chatHistoryToSend.push({ role: msg.role, parts: [{ text: msg.text }] });
        });
        chatHistoryToSend.push({ role: "user", parts: [{ text: "Please summarize the entire conversation concisely." }] });
    } else if (userMessage.includes("Generate startup ideas for:")) {
         chatHistoryToSend.push({ role: "user", parts: [{ text: userMessage }] });
    }
    else {
        chatHistoryToSend.push({ role: "user", parts: [{ text: userMessage }] });
    }

    try {
      const payload = { contents: chatHistoryToSend };
      const apiKey = ""; // API key will be provided by Canvas
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error('Gemini API response structure unexpected:', result);
        return "Error: Could not get a valid response from the AI model.";
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return `Error: Failed to connect to the AI model. ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory]);


  const handleSendMessage = useCallback(async () => {
    if (message.trim() === '') return;

    const newUserMessage = { role: "user", text: message };
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setMessage('');

    const botResponseText = await callGeminiAPI(newUserMessage.text, model); // Pass the selected model
    setChatHistory((prevHistory) => [...prevHistory, { role: "model", text: botResponseText }]);
  }, [message, chatHistory, callGeminiAPI, setChatHistory, setMessage, model]); // Added model to dependencies

  const handleSummarizeConversation = useCallback(async () => {
    if (chatHistory.length === 0) {
      setChatHistory((prevHistory) => [...prevHistory, { role: "model", text: "No conversation to summarize." }]);
      return;
    }
    setChatHistory((prevHistory) => [...prevHistory, { role: "user", text: "Please summarize our conversation." }]);
    const summary = await callGeminiAPI("", model, true); // Trigger summary with true flag
    setChatHistory((prevHistory) => [...prevHistory, { role: "model", text: summary }]);
  }, [chatHistory, setChatHistory, callGeminiAPI, model]); // Added model to dependencies

  const handleCopyToClipboard = useCallback(() => {
    const lastBotMessage = chatHistory.slice().reverse().find(msg => msg.role === 'model');
    if (lastBotMessage) {
      // Using document.execCommand('copy') as navigator.clipboard.writeText() might not work in some iframe environments.
      const el = document.createElement('textarea');
      el.value = lastBotMessage.text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      console.log("Copied to clipboard:", lastBotMessage.text); // For debugging
    } else {
      console.log("No bot message to copy.");
    }
  }, [chatHistory]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // If there's text, send it. Otherwise, perhaps trigger default behavior or do nothing.
      if (message.trim() !== '') {
        handleSendMessage();
      } else {
        // You can add a different action here if Enter is pressed on empty input
        // For now, it.just prevents a newline in the textarea.
      }
    }
  }, [message, handleSendMessage]);

  const handleClearChat = useCallback(() => {
    setChatHistory([]);
  }, [setChatHistory]);


  const handleGenerateIdeas = useCallback(async () => { // Made async for consistency with mockAIResponse
    const topic = message.trim();
    if (topic === '') {
      setChatHistory((prevHistory) => [...prevHistory, { role: "model", text: "Please type a topic in the input field before clicking 'Generate'." }]);
      return;
    }

    setChatHistory((prevHistory) => [...prevHistory, { role: "user", text: `Generate startup ideas for: "${topic}"` }]);
    setMessage(''); // Clear input after sending the request
    const ideas = await callGeminiAPI(`Generate startup ideas for: "${topic}"`, model); // Trigger mock ideas, pass model
    setChatHistory((prevHistory) => [...prevHistory, { role: "model", text: ideas }]);
  }, [message, chatHistory, setChatHistory, setMessage, callGeminiAPI, model]); // Added model to dependencies

  const handlePlusClick = async () => {
    const currentMessage = message.trim();
    if (currentMessage !== '') {
      const newUserMessage = { role: "user", text: currentMessage };
      setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
      setMessage(''); // Clear input immediately

      // Call mock response for this message
      const botResponseText = await callGeminiAPI(currentMessage, model); // Pass model
      setChatHistory((prevHistory) => [...prevHistory, { role: "model", text: botResponseText }]);
    }
    // Only trigger file input if it's not minimal mode, as it's less relevant without direct AI interaction for file content
    if (!isMinimalMode) {
      fileInputRef.current.click();
    } else {
      // In minimal mode, just show a toast or log that file input is not active
      console.log("File input is not active in minimal mode.");
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("Selected file:", files[0].name);
      // You can add further logic here to handle the selected file,
      // e.g., display its name, or process its content without an AI API.
      setChatHistory((prevHistory) => [...prevHistory, { role: "user", text: `File selected: ${files[0].name} (File handling is local, not sent to AI)` }]);
    }
  };

  // Determine font size class based on model name length
  const getModelFontSizeClass = (modelName) => {
    const length = modelName.length;
    if (length <= 14) { // Adjusted to fit "gemini-2.0-flash"
      return 'text-sm';
    } else if (length <= 20) {
      return 'text-xs';
    }
    return 'text-xs'; // Fallback for very long names
  };

  const modelFontSizeClass = getModelFontSizeClass(model); // Now uses the state `model`

  // Conditional minHeight for the textarea
  const textareaMinHeight = isMinimalMode ? '64px' : '32px'; // Increased to 64px (h-16) when minimal

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary} ${isMinimalMode ? '' : 'relative'}`}> {/* Conditional relative positioning */}
      {!isMinimalMode && ( // Hide top buttons in minimal mode
        <div className="flex justify-end space-x-2 mb-2">
          <button
            onClick={handleClearChat}
            className={`${themeClasses.buttonSecondaryBg} ${themeClasses.buttonSecondaryHoverBg} ${themeClasses.textPrimary} w-8 h-8 p-0 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {!isMinimalMode && ( // Hide chat history in minimal mode
        <div className={`flex-1 overflow-y-auto pr-2 space-y-3 text-sm pb-[100px] ${themeClasses.textPrimary} hide-scrollbar-vertical`}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? themeClasses.accentBg + ' ' + themeClasses.accentText
                    : themeClasses.cardBg + ' ' + themeClasses.textPrimary
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`max-w-[70%] p-3 rounded-lg ${themeClasses.cardBg} ${themeClasses.textPrimary}`}>
                <div className="dot-flashing"></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input area container */}
      <div className={`
        ${isMinimalMode ? 'w-full' : 'absolute bottom-0 left-0 right-0'}
        py-4 px-4 ${themeClasses.appBg} flex flex-col items-center z-10
      `}>
        {/* New input area and buttons */}
        <div className="flex items-center w-full relative">
          {!isMinimalMode && ( // Hide Generate Ideas button in minimal mode
            <button
                onClick={handleGenerateIdeas}
                disabled={isLoading}
                className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mr-2`}
                title="Generate Ideas"
              >
                <Sparkles className="w-4 h-4 text-white" /> {/* Added text-white here */}
            </button>
          )}
          <textarea
            className={`flex-grow px-4 py-2 ${isMinimalMode ? 'rounded-[5px]' : 'rounded-full'} ${themeClasses.cardBg}/60 ${themeClasses.textPrimary} placeholder-${themeClasses.textTertiary.replace('text-', '')} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden text-base backdrop-blur-sm backdrop-brightness-75 border ${themeClasses.borderColor} text-left`}
            rows="1"
            placeholder="Type here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={handleKeyDown}
            style={{ minHeight: textareaMinHeight, maxHeight: '120px' }} // Apply conditional minHeight
          />
          {!isMinimalMode && ( // Hide Send button in minimal mode
            <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`${themeClasses.accentBg} ${themeClasses.accentText} w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-2`}
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
          )}
        </div>

        {/* Model selection dropdown and Canvas button, aligned below the input box */}
        <div className="flex justify-between items-center w-full mt-2">
          {/* Group for Plus and Canvas buttons */}
          <div className="flex items-center space-x-2">
            {/* Plus button for file input */}
            <button
              className={`flex items-center justify-center w-8 h-8 rounded-full ${themeClasses.cardBg}/60 ${themeClasses.textSecondary} ${themeClasses.buttonSecondaryHoverBg} transition-colors shadow-lg backdrop-blur-md backdrop-brightness-75 border ${themeClasses.borderColor}`}
              onClick={handlePlusClick}
              title="Attach File / Submit Prompt"
            >
              <Plus className="w-5 h-5" />
            </button>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {!isMinimalMode && ( // Hide Canvas button in minimal mode (it's already open)
              <button
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                           ${themeClasses.cardBg}/60 shadow-lg backdrop-blur-md backdrop-brightness-75 border ${themeClasses.borderColor}`}
                title="Canvas"
                onClick={() => onOpenCodingCanvas(message)}
              >
                <GradientLayoutDashboardIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={`${themeClasses.buttonSecondaryBg} ${themeClasses.textPrimary} rounded-full pl-2 pr-6 py-0.5 ${modelFontSizeClass} appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
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
      {/* CSS for loading animation */}
      <style>{`
        /* Hide Vertical scrollbar for chat history */
        .hide-scrollbar-vertical::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar-vertical {
          scrollbar-width: none; /* Firefox */
        }


        /* Hide Horizontal scrollbar for suggested prompts while keeping scroll functionality */
        .hide-scrollbar-horizontal::-webkit-scrollbar {
          display: none;
        }

        /* For Firefox */
        .hide-scrollbar-horizontal {
          scrollbar-width: none; /* Firefox */
        }


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

// The main application component
const App = () => {
  // State to track the currently active menu item in the sidebar
  const [activeSidebarItem, setActiveSidebarItem] = useState('workspace'); // Changed default to 'workspace'
  const [toasts, setToasts] = useState([]); // State for managing toast notifications
  const nextToastId = useRef(0);
  const [theme, setTheme] = useState('night'); // State for current theme
  const [isCodingCanvasOpen, setIsCodingCanvasOpen] = useState(false); // New state for coding canvas
  const [codePromptForCanvas, setCodePromptForCanvas] = useState(''); // New state to pass prompt to canvas

  const themeClasses = getThemeClasses(theme);


  // Handler for sidebar item clicks
  const handleSidebarItemClick = (id) => {
    setActiveSidebarItem(id);
    setIsCodingCanvasOpen(false); // Close coding canvas if another main tab is clicked
    setCodePromptForCanvas(''); // Clear prompt when switching tabs
  };

  const handleOpenCodingCanvas = useCallback((prompt) => {
    setCodePromptForCanvas(prompt); // Set the prompt from the chatbot
    setIsCodingCanvasOpen(true);
    // When opening the canvas, we generally want to stay on the current content area, not navigate away.
    // So, no change to activeSidebarItem here.
  }, []);

  const handleCloseCodingCanvas = useCallback(() => {
    setIsCodingCanvasOpen(false);
    setCodePromptForCanvas(''); // Clear prompt when canvas is closed
    // No need to set activeSidebarItem back to workspace explicitly, it should stay whatever it was.
  }, []);


  const addToast = useCallback(({ message, type = 'info' }) => {
    const id = nextToastId.current++;
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

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
       `}</style>
       {/* Sidebar component */}
       <AISidebar activeItem={activeSidebarItem} onSidebarItemClick={handleSidebarItemClick} themeClasses={themeClasses} />

       {/* Main content area wrapper - This div will manage the layout of the main UI and the sliding canvas */}
       <div className="flex flex-grow relative overflow-hidden">
         {/* Left Section (30%) - Always shows something */}
         <div
           className={`flex flex-col h-full transition-all duration-300 ease-out flex-shrink-0`}
           style={{
             flexBasis: isCodingCanvasOpen ? '30%' : '100%',
             maxWidth: isCodingCanvasOpen ? '30%' : '100%',
           }}
         >
           <main className={`flex-grow p-4 ${themeClasses.textPrimary} flex flex-col overflow-y-auto`}>
             {isCodingCanvasOpen ? (
               // In minimal mode, only display the stripped-down ChatbotInterface
               <div className="h-full flex flex-col justify-end pt-100"> {/* Pushes the input to the bottom */}
                 <ChatbotInterface
                   themeClasses={themeClasses}
                   onOpenCodingCanvas={handleOpenCodingCanvas}
                   isMinimalMode={true}
                 />
               </div>
             ) : (
               // In normal mode, display the active section content
               <>
                 {activeSidebarItem === 'funding' ? (
                   <FundingSection themeClasses={themeClasses} />
                 ) : activeSidebarItem === 'resources' ? (
                   <ResourcesSection themeClasses={themeClasses} />
                 ) : activeSidebarItem === 'community' ? (
                   <CommunitySection themeClasses={themeClasses} />
                 ) : activeSidebarItem === 'workspace' ? (
                   <WorkspaceSection themeClasses={themeClasses} onOpenCodingCanvas={handleOpenCodingCanvas} />
                 ) : activeSidebarItem === 'tools' ? (
                   <ToolsSection addToast={addToast} themeClasses={themeClasses} />
                 ) : activeSidebarItem === 'settings' ? (
                   <SettingsSection themeClasses={themeClasses} theme={theme} setTheme={setTheme} />
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full">
                     <h2 className={`text-xl ${themeClasses.textPrimary}`}>Select an option from the sidebar.</h2>
                   </div>
                 )}
               </>
             )}
           </main>
         </div>

         {/* Coding Canvas Panel (70%) */}
         <div
           className={`absolute top-0 right-0 h-full w-[70%] ${themeClasses.cardBg} shadow-lg z-20 transform transition-transform duration-300 ease-out`}
           style={{
             transform: isCodingCanvasOpen ? 'translateX(0)' : 'translateX(100%)',
           }}
         >
           {isCodingCanvasOpen && <CodingCanvasSection themeClasses={themeClasses} onClose={handleCloseCodingCanvas} initialCodePrompt={codePromptForCanvas} />}
         </div>
       </div>

       {/* Toast Notifications Container */}
       <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
         {toasts.map((toast) => (
           <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
         ))}
       </div>
    </div>
  )
}
export default App;
