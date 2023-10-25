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
      number: 0,
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

  onShow() {
    wx.getStorage({
      key: "order",
      success: (res) => {
        console.log(res);
        
        var num0 = 0
        var num1 = 0
        var num2 = 0
        var num3 = 0
        var list: any[] = res.data;
        list.forEach(element => {
          switch (element.state) {
            case 0:
              num0 += 1
              break;
            case 1:
              num1 += 1
              break;
            case 2:
              num2 += 1
              break;
            case 3:
              num3 += 1
              break;
          }
        });
        this.setData({
          ['menuList[0].number']:num0,
          ['menuList[1].number']:num1,
          ['menuList[2].number']:num2,
          ['menuList[3].number']:num3,
        })

      }
    }
    )



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

  addressAction() {
    wx.navigateTo({ url: '/pages/my/address/address' })
  },
  collectAction() {
    wx.navigateTo({ url: '/pages/my/collect/collect-page' })
  },

  orderAction(e:any) {
    console.log(e);
    var index = e.currentTarget.dataset.index
    wx.navigateTo({ url: '/pages/my/order/order-page?type='+index,})
  },

})