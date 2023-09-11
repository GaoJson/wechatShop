/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    statusHeight?:number,
    bottomHeight?:number,
    shopCar?:any[],
    systemInfo?:any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}