'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Phone, 
  Mail, 
  Truck, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Download
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Lead {
  id: string;
  type: 'emergency' | 'appointment' | 'quote' | 'general';
  name: string;
  phone: string;
  email?: string;
  truckMake?: string;
  truckModel?: string;
  issue?: string;
  urgency?: 'emergency' | 'urgent' | 'routine';
  isFleet?: boolean;
  fleetSize?: string;
  timestamp: string;
  source: 'chatbot';
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'emergency' | 'appointment' | 'quote'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = localStorage.getItem('chatbot_leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
    setIsLoading(false);
  }, []);

  const filteredLeads = leads.filter(lead => 
    filter === 'all' || lead.type === filter
  );

  const exportLeads = () => {
    const csvContent = [
      ['Name', 'Phone', 'Email', 'Type', 'Urgency', 'Truck', 'Issue', 'Timestamp'].join(','),
      ...filteredLeads.map(lead => [
        lead.name,
        lead.phone,
        lead.email || '',
        lead.type,
        lead.urgency || '',
        `${lead.truckMake || ''} ${lead.truckModel || ''}`.trim(),
        lead.issue || '',
        new Date(lead.timestamp).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'urgent': return 'text-orange-600 bg-orange-100';
      case 'routine': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      case 'appointment': return <Clock className="h-4 w-4" />;
      case 'quote': return <FileText className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chatbot Leads</h1>
            <p className="text-gray-600">Manage leads captured from your website chatbot</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={exportLeads}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Total Leads</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-gray-600">Emergency</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => l.urgency === 'emergency').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Appointments</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => l.type === 'appointment').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Quotes</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => l.type === 'quote').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          {(['all', 'emergency', 'appointment', 'quote'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' ? 'All Leads' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No leads found</p>
              <p className="text-sm">Leads will appear here when customers use your chatbot</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500 flex items-center space-x-2">
                            <Phone className="h-3 w-3" />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                              <Mail className="h-3 w-3" />
                              <span>{lead.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(lead.type)}
                          <span className="text-sm text-gray-900 capitalize">{lead.type}</span>
                        </div>
                        {lead.urgency && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(lead.urgency)}`}>
                            {lead.urgency}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.truckMake ? (
                          <div className="flex items-center space-x-2">
                            <Truck className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {lead.truckMake} {lead.truckModel}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not specified</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {lead.issue || 'Not specified'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lead.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-primary hover:text-primary-dark"
                          >
                            Call
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-primary hover:text-primary-dark"
                            >
                              Email
                            </a>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
