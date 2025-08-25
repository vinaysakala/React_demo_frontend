import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { API_URL } from '../../data/ApiPath';
import { BlockUI } from 'primereact/blockui';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const pageTitle = "Login";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toast = useRef(null);
    const [blocked, setBlocked] = useState(false);
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setBlocked(true);
            const reponse = await fetch(`${API_URL}vendor/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            const result = await reponse.json();
            if (result.status === 200) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('Vender', JSON.stringify(result.vender));
                toast.current.show({ severity: 'success', summary: pageTitle, detail: result.message, life: 1000 });
                setEmail('');
                setPassword('');
                navigator('/dashboard');
            } else {
                toast.current.show({ severity: 'error', summary: pageTitle, detail: result.message, life: 1000 });
            }
        } catch (error) {
            setBlocked(false);
            console.error('Login failed:', error);
            // Handle login failure (e.g., show an error message)
        }
        setBlocked(false);
    };

    return (
        <div className="flex-grow-1 flex justify-content-center align-items-center" style={{ minHeight: '100svh', background: 'linear-gradient(to bottom, #f0f4ff 50%, #ffeedd 50%)' }}>
            <Toast ref={toast} />
            <BlockUI blocked={blocked} fullScreen template={<i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>}></BlockUI>
            <Card title="Login" style={{ width: '25rem' }}>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="field mb-3">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="field mb-3" style={{ position: 'relative' }}>
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <InputText
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                    <Button label="Login" type="submit" className="w-full" />

                    <div className="field mt-3 flex align-items-center justify-content-center">
                        <span className="text-base text-700">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-primary no-underline font-medium hover:underline"
                            >
                                Create account
                            </a>
                        </span>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default Login;
