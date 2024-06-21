import { useProfile } from "@daohaus/moloch-v3-hooks";
import { DataMd, ProfileAvatar } from "@daohaus/ui";
import { truncateAddress } from "@daohaus/utils";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledDataMd = styled(DataMd)`
  font-size: 1.6rem;
`;

type YeeterProfileProps = {
  address: string;
};
export const ContributorProfile = ({ address }: YeeterProfileProps) => {
  const { profile } = useProfile({
    address,
  });

  return (
    <ProfileContainer>
      <ProfileAvatar address={address} image={profile?.avatar} />
      <StyledDataMd>{profile?.ens || truncateAddress(address)}</StyledDataMd>
    </ProfileContainer>
  );
};