import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import SwitchButton from './switch_button';

const Container = styled.header`
  padding: 4em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const PrevArrow = styled.span`
  position: absolute;
  top: 10px;
  left: 0;
  font-size: px;
  padding: 3px 0;
  cursor: pointer;
`;

interface Props {
  title: string;
  switchTheme: () => void;
}

const Header = ({ title, switchTheme }: Props) => {
  const detailPage = useMatch('/:coinId/*');

  return (
    <Container>
      <Title>{title}</Title>
      {detailPage && (
        <Link to="/">
          <PrevArrow>
            <i className="fa-solid fa-angle-left"></i> back
          </PrevArrow>
        </Link>
      )}
      <SwitchButton switchTheme={switchTheme} />
    </Container>
  );
};

export default Header;
