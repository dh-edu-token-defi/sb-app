import { styled, useTheme } from "styled-components";
import { ParSm, ParXs } from "@daohaus/ui";
import Marquee from "react-fast-marquee";
import { RagequitItem, YeeterItem, YeetsItem } from "../utils/types";
import { useEffect, useState } from "react";
import { HiLightningBolt } from "react-icons/hi";
import { formatMarqueeData } from "../utils/yeetDataHelpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-right: 20px;
`;

const StyledParSm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
  ragequits,
  chainId,
}: {
  yeets: YeetsItem[];
  yeeters: YeeterItem[];
  ragequits?: RagequitItem[];
  chainId: string;
}) => {
  const theme = useTheme();
  const [data, setData] = useState<MarqueeItem[]>([]);

  useEffect(() => {
    const normalizedYeets = yeets.map((yeet) => {
      return {
        amount: yeet.amount,
        description: yeet.message,
        symbol: yeet?.dao?.shareTokenSymbol,
        verb: "yeeted into",
        createdAt: yeet.createdAt,
      };
    });

    const normalizedYeeters = yeeters.map((yeeter) => {
      return {
        symbol: yeeter?.dao?.shareTokenSymbol,
        verb: "token launched: ",
        createdAt: yeeter.createdAt,
      };
    });

    let normalizedExits;
    if (ragequits) {
      normalizedExits = ragequits.map((rq) => {
        return {
          amount: rq.shares,
          symbol: rq.dao.shareTokenSymbol,
          verb: "exited",
          createdAt: rq.createdAt,
        };
      });
    }

    let allData = [...normalizedYeets, ...normalizedYeeters];
    if (normalizedExits) {
      allData = [...allData, ...normalizedExits];
    }

    setData(
      // [...normalizedYeets, ...normalizedYeeters].sort(
      allData.sort((a, b) => {
        return Number(a.createdAt) - Number(b.createdAt);
      })
    );
  }, [yeets, yeeters]);

  return (
    <Marquee speed={75} autoFill={true} style={{ maxWidth: "90vw" }}>
      {data.map((dataItem, i) => {
        return (
          <Container key={i}>
            <StyledParSm>
              <HiLightningBolt
                fontSize="1.5rem"
                style={{ color: `${theme.secondaryA.step11}` }}
              />
              <ParSm color={theme.primary.step9}>
                {formatMarqueeData(dataItem)}
              </ParSm>
            </StyledParSm>
          </Container>
        );
      })}
    </Marquee>
  );
};
