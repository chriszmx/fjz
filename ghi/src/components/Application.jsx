import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Application() {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "application"), {
                "first name": firstName,
                "middle name": middleName,
                "last name": lastName,
            });

            console.log("Document written with ID: ", docRef.id);

            setFirstName("");
            setMiddleName("");
            setLastName("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" />
            <input value={middleName} onChange={e => setMiddleName(e.target.value)} placeholder="Middle name" />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Application;
