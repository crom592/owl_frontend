import { Box, styled } from '@mui/material';

// 태그 스타일 정의
const Tag = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  borderRadius: '3.4px',
  fontSize: '12.29px',
  fontWeight: 'bold',
  padding: '0px 0px 0px 0px',
  background: theme.palette.background.tags[color],
  color: theme.palette.text.tags[color],
}));

// 태그를 포함하는 컨테이너 스타일 정의
const TagsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap', // 오버플로우 시 줄바꿈
});

export default function CalendarTags({ children, text, color }) {
  return (
    <TagsContainer>
      <Tag color={color}>{text}</Tag>
      <Tag color={color}>{children}</Tag>
    </TagsContainer>
  );
}
