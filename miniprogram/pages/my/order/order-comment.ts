import { getOrderList } from "../../../utils/util";

// pages/my/order/order-comment.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    star:5,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  starChange(e:any){
    this.data.star = e.detail
  },

  contentChange(e:any){
    this.data.content = e.detail.value
  },

  submitAction() {
    const id = this.options.id

   getOrderList().then((data: any) => {
      var list: any[] = data;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (id == element.id) {
          element.comment = {
            content:this.data.content,
            star:this.data.star
          }
          break
        }
      }
      wx.setStorageSync("order",list)
      wx.showToast({title:"提交成功"})
      setTimeout(() => {
        wx.navigateBack()
      }, 2000);
    })

 
  },

})