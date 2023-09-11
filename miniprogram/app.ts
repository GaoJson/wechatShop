// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;
    this.globalData.statusHeight = systemInfo.statusBarHeight
    this.globalData.bottomHeight = (systemInfo.screenHeight - systemInfo.safeArea.bottom);
    this.globalData.shopCar = [];
    wx.getStorage({
      key:"shopCar",
      success:(res)=>{
        var array:[] = JSON.parse(res.data)
        this.globalData.shopCar = array;
         wx.getStorage(
           {
             key:"shopCarCount",
             success:(res)=>{
              wx.setTabBarBadge({
                index:2,
                text:""+res.data
              })
             }
           }
         )
         
        
      },
    })
    
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})