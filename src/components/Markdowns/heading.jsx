export default function Heading({ level, children }) {
    const text = String(children)

    const id = text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    const Tag = `h${level}`;

    return <Tag id={id}>{children}</Tag>
}