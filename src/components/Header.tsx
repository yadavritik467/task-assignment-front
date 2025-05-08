import { useAuth } from '@/context/AuthContext';
import { Bell, LogOut } from 'lucide-react'
import React, { useState } from 'react'

const Header = () => {
    // Sample notifications
  const notifications = [
    { id: 1, text: "John Doe assigned you a new task", time: "10 minutes ago" },
    { id: 2, text: "Task 'Design wireframes' is due soon", time: "1 hour ago" },
    { id: 3, text: "Jane Smith completed a task", time: "3 hours ago" },
  ];

   const{logout,user}= useAuth()

  
    const [showNotifications, setShowNotifications] = useState(false);
  return (
    <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-3 hover:bg-gray-50 border-b border-gray-100">
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                {user?.name?.split('').join('')[0]}
              </div>
              <button
                  onClick={() => logout()}
                  className="p-2 rounded-full cursor-pointer text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  <LogOut className="h-6 w-6" />
                </button>
            </div>
          </div>
        </header>
  )
}

export default Header
