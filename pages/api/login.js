import axios from "axios"

export default function handler(req, res) {
  const user = axios({
    url: `https://dashtar-store-backend.vercel.app/api/admin/staff-login`,
    method: 'post',
    data: {
      email: req.body.email,
      password: req.body.password
    }
  })
  res.status(200).send(user)
}
