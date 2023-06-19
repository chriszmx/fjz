import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase';
import { signOut } from "firebase/auth";

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setLoggedIn(true);
        } else {
            // User is signed out
            setLoggedIn(false);
        }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const links = loggedIn
        ? [
            { to: "/home", text: "Home" },
            { to: "/profile", text: "Profile" },
            { text: "Logout", onClick: handleLogout },
        ]
        : [
            { to: "/register", text: "Register" },
            { to: "/login", text: "Login/Register" },
            { to: "/application", text: "Application"}
        ];

    return (
        <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
            <div className="flex justify-between items-center">
            <div>
                <Link to="/" className="text-gray-800 text-xl font-bold md:text-2xl">FJZ LLC</Link>
            </div>

            <div className="flex md:hidden">
                <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu" onClick={toggleMenu}>
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path fillRule="evenodd" d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H5z" clipRule="evenodd"></path>
                </svg>
                </button>
            </div>
            </div>

            <div className={`md:flex items-center ${showMenu ? "" : "hidden"}`}>
            <div className="flex flex-col md:flex-row md:mx-6">
                {links.map((link, index) =>
                link.onClick ? (
                    <button key={index} onClick={link.onClick} className="my-1 text-sm text-gray-700 hover:underline md:mx-4 md:my-0">
                    {link.text}
                    </button>
                ) : (
                    <Link key={index} to={link.to} className="my-1 text-gray-700 hover:underline md:mx-4 md:my-0">
                    {link.text}
                    </Link>
                )
                )}
            </div>
            </div>
        </div>
        </nav>
    );
};

export default NavBar;



// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from '../firebase';

// const NavBar = () => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [showMenu, setShowMenu] = useState(false);

//     const navigate = useNavigate();
//     const auth = getAuth(app);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // User is signed in
//             setLoggedIn(true);
//         } else {
//             // User is signed out
//             setLoggedIn(false);
//         }
//         });

//         // Cleanup subscription on unmount
//         return () => unsubscribe();
//     }, [auth]);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         setLoggedIn(false);
//         navigate("/");
//         window.location.reload();
//     };

//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//     };

//     const links = loggedIn
//         ? [
//             { to: "/home", text: "Home" },
//             { to: "/profile", text: "Profile" },
//             { text: "Logout", onClick: handleLogout },
//         ]
//         : [
//             { to: "/register", text: "Register" },
//             { to: "/login", text: "Login/Register" },
//             { to: "/application", text: "Application"}
//         ];

//     return (
//         <nav className="bg-white shadow">
//         <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
//             <div className="flex justify-between items-center">
//             <div>
//                 <Link to="/" className="text-gray-800 text-xl font-bold md:text-2xl">FJZ LLC</Link>
//             </div>

//             <div className="flex md:hidden">
//                 <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu" onClick={toggleMenu}>
//                 <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
//                     <path fillRule="evenodd" d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H5z" clipRule="evenodd"></path>
//                 </svg>
//                 </button>
//             </div>
//             </div>

//             <div className={`md:flex items-center ${showMenu ? "" : "hidden"}`}>
//             <div className="flex flex-col md:flex-row md:mx-6">
//                 {links.map((link, index) =>
//                 link.onClick ? (
//                     <button key={index} onClick={link.onClick} className="my-1 text-sm text-gray-700 hover:underline md:mx-4 md:my-0">
//                     {link.text}
//                     </button>
//                 ) : (
//                     <Link key={index} to={link.to} className="my-1 text-gray-700 hover:underline md:mx-4 md:my-0">
//                     {link.text}
//                     </Link>
//                 )
//                 )}
//             </div>
//             </div>
//         </div>
//         </nav>
//     );
// };

// export default NavBar;
