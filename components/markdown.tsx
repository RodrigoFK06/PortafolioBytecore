import ReactMarkdown from "react-markdown"

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside mt-2 space-y-1" {...props} />,
        li: ({ node, ...props }) => <li {...props} />,
        p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
