import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Plus,
  Receipt,
  BarChart3,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Utensils,
  Ticket,
  UserPlus,
  Menu,
  X
} from 'lucide-react'

import CreateGroupModal from './CreateGroupModal'

const ManagerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    {
      title: "Total Groups",
      value: "5",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "You Owe",
      value: "$150.75",
      icon: ArrowUpRight,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "You Are Owed",
      value: "$200.50",
      icon: ArrowDownRight,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Net Balance",
      value: "$49.75",
      icon: Receipt,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ]

  const groups = [
    {
      id: 1,
      name: "Family Trip",
      description: "Vacation expenses with family",
      members: 4,
      balance: 50.00,
      status: "owed",
      progress: 75
    },
    {
      id: 2,
      name: "Office Lunch",
      description: "Weekly team lunches",
      members: 3,
      balance: 25.50,
      status: "owe",
      progress: 30
    },
    {
      id: 3,
      name: "Weekend Getaway",
      description: "Friends weekend trip",
      members: 5,
      balance: 0,
      status: "settled",
      progress: 100
    }
  ]

  const [showModal, setShowModal] = useState(false)
  const [editGroup, setEditGroup] = useState(null)

  const activities = [
    {
      icon: ShoppingCart,
      title: "Sarah paid for groceries",
      time: "Today, 2:45 PM",
      amount: -15.00,
      status: "owe",
      color: "text-green-600"
    },
    {
      icon: Utensils,
      title: "You paid for dinner",
      time: "Yesterday, 8:10 PM",
      amount: 22.50,
      status: "owed",
      color: "text-blue-600"
    },
    {
      icon: Ticket,
      title: "Emily paid for movie tickets",
      time: "May 15, 6:30 PM",
      amount: -8.25,
      status: "owe",
      color: "text-yellow-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">SplitSmart</span>
              </div>

              {/* Main Navigation */}
              <div className="hidden md:flex items-center space-x-8 ml-10">
                <a href="#" className="text-blue-600 font-medium">Dashboard</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Groups</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Reports</a>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&facepad=2&bg=white"
                  alt="Jane Doe"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Jane Doe (Manager)</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`bg-white h-screen shadow-sm transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              {sidebarOpen && <span className="text-lg font-semibold text-gray-800">Menu</span>}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg font-medium">
                <LayoutDashboard className="h-5 w-5" />
                {sidebarOpen && <span>Dashboard</span>}
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
                <Users className="h-5 w-5" />
                {sidebarOpen && <span>My Groups</span>}
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
                <Plus className="h-5 w-5" />
                {sidebarOpen && <span>Add Expense</span>}
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
                <Receipt className="h-5 w-5" />
                {sidebarOpen && <span>Settlements</span>}
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
                <BarChart3 className="h-5 w-5" />
                {sidebarOpen && <span>Reports</span>}
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Manager Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Groups Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Groups Overview</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      console.log('Create Group button clicked');
                      setEditGroup(null);
                      setShowModal(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Group</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                    <UserPlus className="h-4 w-4" />
                    <span>Join Group</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {groups.map((group) => (
                  <div key={group.id} className="border border-gray-200 rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <span className="text-sm text-gray-500">{group.members} members</span>
                    </div>
                    {group.description && (
                      <p className="text-sm text-gray-600 mb-3 italic">{group.description}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-3">Your balance:</p>
                    {group.status === 'owed' && (
                      <p className="text-green-600 font-semibold">You are owed ${group.balance.toFixed(2)}</p>
                    )}
                    {group.status === 'owe' && (
                      <p className="text-red-600 font-semibold">You owe ${group.balance.toFixed(2)}</p>
                    )}
                    {group.status === 'settled' && (
                      <p className="text-yellow-600 font-semibold">Settled up</p>
                    )}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            group.status === 'owed' ? 'bg-green-500' :
                            group.status === 'owe' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${group.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditGroup(group);
                        setShowModal(true);
                      }}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      title="Edit Group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${activity.status === 'owed' ? 'bg-blue-50' : activity.status === 'owe' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${activity.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.status === 'owed' ? 'You are owed' : 'You owe'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CreateGroupModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditGroup(null);
            }}
            onSave={(data) => {
              console.log('Group created:', data);
              // Don't close; modal switches to edit mode internally
              // Optionally refresh groups list here (mock for now)
            }}
            editGroup={editGroup}
            onUpdate={(updatedGroup) => {
              console.log('Group updated:', updatedGroup);
              // Optionally refresh groups list
              setShowModal(false);
              setEditGroup(null);
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">About</a>
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            © 2024 SplitSmart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ManagerDashboard
