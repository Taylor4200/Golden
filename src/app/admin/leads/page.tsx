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
  Download,
  Trash2,
  MapPin,
  Building,
  User,
  Eye,
  EyeOff
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
  location?: string;
  urgency?: 'emergency' | 'urgent' | 'routine';
  isFleet?: boolean;
  fleetSize?: string;
  timestamp: string;
  source: 'chatbot';
  status?: 'new' | 'contacted' | 'helped' | 'closed';
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'emergency' | 'appointment' | 'quote' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = localStorage.getItem('chatbot_leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
    setIsLoading(false);
  }, []);

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') {
      return !lead.status || lead.status === 'new' || lead.status === 'contacted';
    } else if (filter === 'completed') {
      return lead.status === 'helped' || lead.status === 'closed';
    } else {
      return lead.type === filter && (!lead.status || lead.status === 'new' || lead.status === 'contacted');
    }
  });

  const updateLeadStatus = (leadId: string, status: 'new' | 'contacted' | 'helped' | 'closed') => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('chatbot_leads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(lead => lead.id !== leadId);
      setLeads(updatedLeads);
      localStorage.setItem('chatbot_leads', JSON.stringify(updatedLeads));
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Name', 'Phone', 'Email', 'Type', 'Urgency', 'Truck', 'Issue', 'Location', 'Fleet', 'Status', 'Timestamp'].join(','),
      ...filteredLeads.map(lead => [
        lead.name,
        lead.phone,
        lead.email || '',
        lead.type,
        lead.urgency || '',
        `${lead.truckMake || ''} ${lead.truckModel || ''}`.trim(),
        lead.issue || '',
        lead.location || '',
        lead.isFleet ? `${lead.fleetSize || 'Unknown'} fleet` : 'Individual',
        lead.status || 'new',
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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'contacted': return 'text-yellow-600 bg-yellow-100';
      case 'helped': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
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
              <span className="text-sm font-medium text-gray-600">Active Leads</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => !l.status || l.status === 'new' || l.status === 'contacted').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {leads.filter(l => l.status === 'helped' || l.status === 'closed').length} completed
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-gray-600">Emergency</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => l.urgency === 'emergency' && (!l.status || l.status === 'new' || l.status === 'contacted')).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {leads.filter(l => l.urgency === 'emergency' && (l.status === 'helped' || l.status === 'closed')).length} resolved
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Appointments</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => l.type === 'appointment' && (!l.status || l.status === 'new' || l.status === 'contacted')).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {leads.filter(l => l.type === 'appointment' && (l.status === 'helped' || l.status === 'closed')).length} completed
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Quotes</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leads.filter(l => l.type === 'quote' && (!l.status || l.status === 'new' || l.status === 'contacted')).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {leads.filter(l => l.type === 'quote' && (l.status === 'helped' || l.status === 'closed')).length} completed
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          {(['all', 'emergency', 'appointment', 'quote', 'completed'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' ? 'Active Leads' : 
               filterType === 'completed' ? 'Completed' :
               filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Users className="h-16 w-16 mx-auto mb-6 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
              <p className="text-sm">Leads will appear here when customers use your chatbot</p>
            </div>
          ) : (
            <div className="space-y-4 p-6">
              {filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  {/* Lead Header */}
                  <div className="p-6 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(lead.type)}
                          <span className="text-lg font-semibold text-gray-900 capitalize">{lead.type}</span>
                        </div>
                        {lead.urgency && (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(lead.urgency)}`}>
                            {lead.urgency}
                          </span>
                        )}
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status || 'new'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">
                          {new Date(lead.timestamp).toLocaleString()}
                        </span>
                        <button
                          onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                        >
                          {expandedLead === lead.id ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lead Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Contact Info</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a href={`tel:${lead.phone}`} className="text-sm text-primary hover:text-primary-dark">
                              {lead.phone}
                            </a>
                          </div>
                          {lead.email && (
                            <div className="flex items-center space-x-3">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:text-primary-dark">
                                {lead.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Vehicle Information */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Vehicle</h4>
                        <div className="space-y-2">
                          {lead.truckMake ? (
                            <div className="flex items-center space-x-3">
                              <Truck className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {lead.truckMake} {lead.truckModel}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Not specified</span>
                          )}
                          {lead.isFleet && (
                            <div className="flex items-center space-x-3">
                              <Building className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                Fleet: {lead.fleetSize || 'Unknown size'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Issue & Location */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Details</h4>
                        <div className="space-y-2">
                          {lead.issue && (
                            <div>
                              <span className="text-xs font-medium text-gray-500">Issue:</span>
                              <p className="text-sm text-gray-900 mt-1">{lead.issue}</p>
                            </div>
                          )}
                          {lead.location && (
                            <div className="flex items-start space-x-3">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium text-gray-500">Location:</span>
                                <p className="text-sm text-gray-900 mt-1">{lead.location}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'contacted')}
                            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl text-sm font-medium hover:bg-yellow-200 transition-colors"
                          >
                            Mark Contacted
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'helped')}
                            className="px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors"
                          >
                            Mark Helped
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'closed')}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            Close Lead
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <a
                            href={`tel:${lead.phone}`}
                            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Call</span>
                          </a>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="px-4 py-2 bg-red-100 text-red-800 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors flex items-center space-x-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
