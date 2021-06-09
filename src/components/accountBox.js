import React, {useState, createContext} from 'react';
import styled from "styled-components";
import LoginForm from "./loginForm";
import {motion} from "framer-motion"
import SignupForm from "./SignupForm";
export const AccountContext = createContext();


const BoxContainer = styled.div`
  margin-top: 40px;
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: white;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`
const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(227, 230, 147);
  background: linear-gradient(63deg, rgba(227, 230, 147, 1) 0%, rgba(236, 190, 35, 1) 45%, rgba(242, 203, 41, 1) 100%, rgba(0, 212, 255, 1) 100%);
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

`

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: white;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
  
`

const backDropVariants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
}

const AccountBox = () => {

    const [isExpanded, setExpanded] = useState(false)
    const [active, setActive] = useState("signIn")

    const playExpandingAnimation = () => {
        setExpanded(true)
        setTimeout(() => {
            setExpanded(false)
        }, expandingTransition.duration * 1000 - 1500);
    }

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup")
        }, 400)
    }
    const switchToSignIn = () => {
        console.log("yes")
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signIn")
        }, 400)
    }

    const contextValue = {switchToSignup, switchToSignIn}

    return (
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>
                    <BackDrop initial={false}
                              animate={isExpanded ? "expanded" : "collapsed"}
                              variants={backDropVariants}
                              transition={expandingTransition}
                    />
                    {active === "signIn" && (
                        <HeaderContainer>
                        <HeaderText>Welcome</HeaderText>
                        <HeaderText>Back</HeaderText>
                        <div style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: "11px",
                            zIndex: "10",
                            margin: "0",
                            marginTop: "6px"
                        }}>Please sign in to continue
                        </div>
                    </HeaderContainer>
                        )}
                    {active === "signup" && (
                        <HeaderContainer>
                        <HeaderText>Create</HeaderText>
                        <HeaderText>Account</HeaderText>
                        <div style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: "11px",
                            zIndex: "10",
                            margin: "0",
                            marginTop: "6px"
                        }}>Please sign-up to continue!
                        </div>
                    </HeaderContainer>)}
                </TopContainer>
                <InnerContainer>
                    {active === "signIn" && <LoginForm trigger={switchToSignup}/>}
                    {active === "signup" && <SignupForm/>}
                </InnerContainer>
            </BoxContainer>
        </AccountContext.Provider>
    )
};

export default AccountBox;