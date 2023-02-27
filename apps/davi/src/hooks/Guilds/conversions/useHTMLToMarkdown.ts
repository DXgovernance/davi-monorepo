import { useMemo } from 'react';
import TurndownService from 'turndown';

export default function useHTMLToMarkdown(html: string) {
  const turndownService = new TurndownService();
  const htmlParsed = useMemo(() => {
    if (!html) return '';

    return turndownService && turndownService.turndown(html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  return htmlParsed;
}
