import { getOrderList } from "../../../utils/util";

// pages/my/order/order-page.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    menuSelect:0,
    menuList:["全部","待支付","待发货","待收货","已完成"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    getOrderList().then((data:any)=>{
      console.log(data);
      
    })
  },

  menuSelectAction(e:any){
    const index = e.currentTarget.dataset.index;
    if(this.data.menuSelect!=index){
      this.setData({
        menuSelect:index
      })
    }
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("1111111");
    
  },

  
})