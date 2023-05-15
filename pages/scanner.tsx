import {
	Html5Qrcode,
	Html5QrcodeScanType,
	Html5QrcodeSupportedFormats,
} from 'html5-qrcode'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Form from '../components/Layout/Form'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Layout/Loader'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, ['form'])),
		}
	}
}

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height,
	}
}

const localesAccepted: any = {
	// de: 'de_DE',
	en: 'en_GB',
	// es: 'es_ES',
	// fr: 'fr_FR',
	it: 'it_IT',
	// pl: 'pl_PL',
}

const Scanner = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (code: string) => {
		if (code !== '') {
			setIsLoading(true)
			const locale = navigator.language.substring(0, 2)
			const lang = typeof locale === 'string' && localesAccepted[locale] !== undefined
				? locale
				: 'en'
			router.push(`/${lang}/${code}`)
		}
	}

	useEffect((): any => {
		const fetchCameras = async () => {
			const html5QrcodeScanner = new Html5Qrcode('reader', {
				verbose: false,
				formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
			})

			let camera = null
			const cameras = await Html5Qrcode.getCameras()
			if (cameras.length > 1) {
				const selectCamera = cameras.find(curCamera => curCamera.label.startsWith('camera2 0'))

				if (selectCamera) {
					camera = selectCamera.id
				}
			}

			const { width, height } = getWindowDimensions()
			const config: any = {
				fps: 60,
				qrbox: (viewfinderWidth: number, viewfinderHeight: number) => ({
					width: viewfinderWidth / 2,
					height: ((viewfinderWidth / 2) * 9) / 16,
				}),
				aspectRatio: 1.0,
				rememberLastUsedCamera: true,
				supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
				experimentalFeatures: {
					useBarCodeDetectorIfSupported: true
				}
			}

			const onScanSuccess = (decodedText: any, decodedResult: any) => {
				// handle the scanned code as you like, for example:
				// console.log(`Code matched = ${decodedText}`, decodedResult)
				// controllare che sia un barcode EAN13
				html5QrcodeScanner.stop()
				setIsLoading(true)
				const locale = navigator.language.substring(0, 2)
				const lang = typeof locale === 'string' && localesAccepted[locale] !== undefined
					? locale
					: 'en'
				router.push(`/${lang}/${decodedText}`)
			}

			const onScanFailure = (error: any) => {
				// handle scan failure, usually better to ignore and keep scanning.
				// for example:
				// console.warn(`Code scan error = ${error}`)
			}

			html5QrcodeScanner.start(
				camera ? camera : { facingMode: 'environment' },
				config,
				onScanSuccess,
				onScanFailure
			)
		}

		fetchCameras()
	}, [router])

	return (
		<Layout name='scanner'>
			{!isLoading && <div className="w-full h-screen flex flex-col items-center justify-center bg-black gap-5 text-white pb-40">
				<div
					id="reader"
					style={{
						width: '100vw',
						margin: 'auto',
					}}
				></div>
				<Form handleSubmit={handleSubmit} />
			</div>}
			{isLoading && <Loader />}
		</Layout>
	)
}

export default Scanner
