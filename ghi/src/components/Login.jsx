import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleLogin = async () => {
        try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully logged in!");
        } catch (error) {
        console.error(error);
        toast.error("Error logging in!");
        }
    };

    const handleGoogleLogin = async () => {
        try {
        await signInWithPopup(auth, provider);
        toast.success("Successfully logged in with Google!");
        } catch (error) {
        console.error(error);
        toast.error("Error logging in with Google!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <img className="mx-auto h-12 w-auto" src="/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" onClick={handleLogin}>Login</button>
            <div className="mt-4 text-center text-sm text-gray-600" >
            Or sign in with
            </div>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" onClick={handleGoogleLogin}>Google</button>
        </div>
        <ToastContainer />
        </div>
    );
};

export default Login;
