import React from 'react';

import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2.5px rgba(15, 15, 15, 0.19);

`

export const MutedLink = styled.a`
  font-size: 10px;
  color: rgba(241, 196, 15);
  font-weight: 500;
  text-decoration: none;
  
`

export const BoldLink = styled.a`
  font-size: 11px;
  color: rgb(241, 196, 15);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  //border: 1px solid rgba(200, 200, 200, 0.0.3);
  padding: 0 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  border-style: none;


  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  
  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(241, 196, 15);
  }
`

export const SubmitButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 11px 40%;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
          63deg, 
          rgba(227,230,147,1) 0%, 
          rgba(236,190,35,1) 45%, 
          rgba(242,203,41,1) 100%,
          rgba(0,212,255,1) 100%);
  
  &:hover {
    filter: brightness(1.03);
  }
`
