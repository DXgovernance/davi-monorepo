import { useMemo } from 'react';
import showdown from 'showdown';

export default function useMarkdownToHTML(markdown: string) {
  const converter: showdown.Converter = new showdown.Converter();

  const htmlParsed = useMemo(() => {
    if (!markdown) return '';

    return converter.makeHtml(markdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  return htmlParsed;
}
