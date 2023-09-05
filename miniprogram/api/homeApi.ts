import { createRequest as request } from "../utils/http";

function getHomeData(params?:any) {
  return request(
    "goods/v1/main",
    "GET",
    params
  )
} 

 function getHomeList(params?:any) {
  return request(
    "goods/v1/list",
    "POST",
    params
  )
} 

function getGoodsDetail(id:string) {
  return request(
    "goods/v1/"+id,
    "GET",
    {}
  )
}




export default {
  getHomeData,
  getHomeList,
  getGoodsDetail
};