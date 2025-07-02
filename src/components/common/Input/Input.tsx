import React from 'react';
import { InputContainer, Label, StyledInput, TextArea } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  multiline?: boolean;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  multiline: true;
}

type CombinedProps = InputProps | TextAreaProps;

const Input: React.FC<CombinedProps> = ({ label, multiline, ...props }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      {multiline ? (
        <TextArea {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <StyledInput {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </InputContainer>
  );
};

export default Input;