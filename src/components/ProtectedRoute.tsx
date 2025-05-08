'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.replace('/auth');
        }
    }, [router]);

    return <> {isClient ?  children  : null}</>;
};

export default ProtectedRoute;
