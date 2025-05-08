'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/interface/interface';
import axiosInstance from '@/interceptor/interceptor';
import { useRouter } from 'next/navigation';


type AuthContextType = {
    user: User | null;
    token: string | null;
    signupApi: (name: string, email: string, password: string) => Promise<void>;
    loginApi: (email: string, password: string) => Promise<void>;
    adminLoginApi: (email: string, password: string) => Promise<void>;
    myProfileApi: () => Promise<void>;
    logout: () => void;
    loading: boolean;
    allUsers:User[]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('token') as string) : "");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {

        if (token) {
            myProfileApi()
            allUsersApi()
        }
    }, [token]);

    const signupApi = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            await axiosInstance.post('/signup', { name, email, password });
            setLoading(false);
        } catch (err) {
            console.error('Login failed:', err);
            setLoading(false);
        }
    };
    const loginApi = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post('/login', { email, password });
            setToken(res?.data?.data);
            sessionStorage.setItem('token', JSON.stringify(res?.data?.data));
            router.push('/')
            setLoading(false);
        } catch (err) {
            console.error('Login failed:', err);
            setLoading(false);
        }
    };
    const adminLoginApi = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post('/admin-login', { email, password });
            setToken(res?.data?.data);
            sessionStorage.setItem('token', JSON.stringify(res?.data?.data));
            router.push('/')
            setLoading(false);
        } catch (err) {
            console.error('Login failed:', err);
            setLoading(false);
        }
    };

    const myProfileApi = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/myProfile');
            setUser(res?.data?.data);
            setLoading(false);
        } catch (err) {
            console.error('Login failed:', err);
            setLoading(false);
        }

    }
    const allUsersApi = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/all-users');
            const { allUsers } = res.data?.data;
            setAllUsers(allUsers);
            setLoading(false);
        } catch (err) {
            console.error('Login failed:', err);
            setLoading(false);
        }

    }

    const logout = () => {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem('token');
        router.push("/auth")
    };

    const all_states = {
        loading,
        token,
        user,
        allUsers
    }
    const all_api_handler = {
        logout,
        signupApi,
        loginApi,
        adminLoginApi,
        myProfileApi,
        allUsersApi
    }

    return (
        <AuthContext.Provider value={{ ...all_states, ...all_api_handler }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
