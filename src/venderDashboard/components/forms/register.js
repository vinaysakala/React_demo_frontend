import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { API_URL } from '../../data/ApiPath';
import { Toast } from 'primereact/toast';
import { BlockUI } from 'primereact/blockui';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const pageTitle = "Register";
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate registration logic
            if (!username || !email || !password) {
                setError('All fields are required.');
                toast.current.show({ severity: 'error', summary: pageTitle, detail: "Provide All Feild", life: 3000 });
                return;
            }
            setBlocked(true);
            const response = await fetch(`${API_URL}vendor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json(); // <-- Parse the response as JSON

            if (response.status === 200) {
                toast.current.show({ severity: 'success', summary: pageTitle, detail: result.message, life: 1000 });
                setUsername('');
                setEmail('');
                setPassword('');
                // setTimeout(() => {
                //     if (onRegisterSuccess) {
                //         onRegisterSuccess(); 
                //     }
                // }, 1200);
                navigate('/login'); 
            } else {
                toast.current.show({ severity: 'error', summary: pageTitle, detail: result.message, life: 1000 });
            }
        } catch (err) {
            console.log(err)
        }
        setBlocked(false);
    };

    return (
        <div className="flex-grow-1 flex justify-content-center align-items-center" style={{ minHeight: '100vh',background: 'linear-gradient(to bottom, #f0f4ff 50%, #ffeedd 50%)' }}>
            <Toast ref={toast} />
            <BlockUI blocked={blocked} fullScreen template={<i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>}>
                <Card title="Register" style={{ width: '25rem' }}>
                    <>
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <div className="field mb-3">
                                <label htmlFor="username" className="block mb-2">User Name</label>
                                <InputText
                                    id="username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setError('');
                                    }}
                                    required
                                    placeholder="Enter your username"
                                />
                                {(!username && error) && <small className="p-error">{error}</small>}
                            </div>
                            <div className="field mb-3">
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <InputText
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    required
                                    placeholder="Enter your email"
                                />
                                {(!email && error) && <small className="p-error">{error}</small>}
                            </div>
                            <div className="field mb-3" style={{ position: 'relative' }}>
                                <label htmlFor="password" className="block mb-2">Password</label>
                                <InputText
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    required
                                    placeholder="Enter your password"
                                />
                                <span
                                    className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '38px',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        color: '#888'
                                    }}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                                {(!password && error) && <small className="p-error">{error}</small>}
                            </div>
                            <Button label="Register" type="submit" className="w-full" />
                        </form>
                    </>
                </Card>
            </BlockUI>

        </div>
    );
};

export default Register;
