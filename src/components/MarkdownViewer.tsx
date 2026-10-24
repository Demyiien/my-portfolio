import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
  /** owner/repo, used to resolve relative links and images in the README */
  repo: string;
}

const isAbsolute = (url: string) => /^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(url);

export default function MarkdownViewer({ content, repo }: Props) {
  const resolveLink = (href = '') =>
    isAbsolute(href) ? href : `https://github.com/${repo}/blob/HEAD/${href.replace(/^\.?\//, '')}`;
  const resolveImage = (src = '') =>
    isAbsolute(src) ? src : `https://raw.githubusercontent.com/${repo}/HEAD/${src.replace(/^\.?\//, '')}`;

  const components: Components = {
    a: ({ href, children }) => {
      const url = resolveLink(href);
      const external = !url.startsWith('#');
      return (
        <a href={url} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => (
      <img src={resolveImage(typeof src === 'string' ? src : '')} alt={alt ?? ''} loading="lazy" />
    ),
    table: ({ children }) => (
      <div className="terminal-scroll overflow-x-auto">
        <table>{children}</table>
      </div>
    ),
  };

  return (
    <div className="md-body">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}
