import React, { useState } from 'react';
import { toast } from 'react-toastify';
//import { AthleteInfoForm } from '../Model/Interface';
import axios from 'axios';

interface AthleteInfoForm {
    athleteId?: string;
    athleteName: string;
    bod: Date;
    phone: string;
    password: string;
    addr: string;
    HKID4digit: string;
}

const AthleteInfo = () => {
    const [AthleteInfoForm, setAthleteInfoForm] = useState<AthleteInfoForm>({
        athleteName: '',
        bod: new Date(),
        phone: '',
        password: '',
        addr: '',
        HKID4digit: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        // Send data to server
        axios.post('http://localhost:3001/api/addSSRecord', AthleteInfoForm)
            .then((response) => {
                console.log(response.data);
                toast.success('Data submitted successfully!');
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error submitting data!');
            });

    };

    // Handle change - SppedSlalom form  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAthleteInfoForm({ ...AthleteInfoForm, [event.target.name]: event.target.value });

        if (event.target.name === 'bod') {
            setAthleteInfoForm({ ...AthleteInfoForm, bod: new Date(event.target.value) });
        }

        if (event.target.name === 'phone' && (!/^\d+$/.test(event.target.value) || event.target.value.length > 8)) {
            toast.error('Phone number must be a numeric value and cannot be longer than 8 digits');
        } else if (event.target.name === 'HKID4digit' && (!/^\d+$/.test(event.target.value) || event.target.value.length < 1 || event.target.value.length > 4)) {
            toast.error('HKID must be a numeric value and between 1 and 4 digits');
        }
    };

    return (
        <div className='main'><h1 className='tittle'>Athlete Registration</h1>
            <form onSubmit={handleSubmit} className='form'>
                <input type="text" name="athleteName" value={AthleteInfoForm.athleteName} placeholder="Your Name" onChange={handleChange} required />
                <input type="date" name="bod" value={AthleteInfoForm.bod.toISOString().split('T')[0]} placeholder="Birthday" onChange={handleChange} required />
                <input type="text" name="phone" value={AthleteInfoForm.phone} placeholder="Phone Number" onChange={handleChange} required />
                <input type="password" name="password" value={AthleteInfoForm.password} placeholder="password" onChange={handleChange} required />
                <input type="text" name="addr" value={AthleteInfoForm.addr} placeholder="addr" onChange={handleChange} required />
                <input type="text" name="HKID4digit" value={AthleteInfoForm.HKID4digit} placeholder="HKID first 4 digit" onChange={handleChange} required />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AthleteInfo;