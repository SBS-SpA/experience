import Link from 'next/link'
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import Menu from './Menu'
import ShareMenu from './ShareMenu'
import {
    MdExpandLess,
    MdExpandMore,
    MdOutlineShare,
} from 'react-icons/md'
import { BiBarcodeReader } from 'react-icons/bi'

type Props = {
    name: string
}

const Header: React.FC<Props> = ({ name }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [shareMenuIsOpen, setShareMenuIsOpen] = useState(false)

    const menuHandler: MouseEventHandler = (e: MouseEvent<HTMLElement>) => {
        // e.preventDefault() // Not working anchor
        setMenuIsOpen((prev) => !prev)
        setShareMenuIsOpen(false)
    }

    const shareMenuHandler: MouseEventHandler = (
        e: MouseEvent<HTMLElement>
    ) => {
        e.preventDefault()
        setShareMenuIsOpen((prev) => !prev)
        setMenuIsOpen(false)
    }

    const closeAllMenuHandler: MouseEventHandler = (
        e: MouseEvent<HTMLElement>
    ) => {
        e.preventDefault()
        setMenuIsOpen(false)
        setShareMenuIsOpen(false)
    }

    const closeAllMenuScrollHandler: EventListener = () => {
        setMenuIsOpen(false)
        setShareMenuIsOpen(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', closeAllMenuScrollHandler)

        return () =>
            window.removeEventListener('scroll', closeAllMenuScrollHandler)
    }, [])

    return (
        <>
            {(menuIsOpen || shareMenuIsOpen) && (
                <div
                    className="fixed z-40 bg-black/20 top-0 bottom-0 left-0 right-0"
                    onClick={closeAllMenuHandler}
                ></div>
            )}
            <header className="text-black border-b border-neutral-200 fixed w-full z-50">
                <div className="p-3 font-bold flex items-center justify-between bg-white">
                    <span>{name}</span>
                    <div className="flex gap-4">
                        <Link href="/scanner">
                            <a>
                                <BiBarcodeReader className="w-6 h-6" />
                            </a>
                        </Link>
                        <button
                            className="flex items-center"
                            onClick={menuHandler}
                        >
                            {menuIsOpen ? (
                                <MdExpandLess className="w-6 h-6" />
                            ) : (
                                <MdExpandMore className="w-6 h-6" />
                            )}
                        </button>
                        <button
                            className="flex items-center"
                            onClick={shareMenuHandler}
                        >
                            <MdOutlineShare className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <Menu isOpen={menuIsOpen} onClickHandler={menuHandler} />
                <ShareMenu
                    isOpen={shareMenuIsOpen}
                    closeMenuHandler={shareMenuHandler}
                />
            </header>
        </>
    )
}

export default Header
