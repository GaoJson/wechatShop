import { addShopCar } from "../../../utils/util";

// pages/my/collect/collect-page.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    collectList:<any>[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },

  getData(){
    wx.getStorage({
      key:"collect",
      success:(res:any)=>{
        var list:any[] = res.data;
        this.setData({
          collectList:list
        })
      
      },
    })
  },

  deleteAction(e:any){
    const index:number = e.currentTarget.dataset.index;
    var list:[] = this.data.collectList;
    list.splice(index,1);
    wx.setStorageSync("collect",list);
    this.setData({
      collectList:list
    })
  },
  shopcatAction(e:any){
    const index:number = e.currentTarget.dataset.index;
    addShopCar(this.data.collectList[index])
    wx.showToast({
      title:"添加成功"
    })
  }

  
})