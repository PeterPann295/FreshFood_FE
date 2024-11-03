import React, {useState, useContext} from 'react';
import "../register-account/register.css"
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";

const Login = () => {
    const { loginUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )
    }
    const submitToApi = async (data) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/access`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result = await response.json();
                // Lưu token và thông tin người dùng vào localStorage
                localStorage.setItem('access_token', result.accessToken);
                localStorage.setItem('refresh_token', result.refreshToken);
                console.log(result.refreshToken)
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('username', result.username);
                localStorage.setItem("cartId", result.cartId)
                loginUser();
                navigate("/");
                // Bạn có thể thêm các hành động khác, ví dụ điều hướng tới trang khác
            } else {
                const errorData = await response.json();
                setErrors({api: errorData.message || "Login failed"});
            }
        }catch(err){
            setErrors({api: "Error connecting to server"})
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const { username,password} = formData;

        let newErrors = {};

        if (!username) newErrors.username = 'Vui lòng nhập username ';
        if(username.length < 8) newErrors.username = 'Username phải ít nhất 8 kí tự '

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




        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const finalFormData = {
                ...formData
            };

            // Gửi request POST đến API
            submitToApi(finalFormData);
        }
    };
    return (
        <div className="container mt-5 container-register">
            <h2 className={"text-success"}> Đăng kí tài khoản </h2>
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



                <button type="submit" className="btn btn-primary btn-custom"> Đăng kí tài khoản </button>
            </form>
        </div>
    );
}
export default Login