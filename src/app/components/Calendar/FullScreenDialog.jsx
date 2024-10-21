import 'moment/locale/ko';
import 'moment/dist/locale/ko';

import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import UndoIcon from '@mui/icons-material/Undo';
import { Box, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import moment from 'moment/dist/moment';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { H6 } from '../Typography';
import CalendarForm from './Calendarform';
moment.locale('ko');
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formatDate = (dateString) => {
  const date = moment(dateString);
  return date.format('YYYY년 M월 D일 dddd');
};
const GroupDiv = styled.div`
  align-self: stretch;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 7px 7px 0px 0px;
  font-size: 18px;
  margin: 0 30px 0 30px;

`;
export default function FullScreenDialog ({
  modalopen,
  content,
  handleModalClose,
  handleCreateSubmit,
  handleUpdateSubmit,
  handleChange,
  handleReset,
  isEditMode,
  onConfirm,
  handleConfirmYes,
  handleConfirmNo,
}) {
  const [date, setDate] = React.useState('');
  React.useEffect(() => {
    // setDate(formatDate(content.start));
    // Add any additional functionality you want to execute when content changes
  }, [content]);
  if (!content) return null;

  // const handleStartChange = (date) => {
  //   content.start = new Date(date);
  //   setDate(formatDate(content.start_time) + '~' + formatDate(content.end_time));
  // };
  // const handleEndChange = (date) => {
  //   content.end = new Date(date);
  //   setDate(formatDate(content.start_time) + '~' + formatDate(content.end_time));
  // };

  return (
    <Box>
      <Dialog fullScreen open={modalopen} onClose={handleModalClose} TransitionComponent={Transition}>
        <Toolbar sx={{ backgroundColor: 'white' }}>
          <H6
            sx={{
              color: 'black',
              display: 'flex',
              flex: 1,
              justifyContent: 'left',
              alignItems: 'center',
              fontSize: 18,
              fontWeight: 'Bold',
            }}
          >
            {date}
          </H6>

          <IconButton edge="start" color="inherit" onClick={handleModalClose} aria-label="Close">
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>
        </Toolbar>
        <GroupDiv/>
        <DialogContent>
          <CalendarForm
            content={content}
            // handleStartChange={handleStartChange}
            // handleEndChange={handleEndChange}
            handleCreateSubmit={handleCreateSubmit}
            handleUpdateSubmit={handleUpdateSubmit}
            handleChange={handleChange}
            isEditMode={isEditMode}
            onConfirm={onConfirm}
            handleConfirmYes={handleConfirmYes}
            handleConfirmNo={handleConfirmNo}
          />
        </DialogContent>

      </Dialog>
    </Box>
  );
}
