import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import classes from '/styles/Attribute.module.css'

type Props = {
    label: string
    value?: string,
    code: string,
}

const initOpacity = 0

const Attribute: React.FC<Props> = ({ label, value, code }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [opacity, setOpacity] = useState(initOpacity)

    const handleScroll = () => {
        const windowHeight = window.innerHeight
        const windowScrollY = window.scrollY
        const refHeight = ref.current ? ref.current.offsetHeight : 0
        const refOffsetTop = ref.current
            ? ref.current.offsetTop + windowHeight + refHeight / 2
            : 0

        const startCenterScreen = windowScrollY + windowHeight / 3
        const endCenterScreen = windowScrollY + (windowHeight / 3) * 2

        if (
            refOffsetTop >= startCenterScreen &&
            refOffsetTop <= endCenterScreen
        ) {
            setOpacity(1)
        } else if (refOffsetTop < startCenterScreen) {
            setOpacity(
                0.5 - (startCenterScreen - refOffsetTop) / (windowHeight / 3)
            )
        } else {
            setOpacity(
                0.5 - (refOffsetTop - endCenterScreen) / (windowHeight / 3)
            )
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            ref={ref}
            className={`h-a-third-screen text-white flex flex-col justify-center items-center gap-3 text-center px-10 ${classes.attribute}`}
            style={{ opacity: opacity }}
        >
            <div className="text-xl flex flex-col gap-1 items-center">
                <Icon code={code} isActive={opacity >= 0} />
                <span>{label}</span>
            </div>
            {value && <span className="font-bold text-2xl">{value}</span>}
        </div>
    )
}

export default Attribute
