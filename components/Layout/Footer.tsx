import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer: React.FC = () => {
    const router = useRouter()

    return (
        <footer className="bg-black pb-10">
            <div className="flex flex-col justify-center items-center m-auto gap-5 pt-10 w-fit">
                <div className="flex justify-center items-center gap-3">
                    <Link href={router.asPath} locale="it">
                        <a>IT</a>
                    </Link>
                    <Link href={router.asPath} locale="en">
                        <a>EN</a>
                    </Link>
                </div>
                <Link href="https://github.com/SBS-SpA/experience">
                    <a target="_blank">GitHub</a>
                </Link>
            </div>
        </footer>
    )
}

export default Footer
