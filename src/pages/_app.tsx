import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import "../styles/css.css"

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={roboto.className}><Component {...pageProps} /></main>
}