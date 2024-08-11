import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const data = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      }

  const navigate = useNavigate();

  const signUpEvent = useCallback(() => {
    axios.post(
      "http://localhost:3000/api/v1/user/signup", 
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((response) => {
      alert(response.data.msg);
      localStorage.setItem("token", response.data.userId);
      navigate("/dashboard");
    }).catch((err) => {
      alert(err.response.data.msg);
    })
  } , [username, password, firstName, lastName])

  return <div className="grid h-screen place-items-center bg-neutral-500">
    <div className="p-8 border rounded-md bg-white">
      <h1 className="py-1 text-center font-bold text-4xl"> Sign up </h1>
      <h2 className="p-2 text-neutral-400"> Enter your information to create an account </h2>
      <h2 className="font-medium"> First Name </h2>
      <input type="text" value = { firstName } onChange={ (e) => {
          setFirstName(e.target.value)
        } 
      } className="my-1 p-2 border border-neutral-300 w-full rounded-md"/>
      <h2 className="font-medium"> Last Name </h2>
      <input type="text" value = { lastName } onChange={ (e) => {
          setLastName(e.target.value)
        } 
      }
      className="my-1 p-2 border border-neutral-300 w-full rounded-md"/>
      <h2 className="font-medium"> Username </h2>
      <input type="text" value = { username } onChange={ (e) => {
          setUsername(e.target.value)
        } 
      }
      className="my-1 p-2 border border-neutral-300 w-full rounded-md"/>
      <h2 className="font-medium"> Password </h2>
      <input type="password" value = { password } onChange={ (e) => {
          setPassword(e.target.value)
        } 
      }
      className="my-1 p-2 border border-neutral-300 w-full rounded-md"/> <br />
      <button className="w-full py-2 my-3 bg-neutral-900 text-neutral-50 rounded-md" onClick={ signUpEvent } > Sign Up </button>
      <h2 className="font-medium"> Already have an account? 
        <a href="" className="text-blue-800 underline"> Login </a> </h2>
    </div>
  </div>
}

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const data = {
    username: username,
    password: password,
  }

  const signInEvent = useCallback(() => {
    axios.post(
      "http://localhost:3000/api/v1/user/signin", 
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((response) => {
      alert(response.data.msg);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }).catch((err) => {
      alert(err.response.data.msg);
    })
  } , [username, password])

  return <div className="grid h-screen place-items-center bg-neutral-500">
    <div className="p-8 border rounded-md bg-white">
      <h1 className="py-1 text-center font-bold text-4xl"> Sign In </h1>
      <h2 className="p-2 text-neutral-400" > Enter your credentials to access your account </h2>
      <h2 className="font-medium"> Username </h2>
      <input type="text" value = { username } onChange={ (e) => {
          setUsername(e.target.value)
        } 
      } 
      className="my-1 p-2 border border-neutral-300 w-full rounded-md"/>
      <h2 className="font-medium"> Password </h2>
      <input type="password" value = { password } onChange={ (e) => {
          setPassword(e.target.value)
        } 
      } 
      className="my-1 p-2 border border-neutral-300 w-full rounded-md"/>
      <button onClick = { signInEvent } className="w-full py-2 my-3 bg-neutral-900 text-neutral-50 rounded-md"> Sign In </button>
      <h2 className="font-medium"> Dont have an account? <a href="" className="text-blue-800 underline"> Sign Up </a> </h2>
    </div>
  </div>
}
