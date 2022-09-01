import { useTranslation } from 'next-i18next'
import { FormEventHandler, useState } from 'react'

type Props = {
    handleSubmit: Function
}

const Form: React.FC<Props> = ({ handleSubmit }) => {
    const { t } = useTranslation('form')
    const [code, setCode] = useState("")

    const submitHandler: FormEventHandler = (e) => {
        e.preventDefault()

        handleSubmit(code)
    }

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={submitHandler} className="flex flex-col gap-3 items-center">
                <label>{t('label')}</label>
                <input type="text" id="code" name="code" value={code} onChange={(ev) => setCode(ev.target.value)} className="text-black" />
                <input type="submit" value={t('submit')} className='border p-3 w-full mt-2' />
            </form>
        </div>
    )
}

export default Form