import { styled, useTheme } from "styled-components";
import { ParXs } from "@daohaus/ui";
import Marquee from "react-fast-marquee";
import { YeeterItem, YeetsItem } from "../utils/types";
import { useEffect, useState } from "react";
import { formatMarqueeData } from "../utils/yeetDataHelpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 20px;
`;

// todo: add token symbol here
export type MarqueeItem = {
  amount?: string;
  description?: string;
  symbol: string;
  verb: string;
  createdAt: string;
};

export const YeetMarquee = ({
  yeets,
  yeeters,
  chainId,
}: {
  yeets: YeetsItem[];
  yeeters: YeeterItem[];
  chainId: string;
}) => {
  const theme = useTheme();
  const [data, setData] = useState<MarqueeItem[]>([]);

  useEffect(() => {
    const normalizedYeets = yeets.map((yeet) => {
      return {
        amount: yeet.amount,
        description: yeet.message,
        symbol: yeet.dao.lootTokenSymbol,
        verb: "yeeted into",
        createdAt: yeet.createdAt,
      };
    });

    const normalizedYeeters = yeeters.map((yeeter) => {
      return {
        symbol: yeeter.dao.lootTokenSymbol,
        verb: "token launched: ",
        createdAt: yeeter.createdAt,
      };
    });

    // const normalizedExits = [
    //   {
    //     amount: "1000000000000000000",
    //     verb: "exited from",
    //     symbol: "SPAM",
    //     createdAt: "1717182516",
    //   },
    // ];

    setData(
      [...normalizedYeets, ...normalizedYeeters].sort(
        // [...normalizedYeets, ...normalizedYeeters, ...normalizedExits].sort(
        (a, b) => {
          return Number(a.createdAt) - Number(b.createdAt);
        }
      )
    );
  }, [yeets, yeeters]);

  return (
    <Marquee speed={75} autoFill={true} style={{ maxWidth: "110rem" }}>
      {data.map((dataItem, i) => {
        return (
          <Container key={i}>
            <ParXs color={theme.primary.step9}>
              {formatMarqueeData(dataItem)}
            </ParXs>
          </Container>
        );
      })}
    </Marquee>
  );
};
