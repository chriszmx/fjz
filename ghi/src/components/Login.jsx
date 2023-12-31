import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo-color.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <div className="text-center">
                    <img
                        className="mx-auto h-50 w-auto shadow-lg bg-white hover:opacity-75 rounded-lg"
                        src={logo}
                        alt="fjz llc"
                    />
                    <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <input
                    className="w-full px-3 py-2 mt-8 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded focus:outline-none hover:bg-indigo-700"
                    type="button"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Or sign in with
                </div>
                <button
                    className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-red-600"
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    Google
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
