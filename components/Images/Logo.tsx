import { useEffect, useState } from 'react'

const Logo: React.FC = () => {
    const [startAnimation, setStartAnimation] = useState(false)

    useEffect(() => {
        const timeoutFirstLetter = setTimeout(() => {
            setStartAnimation(true)
        }, 200)

        return () => clearTimeout(timeoutFirstLetter)
    }, [])

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 315 125"
            className="h-8 medium:h-10"
        >
            <g>
                <path className={`symbol ${startAnimation && 'animate-logo'}`} d="M61.943 34.122H17.356c-.399 0-.698 0-1.097.1-5.287.499-9.476 4.987-9.476 10.473v44.587c0 13.466 10.872 24.338 24.338 24.338h44.686c5.786 0 10.474-4.688 10.474-10.473V58.36c0-13.366-10.873-24.238-24.338-24.238zm5.685 26.433v34.213H33.315c-4.289 0-7.78-3.491-7.78-7.78V52.775h34.313c4.289 0 7.78 3.491 7.78 7.78z"></path>
            </g>
            <g className="word">
                <path
                    className={`first-letter ${startAnimation && 'animate-logo'}`}
                    d="M156.802 89.581c0 5.686-4.888 8.479-11.97 8.479-6.783 0-9.974-2.195-11.97-7.581-.1-.399-1.397-3.292-4.988-3.292h-10.573s-3.491-.099-3.491 3.89c1.795 13.965 13.566 23.64 31.22 23.64 17.156 0 30.622-9.276 30.622-27.43 0-32.617-43.19-14.164-43.19-29.126 0-3.99 3.092-7.78 10.672-7.78 10.175 0 11.87 4.189 12.768 6.084.898 1.895 2.593 3.092 5.187 3.092h10.773c3.191 0 3.59-1.795 3.59-2.593v-.399c-1.396-13.865-12.867-22.842-30.622-22.842-17.356 0-31.121 9.775-31.121 27.43-.1 31.022 43.09 11.571 43.09 28.428z"
                ></path>
                <path
                    className={`second-letter ${startAnimation && 'animate-logo'}`}
                    d="M212.959 33.524c-5.087 0-9.077.698-12.967 2.094 0 0-.199-4.488-.199-5.386-.399-11.371-8.08-19.65-18.553-20.847h-.1v77.004c0 19.451 11.471 28.229 31.221 28.229s30.921-8.678 30.921-28.229V61.453c-.1-18.553-11.371-27.929-30.323-27.929zm11.571 38.402v12.668c0 10.074-4.688 13.366-12.169 13.366-7.481 0-12.668-3.391-12.668-13.466V63.647c0-10.074 4.688-13.565 12.169-13.565 7.381 0 12.668 3.391 12.668 13.465v8.379z"
                ></path>
                <path
                    className={`third-letter ${startAnimation && 'animate-logo'}`}
                    d="M290.462 89.581c0 5.686-4.888 8.479-11.97 8.479-6.783 0-9.974-2.195-11.97-7.581-.1-.399-1.397-3.292-4.988-3.292h-10.573s-3.491-.099-3.491 3.89c1.795 13.965 13.566 23.64 31.22 23.64 17.156 0 30.622-9.276 30.622-27.43 0-32.617-43.19-14.164-43.19-29.126 0-3.99 3.092-7.78 10.672-7.78 10.175 0 11.87 4.189 12.768 6.084.898 1.895 2.593 3.092 5.187 3.092h10.773c3.191 0 3.59-1.795 3.59-2.593v-.399c-1.396-13.865-12.867-22.842-30.622-22.842-17.356 0-31.121 9.775-31.121 27.43-.1 31.022 43.09 11.571 43.09 28.428z"
                ></path>
            </g>
        </svg>
    )
}

export default Logo
