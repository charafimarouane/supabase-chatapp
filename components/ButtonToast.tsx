"use client"
import React from 'react'
import { useToast } from './ToastProvider';

function ButtonToast() {
    const { showToast } = useToast();
    
    return (
        <div className="p-8">
        <button
            onClick={() => showToast('Hello!', 'This is a dynamic toast.')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            Trigger Toast
        </button>
        </div>
    )
}

export default ButtonToast
