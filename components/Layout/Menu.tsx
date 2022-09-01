import { useTranslation } from 'next-i18next';
import { MouseEventHandler } from 'react'

const menuItems: { anchor: string; label: string }[] = [
    { anchor: 'overview', label: 'overview' },
    { anchor: 'attributes', label: 'attributes' },
    { anchor: 'gallery', label: 'gallery' },
    { anchor: 'description', label: 'description' },
]

type PropsMenu = {
    isOpen: boolean
    onClickHandler: MouseEventHandler
}

const Menu: React.FC<PropsMenu> = ({ isOpen, onClickHandler }) => {
    return (
        <ul
            className={`w-full h-full border-neutral-200 bg-white overflow-hidden divide-y transition-all duration-300 ${isOpen ? 'max-h-48 border-t' : 'max-h-0'
                }`}
        >
            {menuItems.map((item) => (
                <MenuItem
                    {...item}
                    onClickHandler={onClickHandler}
                    key={item.anchor}
                />
            ))}
        </ul>
    )
}

type PropsMenuItem = {
    anchor: string
    label: string
    onClickHandler: MouseEventHandler
}

const MenuItem: React.FC<PropsMenuItem> = ({
    anchor,
    label,
    onClickHandler,
}) => {
    const { t } = useTranslation('product')

    return (
        <li onClick={onClickHandler}>
            <a href={`#${anchor}`} className="w-full px-3 py-2.5 block">
                {t(label)}
            </a>
        </li>
    )
}

export default Menu
