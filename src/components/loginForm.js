import React, {useRef, useState} from 'react';
import {BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink} from "./StylesForAcc";
import {Marginers} from "../components/marginer/index"
import http from "../plugins/Fetch"
import {useHistory} from "react-router-dom"


const LoginForm = ({trigger}) => {

    const loginEmailRef = useRef()
    const loginPasswordRef = useRef()

    const [data2, setData2] = useState([])
    const [err2, setError2] = useState([])
    const [errMsg, setErrMsg] = useState("")

    const history = useHistory()

    function loginBtn() {

        const data2 = {

            userLoginEmail: localStorage.getItem("keyBase"),
            userLogin: loginEmailRef.current.value,
            userPswLogin: loginPasswordRef.current.value,
        }
        http.post('/loginUser', data2).then(res => {
            setData2(res)
            console.log(res)
            localStorage.setItem("keyBase", res.email)


        })
        http.post('/loginUser', data2).then(res => {
            setError2(res)

        })

        if (data2.userPswLogin === "" && data2.userLogin === "") {
            setErrMsg("Fields are required")
            return
        }
        if (data2.userLogin && data2.userPswLogin) {
            history.push('/Home')
        }


    }


    return <BoxContainer>
        <FormContainer>
            <Input ref={loginEmailRef} type="email" placeholder="Email"/>
            <Input ref={loginPasswordRef} type="password" placeholder="Password"/>
        </FormContainer>
        <Marginers direction="vertical" margin={10}/>
        <MutedLink style={{margin: "0.4em"}} href="#">Forget your password?</MutedLink>
        <div>{errMsg}</div>
        <Marginers direction="vertical"/>
        <SubmitButton style={{margin: "1.9em"}} type="submit" onClick={loginBtn}>Signin</SubmitButton>
        <MutedLink href="#">Don`t have an account? <BoldLink href="#" onClick={trigger}>
            Signup
        </BoldLink>
        </MutedLink>
    </BoxContainer>
};

export default LoginForm;