// pages/my/my.ts
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    headIcon: "https://upload.jianshu.io/users/upload_avatars/4790772/388e473c-fe2f-40e0-9301-e357ae8f1b41.jpeg",
    userInfo: {},
    menuList: [{
      number: 0,
      name: "待支付",
      icon: "toPay"
    },
    {
      number: 0,
      name: "待发货",
      icon: "toDelivery"
    },
    {
      number: 1,
      name: "待收货",
      icon: "toTake"
    },
    {
      number: 0,
      name: "待评论",
      icon: "toComment"
    }
    ],
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.login({
      success(res) {
        console.log(res);

      }
    })
    wx.getUserInfo({
      success: (res) => {
        console.log(res);
      },
    })
  },

  getUserInfo() {
    wx.getUserProfile({
      desc: '完善会员资料',
      success: (res) => {
        console.log(res);
        this.setData(
          {
            userInfo: res.userInfo
          }
        )
      },
      fail: (error) => {
      }
    })
  },

  onChooseAvatar(e: any) {
    console.log(e);
  },

  addressAction(){
    wx.navigateTo({url: '/pages/my/address/address'})

  },

})