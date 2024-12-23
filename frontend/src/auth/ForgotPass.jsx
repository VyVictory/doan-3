import React from 'react'
import { forgotPassword, resetPassword, verifyOTP } from '../service/ForgotPassword'
import { useState } from 'react'
export default function ForgotPass() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [verifyButtonVisible, setVerifyButtonVisible] = useState(true);


    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await forgotPassword(email);
        if (response) {
            alert("OTP đã được gửi đến email của bạn");
            setOtpVisible(true);
        } else {
            alert("Email không tồn tại");
        }
    }
    const handleVerify = async (e) => {
        e.preventDefault();
        const response = await verifyOTP(email, otp);
        if (response) {
            alert("OTP đã được xác thực");
            setPasswordVisible(true);
            setVerifyButtonVisible(false);
        } else {
            alert("Mã OTP không đúng")
        }
    }
    const handleReset = async (e) => {
        e.preventDefault();
        const response = await resetPassword(email, otp, newPassword);
        if (response) {
            alert("Mật khẩu đã được thay đổi");
            window.location.href = '/login';
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#24C6DC] to-[#514A9D]">
            <div className="max-w-md w-full p-6 bg-card bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl text-primary text-center mb-4">Bạn quên mật khẩu?</h2>
                <p className="text-secondary text-center mb-6">Hãy điền email để lấy lại mật khẩu.</p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary">Email</label>
                        <input
                            name="email"
                            value={email}
                            onChange={handleChange}
                            type="email"
                            required
                            className="w-full px-3 py-2 placeholder-input text-primary bg-input border border-primary rounded-md focus:outline-none focus:ring focus:ring-primary"
                            placeholder="john.doe@example.com" />
                    </div>
                    {otpVisible && (
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-primary">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={handleOtpChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            {verifyButtonVisible && (
                                <button
                                    onClick={handleVerify}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4"
                                >
                                    Verify OTP
                                </button>
                            )}
                        </div>
                    )}
                    {passwordVisible && (
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-primary">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            <button
                                onClick={handleReset}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4"
                            >
                                Reset Password
                            </button>
                        </div>
                    )}
                    {!otpVisible && !passwordVisible && (
                        <button
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Gửi OTP
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}
