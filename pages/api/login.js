import axios from "axios"

export default function handler(req, res) {
  const user = axios({
    url: `${process.env.REACT_APP_API_BASE_URL}/admin/staff-login`,
    method: 'post',
    data: {
      email: req.body.email,
      password: req.body.password
    }
  })
  res.status(200).send(user)
}
