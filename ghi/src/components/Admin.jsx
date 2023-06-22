import React, { useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

function Admin() {
    const [userUid, setUserUid] = useState("");

    const handleGrantAdmin = async () => {
        try {
            const usersCollection = collection(db, "userRoles");
            const querySnapshot = await getDocs(usersCollection);
            console.log("Query Snapshot:", querySnapshot.docs);

            querySnapshot.docs.forEach((doc) => {
                console.log("Document ID:", doc.id);
                console.log("Document Data:", doc.data());
            });

            console.log("User UID:", userUid);

            const userDoc = querySnapshot.docs.find(
                (doc) => doc.data().user === userUid
            );

            if (userDoc) {
                console.log("User found");
                const userId = userDoc.id;
                const userRef = doc(db, "userRoles", userId);
                await setDoc(userRef, { role: "admin" }, { merge: true });
                console.log("User role updated successfully");
            } else {
                console.log("User not found");
            }
        } catch (error) {
            console.error("Error granting admin role: ", error);
        }
    }

    return (
        <div>
            <h1>Grant Admin Privileges</h1>
            <input
                type="text"
                placeholder="User UID"
                value={userUid}
                onChange={(e) => setUserUid(e.target.value)}
            />
            <button onClick={handleGrantAdmin}>Grant Admin</button>
        </div>
    );
}

export default Admin;
