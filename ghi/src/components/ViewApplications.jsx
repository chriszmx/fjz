import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function ViewApplications() {
    const [applications, setApplications] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const auth = getAuth();

    useEffect(() => {
        const checkUser = auth.currentUser;
        if (checkUser) {
            setUserEmail(checkUser.email);
        }
    }, [auth]);

    useEffect(() => {
        const getApplications = async () => {
            const appCollection = collection(db, "application");
            const appSnapshot = await getDocs(appCollection);
            const appList = appSnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }));
            setApplications(appList);
        };

        getApplications();
    }, []);

    if (userEmail !== 'c.r.zambito@gmail.com') {
        return null;
    }

    const handleDeleteApplication = async (id) => {
        try {
            await deleteDoc(doc(db, "application", id));
            setApplications((prevApplications) =>
                prevApplications.filter((app) => app.id !== id)
            );
        } catch (error) {
            console.error("Error deleting application: ", error);
        }
    };

    return (
        <div>
            {applications.map((app, index) => (
                <div key={index}>
                    <details>
                        <summary>Application {index + 1}</summary>
                        <p>First name: {app.data["first name"]}</p>
                        <p>Middle name: {app.data["middle name"]}</p>
                        <p>Last name: {app.data["last name"]}</p>
                        <button onClick={() => handleDeleteApplication(app.id)}>Delete</button>
                    </details>
                </div>
            ))}
        </div>
    );
}

export default ViewApplications;




// import React, { useEffect, useState } from "react";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../firebase";

// function ViewApplications() {
//     const [applications, setApplications] = useState([]);

//     useEffect(() => {
//         const getApplications = async () => {
//             const appCollection = collection(db, "application");
//             const appSnapshot = await getDocs(appCollection);
//             const appList = appSnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 data: doc.data()
//             }));
//             setApplications(appList);
//         };

//         getApplications();
//     }, []);

//     const handleDeleteApplication = async (id) => {
//         try {
//             await deleteDoc(doc(db, "application", id));
//             setApplications((prevApplications) =>
//                 prevApplications.filter((app) => app.id !== id)
//             );
//         } catch (error) {
//             console.error("Error deleting application: ", error);
//         }
//     };

//     return (
//         <div>
//             {applications.map((app, index) => (
//                 <div key={index}>
//                     <details>
//                         <summary>Application {index + 1}</summary>
//                         <p>First name: {app.data["first name"]}</p>
//                         <p>Middle name: {app.data["middle name"]}</p>
//                         <p>Last name: {app.data["last name"]}</p>
//                         <button onClick={() => handleDeleteApplication(app.id)}>Delete</button>
//                     </details>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ViewApplications;
