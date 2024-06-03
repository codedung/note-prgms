import React, { ForwardedRef } from "react";
import styled from "styled-components";
import { iInputProps } from "../../models/common.model";

const InputText = React.forwardRef(
  (
    { type, placeholder, onChange, ...props }: iInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input``;

export default InputText;
