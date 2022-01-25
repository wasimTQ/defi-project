import { BigNumber } from "ethers";
import { ethers } from "ethers";

export const convertToEther = (amount: any) =>
  amount ? ethers.utils.formatEther(BigNumber.from(amount)) : 0;

export const parseTime = (seconds: string) => {
  let secToNum = +seconds;

  if (secToNum > 60) {
    if (secToNum > 60 * 60) {
      let hrs = Math.floor(secToNum / 3600);
      let mins = Math.floor((secToNum - hrs * 3600) / 60);
      return `${hrs} hr ${mins} mins ${secToNum % 60} sec`;
    }
    return `${Math.floor(secToNum / 60)} mins ${secToNum % 60} sec`;
  } else {
    return secToNum + " sec";
  }
};

export const getAddress = (
  networks: object,
  chainId?: string,
  fallbackAddress?: string
): string => {
  let address: string = "";

  if (chainId) {
    address = (networks as any)[chainId].address;
  } else {
    Object.keys(networks).forEach((network) => {
      const daiTokenData = (networks as any)[network];
      if (daiTokenData.address) {
        address = daiTokenData.address;
      }
    });
  }

  return address;
};

export const convertTimestamp = (timestamp: string) => {
  const date = new Date(+timestamp * 1000);
  let mins: any = date.getMinutes();
  if (mins < 10) {
    mins = "0" + mins;
  }
  return `${date.getDate()}th ${date.getHours()}:${mins}`;
};
