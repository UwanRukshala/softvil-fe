import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/user/userSlice';
import axios from 'axios';
import { USER_LOGIN, VERIFY_OTP } from '../config/urls';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });

    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!showOtpSection) {
                // First step: Send email to get OTP
                const res = await axios.post(`${USER_LOGIN}?email=${email}`);
                if (res.status === 200) {
                    setShowOtpSection(true);
                }
            } else {
                // Second step: Verify OTP
                try {
                    const res = await axios.post(VERIFY_OTP, {
                        email,
                        otp,
                    });

                    if (res.status === 200) {

                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user', JSON.stringify({
                            userId: res.data.userId,
                            email: res.data.email,
                            role: res.data.role
                        }));

                        // Dispatch login action with all user data
                        dispatch(loginUser({
                            token: res.data.token,
                            userId: res.data.userId,
                            email: res.data.email,
                            role: res.data.role,
                            isAuthenticated: true
                        }));

                        navigate('/dashboard');
                    }
                } catch (err) {
                    if (err.response && err.response.status === 401 && err.response.data?.error === "OTP_VALIDATION_FAILED") {
                        setError(err.response.data.message || "Invalid or expired OTP");
                    } else {
                        setError("An error occurred during OTP verification");
                    }
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post(`${USER_LOGIN}?email=${email}`);
            if (res.status === 200) {
                setError('New OTP sent successfully!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Event Manager"
                        src="/logo.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        {showOtpSection ? 'Verify OTP' : 'Sign in to your account'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} noValidate method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={showOtpSection}
                                    autoComplete="email"
                                    className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 ${showOtpSection ? 'opacity-70 cursor-not-allowed' : ''}`}
                                />
                            </div>
                        </div>

                        {showOtpSection && (
                            <div>
                                <label htmlFor="otp" className="block text-sm/6 font-medium text-white">
                                    OTP Verification Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        autoComplete="off"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </div>
                                <div className="mt-2 text-right">
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={isLoading}
                                        className="text-sm text-indigo-400 hover:text-indigo-300"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        )}


                        {error && (
                            <div className="text-sm text-red-500 text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    'Processing...'
                                ) : showOtpSection ? (
                                    'Verify & Login'
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>

                    {touched.email && !isEmailValid && (
                        <p className="mt-10 text-center text-sm/6 text-gray-400">Enter a valid email.</p>
                    )}
                </div>
            </div>
        </>
    )
}