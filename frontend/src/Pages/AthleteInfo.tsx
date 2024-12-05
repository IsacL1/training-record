import React, { useState } from 'react';
import { toast } from 'react-toastify';
//import { AthleteInfoForm } from '../Model/Interface';
import axios from 'axios';
import { format } from 'path';
import moment from 'moment';

const serverHost = 'localhost:3001'

interface AthleteInfoForm {
    athleteId: string;
    athleteName: string;
    bod: Date;
    phone: string;
    password: string;
    //ConfirmPassword: string;
    addr: string;
    HKID4digit: string;
}

async function getNextAthleteId(): Promise<string> {
    try {
      // Retrieve the total count of documents in the collection
      const response = await axios.get(`http://${serverHost}/api/athletes/count`);
      const count = response.data.count;
  
      // Increment the count by 1 to get the next ID
      const nextId = count + 1;
  
      // Format the ID as per your requirements
      const formattedId = `S${nextId.toString().padStart(3, '0')}`;
  
      return formattedId;
    } catch (error) {
      console.error('Error retrieving athlete count:', error);
      throw error;
    }
  }

const AthleteInfo = () => {
    const [AthleteInfoForm, setAthleteInfoForm] = useState<AthleteInfoForm>({
        athleteId: '',
        athleteName: '',
        bod: new Date(),
        phone: '',
        password: '',
        //ConfirmPassword: '',
        addr: '',
        HKID4digit: ''
    });

    const validatePassword = (password: string) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const isLongEnough = password.length >= 10;

        if (!password) {
            setError('Password is required');
            return true;
        }

        if (!isLongEnough) {
            setError('Password must be at least 10 characters long');
            return false;
        }

        if (!isLongEnough) {
            toast.error('Password must be at least 10 characters long');
            return false;
        }

        if (!hasUppercase || !hasLowercase || !hasNumber) {
            toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return false;
        }

        return true;
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const isValidPhoneNumber = /^\d{8}$/.test(phoneNumber);
        if (!isValidPhoneNumber) {
            setError('Support HK number only');
            return false;
        }
        setError('');
        return true;
    };

    const validateHKID = (HKID: string) => {
        const isValidHKID = /^[A-Z]\d{3}$/.test(HKID);
        if (!isValidHKID) {
            setError('Invalid HKID format');
            return false;
        }
        setError('');
        return true;
    };

    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidPassword = validatePassword(AthleteInfoForm.password);
        const isValidPhoneNumber = validatePhoneNumber(AthleteInfoForm.phone);
        const isValidHKID = validateHKID(AthleteInfoForm.HKID4digit);
        const newAthleteId = String(getNextAthleteId());
        
        //setAthleteInfoForm({...AthleteInfoForm, athleteId: newAthleteId});

        if (!isValidPassword || !isValidPhoneNumber || !isValidHKID) {
            return;
        }

        // Send data to server
        axios.post(`http://${serverHost}/api/addAthleteInfo`, AthleteInfoForm)
            .then((response) => {
                console.log(newAthleteId);
                console.log(response.data);
                setAthleteInfoForm({
                    athleteId: '',
                    athleteName: '',
                    bod: new Date(),
                    phone: '',
                    password: '',
                    //ConfirmPassword: '',
                    addr: '',
                    HKID4digit: ''
                  });
                toast.success('Data submitted successfully!');
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error submitting data!');
            });

    };

    // Handle change - SppedSlalom form  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        try {
            setAthleteInfoForm({ ...AthleteInfoForm, [event.target.name]: event.target.value });

            if (event.target.name === 'bod') {
                const date = new Date(event.target.value);
                if (date < AthleteInfoForm.bod) {
                    toast.error('Date should not be in the future');
                } else {
                    setAthleteInfoForm({ ...AthleteInfoForm, bod: date });
                }
                setAthleteInfoForm({ ...AthleteInfoForm, bod: new Date(event.target.value) });
            }
        } catch (error) {
            if (error instanceof RangeError && error.message.includes('Invalid time value')) {
                toast.error('Invalid date string provided');
            } else {
                throw error;
            }
        }

        // if (event.target.name === 'phone' && (!/^\d{8}$/.test(event.target.value) || event.target.value.length > 8)) {
        //     toast.error('Phone number must be a numeric value and cannot be longer than 8 digits');
        // } else if (event.target.name === 'HKID4digit' && (!/^[A-Za-z]\d{3}$/.test(event.target.value) || event.target.value.length < 1 || event.target.value.length > 4)) {
        //     toast.error('HKID must be a numeric value and between 1 and 4 digits');
        // }
    };

    return (
        <div className='main'><h1 className='title'>Athlete Registration</h1>
            <form onSubmit={handleSubmit} className='form'>
                <input type="text" name="athleteName" value={AthleteInfoForm.athleteName} placeholder="Your Full Name" onChange={handleChange} required />
                <span></span>
                {/* <input type="date" name="bod" value={AthleteInfoForm.bod.toISOString().split('T')[0] format="yyyy-MM-dd"} max="9999-12-31" placeholder="Birthday" onChange={handleChange} required /> */}
                <input type="date" name="bod" value={moment(AthleteInfoForm.bod).format('YYYY-MM-DD')} placeholder="Birthday" onChange={handleChange} required />
                <input type="text" name="phone" value={AthleteInfoForm.phone} placeholder="Phone Number" onChange={handleChange} required />
                {/* <input type="password" name="password" value={AthleteInfoForm.password} placeholder="Password" onChange={handleChange} required />
                <input type="password" name="ConfirmPassword" value={AthleteInfoForm.ConfirmPassword} placeholder="Confirm Password" onChange={handleChange} required /> */}
                <input type="text" name="addr" value={AthleteInfoForm.addr} placeholder="Address" onChange={handleChange} required />
                <input type="text" name="HKID4digit" value={AthleteInfoForm.HKID4digit.toUpperCase()} placeholder="HKID first 4 digit" onChange={handleChange} required />

                <button type="submit">Submit</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    )
}

export default AthleteInfo;