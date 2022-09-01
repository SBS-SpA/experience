import { useEffect, useRef, useState } from 'react'
import GalleryImage from './GalleryImage'

type Props = {
    images: { src: string; alt: string }[]
}

const Gallery: React.FC<Props> = ({ images }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setIsReady(true)
    }, [setIsReady])

    return (
        <div ref={ref}>
            {isReady &&
                images.map((image, idx) => (
                    <GalleryImage
                        key={Math.random()}
                        {...image}
                        offsetTop={ref.current ? ref.current.offsetTop : 0}
                        curIdx={idx}
                    />
                ))}
        </div>
    )
}

export default Gallery
