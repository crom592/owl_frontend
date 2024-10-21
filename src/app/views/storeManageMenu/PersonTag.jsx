import React from 'react';
import { Box, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // MUI 아이콘 임포트

const TagContainer = styled(Box)(({ color }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  fontSize: '12px', // 텍스트 크기 조절
  fontWeight: 'bold',
  color: color, // 텍스트와 아이콘 색상 설정
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export default function PersonTag({ text, color }) {
  return (
    <TagContainer color={color}>
      <PersonIcon sx={{ fontSize: '14px', color: color }} /> {/* 사람 아이콘 색상 설정 */}
      <Box>{text}</Box>
    </TagContainer>
  );
}
