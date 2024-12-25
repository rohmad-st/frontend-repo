import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';

// Define the props for our custom button
interface UIButtonProps extends MuiButtonProps {
  variantColor?: 'primary' | 'secondary' | 'success';
}

// Create a styled button component
const StyledButton = styled(MuiButton)({
  borderRadius: '8px',
  padding: '10px 20px',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
  }
});

// Create the custom button component
const UIButton: React.FC<UIButtonProps> = ({
  children,
  variantColor = 'primary',
  ...props
}) => {
  const theme = useTheme();

  const getVariantColors = () => {
    switch (variantColor) {
      case 'secondary':
        return {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark
          }
        };
      case 'success':
        return {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.success.dark
          }
        };
      default:
        return {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        };
    }
  };

  return (
    <StyledButton
      {...props}
      sx={{
        ...getVariantColors(),
        ...props.sx
      }}>
      {children}
    </StyledButton>
  );
};

export default UIButton;
