import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  width: 42px;
  height: 24px;
  background-color: transparent;
  border-radius: 100px;
  border: 2px solid ${(props) => props.theme.boxColor};
  cursor: pointer;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.04);
`;

const Ball = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: ${(props) => (props.theme.isLightTheme ? '0.5px' : '17.5px')};
  font-size: 14px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.04);
  transition: left 0.3s;
  &::before,
  &::after {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::before {
    content: '☀️';
    opacity: ${(props) => (props.theme.isLightTheme ? 1 : 0)};
  }
  &::after {
    content: '🌙';
    opacity: ${(props) => (props.theme.isLightTheme ? 0 : 1)};
  }
`;

interface Props {
  isLightTheme?: boolean;
  switchTheme: () => void;
}

const SwitchButton = ({ isLightTheme, switchTheme }: Props) => {
  return (
    <Container onClick={switchTheme}>
      <Ball />
    </Container>
  );
};

export default SwitchButton;
