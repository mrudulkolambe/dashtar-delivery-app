import { useState } from 'react'
import '../styles/globals.css'
import '../styles/Main.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()
  return <Component user={user} setUser={setUser} {...pageProps} />
}

export default MyApp
