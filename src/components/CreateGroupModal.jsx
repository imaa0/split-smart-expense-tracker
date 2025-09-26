import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  FileText,
  Save,
  X,
  Loader2
} from 'lucide-react';

import { useAuth } from '../contexts/useAuth';

export default function CreateGroupModal({ isOpen, onClose, onSave, editGroup, onUpdate }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('create');
  const [localEditGroup, setLocalEditGroup] = useState(null);
  const { token } = useAuth();

  // Handle editGroup prop
  useEffect(() => {
    if (editGroup) {
      setMode('edit');
      setLocalEditGroup(editGroup);
      setFormData({
        groupName: editGroup.name || '',
        description: editGroup.description || ''
      });
    } else {
      setMode('create');
      setLocalEditGroup(null);
      setFormData({ groupName: '', description: '' });
    }
  }, [editGroup]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.groupName.trim()) {
      newErrors.groupName = 'Group name is required';
    } else if (formData.groupName.trim().length < 2) {
      newErrors.groupName = 'Group name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveGroup = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        let response;
        if (mode === 'create') {
          response = await axios.post('/api/groups', {
            name: formData.groupName,
            description: formData.description
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Navigate to the new group page
          const newGroup = response.data.group;
          navigate(`/group/${newGroup.id}`);
          // Call onSave if provided
          if (onSave) onSave(response.data);
        } else {
          // Edit mode
          response = await axios.put(`/api/groups/${localEditGroup.id}`, {
            name: formData.groupName,
            description: formData.description
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Call onUpdate if provided
          if (onUpdate) onUpdate(response.data.group);
          // Close after update
          onClose();
        }
      } catch (error) {
        const message = error.response?.data?.message || `Failed to ${mode} group`;
        alert(message);
      } finally {
        setIsLoading(false);
      }
      if (mode === 'create') {
        // Don't reset form in create, as we switch to edit
      } else {
        setFormData({ groupName: '', description: '' });
        setErrors({});
      }
    }
  };

  const handleCancel = () => {
    onClose();
    setFormData({ groupName: '', description: '' });
    setErrors({});
    setMode('create');
    setLocalEditGroup(null);
  };

  const title = mode === 'edit' ? 'Edit Group' : 'Create a New Group';
  const subtitle = mode === 'edit' ? 'Update group name and description.' : 'Organize your expenses and bills with friends, family, or colleagues.';
  const buttonText = mode === 'edit' ? 'Update Group' : 'Save Group';
  const loadingText = mode === 'edit' ? 'Updating...' : 'Creating...';

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        {/* Modal */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
          {/* Modal Header */}
          <div className="flex items-center justify-between pt-6 px-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-1">
                {subtitle}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Group Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="groupName"
                  placeholder="e.g., Trip to Paris"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.groupName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  }`}
                />
              </div>
              {errors.groupName && (
                <p className="mt-2 text-sm text-red-600">{errors.groupName}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="description"
                  placeholder="Optional: Add a short description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-300 transition-all resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGroup}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{loadingText}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{buttonText}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
