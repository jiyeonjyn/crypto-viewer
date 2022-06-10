import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ICoinPrice, ICoinTickers } from '../interfaces';
import { fetchCoinTickers } from '../service/api';

const PriceList = styled.ul``;

const PriceItem = styled.li<{ depth?: number }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  padding-left: ${(props) => (props.depth === 2 ? '30px' : 0)};
  &:not(:last-child) {
    border-bottom: 0.5px solid ${(props) => props.theme.textColor};
  }
`;

const ItemTitle = styled.div``;

const ItemValue = styled.div<{ value?: number }>`
  font-weight: 400;
  color: ${(props) =>
    typeof props.value === 'number' && props.value !== 0
      ? props.value > 0
        ? props.theme.isLightTheme
          ? '#02B646'
          : '#5AE679'
        : props.theme.isLightTheme
        ? '#EE403C'
        : '#ff605d'
      : props.theme.textColor};
  text-align: right;
  div {
    font-size: 13px;
    opacity: 0.7;
  }
`;

type Params = {
  coinId: string;
};

const PriceTable = () => {
  const { coinId: coinIdParam } = useParams<Params>();
  const coinId = coinIdParam || '';

  const { isLoading, data } = useQuery<ICoinTickers>(
    ['coin-tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const price = data?.quotes.USD ?? ({} as ICoinPrice);

  return (
    <>
      {isLoading ? (
        'Loading price...'
      ) : (
        <PriceList>
          <PriceItem>
            <ItemTitle>Price</ItemTitle>
            <ItemValue>
              ${Number(price.price.toFixed(3)).toLocaleString()}
            </ItemValue>
          </PriceItem>
          <PriceItem depth={2}>
            <ItemTitle>1h</ItemTitle>
            <ItemValue value={price.percent_change_1h}>
              {price.percent_change_1h}%
            </ItemValue>
          </PriceItem>
          <PriceItem depth={2}>
            <ItemTitle>24h</ItemTitle>
            <ItemValue value={price.percent_change_24h}>
              {price.percent_change_24h}%
            </ItemValue>
          </PriceItem>
          <PriceItem depth={2}>
            <ItemTitle>7d</ItemTitle>
            <ItemValue value={price.percent_change_7d}>
              {price.percent_change_7d}%
            </ItemValue>
          </PriceItem>
          <PriceItem>
            <ItemTitle>Trading Volume(24h)</ItemTitle>
            <ItemValue>
              ${Number(price.volume_24h.toFixed(0)).toLocaleString()}
            </ItemValue>
          </PriceItem>
          <PriceItem depth={2}>
            <ItemTitle>24h</ItemTitle>
            <ItemValue value={price.volume_24h_change_24h}>
              {price.volume_24h_change_24h}%
            </ItemValue>
          </PriceItem>
          <PriceItem>
            <ItemTitle>Market Capitalization</ItemTitle>
            <ItemValue>${price.market_cap.toLocaleString()}</ItemValue>
          </PriceItem>
          <PriceItem depth={2}>
            <ItemTitle>24h</ItemTitle>
            <ItemValue value={price.market_cap_change_24h}>
              {price.market_cap_change_24h}%
            </ItemValue>
          </PriceItem>
          <PriceItem>
            <ItemTitle>All-Time High</ItemTitle>
            <ItemValue>
              ${Number(price.ath_price.toFixed(3)).toLocaleString()}
              <div>({price.ath_date.slice(0, 10)})</div>
            </ItemValue>
          </PriceItem>
          <PriceItem>
            <ItemTitle>Price Now / All-Time High</ItemTitle>
            <ItemValue value={price.percent_from_price_ath}>
              {price.percent_from_price_ath}%
            </ItemValue>
          </PriceItem>
        </PriceList>
      )}
    </>
  );
};

export default PriceTable;
