import Image from 'next/image'
import { useRef } from 'react'

import classes from '/styles/ImageContainer.module.css'

type Props = {
    alt: string
    src: string
}

const ImageContainer: React.FC<Props> = ({ alt, src }) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div ref={ref} className={classes['image-container']}>
            <Image
                src={src}
                alt={alt}
                layout="fill"
                className={classes.image}
            />
        </div>
    )
}

export default ImageContainer
