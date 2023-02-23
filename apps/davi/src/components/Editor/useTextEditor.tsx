import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Focus from '@tiptap/extension-focus';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Editor } from './components/Editor';
import useMarkdownToHTML from 'hooks/Guilds/conversions/useMarkdownToHTML';
import useHTMLToMarkdown from 'hooks/Guilds/conversions/useHTMLToMarkdown';

export const useTextEditor = (
  placeholder: string,
  onHTMLChange: any,
  html: string,
  initialContent?: string
) => {
  const initialHTML = useMarkdownToHTML(initialContent);
  const md = useHTMLToMarkdown(html);

  const clear = () => {
    EditorConfig.commands.clearContent();
    onHTMLChange('');
  };

  const EditorConfig = useEditor(
    {
      content: html ? html : initialHTML,
      extensions: [
        StarterKit.configure({
          history: { depth: 10 },
        }),
        Focus.configure({
          className: 'has-focus',
          mode: 'all',
        }),
        Placeholder.configure({
          placeholder,
        }),
        Highlight,
        Link,
      ],
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        if (html) {
          onHTMLChange && onHTMLChange(html);
        }
      },
    },
    [initialContent]
  );

  return { Editor, EditorConfig, html, md, clear };
};
