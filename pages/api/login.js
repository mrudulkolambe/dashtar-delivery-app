import axios from "axios"

export default async function handler(req, res) {
  let user = await axios({
    url: `https://dashtar-store-backend.vercel.app/api/admin/staff-login`,
    method: 'post',
    data: {
      email: req.body.email,
      password: req.body.password
    }
  })
    // .then((response) => {
    //   res.send(response)
    // })
    // .catch((err) => {
    //   res.send(err)
    // })
    res.send(user)
}
