import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { useNavigate } from 'react-router-dom';
import { addToDB } from '../store/UserSlice';




function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [registeredUsers, setRegisteredUsers] = useState({});
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state)=> console.log(state))

    const handSignup = () => {
        let isUsernameTaken = false;

        registeredUsers.forEach((element) => {
            if (username === element.username) {
                isUsernameTaken = true;
                console.log("Username already taken");
            }
        });

        if (!isUsernameTaken && username !== "" && password !== "") {

            const message = 1, nonce = 1, path = 1;
            const hashDigest = sha256(nonce + message);
            const encriptedPassword = Base64.stringify(hmacSHA512(path + hashDigest, password));

            dispatch(addToDB({
                username: username,
                password: encriptedPassword
            })
            )
            // setRegisteredUsers([...registeredUsers, { username: username, password: encriptedPassword }]);
        }
    }

    const handleLogin = () => {
        let passwordNotMatched = null;
        registeredUsers.forEach((element) => {

            const message = 1, nonce = 1, path = 1;
            const hashDigest = sha256(nonce + message);
            const encriptedPassword = Base64.stringify(hmacSHA512(path + hashDigest, password));
            // console.log(element.username)
            if (username === element.username && encriptedPassword === element.password) {
                // console.log("password match");
                passwordNotMatched = false;
                navigate('/');
            } else {
                if (passwordNotMatched === null) {
                    // console.log("not match")
                    passwordNotMatched = true;
                }
            }
        })
        console.log(passwordNotMatched)

    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-center py-5'>{isLogin ? "Login" : "Create new account"}</h1>
            {errMsg && <p>{errMsg}</p>}
            <div className='flex flex-col w-[300px] m-auto gap-y-2'>
                <input className=' bg-orange-200/40 py-2 px-5 outline-none rounded' placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} />
                <input className=' bg-orange-200/30 py-2 px-5 outline-none rounded' placeholder='Enter your password' type='password' onChange={(e) => setPassword(e.target.value)} form='controled' />
                <button disabled={false} className=' bg-green-400 rounded px-5 py-2 text-white font-semibold text-center' onClick={isLogin ? handleLogin : handSignup}>{isLogin ? "Login" : "Create account"}</button>
                <div className='flex justify-between px-5'>
                    <p className='text-sm pt-1'>{isLogin ? "Don't have an account?" : "Have an account?"}</p>
                    <p className=' text-green-500 font-semibold cursor-pointer' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</p>
                </div>
            </div>
        </div>
    )
}

export default Auth;