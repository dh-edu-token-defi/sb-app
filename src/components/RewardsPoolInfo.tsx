import { ParLg, Tooltip } from '@daohaus/ui';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CURATOR_CONTRACTS, DEFAULT_CHAIN_ID } from '../utils/constants';
import { useRewardPool } from '../hooks/useRewardPool';
import { formatRewardPoolBalance } from '../utils/yeetDataHelpers';

const RewardsPoolLabel = styled.span`
    color: ${(props) => props.theme.warning.step10};
`;

const RewardPoolInfo = ({ max, toolTip}:{ max?:number, toolTip?: string}) => {


  const {maxReward, rewardPercent, shamanTemplateId, hos, balance } = useRewardPool({
    chainId: DEFAULT_CHAIN_ID,
    claimModuleAddress: CURATOR_CONTRACTS["YEET24_CLAIM_MODULE"][DEFAULT_CHAIN_ID],
  });
  toolTip = toolTip || `Rewards will be ${rewardPercent}% of total raise up to ${formatRewardPoolBalance(maxReward || BigInt(0) )} ETH or total pool`;
  const targetBalance = max || formatRewardPoolBalance(balance || BigInt(0)) || 0; // use total claimable rewards from the contract here
  const [displayedBalance, setDisplayedBalance] = useState(0);

    useEffect(() => {
        if (displayedBalance < targetBalance) {
            // Timeout to slow down the count-up effect
            const timer = setTimeout(() => {
                const increment = targetBalance / 100; // Adjust the speed/step here
                setDisplayedBalance(prevBalance => Math.min(prevBalance + increment, targetBalance));
            }, 20); // Speed of count-up in milliseconds

            return () => clearTimeout(timer);
        }
    }, [displayedBalance, targetBalance]); // Depend on displayedBalance and targetBalance

    return (
        <ParLg >
            Current Reward Pool: <RewardsPoolLabel>⭐{ displayedBalance.toFixed(3)} ETH</RewardsPoolLabel>
            {toolTip && <Tooltip content={toolTip} />}
        </ParLg>
    );
};

export default RewardPoolInfo;
