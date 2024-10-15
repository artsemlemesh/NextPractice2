'use client'

import { addUser } from "@/redux/imageUserSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function AddUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const dispatch = useDispatch();

    // const {error, success} = useSelector((state) => state.workers)
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('profileImage', profileImage);

        dispatch(addUser(formData))
        setName('');
        setEmail('');
        setProfileImage(null);

    }


return (
    <>
    <h1>Add New User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
    </>
);


}

