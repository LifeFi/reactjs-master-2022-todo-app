import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  console.log(data);

  const mappedOhlcvData = data?.map((price) => ({
    x: new Date(parseFloat(price.time_close) * 1000).toUTCString(),
    y: [price.open, price.high, price.low, price.close],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "price",
                data: data?.map((price) => price.close) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },

              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(parseFloat(price.time_close) * 1000).toUTCString()
                ),
              },
              // fill: {
              //   type: "gradient",
              //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              // },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(3)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={
              [
                {
                  data: mappedOhlcvData,
                },
              ] as unknown as number[]
            }
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                type: "candlestick",
                height: 350,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(parseFloat(price.time_close) * 1000).toUTCString()
                ),
                labels: {
                  style: {
                    colors: "#9c88ff",
                  },
                },
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#3c90eb",
                    downward: "#df7d46",
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
