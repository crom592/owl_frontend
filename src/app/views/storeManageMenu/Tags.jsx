import React from 'react';
import { Box, styled } from '@mui/material';

const Tag = styled(Box)(({ color }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  width: '67px',
  height: '28px',
  background: '#EFF6FF',
  border: `1px solid ${getColor(color)}`,
  borderRadius: '100px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: getColor(color),
  marginLeft: 'auto',
  marginRight: 'auto',
}));

function getColor(color) {
  switch (color) {
    case 'blue':
      return '#60A5FA'; // Primary/Blue/400
    case 'orange':
      return '#F97316'; // Replace with the appropriate color for 'orange'
    case 'gray':
      return '#9CA3AF'; // Replace with the appropriate color for 'gray'
    default:
      return '#60A5FA';
  }
}

export default function Tags({ text, color }) {
  return <Tag color={color}>{text}</Tag>;
}
