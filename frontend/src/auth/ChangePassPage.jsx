import React from 'react'
import { useState } from 'react';
import { changepass } from '../service/AuthService';
import authToken from '../components/authToken';
export default function ChangePassPage() {
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
                // Validate confirmNewPassword again when newPassword changes
                if (formData.confirmNewPassword && value !== formData.confirmNewPassword) {
                    newErrors.confirmNewPassword = "Xác nhận mật khẩu mới không khớp.";
                } else {
                    delete newErrors.confirmNewPassword;
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

        // Clear specific error when user starts typing again
        if (name === "currentPassword" && errors.currentPassword) {
            const newErrors = { ...errors };
            delete newErrors.currentPassword;
            setErrors(newErrors);
        }

        validateField(name, value);
    };
    //
    const validateForm = () => {

        if (!formData.newPassword) errors.newPassword = 'Bắt buộc nhập mật khẩu';
        if (formData.newPassword.length < 8) {
            errors.newPassword = 'Mật khẩu quá ngắn';
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
            errors.confirmNewPassword = 'Mật khẩu không khớp nhau';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length === 0) {
                const response = await changepass(formData.currentPassword, formData.confirmNewPassword);
                if (response.status === 200) {
                    alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại.");
                    authToken.deleteToken();
                    console.log(response)
                    // history.push("/login");
                    window.location.reload();
                }
                if (response.statusCode === 401) {
                    setErrors({ currentPassword: "Mật khẩu hiện tại không đúng, vui lòng thử lại." });
                }
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);

        }
    }

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
                    <button type="submit" className="w-full bg-sky-500 text-primary-foreground py-2 rounded-md hover:bg-sky-400 transition duration-300">
                        Đổi mật khẩu
                    </button>
                </form>
            </div>
        </div>
    )
}
