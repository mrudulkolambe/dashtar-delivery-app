import axios from "axios"

export default async function handler(req, res) {
	axios({
		url: `https://dashtar-store-backend.vercel.app/api/orders/${req.query.id}`,
		method: 'get',
	})
		.then((response) => {
			console.log(response.data);
			res.send(response)
		})
		.catch((err) => {
			res.send(err)
		})
}
