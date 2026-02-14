import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { getCurrentUser } from '../services/authService';
import api from '../config/api';
import { Mail, Phone, Calendar, MessageSquare, CheckCircle, Clock, AlertCircle, Send, Trash2, ArrowLeft } from 'lucide-react';

const AdminContactsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/auth?redirect=/admin/contacts');
      return;
    }
    if (currentUser.role?.toLowerCase() !== 'admin') {
      navigate(`/dashboard/${currentUser.role?.toLowerCase()}`);
      return;
    }
    setUser(currentUser);
    fetchContacts();
  }, [navigate, filter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const queryParam = filter !== 'all' ? `?status=${filter}` : '';
      const response = await api.get(`/contacts${queryParam}`);
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (contactId) => {
    if (!responseText.trim()) {
      setMessage({ type: 'error', text: 'Please enter a response' });
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });
      
      const response = await api.patch(`/contacts/${contactId}/respond`, {
        adminResponse: responseText,
        status: 'resolved'
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Response sent successfully!' });
        setResponseText('');
        setSelectedContact(null);
        fetchContacts();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to send response' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await api.patch(`/contacts/${contactId}/status`, {
        status: newStatus
      });

      if (response.data.success) {
        fetchContacts();
        setMessage({ type: 'success', text: 'Status updated successfully!' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update status' 
      });
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await api.delete(`/contacts/${contactId}`);
      if (response.data.success) {
        fetchContacts();
        setSelectedContact(null);
        setMessage({ type: 'success', text: 'Contact deleted successfully!' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to delete contact' 
      });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      'in-progress': <AlertCircle className="w-4 h-4" />,
      resolved: <CheckCircle className="w-4 h-4" />
    };
    return icons[status] || icons.pending;
  };

  const getTopicLabel = (topic) => {
    const labels = {
      booking: '📅 Booking Help',
      services: '🛠️ Services Inquiry',
      partnership: '🤝 Partnership',
      support: '💬 Support'
    };
    return labels[topic] || topic;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard/admin')}
              className="text-gray-600 hover:text-gray-900 font-semibold mb-4 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Queries</h1>
            <p className="text-gray-600">Manage and respond to customer inquiries</p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-6">
            {['all', 'pending', 'in-progress', 'resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  filter === status
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                {status !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                    {contacts.filter(c => c.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No contact queries found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contacts List */}
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    onClick={() => setSelectedContact(contact)}
                    className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition hover:shadow-xl ${
                      selectedContact?._id === contact._id ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        {contact.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-500">
                        {getTopicLabel(contact.topic)}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact Detail */}
              {selectedContact && (
                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24 h-fit">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Query Details</h2>
                    <button
                      onClick={() => handleDelete(selectedContact._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        From
                      </label>
                      <p className="text-gray-900 font-semibold">
                        {selectedContact.firstName} {selectedContact.lastName}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">{selectedContact.email}</p>
                    </div>

                    {selectedContact.phone && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                          Phone
                        </label>
                        <p className="text-gray-900">{selectedContact.phone}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Topic
                      </label>
                      <p className="text-gray-900">{getTopicLabel(selectedContact.topic)}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Status
                      </label>
                      <select
                        value={selectedContact.status}
                        onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Message
                      </label>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-900">{selectedContact.message}</p>
                      </div>
                    </div>

                    {selectedContact.adminResponse && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                          Your Response
                        </label>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-gray-900">{selectedContact.adminResponse}</p>
                          {selectedContact.respondedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              Responded on {new Date(selectedContact.respondedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Response Form */}
                  {!selectedContact.adminResponse && (
                    <div className="border-t pt-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Send Response
                      </label>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Type your response here..."
                      />
                      <button
                        onClick={() => handleRespond(selectedContact._id)}
                        disabled={submitting || !responseText.trim()}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Sending...' : 'Send Response'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminContactsPage;
