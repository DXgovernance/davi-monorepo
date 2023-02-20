import { useState } from 'react';
import { useTextEditor } from './useTextEditor';
import { renderHook } from '@testing-library/react-hooks';
import { render } from 'utils/tests';

describe('Editor', () => {
  it('Should match snapshot', () => {
    console.error = jest.fn();

    const { result } = renderHook(() => {
      const [html, onHTMLChange] = useState<string>('');
      return useTextEditor('Enter proposal body', onHTMLChange, html);
    });
    const { Editor, EditorConfig } = result.current;
    const { container } = render(<Editor EditorConfig={EditorConfig} />, {
      container: document.body,
    });
    expect(container).toMatchSnapshot();
  });
});
