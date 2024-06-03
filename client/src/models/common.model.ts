import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface iButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {}
