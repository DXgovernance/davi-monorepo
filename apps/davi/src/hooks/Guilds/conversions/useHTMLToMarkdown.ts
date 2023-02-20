import { useMemo } from 'react';
import showdown from 'showdown';

export default function useHTMLToMarkdown(html: string) {
  const converter: showdown.Converter = new showdown.Converter();

  const htmlParsed = useMemo(() => {
    if (!html) return '';

    return converter && converter.makeMarkdown(html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  return htmlParsed;
}
