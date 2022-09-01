import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/5b43f1fbfd.css?display=optional"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
