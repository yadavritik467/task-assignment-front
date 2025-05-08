"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { useNotification } from "./NotificationContext";
import { useAuth } from "./AuthContext";
import { useTasks } from "./TaskContext";

type SocketContextType = {
    socket: any,
    socketConnectHandler: () => any;
    socketDisconnectHandler: () => any;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within an SocketProvider");
    }
    return context;
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socket = useMemo(() => {
        if (process.env.NEXT_PUBLIC_SOCKET === "true") {
            return io(process.env.NEXT_PUBLIC_API_URL);
        }
        return null;
    }, []);

    const { user } = useAuth()
    const { notificationApi } = useNotification()

    useEffect(() => {
        if (user?._id && user?.role) {
            if (socket?.connected) {
                socket?.emit("register", {
                    userId: user._id,
                });
            } else {
                // Socket abhi tak connected nahi hua — wait for connect event
                socket?.on("connect", () => {
                    socket?.emit("register", {
                        userId: user._id,
                    });
                });
            }
        }

        return () => {
            socket?.off("connect");
        };
    }, [socket, user?._id, user?.role]);

    useEffect(() => {
        socket?.on("TASK_CREATED", (d: any) => {
            if (d && user) {
                notificationApi(1)
            }
        });
        socket?.on("TASK_UPDATED", (d: any) => {
            if (d && user) {
                notificationApi(1)
            }
        });

        return () => {
            socket?.off("TASK_CREATED");
            socket?.off("TASK_UPDATE");
        };
    }, [user?.role]);

    const socketDisconnectHandler = () => {
        return socket?.disconnect()
    }
    const socketConnectHandler = () => {
        return socket?.connect()
    }


    const all_states = {
        socket
    };

    const all_api_controllers = {
        socketDisconnectHandler,
        socketConnectHandler
    };


    return (
        <SocketContext.Provider value={{ ...all_states, ...all_api_controllers }}>
            {children}
        </SocketContext.Provider>
    );
};
