"use client";

import React, { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
    const [ user ] = useAuthState(auth);
    console.log(user);
    const router = useRouter();
    const userSession = sessionStorage.getItem('user')

    useEffect(() => {
        if (!user || !userSession) {
            router.push("/");
        }
    }, [user, userSession, router]);

  return (
    <div>
        <h1>This is dashboard</h1>
        <button onClick={() => {
            signOut(auth);
            sessionStorage.removeItem('user');
        }}>Logout</button>
    </div>
  )
}
