"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"
import { useRouter } from 'next/navigation';

interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
  }

export default function SignUp() {
    const [formData, setFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem('user')

    useEffect(() => {
        if (userSession) {
            router.push("/dashboard");
        }
    }, [userSession, router]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Basic validations
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (!formData.email.includes('@')) {
            alert('Invalid email address!');
            return;
        }

        try {
            let email: string = formData.email;
            let password: string = formData.password;
            const res = await createUserWithEmailAndPassword(email, password);
            console.log(res);
            setFormData({...formData, email: "", password: "", confirmPassword: ""});
            sessionStorage.setItem("user", "user");
            router.push("/dashboard");
        } catch (error: any) {
            alert(error);
            return;
        }
    
    };

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Gif Store</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Account
                </button>
                <br />
                <Link href="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2">
                    Go back to Login
                </Link>
            </form>
        </div>
    </div>
);
}
