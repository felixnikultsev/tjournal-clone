import React from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './AddCommentForm.module.scss';

type AddCommentFormProps = {};

export const AddCommentForm: React.FC<AddCommentFormProps> = () => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');

  const onAddComment = () => {
    setText('');
    setClicked(false);
  };

  return (
    <div className={styles.form}>
      <Input
        value={text}
        placeholder="Написать комментарий..."
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        onFocus={() => setClicked(true)}
        onChange={(e) => setText(e.target.value)}
        multiline
        fullWidth
      />
      {clicked && (
        <Button variant="contained" color="primary" className={styles.addButton} onClick={onAddComment}>
          Опубликовать
        </Button>
      )}
    </div>
  );
};
