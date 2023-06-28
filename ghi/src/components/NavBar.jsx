import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase';
import { signOut } from "firebase/auth";

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isSpecialUser, setIsSpecialUser] = useState(false); // New state
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                setUserEmail(user.email);
                setIsSpecialUser(['c.r.zambito@gmail.com', 'bz814@aol.com'].includes(user.email));
            } else {
                setLoggedIn(false);
                setUserEmail("");
                setIsSpecialUser(false);
            }
        });

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
        ? isSpecialUser // If special user
            ? [
                { to: "/dashboard", text: "Home" },
                { to: "/admin", text: "admin"},
                { to: "/view-applications", text: "Applications" }, // New page for special user
                { text: "Logout", onClick: handleLogout },
            ]
            : [ // Normal logged in user
                { to: "/", text: "Home" },
                { to: "/profile", text: "Profile" },
                { to: "/application", text: "Fill Out Application"},
                { text: "Logout", onClick: handleLogout },
            ]
        : [ // logged out user
            { to: "/login", text: "Login/Register" },
        ];

    return (
        <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
            <div className="flex justify-between items-center">
            <div>
                <Link to="/" className="text-gray-800 text-xl font-bold md:text-2xl">FJZ LLC</Link>
            </div>
            {loggedIn && <p className="md:mr-4">{userEmail}</p>}
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
// import { signOut } from "firebase/auth";

// const NavBar = () => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [userEmail, setUserEmail] = useState("");
//     const [showMenu, setShowMenu] = useState(false);

//     const navigate = useNavigate();
//     const auth = getAuth(app);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // User is signed in
//             setLoggedIn(true);
//             setUserEmail(user.email);  // set user's email
//         } else {
//             // User is signed out
//             setLoggedIn(false);
//             setUserEmail("");  // reset user's email
//         }
//         });

//         // Cleanup subscription on unmount
//         return () => unsubscribe();
//     }, [auth]);

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             navigate("/");
//         } catch (error) {
//             console.error("Error signing out", error);
//         }
//     };

//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//     };

//     const links = loggedIn
//         ? [
//             { to: "/home", text: "Home" },
//             { to: "/admin", text: "admin"},
//             { to: "/profile", text: "Profile" },
//             { to: "/application", text: "Application"},
//             { to: "view-applications", text: "View Apps"},
//             { text: "Logout", onClick: handleLogout },
//         ]
//         : [
//             { to: "/application", text: "Application"},
//             { to: "/login", text: "Login/Register" },
//         ];

//     return (
//         <nav className="bg-white shadow">
//         <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
//             <div className="flex justify-between items-center">
//             <div>
//                 <Link to="/" className="text-gray-800 text-xl font-bold md:text-2xl">FJZ LLC</Link>
//             </div>
//             {loggedIn && <p className="md:mr-4">{userEmail}</p>}
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
