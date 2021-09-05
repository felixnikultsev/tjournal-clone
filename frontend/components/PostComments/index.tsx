import React from 'react';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tabs, Tab, Typography } from '@material-ui/core';
import { AddCommentForm } from '../AddCommentForm';
import data from '../../data';

enum CommentsSort {
  Popular,
  Order,
}

export const PostComments: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(CommentsSort.Popular);
  const comments = data.comments[CommentsSort[activeTab].toLowerCase()];

  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          42 комментария
        </Typography>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          className="mt-20"
          onChange={(_, value) => setActiveTab(value)}
        >
          <Tab label="Популярные" />
          <Tab label="По порядку" />
        </Tabs>
        <Divider />
        <AddCommentForm />
        <div className="mb-20" />
        {comments?.map((item) => (
          <Comment key={item.id} user={item.user} text={item.text} createdAt={item.createdAt} />
        ))}
      </div>
    </Paper>
  );
};
