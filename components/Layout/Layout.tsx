import Head from 'next/head'
import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import Footer from './Footer'
import Header from './Header'

import 'react-toastify/dist/ReactToastify.min.css';

type Props = {
    children: ReactNode
    name: string
    layout?: string
}

const Layout: React.FC<Props> = ({ children, name, layout = 'standard' }) => {
    const title = name !== '' ? `eXperience: ${name}` : 'eXperience'

    return (
        <div className="w-full min-h-screen bg-black text-white">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            {layout === 'experience' && <Header name={name} />}
            <main>{children}</main>
            <Footer />
            <ToastContainer
                theme={'dark'}
                position="bottom-center"
                autoClose={5000}
                transition={Slide}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Layout
