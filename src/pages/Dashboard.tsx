import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { 
  AreaChart, 
  BarChart, 
  Menu, 
  LogOut, 
  X,
  Bell,
  Home, 
  Settings, 
  BarChart3,
  MessageSquarePlus,
  Type,
  FileText,
  Hash,
  Lightbulb,
  User,
  ScrollText
} from 'lucide-react';
import { cn } from '../lib/utils';
import SidebarNav from '../components/dashboard/SidebarNav';
import DashboardFeatures from '../components/dashboard/DashboardFeatures';
import { Area, AreaChart as RechartsArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

// Mock data for charts
const performanceData = [
  { name: 'Mon', views: 1000, engagement: 800 },
  { name: 'Tue', views: 1500, engagement: 1300 },
  { name: 'Wed', views: 2000, engagement: 1700 },
  { name: 'Thu', views: 1800, engagement: 1600 },
  { name: 'Fri', views: 2500, engagement: 2300 },
  { name: 'Sat', views: 3000, engagement: 2800 },
  { name: 'Sun', views: 3500, engagement: 3200 },
];

const recentVideos = [
  { id: 1, title: "How to Master React Hooks in 10 Minutes", views: 12500, engagement: "85%", date: "2 days ago" },
  { id: 2, title: "Ultimate Guide to TypeScript Interfaces", views: 8750, engagement: "78%", date: "4 days ago" },
  { id: 3, title: "Building a Personal Portfolio with Next.js", views: 6320, engagement: "72%", date: "1 week ago" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userSubscription, setUserSubscription] = useState('Pro Plan');
  
  // Usage statistics for workspace
  const [usageStats, setUsageStats] = useState({
    titlesGenerated: 24,
    descriptionsCreated: 18,
    thumbnailsCreated: 15,
    hashtagsGenerated: 32,
    ideasCreated: 27,
    shortsCreated: 8,
    blogsConverted: 6,
    keywordsResearched: 14
  });

  // Move NAV_ITEMS inside component to access user
  const NAV_ITEMS = [
    { 
      id: 'dashboard',
      title: 'Overview',
      icon: Home,
      description: 'Dashboard overview',
    },
    { 
      id: 'video-titles',
      title: 'Title Generator',
      icon: Type,
      description: 'Generate video titles',
    },
    {
      id: 'video-descriptions',
      title: 'Description Generator',
      icon: FileText,
      description: 'Generate video descriptions',
    },
    {
      id: 'hashtags',
      title: 'Hashtag Generator',
      icon: Hash,
      description: 'Generate hashtags',
    },
    {
      id: 'video-ideas',
      title: 'Video Ideas',
      icon: Lightbulb,
      description: 'Generate video ideas',
    },
    {
      id: 'video-scripts',
      title: 'Script Generator',
      icon: ScrollText,
      description: 'Generate video scripts',
    },
    {
      id: 'tweet-generator',
      title: 'Tweet Generator',
      icon: MessageSquarePlus, // Using an appropriate icon from lucide-react
      description: 'Generate tweets',
    },
    {
      id: 'youtube-community-post-generator',
      title: 'YouTube Community Post Generator',
      icon: MessageSquarePlus, // Using an appropriate icon from lucide-react
      description: 'Generate YouTube community posts',
    },
    {
      id: 'reddit-post-generator',
      title: 'Reddit Post Generator',
      icon: MessageSquarePlus, // Using an appropriate icon from lucide-react
      description: 'Generate Reddit posts',
    },
    {
      id: 'linkedin-post-generator',
      title: 'LinkedIn Post Generator',
      icon: MessageSquarePlus, // Using an appropriate icon from lucide-react
      description: 'Generate LinkedIn posts',
    },
    {
      id: 'spacer',
      isSpacer: true,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      description: 'Manage settings',
    },
    {
      id: 'profile',
      title: user?.email || 'User Profile',
      icon: User,
      description: 'User profile and subscription',
      showPopup: true,
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [navigate, user]);

  const handleNavigation = (itemId: string, subItemId?: string) => {
    console.log('Navigation triggered:', { itemId, subItemId });
    if (itemId === 'profile') {
      handleProfileClick();
      return;
    }
    setActiveItem(itemId);
    setActiveSubItem(subItemId || '');
    setShowProfilePopup(false);
    console.log('New active item:', itemId);
  };

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleLogout = () => {
    supabase.auth.signOut().then(() => {
      localStorage.removeItem('clipvobe-user');
      navigate('/auth');
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleExpandItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-clipvobe-dark">
      {console.log('Current active item:', activeItem)}
      <div className="relative">
        <SidebarNav 
          items={NAV_ITEMS}
          activeItem={activeItem}
          activeSubItem={activeSubItem}
          expandedItems={expandedItems}
          sidebarOpen={sidebarOpen}
          handleNavigation={handleNavigation}
          toggleExpandItem={toggleExpandItem}
          onProfileClick={handleProfileClick}
        />
        
        {showProfilePopup && (
          <div className="absolute bottom-4 left-4 right-4 z-50 rounded-lg bg-clipvobe-gray-800 shadow-lg p-4">
            <div className="space-y-4">
              <div className="border-b border-clipvobe-gray-700 pb-2">
                <p className="text-sm text-clipvobe-gray-400">Signed in as</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
              <div className="border-b border-clipvobe-gray-700 pb-2">
                <p className="text-sm text-clipvobe-gray-400">Current Plan</p>
                <p className="text-clipvobe-cyan font-medium">{userSubscription}</p>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-white hover:text-clipvobe-cyan"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-clipvobe-dark/80 backdrop-blur">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:text-clipvobe-cyan"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="ml-auto flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:text-clipvobe-cyan"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-clipvobe-cyan" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hover:text-clipvobe-cyan"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {console.log('Dashboard main rendering, activeItem:', activeItem)}
          {(() => {
            try {
              if (activeItem === 'dashboard') {
                return (
                  <div className="grid gap-6">
                    {/* Overview Section */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <BarChart className="h-8 w-8 text-clipvobe-cyan" />
                          <div>
                            <p className="text-sm text-clipvobe-gray-300">Total Views</p>
                            <h3 className="text-2xl font-bold text-white">48.5K</h3>
                          </div>
                        </div>
                      </div>
                      
                      <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <AreaChart className="h-8 w-8 text-clipvobe-cyan" />
                          <div>
                            <p className="text-sm text-clipvobe-gray-300">Engagement Rate</p>
                            <h3 className="text-2xl font-bold text-white">12.8%</h3>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <BarChart3 className="h-8 w-8 text-clipvobe-cyan" />
                          <div>
                            <p className="text-sm text-clipvobe-gray-300">Content Generated</p>
                            <h3 className="text-2xl font-bold text-white">{usageStats.titlesGenerated + usageStats.descriptionsCreated}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <Settings className="h-8 w-8 text-clipvobe-cyan" />
                          <div>
                            <p className="text-sm text-clipvobe-gray-300">AI Credits</p>
                            <h3 className="text-2xl font-bold text-white">2,450</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="text-lg font-semibold text-white mb-4">Performance Overview</h2>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsArea>
                            <XAxis dataKey="name" stroke="#737373" />
                            <YAxis stroke="#737373" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#262626',
                                border: '1px solid #404040',
                                borderRadius: '0.5rem',
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="views"
                              data={performanceData}
                              stroke="#00FFFF"
                              fill="url(#colorViews)"
                              strokeWidth={2}
                            />
                            <Area
                              type="monotone"
                              dataKey="engagement"
                              data={performanceData}
                              stroke="#00D1D1"
                              fill="url(#colorEngagement)"
                              strokeWidth={2}
                            />
                            <defs>
                              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00D1D1" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#00D1D1" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </RechartsArea>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Recent Videos */}
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="text-lg font-semibold text-white mb-4">Recent Videos</h2>
                      <div className="space-y-4">
                        {recentVideos.map((video) => (
                          <div
                            key={video.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-clipvobe-gray-800/50 hover:bg-clipvobe-gray-800 transition-colors"
                          >
                            <div>
                              <h3 className="font-medium text-white">{video.title}</h3>
                              <p className="text-sm text-clipvobe-gray-300">{video.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white">{video.views.toLocaleString()} views</p>
                              <p className="text-sm text-clipvobe-cyan">{video.engagement} engagement</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              } else {
                console.log('Rendering DashboardFeatures with:', { activeItem, activeSubItem });
                return (
                  <DashboardFeatures
                    activeItem={activeItem}
                    activeSubItem={activeSubItem}
                    handleNavigation={handleNavigation}
                  />
                );
              }
            } catch (error) {
              console.error('Error in Dashboard main render:', error);
              return (
                <div className="text-red-500 p-4">
                  An error occurred while rendering the dashboard. Please check the console for details.
                </div>
              );
            }
          })()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
