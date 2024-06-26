import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { Button, Link, ParMd } from "@daohaus/ui";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useDaoData } from "../hooks/useDaoData";

const LinkButton = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const SwapButton = ({
  daoChain,
  yeeterId,
  daoId,
}: {
  daoChain: ValidNetwork;
  yeeterId: string;
  daoId: string;
}) => {
  const { dao } = useDaoData({ daoId, daoChain });

  const { uniswapUrl } = useMarketMaker({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  });

  if (!uniswapUrl) return null;

  return (
    <LinkButton href={uniswapUrl} type="external" showExternalIcon={false}>
      <Button
        size="lg"
        style={{ marginTop: "2rem" }}
        variant="outline"
        IconRight={HiOutlineArrowNarrowRight}
      >
        SWAP
      </Button>
    </LinkButton>
  );
};

export default SwapButton;
