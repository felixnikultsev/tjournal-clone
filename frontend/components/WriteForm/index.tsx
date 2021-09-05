import React from 'react';
import dynamic from 'next/dynamic';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import { EditorProps } from '../Editor';

const Editor = dynamic<EditorProps>(() => import('../Editor').then((m) => m.Editor), { ssr: false });

type WriteFormProps = {
  title?: string;
};

export const WriteForm: React.FC<WriteFormProps> = (props) => {
  const { title } = props;

  return (
    <div>
      <Input placeholder="Заголовок" defaultValue={title} classes={{ root: styles.titleField }} />
      <div className={styles.editor}>
        <Editor placeholder="Введите текст вашей статьи" />
      </div>
      <Button variant="contained" color="primary">
        Опубликовать
      </Button>
    </div>
  );
};
