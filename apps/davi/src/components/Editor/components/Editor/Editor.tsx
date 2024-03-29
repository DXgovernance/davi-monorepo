import { MenuBar } from '../MenuBar';
import { EditorWrap, Content } from './Editor.styled';

const Editor = ({ EditorConfig }) => {
  if (EditorConfig) {
    return (
      <div>
        <EditorWrap>
          {EditorConfig && <MenuBar editor={EditorConfig} />}
          <Content
            editor={EditorConfig}
            data-testid="proposal-description-input"
          />
        </EditorWrap>
      </div>
    );
  } else {
    return <div />;
  }
};

export default Editor;
