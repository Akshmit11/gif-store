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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className='flex justify-between my-4'>
            <h1 className="text-3xl font-bold mb-4">Gif Store</h1>
            <button onClick={() => {
                signOut(auth);
                sessionStorage.removeItem('user');
            }}
                className='bg-black text-white px-6 py-1 rounded-lg'
            >Logout</button>
        </div>
        
        {/* Search Box */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-l py-2 px-3 focus:outline-none focus:shadow-outline w-full"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-r">
            Search
          </button>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
            >
              <img
                src={`https://placekitten.com/400/300?image=${index + 1}`}
                alt={`Image ${index + 1}`}
                className="mb-2 rounded-md"
              />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Image {index + 1}</span>
                <button className="text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2s1.738 2.036 2.15 3H19c1.105 0 2 .895 2 2v12s0 2-2 2H5s-2 0-2-2V7s0-2 2-2h4.294c.41-1.108 2.005-3 2.005-3z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
