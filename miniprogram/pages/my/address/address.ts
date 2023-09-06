
// pages/my/address/address.ts
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
  },

  onShow(){
    wx.getStorage({
      key:"address",
      success:(e:any)=>{
        this.setData(
          {
            addressList:e.data
          }
        )
      },
      fail:()=>{
        wx.setStorageSync("address",[])
        this.setData(
          {
            addressList:[]
          }
        )
      }
    })

  },
  addAddress(){
    wx.navigateTo({url: '/pages/my/address/address-add'})
  },
  editAddress(e:any){
    const index = e.currentTarget.dataset.index
    wx.navigateTo({url: '/pages/my/address/address-add?index='+index
    })
  },

})