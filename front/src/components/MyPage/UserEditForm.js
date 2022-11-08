import React, { useEffect, useState } from "react";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/userEditForm.css";
import * as Api from '../../api'
import { Form } from "react-bootstrap";
const UserEditForm = ({name, setName, password, setPassword, setShowForm, setShowContent}) => {
  const validatePwd = (password) => {
    // 비밀번호 : 숫자+영문자+특수문자 조합으로 8자리 이상 입력
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
  };  
  const isPwdValid = validatePwd(password);
  useEffect(()=>{
    Api.get('currentUser').then((res)=>setName(res.data.name))
  },[])
const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!isPwdValid){
    alert('비밀번호는 영어,숫자,특수문자를 합쳐 8글자 이상으로 작성해주세요')
    return;
  }
  try{
    await Api.put('userUpdate', {
      name: name
    });
   
    await Api.put('passwordUpdate',{
      password: password
    })
    setShowForm(false)
    setShowContent('정보수정')
  } catch(e){
    console.error(e)
  }
}
  return (
    <form onSubmit={handleSubmit}>
    <div className="userEditForm">
     
      <h5>닉네임</h5>
      <div className="nameInput">
        <input
        placeholder="이름을 입력하세요"
        onChange={(e)=>{
            setName(e.target.value)
        }}
        />
      </div>
      
      <h5>비밀번호 변경</h5>
      <div className="descriptionInput">
        <input
        type="password"
        placeholder="비밀번호 변경"
        onChange={(e)=>{
            setPassword(e.target.value)
            console.log(name)
        }}
        />
      </div>
     
      <div className="btnContainer">
        <StyledButton onClick={handleSubmit}>수정하기</StyledButton>
      </div>
    </div>
    </form>
  );
};

export default UserEditForm;
