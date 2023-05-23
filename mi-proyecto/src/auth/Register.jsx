import React from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useForm } from "react-hook-form";
import './Register.css';

const Register = ({ setLogin }) => {
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => handleRegister(data)

  const handleRegister = async (formState) => {
    let { name, password, password2, email } = formState;
    try {
      if (password2 !== password) {
        setError("The password must be the same.")
        return false;
      }
      const data = await fetch("http://127.0.0.1:8000/api/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setAuthToken(resposta.authToken);
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch {
      console.log("Error");
      alert("Catch");
    };
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="labelLogin" for="form2Example1">Register</label>

        <div className="form-outline mb-4">
          <label className="label" for="form3Example3cg">Your Name</label>
          <br></br>
          <input {...register("name", {
            required: "This camp is required",
            pattern: {
              message:
                "Enter a name please"
            }
          })}
            type="email" id="form2Example1" className="form-control"
          />
          {errors.name && <p>{errors.name.message}</p>}

        </div>

        <div className="form-outline mb-4">
          <label className="label" for="form3Example3cg">Your Email</label>
          <br></br>
          <input {...register("email", {
            required: "This camp is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@/,
              message:
                "Enter a email please"
            }
          })}
            type="email" id="form2Example1" className="form-control"
          />
          {errors.email && <p>{errors.email.message}</p>}

        </div>
        <div className="form-outline mb-4">
          <label className="label" for="form2Example2">Password</label>
          <div className="not">
            <input
              {...register("password", {
                required: "The password is required",
                minLength: {
                  value: 6,
                  message: "The password must have at least 6 characters",
                },
              })}
              type="password"
              id="form2Example2"
              className="form-control"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

        </div>

        <div className="form-outline mb-4">

          <label className="label" for="form3Example4cdg">Repeat your password</label>

          <div className="form-outline mb-4">
            <input
              {...register("password2", {
                required: "The password is required",
                minLength: {
                  value: 6,
                  message: "The password must have at least 6 characters",
                },
              })}
              type="password"
              id="form2Example2"
              className="form-control"
            />
            {errors.password2 && <p>{errors.password2.message}</p>}
          </div>
        </div>
        <div className="centrar" >
          <p className="not">Have already an account? <a href="#!"
            onClick={() => {
              setLogin(true)
            }}
          >Login here</a></p>
        </div>
        <button type="button" className="sign"
          onClick={handleSubmit(onSubmit)}
        >Sign up</button>
        {error ? (<div>{error}</div>) : (<></>)}

        <img className="logo" src="/images/filmcompany.png" alt="Logo" />


      </form>

    </div>

  )
}

export default Register
