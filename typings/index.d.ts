/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    statusHeight?:number,
    bottomHeight?:number,
    shopCar?:any[]
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}