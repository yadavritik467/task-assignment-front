"use client"
import DashboardStats from "@/components/DashboardStats";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import TaskForm from "@/components/TaskForm";
import TaskTable from "@/components/TaskTable";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { useTasks } from "@/context/TaskContext";
import { PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";


export default function Home() {

  const { user, token } = useAuth()
  const { socket, socketConnectHandler } = useSocket()
  const { createTask, deleteTask, updateTask, getAllTasks, currentPage, searchTask, setSearchTask } = useTasks()



  const [activeTab, setActiveTab] = useState("assigned");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    assignedTo: "",
    assignedName: ""
  });

  const callGetAllTaskFunc = () => {
    const myUserId = activeTab === "assigned" && user?.role === "user" ? user?._id : ""
    const status = statusFilter !== 'all' ? statusFilter : ""
    const priority = priorityFilter !== 'all' ? priorityFilter : ""
    const createdBy = activeTab === 'created' ? user?._id : ""
    const dueDate = activeTab === 'overdue' ? activeTab : ""
    getAllTasks(currentPage, 10, searchTask, myUserId, status, dueDate, priority, createdBy)
  }

  useEffect(() => {
    if (token && user) {
      callGetAllTaskFunc()
    }
  }, [user, activeTab, statusFilter, priorityFilter, token])
  useEffect(() => {
    if (token && user) {
      setStatusFilter('all')
      setPriorityFilter('all')
      const delayDebounce = setTimeout(() => {
        const myUserId = activeTab === "assigned" && user?.role === "user" ? user?._id : ""
        getAllTasks(currentPage, 10, searchTask, myUserId,)
      }, 1000)
      return () => clearTimeout(delayDebounce);
    }
  }, [searchTask, token])

  // Handle task creation
  const handleCreateTask = async () => {

    const res: any = await createTask(newTask)
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      status: "todo",
      assignedTo: "",
      assignedName: ""
    });
    setShowAddModal(false);
    if (res) {
      callGetAllTaskFunc()
    }
  };

  // Handle task update
  const handleUpdateTask = async () => {
    const res: any = await updateTask(currentTask)
    setShowEditModal(false);
    if (res) {
      callGetAllTaskFunc()
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    const res: any = await deleteTask(id)
    if (res) {
      callGetAllTaskFunc()
    }
  };


  useEffect(() => {
    if (token && user?._id) {
      if (!socket?.connected) {
        socketConnectHandler()
      }
    }
  }, [token, user?._id, socket])


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard stats */}
          <DashboardStats />

          {/* Task management section */}
          <div className="bg-white rounded-lg shadow">
            {/* Task tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("assigned")}
                  className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "assigned"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {user?.role === 'admin' ? "All Task" : "Assigned to me"}
                </button>
                <button
                  onClick={() => setActiveTab("created")}
                  className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "created"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  Created by me
                </button>
                <button
                  onClick={() => setActiveTab("overdue")}
                  className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "overdue"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  Overdue
                </button>
              </nav>
            </div>

            {/* Search and filters */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search tasks..."
                  value={searchTask}
                  onChange={(e) => setSearchTask(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-12 gap-3">
                <div className="relative inline-block col-span-4 max-sm:col-span-12 text-left">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-500">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border max-sm:w-full border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="all">All</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="relative inline-block col-span-4 max-sm:col-span-12 text-left">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-500">Priority:</span>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="border max-sm:w-full border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="all">All</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="col-span-4 max-sm:col-span-12 max-sm:justify-center inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Task
                </button>
              </div>
            </div>

            {/* Task list */}
            <div className="overflow-x-auto">
              <TaskTable handleDeleteTask={handleDeleteTask} setCurrentTask={setCurrentTask} setShowEditModal={setShowEditModal} />
            </div>
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <TaskForm buttonName={"Create"} handler={handleCreateTask} title={"Create Task"} modalToggler={setShowAddModal} task={newTask} updateTaskState={setNewTask} />
      )}

      {/* Edit Task Modal */}
      {showEditModal && currentTask && (
        <TaskForm buttonName={"Update"} handler={handleUpdateTask} title={"Update Task"} modalToggler={setShowEditModal} task={currentTask} updateTaskState={setCurrentTask} />
      )}
    </ProtectedRoute>
  );
}
