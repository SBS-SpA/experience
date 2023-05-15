import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { MdArrowUpward } from 'react-icons/md'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Attributes from '../components/Attributes/Attributes'
import Gallery from '../components/Images/Gallery'
import ImageContainer from '../components/Images/ImageContainer'
import Logo from '../components/Images/Logo'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Layout/Loader'

import classes from '/styles/Attributes.module.css'
import { useTranslation } from 'next-i18next'

type Attribute = {
	code: string
	label: string
	value: string
}

type Image = {
	src: string
	alt: string
}

type Data = {
	isLoading: boolean
	shortName: string
	longName: string
	subtitle: string
	attributes: Attribute[]
	description: string
	images: Image[]
	productImage: Image
}

const localesAccepted: any = {
	// de: 'de_DE',
	en: 'en_GB',
	// es: 'es_ES',
	// fr: 'fr_FR',
	it: 'it_IT',
	// pl: 'pl_PL',
}

export const getStaticPaths: GetStaticPaths = async () => {
	// const response = await fetch(
	//     'https://jsonplaceholder.typicode.com/posts?_page=1'
	// )
	// const postList = await response.json()
	// return {
	//     paths: postList.map((post) => {
	//         return {
	//             params: {
	//                 id: `${post.id}`,
	//             },
	//         }
	//     }),
	//     fallback: false,
	// }
	const arr: string[] = [
		// 'TEUNBKEX4IP1361',
		// 'TEINSTIP1461PR',
		// 'TEMAGCOVIP1461PT',
		// 'TESPEARMOOVEBTK',
		// 'GLBEATCOLHRM',
		// 'TECHGMAGW',
		// 'TETR1USB2CPD45W',
		// 'TEBB20000LCDEVOPD20K',
		// 'TEKITCC3X1WBK',
		// 'TESUPPWHEELK',
		// 'TEHWSUPCLIPSTG',
		// 'TESQUIDPODSK',
		// 'TESTREAMKIT',
		// 'TESELFIRINGCLIP10RGB',
	]

	return {
		paths: arr.map((sku) => {
			return {
				params: { sku },
			}
		}),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const { sku: ean } = params!

	let sku = ean

	const baseUrl = process.env.CATALOGIC_BASEURL

	const lang =
		typeof locale === 'string' && localesAccepted[locale] !== undefined
			? localesAccepted[locale]
			: localesAccepted.en

	// login
	const body = {
		username: process.env.CATALOGIC_USERNAME,
		password: process.env.CATALOGIC_PASSWORD,
	}
	const loginResponse = await fetch(`${baseUrl}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
	if (loginResponse.ok) {
		const { token } = await loginResponse.json()

		// convertitore ean to sku
		const skuResponse = await fetch(`${baseUrl}/api/products/sku/${ean}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		if (skuResponse.ok) {
			sku = await skuResponse.json()
		}

		// get info
		const infoResponse = await fetch(
			`${baseUrl}/api/product/${sku}/details/${lang}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		if (infoResponse.ok) {
			const { details } = await infoResponse.json()

			if (
				details.product_image !== undefined &&
				details.name !== undefined &&
				details.subtitle !== undefined &&
				details.description !== undefined &&
				details.technicalDetails !== undefined
			) {
				const { technicalDetails } = details
				const labelGalleryImages = details.gallery_images?.label
				const labelGalleInfographicsImages =
					details.infographics_images?.label

				const attributes: Attribute[] = []
				const productImage: Image = {
					alt: `${details.product_image.label} ${details.name.value}`,
					src: '',
				}
				const images: Image[] = []

				for (const key in technicalDetails) {
					if (technicalDetails[key].value !== null) {
						key !== 'ean' &&
							(key === 'color' ||
								key === 'compatibility_group') &&
							attributes.push({
								code: key,
								label: technicalDetails[key].label,
								value: technicalDetails[key].value.label,
							})

						key !== 'ean' &&
							key !== 'mecover_compatible' &&
							key !== 'color' &&
							key !== 'compatibility' &&
							key !== 'compatibility_group' &&
							attributes.push({
								code: key,
								...technicalDetails[key],
							})
					}
				}

				// get images
				const responseProductImage = await fetch(
					details.product_image.value,
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				const blob = await responseProductImage.blob()

				productImage.src = `data:image/jpg;base64, ${Buffer.from(
					await blob.arrayBuffer()
				).toString('base64')}`

				if (details.gallery_images) {
					for (
						let i = 0;
						i < details.gallery_images.value.length;
						i++
					) {
						const galleryImage = details.gallery_images.value[i]
						const response = await fetch(galleryImage, {
							headers: { Authorization: `Bearer ${token}` },
						})
						const blob = await response.blob()
						images.push({
							alt: `${labelGalleryImages} ${details.name.value}`,
							src: `data:image/jpg;base64, ${Buffer.from(
								await blob.arrayBuffer()
							).toString('base64')}`,
						})
					}
				}

				if (details.infographics_images) {
					for (
						let i = 0;
						i < details.infographics_images.value.length;
						i++
					) {
						const infographicImage =
							details.infographics_images.value[i]
						const response = await fetch(infographicImage, {
							headers: { Authorization: `Bearer ${token}` },
						})
						const blob = await response.blob()
						images.push({
							alt: `${labelGalleInfographicsImages} ${details.name.value}`,
							src: `data:image/jpg;base64, ${Buffer.from(
								await blob.arrayBuffer()
							).toString('base64')}`,
						})
					}
				}

				return {
					props: {
						isLoading: false,
						shortName: details.category_title
							? details.category_title.value
							: details.name.value,
						longName: details.name.value,
						subtitle: details.subtitle.value,
						attributes: attributes,
						description: details.description.value,
						images: images.length > 0 ? images : [productImage],
						productImage: productImage,
						...(await serverSideTranslations(locale!, ['product']))
					},
				}
			}
		}
	}

	return {
		props: {
			isLoading: false,
			shortName: '',
			longName: '',
			subtitle: '',
			attributes: [],
			description: '',
			images: [],
			productImage: {},
			...(await serverSideTranslations(locale!, ['product']))
		},
	}
}

const Experience: NextPage<Data> = ({
	isLoading = true,
	shortName,
	longName,
	subtitle,
	attributes,
	description,
	images,
	productImage,
}) => {
	const router = useRouter()
	const { t } = useTranslation('product')
	const ref = useRef<HTMLDivElement>(null)
	const [isSticky, setIsSticky] = useState(true)

	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				setIsSticky(ref.current.offsetTop > window.scrollY)
			} else {
				setIsSticky(true)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [setIsSticky])

	if (
		shortName &&
		longName &&
		attributes &&
		description &&
		productImage &&
		subtitle
	) {
		return (
			<Layout name={shortName} layout="experience">
				<div id="overview"></div>
				<div className={`${isSticky ? 'z-0' : '-z-10'} sticky top-0 grid grid-rows-1-auto overflow-hidden min-h-screen bg-white text-black`}>
					<div
						className="h-full w-full flex flex-col items-start justify-center text-xl medium:text-3xl tall:text-4xl text-left px-8 pt-14 medium:pt-16 gap-2 medium:gap-4"
					>
						<Logo />
						<span>{longName}</span>
					</div>
					<ImageContainer {...productImage} />
				</div>
				<div ref={ref} className="min-h-screen rounded-t-xl bg-black z-10 relative">
					<Attributes listAttrubutes={attributes} subtitle={subtitle} />
					<Gallery images={images} />
					<div className="mb-10" id="description"></div>
					<div
						className={`p-10 text-white/70 text-md ${classes.description}`}
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					></div>
					<a
						href="#overview"
						className="flex items-center m-auto gap-1 px-5 py-2 border w-fit"
					>
						{t('backToTop')} <MdArrowUpward className="animate-bounce w-6 h-6" />
					</a>
				</div>
			</Layout>
		)
	} else if (isLoading) {
		return (
			<Layout name="Loading">
				<Loader />
			</Layout>
		)
	} else {
		const { sku } = router.query

		return (
			<Layout name={t('notFound')}>
				<div className="flex flex-col h-screen w-screen items-center justify-center gap-5">
					<label className="text-3xl">{sku}</label>
					<label className="text-xl font-bold">
						{t('notFound')}
					</label>
					<Link href="/scanner">
						<a className="border p-3">{t('scanAnother')}</a>
					</Link>
				</div>
			</Layout>
		)
	}
}

export default Experience
