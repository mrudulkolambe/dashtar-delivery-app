import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home({setUser}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const login = () => {
    setLoading(true)
    axios.post(`${window.location.origin}/api/login`, { email, password })
      .then((res) => {
        if (res) {
          setLoading(false);
          console.log(res.data)
          setUser(res.data)
          alert('Login successfull')
          router.push('/main')
        }
      })
      .catch((err) => {
        alert(err.message)
        setLoading(false)
      });
  }
  return (
    <>
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-800 nunito'>
        <h1 className='text-2xl text-white font-bold mb-10'>Fruitflix Delivery Login</h1>
        <form className='w-11/12'>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-white font-semibold mb-1'>Email: </label>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full outline-none px-3 py-2 rounded-md border-2 border-transparent focus:border-gray-400 duration-150' type="text" id='email' placeholder='jondoe@gmail.com' />
          </div>
          <div className='flex flex-col mt-3'>
            <label htmlFor="password" className='text-white font-semibold mb-1'>Password: </label>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full outline-none px-3 py-2 rounded-md border-2 border-transparent focus:border-gray-400 duration-150' type="text" id='email' placeholder='***********' />
          </div>
          <div className='flex w-full justify-center'>
            <button onClick={login} disabled={loading} type="button" className="font-bold mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              {loading ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
