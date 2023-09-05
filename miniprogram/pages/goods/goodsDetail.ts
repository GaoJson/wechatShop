import  API_HOME  from '../../api/homeApi';
const app = getApp<IAppOption>()
// pages/goods/goodsDetail.ts
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    statusHeight:app.globalData.statusHeight! + 44,
    goodsId:"",
    goodData:{},
    goodContent:"",
    goodsBanner:[],
    
    bottomHeight:app.globalData.bottomHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(wx.getSystemInfoSync())

    if (this.options){
      const id = this.options.id??""
       this.setData({
           goodsId:id
         }
       )
       API_HOME.getGoodsDetail(id).then((res)=>{
          console.log(res);
          const banner:string = res.data.goodsBanner;
          var array =  banner.split(",")
          var goodContent:string = res.data.goodsContent;
          goodContent = goodContent.replace(/\<img/gi, '<img style="width:100%";height:auto')
          this.setData({
            goodData:res.data,
            goodContent:goodContent,
            goodsBanner:array as []
          })
       })

    }
  },


  backRouter() {
    wx.navigateBack()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})