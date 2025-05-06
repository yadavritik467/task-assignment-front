'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/interface/interface';
import axiosInstance from '@/interceptor/interceptor';


type AuthContextType = {
    user: User | null;
    token: string | null;
    signupApi: (name: string, email: string, password: string) => Promise<void>;
    loginApi: (email: string, password: string) => Promise<void>;
    adminLoginApi: (email: string, password: string) => Promise<void>;
    myProfileApi: () => Promise<void>;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [alUsers, setAllUsers] = useState<User[]>([]);
    const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('token') as string) : "");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        if (token) {
            // console.log('token',token)
            myProfileApi()
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
            console.log('res',res)
            setToken(res?.data?.data);
            sessionStorage.setItem('token', JSON.stringify(token));
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
            const { token, } = res.data;
            setToken(token);
            sessionStorage.setItem('token', JSON.stringify(token));
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
            const { user } = res.data;
            setUser(user);
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
            const { allUsers } = res.data;
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
    };

    const all_states = {
        loading,
        token,
        user
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
