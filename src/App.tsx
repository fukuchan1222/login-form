import React, { useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

interface LoginForm {
  name:string;
  email:string;
  password:string;
}

const validationSchema = z.object({
  name:z
    .string()
    .min(1,{message:"名前は必須です"}),
  email:z
    .string()
    .email({message:"メール形式で入力してください"})
    .min(1,{message:"メールアドレスを入力してください"}),
  password:z
    .string()
    .min(8,{message:"8文字以上で入力してください"})
});


function App() {

  const {
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm<LoginForm>({
    mode:"onChange",
    resolver:zodResolver(validationSchema),
  });


  const onSubmit = (data:LoginForm) => {
    console.log("submitted Data", data);
  };

  return (
    <div className="container">
      <div className="form-content">
        <h2>ログインフォーム</h2>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <label htmlFor="username">ユーザーＩＤ</label>
            <input 
              type="text" 
              id="username"
              {...register("name")}
            />
            {errors.name && <p>{errors.name.message as React.ReactNode}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="email">メールアドレス</label>
            <input 
              type="email" 
              id="email"
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message as React.ReactNode}</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="password">パスワード</label>
            <input
              type="password" 
              id='password'
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message as React.ReactNode}</p>}
          </div>
          <button type='submit' className='submitbtn'>ログイン</button>
        </form>
      </div>
    </div>
  );
}

export default App;

