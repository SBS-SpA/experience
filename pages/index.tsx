import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Loader from '../components/Layout/Loader'
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout/Layout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['home'])),
        }
    }
}

const Home: NextPage = () => {
    const { t } = useTranslation('home')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 2000)

        return () => clearTimeout(timeout)
    })

    return (
        <Layout name=''>
            <div className="w-full h-screen flex flex-col items-center justify-evenly bg-black text-white text-lg gap-5">
                <Loader isStatic={!isLoading} />
                {!isLoading && (
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <p className='text-center px-5'>
                            {t('start')}
                        </p>
                        <Link href="/scanner"><a className='border p-3'>{t('scan')}</a></Link></div>
                )}
            </div>
        </Layout>
    )
}

export default Home
