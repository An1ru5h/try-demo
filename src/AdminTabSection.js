import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Blocks, HardDrive, BrainCircuit, BellRing, Cloud, Users, GitBranch, Shield, Play, BarChart2, MessageSquare, CheckCircle, XCircle, UserCog } from 'lucide-react';

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
const IntegrationsSection = ({ themeClasses, addToast }) => {
  // Initialize integrations as an empty array, data will be fetched from API
  const [integrations, setIntegrations] = useState([]);

  const getIcon = (id) => {
    return {
      salesforce: 'Blocks',
      github: 'GitBranch',
      okta: 'Shield',
      jira: 'Play',
      google_analytics: 'BarChart2',
      slack: 'MessageSquare',
    }[id] || 'Blocks';
  };

  // useEffect to fetch integrations data from the backend API
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/integrations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const enriched = data.map(int => ({
          ...int,
          icon: getIcon(int.id), // optional helper
          action: int.status === 'Connected' || int.status === 'Configured' ? int.status : 'Connect'
        }));
        setIntegrations(enriched);
      } catch (error) {
        console.error("Failed to fetch integrations:", error);
        addToast({ message: `Failed to load integrations: ${error.message}`, type: 'error' });
      }
    };

    fetchIntegrations();
  }, [addToast]); // Add addToast to dependency array if it's stable or memoized

  const handleConnect = (integrationId, currentStatus) => {
    if (currentStatus === 'Connected' || currentStatus === 'Configured') {
      addToast({ message: 'Integration is already connected or configured.', type: 'warning' });
      return;
    }

    fetch(`http://localhost:5000/api/integrations/connect/${integrationId}`, {
      method: 'POST'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setIntegrations(prev =>
          prev.map(int =>
            int.id === integrationId
              ? { ...int, status: 'Connected', action: 'Connected' }
              : int
          )
        );
        addToast({ message: `${integrationId} connected successfully!`, type: 'success' });
      })
      .catch(error => {
        console.error("Failed to connect integration:", error);
        addToast({ message: `Failed to connect ${integrationId}: ${error.message}`, type: 'error' });
      });
  };

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
      <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>Integrations</h2>
      <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
        Seamlessly integrate with your existing enterprise tools to streamline workflows and data synchronization.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.length > 0 ? (
          integrations.map((integration) => (
            <div key={integration.id} className={`${themeClasses.cardBg} rounded-lg p-4 shadow-md flex items-center justify-between`}>
              <div className="flex items-center">
                {React.createElement(
                  {
                    Blocks: Blocks,
                    GitBranch: GitBranch,
                    Shield: Shield,
                    Play: Play,
                    BarChart2: BarChart2,
                    MessageSquare: MessageSquare,
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
          ))
        ) : (
          <p className={`${themeClasses.textTertiary} text-center py-4 text-sm col-span-full`}>Loading integrations or no integrations found.</p>
        )}
      </div>
    </div>
  );
};

// AuditLogsSection Component (formerly AuditLogsSubSection)
const AuditLogsSection = ({ themeClasses }) => {
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/audit-logs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAuditLogs(data);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
        // You might want to add a toast or error message here as well
      }
    };

    fetchAuditLogs();
  }, []); // Empty dependency array means this runs once on mount

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
            {auditLogs.length > 0 ? (
              auditLogs.map((log, index) => (
                <tr key={index}>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.timestamp}</td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.user}</td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.action}</td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${themeClasses.textSecondary}`}>{log.status}</td>
                  <td className={`px-4 py-2 text-sm ${themeClasses.textTertiary}`}>{log.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={`${themeClasses.textTertiary} text-center py-4 text-sm`}>Loading audit logs or no logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// AIModelManagementSection Component (formerly AIModelManagementSubSection)
const AIModelManagementSection = ({ themeClasses, addToast }) => {
  const [models, setModels] = useState([]); // Initialize models as an empty array

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ai-models');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch AI models:", error);
        addToast({ message: `Failed to load AI models: ${error.message}`, type: 'error' });
      }
    };

    fetchModels();
  }, [addToast]); // Add addToast to dependency array

  const handleDeploy = (modelName) => {
    addToast({ message: `Simulating deployment of ${modelName}`, type: 'info' });

    fetch('http://localhost:5000/api/ai-models/deploy', {
      method: 'POST',
      body: JSON.stringify({ modelName }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        addToast({ message: `${modelName} deployed successfully!`, type: 'success' });
        // Optionally, re-fetch models to update the list with new status/deployment time
        // fetchModels(); // If you want to update the UI after deployment
      })
      .catch(error => {
        console.error("Failed to deploy model:", error);
        addToast({ message: `Failed to deploy ${modelName}: ${error.message}`, type: 'error' });
      });
  };

  return (
    <div className={`flex flex-col h-full rounded-lg ${themeClasses.textSecondary}`}>
      <h2 className={`text-2xl font-bold capitalize ${themeClasses.textPrimary} mb-4`}>AI Model Management</h2>
      <p className={`${themeClasses.textTertiary} text-sm mb-6`}>
        Manage your deployed AI models, monitor their status, and initiate new deployments.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.length > 0 ? (
          models.map((model, index) => (
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
          ))
        ) : (
          <p className={`${themeClasses.textTertiary} text-center py-4 text-sm col-span-full`}>Loading AI models or no models found.</p>
        )}
      </div>
    </div>
  );
};

// NotificationsSection Component (formerly NotificationsSubSection)
const NotificationsSection = ({ themeClasses, addToast }) => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmailEnabled(data.email);
        setSlackEnabled(data.slack);
        setInAppEnabled(data.inApp);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        addToast({ message: `Failed to load notification settings: ${error.message}`, type: 'error' });
      }
    };
    fetchNotifications();
  }, [addToast]);

  const handleToggle = (settingName, currentState, setter) => {
    setter(!currentState); // Optimistic UI update
    fetch('http://localhost:5000/api/notifications/update', {
      method: 'POST',
      body: JSON.stringify({ setting: settingName.toLowerCase(), value: !currentState }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (!res.ok) {
        // If the update fails on the backend, revert the UI state
        setter(currentState);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      addToast({ message: `${settingName} notifications ${!currentState ? 'enabled' : 'disabled'}!`, type: 'info' });
    })
    .catch(error => {
      console.error(`Failed to update ${settingName} notification:`, error);
      addToast({ message: `Failed to update ${settingName} notifications: ${error.message}`, type: 'error' });
      // Revert state if fetch fails
      setter(currentState);
    });
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

// AdminTabSection Component: New component to house all admin-related sub-sections
const AdminTabSection = ({ themeClasses, addToast }) => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('admin-overview');

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

export default AdminTabSection;
