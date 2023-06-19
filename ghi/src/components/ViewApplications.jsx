import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function ViewApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const getApplications = async () => {
            const appCollection = collection(db, "application");
            const appSnapshot = await getDocs(appCollection);
            const appList = appSnapshot.docs.map(doc => doc.data());
            setApplications(appList);
        };

        getApplications();
    }, []);

    return (
        <div>
            {applications.map((app, index) => (
                <div key={index}>
                    <p>First name: {app['first name']}</p>
                    <p>Middle name: {app['middle name']}</p>
                    <p>Last name: {app['last name']}</p>
                </div>
            ))}
        </div>
    );
}

export default ViewApplications;
