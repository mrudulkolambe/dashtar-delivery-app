import axios from "axios"

export default async function handler(req, res) {
	axios({
		url: `https://dashtar-store-backend.vercel.app/api/admin/${req.query.id}`,
		method: 'post',
	})
		.then((response) => {
			console.log(response);
			res.send(response.data)
		}).catch((err) => {
			res.send(err)
		})

}
