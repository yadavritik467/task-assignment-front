'use client';

import axiosInstance from '@/interceptor/interceptor';
import { Task } from '@/interface/interface';
import React, { createContext, useContext, useEffect, useState } from 'react';


type TasksContextType = {
    allTasks: Task[]
    createTask: (newTask: any) => Promise<void>;
    updateTask: (updateTask: any) => Promise<void>;
    deleteTask: (id: string,) => Promise<void>;
    getAllTasks: (page: number, limit: number, search?: string, myUserId?: string, status?: string, dueDate?: string, priority?: string, createdBy?: string) => Promise<void>;
    loading: boolean;
    inProgressTaskCount: number
    allTaskCount: number
    overDueTaskCount: number
    currentPage: number
    completedTaskCount: number
    searchTask: string
    setSearchTask: any
    setCurrentPage: any
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTask, setSearchTask] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [inProgressTaskCount, setInProgressTaskCount] = useState<number>(0);
    const [overDueTaskCount, SetOverDueTaskCount] = useState<number>(0);
    const [allTaskCount, setAllTaskCount] = useState<number>(0);
    const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);


    useEffect(() => {
        if (currentPage >= 1) {
            getAllTasks(currentPage, 10,)
            setSearchTask("")
        }
    }, [currentPage])

    const createTask = async (newTask: any) => {
        try {
            const { data } = await axiosInstance.post('/create-task', newTask);
            return data
        } catch (err) {
            console.error('Api failed:', err);
        }
    };
    const updateTask = async (updateTask: any) => {

        try {
            const { _id: id, ...rest } = updateTask
            const { data } = await axiosInstance.put(`/update-task/${id}`, rest);
            return data
        } catch (err) {
            console.error('Api failed:', err);
        }
    };
    const deleteTask = async (id: string) => {

        try {
            const { data } = await axiosInstance.delete(`/delete-task/${id}`,);
            return data
        } catch (err) {
            console.error('Api failed:', err);
        }
    };



    const getAllTasks = async (page: number, limit: number, search?: string, myUserId?: string, status?: string, dueDate?: string, priority?: string, createdBy?: string) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/all-tasks?page=${page}&limit=${limit}&search=${search ?? ""}&myUserId=${myUserId ?? ""}&status=${status ?? ""}&dueDate=${dueDate ?? ""}&priority=${priority ?? ""}&createdBy=${createdBy ?? ""}`);

            setAllTasks(data?.data?.allTasks)
            setInProgressTaskCount(data?.data?.inProgressTaskCount)
            SetOverDueTaskCount(data?.data?.overDueTaskCount)
            setAllTaskCount(data?.data?.allTaskCount)
            setCompletedTaskCount(data?.data?.completedTaskCount)

            setLoading(false);
        } catch (err) {
            console.error('Api failed:', err);
            setLoading(false);
        }
    };


    const all_states = {
        loading,
        allTasks,
        inProgressTaskCount,
        currentPage,
        allTaskCount,
        overDueTaskCount,
        searchTask,
        completedTaskCount
    }
    const all_api_handler = {
        createTask, updateTask, deleteTask, getAllTasks, setSearchTask, setCurrentPage
    }

    return (
        <TasksContext.Provider value={{ ...all_states, ...all_api_handler }}>
            {children}
        </TasksContext.Provider>
    );
};

// Custom hook for easy access
export const useTasks = () => {
    const context = useContext(TasksContext);
    if (context === undefined) throw new Error('useTasks must be used within TasksProvider');
    return context;
};
