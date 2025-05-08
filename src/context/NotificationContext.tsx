"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axiosInstance from "../interceptor/interceptor";
import { useAuth } from "./AuthContext";
import { Notification } from "@/interface/interface";

type NotificationContextType = {
    notification: Notification[]
    notificationCount: number
    notificationApi: (page: number) => Promise<void>;
    markAllAsReadApi: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within an NotificationProvider");
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [notification, setNotification] = useState<Notification[]>([])
    const [notificationCount, setNotificationCount] = useState<number>(0)
    const { token } = useAuth()


    useEffect(() => {
        if (token) {
            notificationApi(1)
        }
    }, [token])

    const notificationApi = async (page: number) => {
        try {
            const { data } = await axiosInstance.get(`/user-notification?page=${page}`,)
            setNotification(data?.data?.notification)
            setNotificationCount(data?.data?.unreadCount)

        } catch (error) {
            console.log('err', error)
        }
    }

    const markAllAsReadApi = async () => {
        try {
            const { data } = await axiosInstance.put(`/mark-all-as-read`)
            await notificationApi(1)
            return data
        } catch (error) {
            console.log('err', error)
        }
    }

    const all_states = {
        notification,
        notificationCount
    };

    const all_api_controllers = {
        notificationApi,
        markAllAsReadApi,
    };


    return (
        <NotificationContext.Provider value={{ ...all_states, ...all_api_controllers }}>
            {children}
        </NotificationContext.Provider>
    );
};
