
import React from 'react';
import { Area, AreaChart as RechartsArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '../ui/button';
import { 
  Video, 
  AreaChart, 
  Gauge, 
  Grid3X3, 
  Plus, 
  Lightbulb, 
  FileText, 
  FileImage, 
  BarChart
} from 'lucide-react';

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

interface DashboardOverviewProps {
  handleNavigation: (itemId: string, subItemId?: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ handleNavigation }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <Button className="mt-2 sm:mt-0" size="sm">
          <Plus className="mr-1" size={16} />
          New Video
        </Button>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-400 text-sm">Total Videos</p>
              <h3 className="text-2xl font-bold text-white">24</h3>
            </div>
            <Video className="text-clipvobe-cyan" size={22} />
          </div>
          <div className="flex items-center text-green-400 text-xs">
            <span>↑ 12% from last month</span>
          </div>
        </div>
        
        <div className="glass-card p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <h3 className="text-2xl font-bold text-white">142.5K</h3>
            </div>
            <AreaChart className="text-clipvobe-cyan" size={22} />
          </div>
          <div className="flex items-center text-green-400 text-xs">
            <span>↑ 8.3% from last month</span>
          </div>
        </div>
        
        <div className="glass-card p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-400 text-sm">Average SEO Score</p>
              <h3 className="text-2xl font-bold text-white">86/100</h3>
            </div>
            <Gauge className="text-clipvobe-cyan" size={22} />
          </div>
          <div className="flex items-center text-green-400 text-xs">
            <span>↑ 6% from last month</span>
          </div>
        </div>
        
        <div className="glass-card p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-400 text-sm">Top Hashtags</p>
              <h3 className="text-2xl font-bold text-white">58 Used</h3>
            </div>
            <Grid3X3 className="text-clipvobe-cyan" size={22} />
          </div>
          <div className="flex items-center text-green-400 text-xs">
            <span>↑ 15% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="glass-card p-5 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">Performance Overview</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-xs">7 Days</Button>
            <Button variant="ghost" size="sm" className="text-xs bg-gray-800">30 Days</Button>
            <Button variant="ghost" size="sm" className="text-xs">90 Days</Button>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsArea
              data={performanceData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#737373" tick={{ fill: '#A3A3A3' }} />
              <YAxis stroke="#737373" tick={{ fill: '#A3A3A3' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#262626',
                  borderColor: '#404040',
                  color: '#FFFFFF'
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#00FFFF"
                fillOpacity={1}
                fill="url(#colorViews)"
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#A855F7"
                fillOpacity={1}
                fill="url(#colorEngagement)"
              />
            </RechartsArea>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Videos and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Videos */}
        <div className="lg:col-span-2 glass-card p-5 rounded-xl">
          <h3 className="font-semibold text-white mb-4">Recent Videos</h3>
          <div className="space-y-3">
            {recentVideos.map(video => (
              <div key={video.id} className="p-3 bg-gray-800/50 rounded-lg flex justify-between items-center hover:bg-gray-800 transition-colors">
                <div className="overflow-hidden">
                  <p className="text-white font-medium truncate">{video.title}</p>
                  <div className="flex space-x-4 text-xs text-gray-400 mt-1">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.engagement} engagement</span>
                    <span>{video.date}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm">
              View All Videos
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="glass-card p-5 rounded-xl">
          <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start py-6 bg-gradient-to-r from-clipvobe-cyan to-purple-600 hover:opacity-90"
              onClick={() => handleNavigation('upload')}
            >
              <Plus className="mr-2" size={18} />
              New Video
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start py-6"
              onClick={() => handleNavigation('generate', 'video-titles')}
            >
              <FileText className="mr-2" size={18} />
              Generate Video Title
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start py-6"
              onClick={() => handleNavigation('thumbnails')}
            >
              <FileImage className="mr-2" size={18} />
              Create Thumbnail
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start py-6"
              onClick={() => handleNavigation('seo-insights')}
            >
              <BarChart className="mr-2" size={18} />
              SEO Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
