import React from 'react';
import EditorJS from '@editorjs/editorjs';

export type EditorProps = {
  placeholder?: string;
};

export const Editor: React.FC<EditorProps> = (props) => {
  const { placeholder } = props;

  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder,
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error('ERROR editor cleanup', e));
    };
  }, []);

  return <div id="editor" />;
};
