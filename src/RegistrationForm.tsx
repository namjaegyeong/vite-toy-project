import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { User } from './interfaces/registration/User';
import { CheckIdExistsRequest, GenericStatusResponse } from './interfaces/duplicatecheck/DuplicateCheckInterfaces';

interface RegistrationData extends User {
    confirmPassword: string;
}

const RegistrationWithoutForm: React.FC = () => {
  const [userData, setUserData] = useState<RegistrationData>({
    userId: '',
    password: '',
    confirmPassword: '', // extra field for confirmation
    userName: '',
    phoneNumber: '',
    memberType: 'USER',
  });
  
  // State for messages and duplicate check
  const [apiMessage, setApiMessage] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [isUserIdUnique, setIsUserIdUnique] = useState<boolean>(false);
  const [checkingId, setCheckingId] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  // Update fields when the user types
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // When user edits userId, clear previous duplicate check results.
    if (name === 'userId') {
      setIsUserIdUnique(false);
      setIdMessage('');
    }
    setUserData(prev => ({ ...prev, [name]: value }));

    // Check mismatch if password or confirmPassword changes
    if (name === 'password' || name === 'confirmPassword') {
        const newPassword = name === 'password' ? value : userData.password;
        const newConfirm = name === 'confirmPassword' ? value : userData.confirmPassword;
        setPasswordMismatch(newPassword !== newConfirm);
    }
  };

  // Function to check duplicate for user ID when button is clicked.
  const checkDuplicateUserId = async () => {
    if (!userData.userId.trim()) {
      setIdMessage('Please enter a User ID first.');
      return;
    }
    
    setCheckingId(true);
    try {
      // Build the request body based on the interface
      const requestData: CheckIdExistsRequest = { userId: userData.userId };
      const response = await axios.post<GenericStatusResponse>('https://lab.dja.kr/api/v1/auth/exists', requestData);

      if (!response.data.result) {
        setIdMessage('User ID is available.');
        setIsUserIdUnique(true);
      } else {
        setIdMessage('User ID is already taken.');
        setIsUserIdUnique(false);
      }
    } catch (error) {
      setIdMessage('Error checking User ID.');
      setIsUserIdUnique(false);
      console.error('ID check error:', error);
    }
    setCheckingId(false);
  };

  // Registration API call on button click
  const registerUser = async () => {
    if (!isUserIdUnique) {
      setApiMessage('Please check that your User ID is unique.');
      return;
    }
    if(passwordMismatch) {
        setApiMessage('Passwords do not match.');
        return;
    }
    try {
      // Replace with your registration endpoint.
      const response = await axios.post('https://lab.dja.kr/api/v1/auth/register', userData);
      setApiMessage('Registration successful!');
      console.log('Registration response:', response.data);
    } catch (error: any) {
      setApiMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>User Registration</h2>
        {apiMessage && <p>{apiMessage}</p>}

    {/* User ID Field with duplicate check button */}
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
            <label>
            User ID:
            <input
                type="text"
                name="userId"
                value={userData.userId}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
            />
            </label>
        </div>
        <div style={{ marginLeft: '10px' }}>
            <button onClick={checkDuplicateUserId} disabled={checkingId}>
            {checkingId ? 'Checking...' : 'Check ID'}
            </button>
        </div>
    </div>
    {idMessage && <p style={{ color: isUserIdUnique ? 'green' : 'red' }}>{idMessage}</p>}

    {/* Password Field */}
    <div style={{ marginBottom: '10px' }}>
        <label>
            Password:
            <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
            />
        </label>
    </div>

    {/* Confirm Password */}
    <div style={{ marginBottom: '10px' }}>
        <label>
            Confirm Password:
            <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
            />
        </label>
        {passwordMismatch && (
            <p style={{ color: 'red' }}>Passwords do not match.</p>
        )}
    </div>

    {/* User Name Field */}
    <div style={{ marginBottom: '10px' }}>
        <label>
            User Name:
            <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
            />
        </label>
    </div>

    {/* Phone Number Field */}
    <div style={{ marginBottom: '10px' }}>
        <label>
            Phone Number:
            <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
            />
        </label>
    </div>

    {/* Member Type Field */}
    <div style={{ marginBottom: '10px' }}>
        <label>
            Member Type:
            <select
            name="memberType"
            value={userData.memberType}
            onChange={handleChange}
            style={{ width: '100%' }}
            >
            <option value="USER">USER</option>
            </select>
        </label>
    </div>

    {/* Registration Button */}
    <button onClick={registerUser} style={{ width: '100%' }}>
        Register
    </button>
    </div>
  );
};

export default RegistrationWithoutForm;
