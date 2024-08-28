import styled from "styled-components";

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NounsImage = ({
  nounId,
  backupSrc,

}: {
  nounId: string;
  backupSrc?: string;
}) => {


  if (!nounId) {
    return;
  }

  return (
    <CardImage src={`https://noun.pics/${nounId}.jpg` || backupSrc} alt={"current Auction"} />
  );
};
