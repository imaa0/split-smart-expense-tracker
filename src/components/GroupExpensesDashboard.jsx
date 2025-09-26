import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Calculator,
  Bell,
  Plus,
  Plane,
  Hotel,
  Utensils,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Loader2
} from 'lucide-react';

import { useAuth } from '../contexts/useAuth';

export default function GroupExpensesDashboard() {
  const { id: groupId } = useParams();
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('expenses');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGroupData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load group data');
      } finally {
        setLoading(false);
      }
    };

    if (groupId && token) {
      fetchGroupData();
    }
  }, [groupId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading group...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Group not found</p>
        </div>
      </div>
    );
  }

  const { group, members, expenses } = groupData;

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleAddExpense = () => {
    setShowAddExpenseModal(true);
  };

  const getIconColor = (category) => {
    const colors = {
      travel: 'text-blue-600 bg-blue-50',
      accommodation: 'text-green-600 bg-green-50',
      food: 'text-orange-600 bg-orange-50',
      entertainment: 'text-purple-600 bg-purple-50'
    };
    return colors[category] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SplitSmart</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">
                Groups
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Reports
              </a>
            </nav>
            
            {/* User Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">👩🏻‍💼</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Group Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>
              <p className="text-gray-600 mb-4">{group.description || 'No description provided.'}</p>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Members ({members.length})</h3>
                <div className="flex items-center space-x-2">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:scale-105 transition-transform cursor-pointer"
                      title={member.name}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {group.is_admin && (
                    <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                group.is_admin
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {group.is_admin ? 'You are Admin' : 'Member'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-2xl shadow-sm border">
          {/* Tab Navigation */}
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'expenses', label: 'Expenses' },
                { id: 'balances', label: 'Balances' },
                { id: 'activity', label: 'Activity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'expenses' && (
              <div>
                {/* Section Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">All Expenses</h2>
                  <button
                    onClick={handleAddExpense}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Expense</span>
                  </button>
                </div>

                {/* Expenses List */}
                <div className="space-y-4">
                  {expenses.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses yet</h3>
                      <p className="text-gray-600">Add your first expense to get started.</p>
                    </div>
                  ) : (
                    expenses.map((expense) => {
                      const IconComponent = expense.icon;
                      return (
                        <div
                          key={expense.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(expense.category)}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{expense.title}</h3>
                              <p className="text-sm text-gray-600">
                                Paid by {expense.paidBy} on {expense.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-gray-900">
                              ${expense.amount.toFixed(2)}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-900 font-medium">Total Expenses</span>
                    <span className="text-2xl font-bold text-blue-900">
                      ${totalExpenses.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'balances' && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Balances</h3>
                <p className="text-gray-600">View who owes whom and settle up expenses.</p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Feed</h3>
                <p className="text-gray-600">Track all group activities and expense updates.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Expense</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Expense description"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select who paid</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddExpenseModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAddExpenseModal(false);
                    // Add expense logic here
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}