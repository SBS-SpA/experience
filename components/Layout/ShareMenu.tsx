import { useTranslation } from 'next-i18next'
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { MdClose, MdQrCode, MdLink } from 'react-icons/md'
import { RiFacebookCircleLine, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'

type SocialProps = {
    icon: ReactNode
    label: string
    url: string
}

type ActionProps = {
    icon: ReactNode
    label: string
    actionHandler: MouseEventHandler
}

type Props = {
    isOpen: boolean
    closeMenuHandler: MouseEventHandler
}

const ShareMenu: React.FC<Props> = ({ isOpen, closeMenuHandler }) => {
    const { t } = useTranslation('product')
    const [showQrCode, setShowQrCode] = useState(false)

    const copyLink: MouseEventHandler = (event) => {
        closeMenuHandler(event)
        navigator.clipboard.writeText(window.location.href);
        toast.success(t('linkCopied'));
    }

    const createQRCode: MouseEventHandler = (event) => {
        closeMenuHandler(event)
        setShowQrCode(true)
    }

    const socials: SocialProps[] = [
        {
            icon: <RiFacebookCircleLine />,
            label: `${t('shareTo')} Facebook`,
            url: 'https://www.facebook.com/sharer/sharer.php?app_id=1217981644879628&u=',
        },
        {
            icon: <RiMessengerLine />,
            label: `${t('shareTo')} Messenger`,
            url: 'fb-messenger://share/?link=',
        },
        {
            icon: <RiWhatsappLine />,
            label: `${t('shareTo')} WhatsApp`,
            url: `whatsapp://send/?text=${t('shareText')}`
        },
    ]

    const actions: ActionProps[] = [
        {
            icon: <MdQrCode />,
            label: t('qrCode'),
            actionHandler: createQRCode,
        },
        {
            icon: <MdLink />,
            label: t('copyLink'),
            actionHandler: copyLink,
        },
    ]

    return (
        <div
            className={`fixed w-full bg-white bottom-0 duration-300 transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
            <div className="p-4 w-full text-center border-y border-neutral-200 flex flex-col">
                <span>{t('shareTo')}...</span>
            </div>
            <ul className="divide-y">
                {socials.map((social) => (
                    <SocialMenuItem key={Math.random()} {...social} />
                ))}
                {actions.map((action) => (
                    <ActionMenuItem key={Math.random()} {...action} />
                ))}
                <ActionMenuItem
                    icon={<></>}
                    label={t('cancel')}
                    actionHandler={closeMenuHandler}
                />
            </ul>
            {showQrCode &&
                <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black/20'>
                    <div className='fixed top-0 left-0 w-screen h-screen z-10' onClick={() => setShowQrCode(false)} />
                    <div className='bg-white p-4 pt-2 z-20'>
                        <button className='flex w-full justify-end mb-2' onClick={() => setShowQrCode(false)}><MdClose /></button>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={window.location.href}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

const SocialMenuItem: React.FC<SocialProps> = ({ icon, label, url }) => {
    const [curUrl, setCurUrl] = useState('')

    useEffect(() => {
        setCurUrl(window.location.href)
    }, [])

    return (
        <li>
            <a
                href={`${url}${curUrl}`}
                className="w-full flex items-center py-3 px-5 gap-4"
            >
                <span className='text-2xl'>{icon}</span>
                <span>{label}</span>
            </a>
        </li>
    )
}

const ActionMenuItem: React.FC<ActionProps> = ({
    icon,
    label,
    actionHandler,
}) => {
    return (
        <li>
            <button
                onClick={actionHandler}
                className="w-full flex items-center py-3 px-5 gap-4"
            >
                <span className='text-2xl'>{icon}</span>
                <span>{label}</span>
            </button>
        </li>
    )
}

export default ShareMenu
