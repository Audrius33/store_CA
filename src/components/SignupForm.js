import React, {useContext, useRef, useState} from 'react';
import {BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink} from "./StylesForAcc";
import {Marginers} from "../components/marginer/index"
import {AccountContext} from "./accountBox";
import http from "../plugins/Fetch"


const SignupForm = () => {

    const fullNameRef = useRef()
    const clientEmailRef = useRef()
    const passwordRef1 = useRef()
    const passwordRef2 = useRef()

    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const {switchToSignIn} = useContext(AccountContext);

    function resetInputFields() {
        fullNameRef.current.value = ""
        clientEmailRef.current.value = ""
        passwordRef1.current.value = ""
        passwordRef2.current.value = ""
    }

    function sendValue() {
        const data = {
            userName: fullNameRef.current.value,
            userEmail: clientEmailRef.current.value,
            userPsw1: passwordRef1.current.value,
            userPsw2: passwordRef2.current.value
        }
        http.post('/addUser', data).then(res => {
            setData(res)
            setError(res.message)
            console.log(res.message)

        })
        resetInputFields()
    }

    return <BoxContainer>
        <FormContainer>
            <Input ref={fullNameRef} type="text" placeholder="Full name"/>
            <Input ref={clientEmailRef} type="email" placeholder="Email"/>
            <Input ref={passwordRef1} type="password" placeholder="Password"/>
            <Input ref={passwordRef2} type="password" placeholder="Confirm Password"/>
        </FormContainer>
        <Marginers direction="vertical" margin={10}/>
        <div className="errorStyleRed">{error}</div>
        <MutedLink style={{margin: "0.4em"}} href="#">Forget your password?</MutedLink>

        <Marginers direction="vertical"/>
        <SubmitButton style={{margin: "1.9em"}} type="submit" onClick={sendValue}>SignUp</SubmitButton>
        <MutedLink href="#">
            Have an account?
            <BoldLink href="#" onClick={switchToSignIn}>
                Sign In here
            </BoldLink>
        </MutedLink>
    </BoxContainer>
};

export default SignupForm;