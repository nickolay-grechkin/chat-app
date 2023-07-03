import {ChangeEvent, JSX, useState} from 'react';
import {ApiService} from "../../services/api.service.ts";
import {useNavigate} from "react-router-dom";

const Login = (): JSX.Element => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSend = async () => {
        if (email && password) {
            try {
                const loginResponse = await ApiService.login(email, password);

                localStorage.setItem('token', loginResponse.data.token);
                localStorage.setItem('userId', loginResponse.data.userId)

                navigate('/');
            } catch(error) {
                console.error(error);
            }
        }
    }

    return (
        <div className='login_wrapper'>
            <div className='inputs_wrapper'>
                <div>
                    <p>Email: </p>
                    <input onChange={handleEmailChange}/>
                </div>
                <div>
                    <p>Password: </p>
                    <input onChange={handlePasswordChange}/>
                </div>
                <button className='send-button' onClick={handleSend}>Send</button>
            </div>
        </div>
    )
};

export { Login };
