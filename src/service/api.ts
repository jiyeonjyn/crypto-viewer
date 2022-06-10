// API docs : https://api.coinpaprika.com

const BASE_URL = `https://api.coinpaprika.com/v1`;

// 코인 리스트
export const fetchCoinList = () => {
  return fetch(`${BASE_URL}/coins`) //
    .then((response) => response.json());
};

// 코인 상세
export const fetchCoinInfo = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`) //
    .then((response) => response.json());
};

// 코인 시세
export const fetchCoinTickers = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`) //
    .then((response) => response.json());
};

// 기간별 코인 시세
// OHLCV : Open/High/Low/Close values(prices)
// export const fetchCoinOHLCV = (coinId: string) => {
//   const endDate = Math.floor(Date.now() / 1000);
//   const startDate = endDate - 60 * 60 * 24 * 6;
//   return fetch(
//     `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
//   ) //
//     .then((response) => response.json());
// };

export const fetchCoinOHLCV = (coinId: string) => {
  const yesterdayOHLCV = fetch(`${BASE_URL}/coins/${coinId}/ohlcv/latest`) //
    .then((response) => response.json());
  const todayOHLCV = fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`) //
    .then((response) => response.json());
  return Promise.all([yesterdayOHLCV, todayOHLCV]);
};
