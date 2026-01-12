import React from 'react';
import styled from 'styled-components';

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ size, className, onClick, children, type, disabled }: ButtonProps) => {
  return (
    <StyledWrapper>
      <button
        className={className}
        onClick={onClick}
        data-size={size}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  
  button {
   appearance: none;
   background-color: transparent;
   border: 2px solid #1A1A1A;
   border-radius: 12px;
   box-sizing: border-box;
   color: #3B3B3B;
   cursor: pointer;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: 6px;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
   font-size: 14px;
   font-weight: 600;
   line-height: 1.2;
   margin: 0;
   min-height: 42px;
   min-width: 42px;
   outline: none;
   padding: 10px 18px;
   text-align: center;
   text-decoration: none;
   transition: all 200ms cubic-bezier(.23, 1, 0.32, 1);
   user-select: none;
   -webkit-user-select: none;
   touch-action: manipulation;
   white-space: nowrap;
  }

  button[data-size="sm"] {
   font-size: 13px;
   min-height: 36px;
   padding: 8px 14px;
   border-radius: 10px;
  }

  button[data-size="md"] {
   font-size: 14px;
   min-height: 42px;
   padding: 10px 20px;
  }

  button[data-size="lg"] {
   font-size: 16px;
   min-height: 50px;
   padding: 14px 28px;
   border-radius: 14px;
  }

  button:disabled {
   pointer-events: none;
   opacity: 0.5;
  }

  button:hover {
   color: #fff;
   background-color: #1A1A1A;
   box-shadow: rgba(0, 0, 0, 0.2) 0 6px 12px;
   transform: translateY(-2px);
  }

  button:active {
   box-shadow: none;
   transform: translateY(0);
  }`;

export default Button;
