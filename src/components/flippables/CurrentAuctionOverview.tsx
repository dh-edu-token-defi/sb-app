import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import {

  AddressDisplay,
  Button,

  DataIndicator,

  ParLg,
  ParMd,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";
import { Actions, DetailItem, DetailsContainer, Wrapper } from "./flipables.styles";
import { useYeeter } from "../../hooks/useYeeter";
import { useNounsAuctionHouse } from "../../hooks/useNounsAuctionHouse";
import { CURATOR_CONTRACTS } from "../../utils/constants";
import { formatShortDateTimeFromSeconds, formatValueTo, fromWei, truncateAddress } from "@daohaus/utils";
import { useMemo } from "react";
import { ButtonRouterLink } from "../ButtonRouterLink";


export const CurrentAuctionOverview = ({
  daoId,
  daoChain,
  yeeterId,
}: {
  daoId: string;
  daoChain: ValidNetwork;
  yeeterId?: string;
}) => {


  // const { multiplier, minTribute } = useYeeter({ chainId: daoChain as ValidNetwork, daoId: daoId, shamanAddress: yeeterId });

  const { auction } = useNounsAuctionHouse({
    chainId: daoChain,
    daoId,
    auctionHouseAddress: CURATOR_CONTRACTS.NOUNS_AUCTION_HOUSE[daoChain as ValidNetwork],
  })


  const memoizedAuction = useMemo(() => auction, [auction]);

  if (!memoizedAuction) {
    return null;
  }

  return (
    <Wrapper>
      <DetailsContainer>
        <BigH1Blue>CURRENT</BigH1Blue>
        <BigH1Blue>AUCTION</BigH1Blue>


        <DetailItem>
          <ParLg>TokenID: {memoizedAuction.nounId.toString()}</ParLg>
          <DataIndicator
            // label="Raised"
            data={`${formatValueTo({
              value: fromWei(memoizedAuction.amount.toString()),
              decimals: 5,
              format: "numberShort",
            })}  ${HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol}`}
          />
          <ParMd>BIDDER:</ParMd>
          <AddressDisplay address={memoizedAuction.bidder} truncate copy />
          {memoizedAuction.endTime < Date.now() / 1000 ? <ParMd>ENDED</ParMd> : <ParMd>ENDS: {formatShortDateTimeFromSeconds(memoizedAuction.endTime.toString())}</ParMd>}
        </DetailItem>

        <Actions>
          {memoizedAuction.endTime < Date.now() / 1000 ?(
                      <ButtonRouterLink
                      to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/join`}
                    >
                      AUCTION ENDED
                    </ButtonRouterLink>) :
                      (<ButtonRouterLink
                      to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/bid`}
                    >
                      CAPTAIN: NEW BID
                    </ButtonRouterLink>)}
        </Actions>
      </DetailsContainer>



    </Wrapper>
  );
};
