import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignUp = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')

  const navigate = useNavigate()

  const {user, setuser} = React.useContext(UserDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password
    }

    console.log("New user : ", newUser);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)

    if(response.status === 201){

      const data = response.data

      setuser(data.user)
      localStorage.setItem('token', data.token)


      navigate('/login')
    }

    setemail('')
    setpassword('')
    setfirstname('')
    setlastname('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
      <img
          className="w-28 mb-8"
          src="/public/rideease-logo.png"
        />
        <form onSubmit={(e)=> {
            submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className='flex gap-4 mb-6'>
          <input
            required
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base"
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e) => {
              setfirstname(e.target.value)
            }}
          />
          <input
            required
            className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
            type="text"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => {
              setlastname(e.target.value)
            }}
          />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setemail(e.target.value)
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value)
            }}
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Create account
          </button>
          <p className="text-center">Already have a Account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>
          By proceeding, you consent to get calls, Whatsapp or SMS messages, including by automated means, from RideEase and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default UserSignUp