import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

const PriceInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 30px 20px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  span {
    &:first-child {
      text-transform: uppercase;
      font-weight: 600;
      color: ${(props) => props.theme.accentColor};
    }
    &:nth-child(2) {
      font-size: 11px;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    &:last-child {
      font-size: 30px;
    }
  }
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const USD = data?.quotes.USD;
  return (
    <div>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <PriceInfoContainer>
          <PriceInfo>
            <span>percent change</span>
            <span>[1 year]</span>
            <span>{USD?.percent_change_1y}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[30 days]</span>
            <span>{USD?.percent_change_30d}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[24 hour]</span>
            <span>{USD?.percent_change_24h}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[12 hour]</span>
            <span>{USD?.percent_change_12h}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[6 hour]</span>
            <span>{USD?.percent_change_6h}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[1 hour]</span>
            <span>{USD?.percent_change_1h}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[30 min]</span>
            <span>{USD?.percent_change_30m}</span>
          </PriceInfo>

          <PriceInfo>
            <span>percent change</span>
            <span>[15 min]</span>
            <span>{USD?.percent_change_15m}</span>
          </PriceInfo>
        </PriceInfoContainer>
      )}
    </div>
  );
}

export default Price;
