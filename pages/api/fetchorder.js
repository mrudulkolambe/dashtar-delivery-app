import axios from "axios"

export default async function handler(req, res) {
	axios({
		url: `${process.env.REACT_APP_API_BASE_URL}/orders/${req.query.id}`,
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
