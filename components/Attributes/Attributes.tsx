import Attribute from './Attribute'

type Props = {
    listAttrubutes: { code: string; label: string; value: string }[]
    subtitle: string
}

const Attributes: React.FC<Props> = ({ listAttrubutes, subtitle }) => {
    return (
        <div id="attributes" className="mb-a-third-screen">
            <Attribute label={subtitle} code={subtitle} />
            {listAttrubutes.map(({ code, label, value }) => (
                <Attribute key={code} code={code} label={label} value={value} />
            ))}
            <div id="gallery"></div>
        </div>
    )
}

export default Attributes
