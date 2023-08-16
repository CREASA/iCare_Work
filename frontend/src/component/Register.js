import React, { useState } from 'react';
import axios from 'axios';
// import jQuery from 'jquery'

const client = axios.create({
    // both should work locally
    baseURL: "http://127.0.0.1:8000"
    // baseURL: "http://localhost:8000"
});

// TODO: implement fully detailed register page
export function Register() {
    const [formData, setFormData] = useState({
        "username": "",
        "password": "",
        "first_name": "",
        "last_name": "",
        "gender": "",
        "dob": "2000-01-01",
        "preferred_name": "",
        "bot_name": "",
        "email": "",
        "address_line1": "",
        "address_line2": "",
        "city": "",
        "state": "",
        "country": "",
        "zip_code": "",
        "phone_number": "",
        "ethnicity": "",
        "issue_diagnosed": false,
        "issue_type": "",
        "issue_duration": "",
        "caregiver": false
    });
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // TO DO: handle post endpoint
            const response = await client.post('/signup', JSON.stringify(formData));
            if (response.status === 201) {
                // TODO:Handle successful sign up
                console.log("signed up successfully");
            }
        } catch (err) {
            if (err.response.status == 400 && err.response.data.username == "The Username provided is already taken.") {
                setError('Username already exists, please choose another one');

            } else {
                setError('An error occurred, please try again');
                console.log(err.response.data);
            }
        }
    };

    return (
        <form id="signUpFOrm" onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <div>
                <label>Username:</label>
                <input
                    id="userName"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    maxLength="25"
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>First Name:</label>
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    maxLength="25"
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    maxLength="25"
                    required
                />
            </div>
            {/* <div>
                <label>Email:</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div> */}
            <div>
                <label>Gender:</label>
                <input
                    id="gender"
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    maxLength="30"
                    required
                />
            </div>
            <div>
                <label>Address 1:</label>
                <input
                    id="address_line1"
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleInputChange}
                    maxLength="128"
                    required
                />
            </div>
            <div>
                <label>Address 2:</label>
                <input
                    id="address_line2"
                    type="text"
                    name="address_line2"
                    value={formData.address_line2}
                    maxLength="128"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>City:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    maxLength="64"
                    required
                />
            </div>
            <div>
                <label>State:</label>
                <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    maxLength="64"
                    required
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    maxLength="64"
                    required
                />
            </div>
            <div>
                <label>Zip Code:</label>
                <input
                    id="zip_code"
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    required
                    maxLength="6"
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Sign Up</button>
        </form>
        // TO DO: other required but not mandatory fields
    );
}