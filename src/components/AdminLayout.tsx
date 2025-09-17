'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench,
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User,
  Bell,
  Search,
  Plus,
  Users
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('admin_authenticated');
      const adminUser = localStorage.getItem('admin_user');
      
      if (authStatus === 'true' && adminUser) {
        setIsAuthenticated(true);
        setUser(adminUser);
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog Posts', href: '/admin/posts', icon: FileText },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Chatbot Leads', href: '/admin/leads', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <div className={`w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 fixed inset-y-0 left-0 z-50`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-8 border-b border-gray-100 bg-gradient-to-r from-primary to-primary-dark">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-white/80 text-sm">Golden Heavy Duty</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8">
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-6 py-4 text-base font-medium text-gray-700 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-300">
                  <item.icon className="h-6 w-6 text-gray-500 group-hover:text-primary transition-colors duration-300" />
                </div>
                <span className="ml-4 text-lg">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center">
              <User className="h-7 w-7 text-white" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-lg font-semibold text-gray-900">{user}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
          <div className="flex items-center justify-between h-20 px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your website content</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="pl-12 pr-4 py-3 w-80 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all duration-200 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Quick Add */}
              <Link
                href="/admin/posts/new"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>New Post</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50/50 to-white">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
