"use client"
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { Bell, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Header = () => {
  const { notification, notificationCount, markAllAsReadApi } = useNotification()

  const { logout, user } = useAuth()

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])


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

              {
                notificationCount > 0 ?
                  <span className="absolute top-[-5px] right-0 block h-4 w-4 text-[10px] text-white rounded-full bg-red-500">
                    {notificationCount}
                  </span> : null
              }
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notification.map(no => (
                    <div key={no?._id} className={`p-3 ${!no?.isRead ? "bg-gray-100" : ""} hover:bg-gray-50 border-b border-gray-100`}>
                      <p className="text-sm text-gray-800">{no?.message}</p>
                      {/* {
                        hydrated &&
                        <p className="text-xs text-gray-500 mt-1">{new Date(no.createdAt).toLocaleDateString("en-GB")}</p>
                      } */}
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <button onClick={() => markAllAsReadApi()} className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>
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
