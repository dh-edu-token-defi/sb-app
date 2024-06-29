import { gql } from "graphql-request";
import { YEET24_REFERRER } from "./constants";

const yeeterFields = `
id
createdAt
dao {
  id
  referrer
  shareTokenSymbol
}
endTime
startTime
isShares
multiplier
minTribute
goal
balance
yeetCount
vault
`;

export const GET_YEETER = gql`
  query yeeter($shamanAddress: String!) {
    yeeter(id: $shamanAddress) {
      ${yeeterFields}
    }
  }
`;

export const GET_YEETERS = gql`
  {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc
      where: {
        dao_: {
          referrer: "${YEET24_REFERRER}"
        }
      }
    ) {
      ${yeeterFields}

    }
  }
`;

export const LIST_YEETS = gql`
  query yeets($shamanAddress: String!) {
    yeets(
      where: { yeeter: $shamanAddress }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
      dao {
        id
        shareTokenSymbol
      }
    }
  }
`;

export const LATEST_YEETS = gql`
  {
    yeets(
      orderBy: createdAt, 
      orderDirection: desc, 
      first: 5,
      where: {
        dao_: {
          referrer: "${YEET24_REFERRER}"
        }
    }) {
      id
      createdAt
      contributor
      amount
      shares
      message
      yeeter {
        id
      }
      dao {
        id
        shareTokenSymbol
      }
    }
  }
`;

export const LIST_MY_YEETS = gql`
  query yeets($account: String!) {
    yeets(
      where: { contributor: $account,
        dao_: {
          referrer: "${YEET24_REFERRER}"
        }
       }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
      yeeter {
        ${yeeterFields}
      }
    }
  }
`;

export const GET_YEETS_BY_TX = gql`
  query yeets($txHash: String!) {
    yeets(where: { txHash: $txHash }, first: 1) {
      id
      txHash
      shares
    }
  }
`;

export const GET_RAGEQUITS = gql`
  {
    rageQuits(
      where: {
        dao_: {
          referrer: "${YEET24_REFERRER}"
        }
       }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      shares
      member {
        memberAddress
      }
      dao {
        id
        referrer
        shareTokenSymbol
      }
    }
  }
`;

export const GET_RAGEQUITS_DAO = gql`
  query rageQuits($daoId: String!) {
    rageQuits(
      where: { dao: $daoId }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      shares
      member {
        memberAddress
      }
      dao {
        id
        referrer
        shareTokenSymbol
      }
    }
  }
`;
