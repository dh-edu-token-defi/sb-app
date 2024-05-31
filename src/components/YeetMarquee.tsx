import { styled, useTheme } from "styled-components";
import { DataXs, H3, H5, ParXs } from "@daohaus/ui";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { YeeterItem, YeetsItem } from "../utils/types";
import { charLimit, formatValueTo, fromWei } from "@daohaus/utils";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 20px;
`;

type MarqueeItem = {
  amount: string;
  description: string;
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
        createdAt: yeet.createdAt,
      };
    });

    const normalizedYeeters = yeeters.map((yeeter) => {
      return {
        amount: yeeter.balance,
        description: yeeter.id,
        createdAt: yeeter.createdAt,
      };
    });

    setData(
      [...normalizedYeets, ...normalizedYeeters].sort((a, b) => {
        return Number(a.createdAt) - Number(b.createdAt);
      })
    );
  }, [yeets, yeeters]);

  return (
    <Marquee speed={75} autoFill={true} style={{ maxWidth: "110rem" }}>
      {data.map((dataItem) => {
        return (
          <Container>
            <ParXs>
              {`${formatValueTo({
                value: fromWei(dataItem.amount),
                decimals: 3,
                format: "numberShort",
              })} ${HAUS_NETWORK_DATA[chainId as ValidNetwork]?.symbol}`}
            </ParXs>
            <ParXs color={theme.primary.step9}>
              {charLimit(dataItem.description, 30)}
            </ParXs>
          </Container>
        );
      })}
    </Marquee>
  );
};
