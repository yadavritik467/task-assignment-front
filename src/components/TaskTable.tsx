import { useTasks } from '@/context/TaskContext';
import { getPriorityColor, getStatusColor } from '@/utils/utils';
import { ChevronRight, Edit2, Trash2 } from 'lucide-react';
import Loader from './Loader';

const TaskTable = ({ handleDeleteTask, setCurrentTask, setShowEditModal }: any) => {
    const { allTasks, loading, setCurrentPage, currentPage } = useTasks()

    return (
        loading ? <Loader /> :
            <>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Task
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Priority
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assigned To
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created By
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allTasks.length > 0 ? (
                            allTasks.map((task) => (
                                <tr key={task._id}>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(task.dueDate).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                            {task.status === "todo" ? "To Do" :
                                                task.status === "in-progress" ? "In Progress" :
                                                    task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {task.assignedTo?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {task.createdBy?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => {
                                                setCurrentTask(() => ({ ...task, assignedName: task?.assignedTo?.name }));
                                                setShowEditModal(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No tasks found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="bg-white px-4 py-3  flex items-center justify-end border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between gap-4 items-center ">
                        <button
                            onClick={() => setCurrentPage((prev: number) => prev > 1 ? prev - 1 : 1)}
                            disabled={currentPage === 1}
                            className={`cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Previous
                        </button>
                        <p> {currentPage} </p>
                        <button
                            onClick={() => setCurrentPage((prev: number) => prev + 1)}
                            disabled={!allTasks?.length}
                            className={` cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${!allTasks?.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Next
                        </button>
                    </div>

                </div>

            </>
    )
}

export default TaskTable
