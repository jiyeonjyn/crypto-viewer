export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface ICoinDetail {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface ICoinPrice {
  ath_date: string; // 최고가 달성 시간
  ath_price: number; // ATH(All Time High), 최고가
  market_cap: number; // market capitalization : 시가총액
  market_cap_change_24h: number; // 시가총액 변동률
  percent_change_1h: number; // 지난 1시간 시세 변동률
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number; // 최고가 대비 현재 시세 비율
  price: number; // 현재 시세
  volume_24h: number; // 지난 24시간 거래량
  volume_24h_change_24h: number; // 지난 24시간 거래량 변동률
}

export interface ICoinTickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number; // 현재까지 유통량
  total_supply: number; // 총 유통량
  max_supply: number; // 최대 발행량
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    // 시세
    USD: ICoinPrice;
  };
}

export interface ICoinOHLCV {
  time_open: string;
  time_close: string;
  open: number; // 시가
  high: number; // 고가
  low: number; // 저가
  close: number; // 종가
  volume: number;
  market_cap: number;
}
