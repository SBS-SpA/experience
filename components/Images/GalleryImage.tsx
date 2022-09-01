import { useEffect, useRef, useState } from 'react'
import ImageContainer from './ImageContainer'

type Props = {
    src: string
    alt: string
    offsetTop: number
    curIdx: number
}

const GalleryImage: React.FC<Props> = ({ src, alt, offsetTop, curIdx }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [top, setTop] = useState(0)
    const [containerWidth, setContainerWidth] = useState('100%')
    const [containerHeight, setContainerHeight] = useState(0)
    const [classes, setClasses] = useState('')

    const handleResizeWindow = () => {
        const windowHeight = window.innerHeight
        const refHeight = ref.current ? ref.current.offsetHeight : 0

        const step = (windowHeight - refHeight) / 2
        setTop(step)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (containerHeight > 0) {
                const windowScrollY = window.scrollY

                const startImage = offsetTop + containerHeight * curIdx + top
                const endImage = startImage + containerHeight

                const step = containerHeight / 5

                if (endImage < windowScrollY) {
                    const percent = 100 - (windowScrollY - endImage) / step
                    setContainerWidth(`${percent}%`)
                    setClasses('')
                } else {
                    if (startImage <= windowScrollY) {
                        setClasses('drop-shadow-[0_-5px_3px_rgba(0,0,0,0.4)]')
                    } else {
                        setClasses('')
                    }
                    setContainerWidth('100%')
                }
            } else {
                const refHeight = ref.current ? ref.current.offsetHeight : 0

                setContainerHeight(refHeight)
            }
        }

        handleResizeWindow()
        window.addEventListener('resize', handleResizeWindow)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('resize', handleResizeWindow)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [curIdx, offsetTop, top, containerHeight])

    return (
        <div
            ref={ref}
            className="sticky"
            style={{
                top: top,
                height: containerHeight > 0 ? containerHeight : 'unset',
            }}
        >
            <div
                className={`m-auto ${classes}`}
                style={{ width: containerWidth }}
            >
                <ImageContainer src={src} alt={alt} />
            </div>
        </div>
    )
}

export default GalleryImage
