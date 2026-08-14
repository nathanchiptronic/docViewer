import '../../styles/markdown.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const languageNames = {
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    bash: "Bash",
    sh: "Shell",
    json: "JSON",
    sql: "SQL",
    xml: "XML",
    java: "Java",
    css: "CSS",
    html: "HTML",
};

export default function CodeRender({ language, content }) {
    return (
        <div className='code-block'>
            {/* Cria um reader com o nome da linguagem */}
            <div className='code-header'>
                {languageNames[language] ?? language}
            </div>

            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: "#1e1e1e",
                }}
            >
                {typeof content === "string"
                    ? content
                    : JSON.stringify(content, null, 2)}
            </SyntaxHighlighter>
        </div>
    )
}