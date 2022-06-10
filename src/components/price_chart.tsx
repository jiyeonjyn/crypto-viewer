import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ICoinOHLCV } from '../interfaces';
import { fetchCoinOHLCV } from '../service/api';
import ApexChart from 'react-apexcharts';

type Params = {
  coinId: string;
};

interface Props {
  isLightTheme: boolean;
}

const PriceChart = ({ isLightTheme }: Props) => {
  const { coinId: coinIdParam } = useParams<Params>();
  const coinId = coinIdParam || '';

  const { isLoading, data } = useQuery<ICoinOHLCV[]>(
    ['coin-ohlcv', coinId],
    () => fetchCoinOHLCV(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const chartData = data?.length
    ? data.map((price) => {
        return {
          x: price.time_close.slice(0, 10),
          y: [
            price.open.toFixed(3),
            price.high.toFixed(3),
            price.low.toFixed(3),
            price.close.toFixed(3),
          ],
        };
      })
    : [];

  // [[Timestamp], [O, H, L, C]]
  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: isLightTheme ? 'light' : 'dark',
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            xaxis: {
              type: 'datetime',
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                formatter: (value) => '$' + value.toFixed(3),
              },
            },
          }}
        />
      )}
    </>
  );
};

export default PriceChart;
