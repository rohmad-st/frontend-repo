import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
    '& fieldset': {
      borderColor: theme.palette.primary.light
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
      borderWidth: '2px'
    },
    '& input': {
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
        caretColor: theme.palette.text.primary,
        borderRadius: 'inherit'
      },
      '&:-webkit-autofill:focus': {
        WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
        caretColor: theme.palette.primary.main
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.dark
    }
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    '&::placeholder': {
      fontStyle: 'italic'
    }
  }
}));

const UITextField: React.FC<TextFieldProps> = (props) => {
  return <StyledTextField {...props} />;
};

export default UITextField;
