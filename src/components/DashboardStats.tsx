import { useTasks } from '@/context/TaskContext'
import { AlertCircle, Calendar, CheckCircle, Clock } from 'lucide-react'
import React from 'react'

const DashboardStats = () => {
    const { allTaskCount, inProgressTaskCount, overDueTaskCount, completedTaskCount } = useTasks()
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-semibold text-gray-900">{allTaskCount ?? 0}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-semibold text-gray-900">
                        {inProgressTaskCount ?? 0}
                    </p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                    <p className="text-2xl font-semibold text-gray-900">
                        {overDueTaskCount ?? 0}
                    </p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-semibold text-gray-900">
                        {completedTaskCount ?? 0}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DashboardStats
