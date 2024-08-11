import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, balanceAtom } from "../states/SignupAtom";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Dashboard() {
  const [users, setUsers] = useRecoilState(userAtom);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(
      "http://localhost:3000/api/v1/account/balance", 
      {
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer ' + token
        }
      }
    ).then((response) => {
      setBalance(response.data.balance);
    }).catch((err) => {
      alert(err.response.data.msg);
    })
  } , [balance])
  
  return <div>
    <Appbar />
    <Balance />
    <User />
    <Users users={users} />
  </div>
}

export function SendMoney() {
  const [users, setUsers] = useRecoilState(userAtom);
  const token = 'Bearer ' + localStorage.getItem("token");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const data = {
    fn: firstName,
    ln: lastName
  }

  useEffect(() => {
    axios.post("http://localhost:3000/api/v1/user/bulk",
      data, 
      {
        headers: {
          Authorization: token
        }
      })
      .then((res)=>{
        setUsers(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  } , [firstName, lastName])

  return <div className="grid h-screen place-items-center bg-neutral-500">
    <div className="p-8 border rounded-md bg-white">
      <h1 className="py-1 text-center font-bold text-4xl mb-10 px-20"> Send Money </h1>
      <div className="flex">
        <button className="py-2 px-4 border rounded-full mr-2"> U </button>
        <h1 className="font-bold text-2xl py-2"> filler </h1>
      </div>
      <h2 className="font-medium"> Amount (in Rs) </h2>
      <input type="number" placeholder="Enter Amount" className="my-2 p-2 border border-neutral-300 w-full rounded-md"/>
      <br />
      <button className="font-medium w-full py-2 my-1 bg-neutral-900 text-neutral-50 rounded-md bg-green-500"> Initiate Transfer </button>
      </div>
    </div>
}

function Appbar() {
  return <div className="flex justify-between border drop-shadow-xl p-2 m-2">
    <h1 className="font-bold text-3xl"> Payments App </h1>
    <div className="flex">
      <h2 className="p-2"> Hello, User </h2>
      <button className="py-2 px-4 border rounded-full "> U </button>
    </div>
  </div>
}

function Balance() {
  const balance = useRecoilValue(balanceAtom);

  return <div className="px-4 my-4">
    <h1 className="font-semibold text-xl"> Your Balance {'₹'+balance} </h1>
  </div>
}

function User() {
  const [users, setUsers] = useRecoilState(userAtom);
  const token = 'Bearer ' + localStorage.getItem("token");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const data = {
    fn: firstName,
    ln: lastName
  }

  const fetchUsers = useCallback(() => {
    axios.post("http://localhost:3000/api/v1/user/bulk",
      data, 
      {
        headers: {
          Authorization: token
        }
      })
      .then((res)=>{
        setUsers(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  } , [firstName, lastName])

  return <div className="m-3">
    <h1 className="font-bold text-2xl">Users</h1>
    <div className="flex">
      <input type="text" placeholder="First Name" value = { firstName } onChange={ (e) => {
          setFirstName(e.target.value)
        } 
      }
      className="my-2 p-2 w-full border border-neutral-400 rounded-md"/>
      <input type="text" placeholder="Last Name" value = { lastName } onChange={ (e) => {
          setLastName(e.target.value)
        } 
      }
      className="m-2 p-2 w-full border border-neutral-400 rounded-md"/>
      <button onClick = { fetchUsers } className="p-4 my-2 border rounded-md bg-neutral-800 text-white">Search</button>
    </div>
    </div>
}

function Users({ users }) {
  const navigate = useNavigate();
  const navigateToPayment = useCallback(()=>{
    // navigate user to sendmoney route along with the recipient userID
    navigate("/send");
    localStorage.setItem("userDetails", users);
  },[])

  return <div>
    { users.map(function (user) {
      return <div key = {user.username} className="flex justify-between py-1">
        <div className="flex">
        <button className="px-5 border rounded-full "> U </button>
        <h1 className="px-3 py-2 my-1 font-medium text-xl">{user.username}</h1>
        </div>
        <button onClick = { navigateToPayment } className="px-3 m-1 border rounded-md bg-neutral-800 text-white">Send Money</button>
        </div>
    })}
    </div>
}

