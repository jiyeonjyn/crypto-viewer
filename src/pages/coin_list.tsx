import React from 'react';
import styled from 'styled-components';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ICoin } from '../interfaces';
import { fetchCoinList } from '../service/api';
import { useQuery } from 'react-query';
import Header from '../components/header';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 560px;
  margin: 0 auto;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.1);
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Footer = styled.footer`
  padding: 15px;
`;

interface Props {
  switchTheme: () => void;
}

const CoinList = ({ switchTheme }: Props) => {
  const { isLoading, data } = useQuery<ICoin[]>('coin-list', fetchCoinList);
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Cryptocurrency Viewer</title>
        </Helmet>
      </HelmetProvider>
      <Header title="Cryptocurrency Top 100" switchTheme={switchTheme} />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={coin.id} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
      <Footer />
    </Container>
  );
};

export default CoinList;
