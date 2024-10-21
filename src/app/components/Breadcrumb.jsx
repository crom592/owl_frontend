import { Box, Breadcrumbs, styled, useTheme } from '@mui/material';
import Icon from '@mui/material/Icon';
import React from 'react';
import { NavLink } from 'react-router-dom';

// STYLED COMPONENTS
const BreadcrumbRoot = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const SubName = styled('span')(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const StyledIcon = styled(Icon)({
  marginLeft: 8,
  marginBottom: '4px',
  verticalAlign: 'middle',
});

export default function Breadcrumb ({ routeSegments }) {
  const theme = useTheme();
  const hint = theme.palette.text.hint;

  return (
    <BreadcrumbRoot>
      <Breadcrumbs
        separator={<Icon sx={{ color: hint }}>navigate_next</Icon>}
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <NavLink to="/">
          <StyledIcon color="primary">home</StyledIcon>
        </NavLink>

        {routeSegments
          ? routeSegments.map((route, index) =>
            <SubName key={index}>
              {index !== routeSegments.length - 1
                ? <>{route.name}</>
                : route.name
              }
            </SubName>)
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  );
}
