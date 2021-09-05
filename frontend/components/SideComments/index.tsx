import React from 'react';
import { CommentItem } from './CommentItem';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import data from '../../data';
import styles from './SideComments.module.scss';
import clsx from 'clsx';

export const SideComments = () => {
  const [visible, setVisible] = React.useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible &&
        data.comments.order.map((obj) => <CommentItem key={obj.id} user={obj.user} text={obj.text} post={obj.post} />)}
    </div>
  );
};
