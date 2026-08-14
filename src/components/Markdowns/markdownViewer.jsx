import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";

import '../../styles/markdown.css'
import MermaidRender from './MermaidRender.jsx';
import Heading from './Heading.jsx';
import { scrollToElement } from '../shared/ScrollToHash.jsx';
import ApiBlockRender from './ApiBlockRender.jsx';
import { Children } from 'react';
import CodeRender from './CodeRender.jsx';

export default function MarkdownViewer({ fileName, directory = "/" }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const url = `${directory}/${fileName}`.replace(/\/+/g, "/");
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Arquivo não encontrado: ${url}`);
                }

                const text = await response.text();

                setContent(text);
            } catch (error) {
                console.error("Erro ao buscar arquivo:", error);
            }
        };

        fetchMarkdown();
    }, [fileName, directory]);


    return (
        <div className='markdown'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Captura uma tag <pre>
                    pre({ children }) {
                        const codeElement = Children.only(children);
                        const className = codeElement.props?.className ?? "";
                        const language = /language-(\S+)/.exec(className)?.[1];
                        const content = String(codeElement.props?.children ?? "");

                        if (language === "mermaid") {
                            return <MermaidRender chart={content} />;
                        }

                        if (language === "api") {
                            return <ApiBlockRender apiBlock={content} />;
                        }

                        return <pre>{children}</pre>;
                    },
                    // Captura a tag <code>
                    code({ className, children, ...props }) {
                        // Extrai a linguagem
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match?.[1]

                        // Se não for mermaid, paassa para a lib estilisar
                        if (language && language !== "mermaid" && language !== "api") {
                            return (
                                <CodeRender language={language} content={String(children).replace(/\n$/, "")}/>
                            );
                        }

                        // Se não tem linguagem retona sem alterações
                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    // Captura um input
                    input({ type, disabled, ...props }) {

                        // Se for um checkbox retorna a tag sem o disabledm, para possibilitar a estilização
                        if (type === "checkbox") {
                            return (
                                <input
                                    {...props}
                                    type="checkbox"
                                    checked={props.checked}
                                    readOnly
                                    onClick={(e) => e.preventDefault()}
                                />
                            );
                        }

                        // Se não for checkbox não altera nada
                        return <input type={type} disabled={disabled} {...props} />;
                    },
                    // Captura uma tag <a>
                    a({ href, children, ...props }) {
                        // Âncora da mesma página
                        if (href?.startsWith("#")) {
                            return (
                                <a
                                    href={href}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        const id = href.slice(1);
                                        const target = document.getElementById(id);
                                        const container = document.getElementById("content-scroll");

                                        if (!target || !container) return;

                                        scrollToElement(container, target);
                                        window.history.replaceState({}, "", href);
                                    }}
                                    {...props}
                                >
                                    {children}
                                </a>
                            );
                        }

                        // Links internos
                        if (href?.startsWith("/")) {
                            return (
                                <Link to={href} {...props}>
                                    {children}
                                </Link>
                            );
                        }

                        // Links externos
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                {children}
                            </a>
                        );
                    },

                    // Captura os Headings e passa para um componente adicionar um id
                    h1: ({ children }) => <Heading level={1}>{children}</Heading>,
                    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
                    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
                    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
                    h5: ({ children }) => <Heading level={5}>{children}</Heading>,
                    h6: ({ children }) => <Heading level={6}>{children}</Heading>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}