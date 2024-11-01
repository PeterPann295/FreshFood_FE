import React, { useState } from 'react';
import "./register.css"
const Register = () => {
    // State lưu trữ thông tin người dùng
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '' // yyyy-MM-dd format
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Hàm xử lý khi có thay đổi input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Chuyển đổi ngày từ yyyy-MM-dd sang MM/dd/yyyy
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
    };

    // Hàm gửi POST request tới API
    const submitToApi = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Chuyển formData thành JSON string
            });

            if (response.ok) {
                setSuccessMessage(' Đăng kí tài khoản thành công ');
            } else {
                const errorData = await response.json();
                setErrors({ api: errorData.message || 'Đăng kí tài khoản thất bại' });
            }
        } catch (error) {
            setErrors({ api: 'Error connecting to server' });
        }
    };

    // Hàm xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword, phone , dateOfBirth } = formData;

        let newErrors = {};

        if (!username) newErrors.username = 'Vui lòng nhập username ';
        if(username.length < 8) newErrors.username = 'Username phải ít nhất 8 kí tự '
        const EMAIL_PATTERN = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
        if (!email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!EMAIL_PATTERN.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!password) {
            newErrors.password = 'Vui lòng nhập password';
        } else if (password.length < 8) {
            newErrors.password = 'Password phải có ít nhất 8 ký tự';
        } else {
            let hasUppercase = false;
            let hasSpecialCharacter = false;
            let hasDigit = false;

            for (let i = 0; i < password.length; i++) {
                const c = password[i];

                if (c >= 'A' && c <= 'Z') {
                    hasUppercase = true;
                } else if (c >= '0' && c <= '9') {
                    hasDigit = true;
                } else if (!/[a-zA-Z0-9]/.test(c)) {
                    hasSpecialCharacter = true;
                }

                // Nếu đã thỏa mãn tất cả các điều kiện
                if (hasUppercase && hasSpecialCharacter && hasDigit) {
                    break;
                }
            }

            if (!hasUppercase) {
                newErrors.password = 'Password phải có ít nhất một ký tự viết hoa';
            } else if (!hasDigit) {
                newErrors.password = 'Password phải có ít nhất một chữ số';
            } else if (!hasSpecialCharacter) {
                newErrors.password = 'Password phải có ít nhất một ký tự đặc biệt';
            }
        }

        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords không trùng khớp';
        const vietnamesePhoneNumberPattern = /^(03|05|07|08|09)\d{8}$/;

        if (!phone) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!vietnamesePhoneNumberPattern.test(phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }
        const currentDate = new Date();

        if (!dateOfBirth) {
            newErrors.birthdate = 'Vui lòng nhập ngày sinh';
        } else {
            const birthDate = new Date(dateOfBirth);

            // Kiểm tra nếu ngày sinh lớn hơn hoặc bằng ngày hiện tại
            if (birthDate >= currentDate) {
                newErrors.birthdate = 'Ngày sinh không hợp lệ';
            }
        }


        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Chuyển ngày sinh sang MM/dd/yyyy trước khi gửi đi
            const formattedBirthdate = formatDate(dateOfBirth);

            // Thực hiện đăng ký với dữ liệu đã chuyển đổi
            const finalFormData = {
                ...formData,
                dateOfBirth: formattedBirthdate,
                status: 'active',
            };

            // Gửi request POST đến API
            submitToApi(finalFormData);
        }
    };

    return (
        <div className="container mt-5 container-register">
            <h2 className={"text-success"}> Đăng kí tài khoản </h2>
            {successMessage && <div className="alert alert-success alert-custom">{successMessage}</div>}
            {errors.api && <div className="alert alert-danger">{errors.api}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                    <input
                        type="number"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        min={0}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Nhập lại Password:</label>
                    <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Ngày sinh:</label>
                    <input
                        type="date"
                        className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    {errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
                </div>

                <button type="submit" className="btn btn-primary btn-custom"> Đăng kí tài khoản </button>
            </form>
        </div>
    );
}

export default Register;
