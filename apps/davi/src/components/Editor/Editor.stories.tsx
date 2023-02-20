import { ComponentStory, ComponentMeta } from '@storybook/react';
import useLocalStorageWithExpiry from 'hooks/Guilds/useLocalStorageWithExpiry';
import { Editor } from './components/Editor';
import { useTextEditor } from './useTextEditor';

export default {
  title: 'components/Editor',
  component: Editor,
  argTypes: {
    href: {
      description: 'URL to open on click',
    },
    votes: {
      description: 'Array of vote percentages for each option',
    },
  },
} as ComponentMeta<typeof Editor>;

function DemoEditor() {
  const [html, onHTMLChange] = useLocalStorageWithExpiry<string>(
    `42/create-proposal/html`,
    null,
    345600000
  );

  const { Editor, EditorConfig } = useTextEditor(
    'Enter text here',
    onHTMLChange,
    html
  );
  return <Editor EditorConfig={EditorConfig} />;
}

const Template: ComponentStory<typeof Editor> = () => <DemoEditor />;

export const Simple = Template.bind({});
Simple.storyName = 'Editor';
