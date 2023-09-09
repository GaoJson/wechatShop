// pages/basket/basket.ts

import { GoodsModel } from "../../utils/models";
import {calculateShopCar} from '../../utils/util'
const app = getApp<IAppOption>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    contentHeight:wx.getSystemInfoSync().windowHeight - app.globalData.statusHeight! - 44,
    statusHeight:app.globalData.statusHeight! + 44,
    goodsList:[] as GoodsModel[],
    selectAllFlag:false,
    allPrice:"0.00",
    editFlag:false,
    editRight:wx.getMenuButtonBoundingClientRect().left,
    allCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   
    
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
    var array:[] = app.globalData.shopCar as []
    var allCount = 0;
    for (let index = 0; index < array.length; index++) {
      const element:GoodsModel = array[index];
      element.selectFlag = false;
      allCount += element.count;
    }
    wx.setStorageSync("shopCarCount", allCount);
    wx.setTabBarBadge({
      index: 2,
      text: "" + allCount,
    })
    this.setData({
      editFlag:false,
      goodsList:array,
      selectAllFlag:false
    })
    this.calculatePrice()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  
  },

  selectGoods(e:any){
    const index = e.currentTarget.dataset.index;
    var model:GoodsModel = this.data.goodsList[index]
    model.selectFlag = !model.selectFlag;
    this.setData({
      selectAllFlag:false,
      goodsList:this.data.goodsList
    })
    this.calculatePrice()
  },

  countOnChange(e:any){
    const index = e.currentTarget.dataset.index;
    const count = e.detail;
    var model:GoodsModel = this.data.goodsList[index]
    model.count = count;
    calculateShopCar(this.data.goodsList as[])
    this.calculatePrice()
  },

  selectAllAction() {
      const selectAll:boolean = !this.data.selectAllFlag;
      this.data.goodsList.forEach(e=>{
        e.selectFlag = selectAll;
      })
      this.setData({
        selectAllFlag:selectAll,
        goodsList:this.data.goodsList
      })
      this.calculatePrice()
  },
  calculatePrice() {
    var allPrice = 0;
    var allCount = 0;
    this.data.goodsList.forEach(e=>{
      if(e.selectFlag) {
        allCount += e.count;
        allPrice += (Number.parseFloat(e.goodsPrice)*e.count)
      }
    })
    this.setData({
      allPrice:allPrice.toFixed(2),
      allCount:allCount
    })
  },
  
  editAction(){
    this.setData({
      editFlag:!this.data.editFlag
    })
  },
  deleteGoodsAction(){
      var list = this.data.goodsList;
      var tempList:GoodsModel[]=[];
      tempList = tempList.concat(list)
      const length = list.length;
      for (let index = 0; index < length; index++) {
        var element:GoodsModel = list[index];
        if(element.selectFlag==true) {
          tempList.splice(tempList.indexOf(element),1)
        }
      }
      
      this.setData({
        goodsList:tempList
      })
      calculateShopCar(this.data.goodsList as[])
      this.calculatePrice()
  },

  gotoOrder(){
    var list = this.data.goodsList;
    var tempList:GoodsModel[]=[];
    list.forEach(element => {
      if(element.selectFlag){
        tempList.push(element)
      }
    });
    if(tempList.length == 0){
      wx.showToast({
        title:"暂无选择商品",
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/goods/goodsorder/goods-order',
      success:function(res){
        res.eventChannel.emit('addressList',tempList)
      }
    })

  }

})