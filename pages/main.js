import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Main = ({ user, setUser }) => {
	const router = useRouter()
	const [orderData, setOrderData] = useState({})
	useEffect(() => {
		if (!user) {
			alert('Login First!')
			router.push('/')
		} else {
			window.sessionStorage.setItem('user', user._id)
			axios({
				url: `${window.location.origin}/api/orders?id=${user._id}`,
				method: 'post',
			})
				.then(async (res) => {
					console.log(res.data)
					if (res.data && res.data.order && res.data.order.length !== 0 || res.data.status === 'Delivering') {
						let order = await axios({
							url: `${process.env.REACT_APP_API_BASE_URL}/orders/${res.data.order}`,
							method: 'get',
						})
						setOrderData(order.data)
					}
				})
		}
	}, [user])

	const orderDelivered = async () => {
		let body = {
			status: 'Delivered'
		}
		let order = await axios({
			url: `http://localhost:5055/api/orders/${orderData._id}`,
			method: 'put',
			data: body
		})
		.then(async () => {
			let staffBody = {status: "Idle", order: ""}
			// let staff = await axios({
			// 	url: `http://localhost:5055/api/admin/update/${window.sessionStorage.getItem('user')}`,
			// 	method: 'put',
			// 	data: {staffBody}
			// })
		})
		setOrderData()
	}

	return (
		<>
			<div className='h-screen w-screen bg-gray-800 nunito p-3'>
				<h1 className='text-center my-3 font-bold text-white text-2xl'>Delivery Details</h1>
				<div className='text-white p-3 bg-gray-600 rounded-lg shadow-lg'>
					<h1 className='text-white font-bold text-2xl mb-2'>Assigned Order:</h1>
					{orderData ? <div>
						<p>Name: <span className='font-semibold'>{orderData && orderData.name}</span></p>
						<p>Contact: <a className='font-semibold' href={`tel:7057094772`}>{orderData && orderData.contact}</a></p>
						<p>City: <span className='font-semibold'>{orderData && orderData.city}</span></p>
						<p>Zipcode: <span className='font-semibold'>{orderData && orderData.zipCode}</span></p>
						<p>Payment: <span className='font-semibold'>{orderData && orderData.paymentMethod}</span></p>
						<p>Address: <span className='font-semibold'>{orderData && orderData.address}</span></p>
						<p>Total: <span className='font-semibold'>{orderData && orderData.total}</span></p>
						<p>Items: <span className='font-semibold'>{orderData && orderData.cart && orderData.cart.length}</span></p>

						<button onClick={orderDelivered} className='mt-2 bg-blue-700 hover:bg-blue-600 duration-200 rounded-md font-bold text-white px-2 py-1'>Delivered</button>
					</div> : <h1 className='font-bold text-2xl'>No Orders!</h1>}
				</div>
				<div className='mt-3 p-3 bg-gray-600 rounded-lg shadow-lg'>
					<h1 className='font-bold text-2xl mb-2 text-white'>Assigned Order:</h1>
					<div>
						<label className='text-white font-semibold mb-1' htmlFor="status">Status: </label>
						<select className='w-full outline-none px-3 py-2 rounded-md border-2 border-transparent focus:border-gray-400 duration-150' id="status">
							<option value="">--select--</option>
							<option value="Unavailable">Unavailable</option>
							<option value="Delivering">Delivering</option>
							<option value="Idle">Idle</option>
						</select>
						<button className='mt-2 bg-blue-700 hover:bg-blue-600 duration-200 rounded-md font-bold text-white px-2 py-1'>Submit</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Main