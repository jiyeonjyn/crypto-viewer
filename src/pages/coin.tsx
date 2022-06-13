import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header';
import { ICoinDetail, ICoinTickers } from '../interfaces';
import { fetchCoinInfo, fetchCoinTickers } from '../service/api';

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 560px;
  margin: 0 auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 0;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 7px 0;
  span:first-child {
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 0.5px;
    height: 100%;
    background-color: ${(props) => props.theme.textColor};
    opacity: 0.5;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 10px 0px;
    display: block;
  }
`;

const Footer = styled.footer`
  padding: 15px;
`;

interface Props {
  switchTheme: () => void;
}

type Params = {
  coinId: string;
};

type State = {
  name: string;
};

const Coin = ({ switchTheme }: Props) => {
  const { coinId: coinIdParam } = useParams<Params>();
  const coinId = coinIdParam || '';
  const location = useLocation();
  const state = location.state as State;

  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinDetail>(
    ['coin-detail', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ICoinTickers>(
      ['coin-tickers', coinId],
      () => fetchCoinTickers(coinId),
      {
        refetchInterval: 5000,
      }
    );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{state?.name || 'Cryptocurrency Viewer'}</title>
        </Helmet>
      </HelmetProvider>
      <Header
        title={state?.name || infoData?.name || 'Loading...'}
        switchTheme={switchTheme}
      />
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply.toLocaleString()}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={!!chartMatch}>
              <Link to="chart" replace={true}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={!!priceMatch}>
              <Link to="price" replace={true}>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Coin;
