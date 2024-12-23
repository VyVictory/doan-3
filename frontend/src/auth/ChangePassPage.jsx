import React from 'react'
import { useState } from 'react';
import { changepass } from '../service/AuthService';
import authToken from '../components/authToken';
export default function ChangePassPage({ btnCancel }) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    //validate
    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case "currentPassword":
                if (value.length < 3) {
                    newErrors.currentPassword = "Mật khẩu hiện tại phải dài ít nhất 3 ký tự.";
                } else {
                    delete newErrors.currentPassword;
                }
                break;
            case "newPassword":
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
                if (!passwordRegex.test(value)) {
                    newErrors.newPassword =
                        "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
                } else {
                    delete newErrors.newPassword;
                }
                break;
            case "confirmNewPassword":
                if (value !== formData.newPassword) {
                    newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp.";
                } else {
                    delete newErrors.confirmNewPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    //handle change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await changepass(formData.currentPassword, formData.newPassword);
            if (response) {
                authToken.deleteToken();
                window.location.reload();
                // history.push("/login");
            }
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                setErrors({ currentPassword: "Mật khẩu hiện tại không đúng." });
                alert("Mật khẩu hiện tại không đúng.");
            } else {
                console.error("Error changing password:", error);
            }
        }
        finally {
            setLoading(false);
        }
    }
    console.log(errors.status);

    return (
        <div className="bg-background text-primary-foreground min-h-screen flex items-center justify-center">
            <div className="bg-card w-full max-w-md p-6 rounded-lg shadow-lg border-[1px]">
                <h2 className="text-2xl font-bold mb-4 text-center">Đổi mật khẩu</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium">Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Nhập mật khẩu hiện tại"
                            className="w-full px-3 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:ring-primary" />
                    </div>
                    {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                            {errors.currentPassword}
                        </p>
                    )}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium">Mật khẩu mới</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Nhập mật khẩu mới"
                            className="w-full px-3 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:ring-primary" />
                    </div>
                    {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                            {errors.newPassword}
                        </p>
                    )}
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleInputChange}
                            placeholder="Nhập lại mật khẩu mới"
                            className="w-full px-3 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:ring-primary" />
                    </div>
                    {errors.confirmNewPassword && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                            {errors.confirmNewPassword}
                        </p>
                    )}
                    <button type="submit" className="w-full bg-sky-500 text-primary-foreground py-2 rounded-md hover:bg-sky-400 transition duration-300">Change Password</button>
                </form>
            </div>
        </div>
    )
}
