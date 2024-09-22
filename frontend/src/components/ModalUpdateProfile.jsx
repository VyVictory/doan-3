import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";

const AccountSettings = () => {
    const [formData, setFormData] = useState({
        profilePicture: null,
        username: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case "username":
                if (value.length < 3) {
                    newErrors.username = "Username must be at least 3 characters long";
                } else {
                    delete newErrors.username;
                }
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors.email = "Invalid email format";
                } else {
                    delete newErrors.email;
                }
                break;
            case "newPassword":
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
                if (!passwordRegex.test(value)) {
                    newErrors.newPassword =
                        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters";
                } else {
                    delete newErrors.newPassword;
                }
                break;
            case "confirmNewPassword":
                if (value !== formData.newPassword) {
                    newErrors.confirmNewPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmNewPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Handle successful update here
            console.log("Form submitted:", formData);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Account Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture
                        </label>
                        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                            {formData.profilePicture ? (
                                <img
                                    src={URL.createObjectURL(formData.profilePicture)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <MdCloudUpload className="text-4xl text-gray-400" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                aria-label="Upload profile picture"
                            />
                            <button
                                type="button"
                                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
                                aria-label="Take photo"
                            >
                                <FaCamera className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : "border-gray-300"}`}
                                aria-invalid={errors.username ? "true" : "false"}
                                aria-describedby={errors.username ? "username-error" : undefined}
                            />
                            {errors.username && (
                                <p
                                    id="username-error"
                                    className="mt-1 text-sm text-red-600"
                                    role="alert"
                                >
                                    {errors.username}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                list="email-suggestions"
                            />
                            <datalist id="email-suggestions">
                                <option value="@gmail.com" />
                                <option value="@outlook.com" />
                                <option value="@yahoo.com" />
                            </datalist>
                            {errors.email && (
                                <p
                                    id="email-error"
                                    className="mt-1 text-sm text-red-600"
                                    role="alert"
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.newPassword ? "border-red-500" : "border-gray-300"}`}
                                aria-invalid={errors.newPassword ? "true" : "false"}
                                aria-describedby={errors.newPassword ? "newPassword-error" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-500" />
                                ) : (
                                    <FaEye className="text-gray-500" />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p
                                id="newPassword-error"
                                className="mt-1 text-sm text-red-600"
                                role="alert"
                            >
                                {errors.newPassword}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="confirmNewPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmNewPassword ? "border-red-500" : "border-gray-300"}`}
                            aria-invalid={errors.confirmNewPassword ? "true" : "false"}
                            aria-describedby={errors.confirmNewPassword ? "confirmNewPassword-error" : undefined}
                        />
                        {errors.confirmNewPassword && (
                            <p
                                id="confirmNewPassword-error"
                                className="mt-1 text-sm text-red-600"
                                role="alert"
                            >
                                {errors.confirmNewPassword}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;