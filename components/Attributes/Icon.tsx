import { ReactNode } from 'react'
import { BiRuler } from 'react-icons/bi'
import { BsPlug } from 'react-icons/bs'
import { GiCharging } from 'react-icons/gi'
import { MdCable, MdOutlineColorLens, MdPowerInput } from 'react-icons/md'

type Props = {
    code: string
    isActive: boolean
}

const icons: { code: string; svg: ReactNode }[] = [
    {
        code: 'color',
        svg: <MdOutlineColorLens />,
    },
    {
        code: 'input',
        svg: <MdPowerInput />,
    },
    {
        code: 'output',
        svg: <MdPowerInput />,
    },
    {
        code: 'charging_type',
        svg: <GiCharging />,
    },
    {
        code: 'plug_type',
        svg: <BsPlug />,
    },
    {
        code: 'cable_type',
        svg: <MdCable />,
    },
    {
        code: 'cable_length',
        svg: <BiRuler />,
    },
]

const Icon: React.FC<Props> = ({ code, isActive }) => {
    const iconSvg = icons.find((icon) => icon.code === code)

    return iconSvg ? (
        <span
            className={`text-4xl transition-opacity duration-75 ${isActive ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {iconSvg.svg}
        </span>
    ) : null
}

export default Icon
