import axios from "axios";
export const binanceTicker = axios.create({
  baseUrl: "https://www.binance.com/bapi/asset/v2/public/asset"
});
export const GetAllasset = axios.create({
  baseUrl: "https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset"
});
