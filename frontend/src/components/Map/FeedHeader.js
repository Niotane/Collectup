import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function FeedHeader() {
  return (
    <Box pad='2en' width='100%' align='center'>
      <Typography variant='h1' component='div'>
        Feed
      </Typography>
    </Box>
  );
}
