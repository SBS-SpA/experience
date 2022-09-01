import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../../components/Layout/Layout"
import Loader from "../../components/Layout/Loader"

const localesAccepted: any = {
	// de: 'de_DE',
	en: 'en_US',
	// es: 'es_ES',
	// fr: 'fr_FR',
	it: 'it_IT',
	// pl: 'pl_PL',
}

const Redirect: NextPage = () => {
	const router = useRouter()
	const { sku } = router.query

	useEffect(() => {
		const locale = navigator.language.substring(0, 2)
		if (typeof locale === 'string' && typeof sku === 'string') {
			if (localesAccepted[locale] !== undefined) {
				router.replace(`/${locale}/${sku}`)
			} else {
				router.replace(`/en/${sku}`)
			}
		}
	})

	return <Layout name="Loading">
		<Loader />
	</Layout>
}

export default Redirect