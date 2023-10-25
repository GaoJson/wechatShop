import { calcDateNum } from "../../../miniprogram_npm/@vant/weapp/calendar/utils";
import { AddressModel, GoodsModel } from "../../../utils/models";
import { addOrder, formatTime } from "../../../utils/util";


// pages/goods/goodsorder/goods-order.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    goodsList:[] as GoodsModel[],
    address:<AddressModel>{},
    priceInfo:[],
    allPrice:'0.00',
    allCount:0,
    payShow:false,
    orderId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() { 
    const that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('addressList', function(data) {
      that.setData({
        goodsList:data
      })
      that.calculatePrice()
    })
    this.getAddress()
  },

  getAddress(){
    wx.getStorage({
      key:'address',
      success:(res)=>{
        var list:AddressModel[] = res.data
        var defaultAddress:any = {}
        list.forEach(element => {
          if(element.defaultFlag){
            defaultAddress = element;
          }
        });
        if (!defaultAddress.userName) {
          if(list.length> 0) {
            defaultAddress = list[0];
          }
        }
        this.setData({
          address:defaultAddress
        })
      }
    }
    )

  },
  gotoAddress(){
    const that = this
    wx.navigateTo(
      {url: '/pages/my/address/address?select=1',
      events:{
        'selectAddress':function(data:any){
          console.log(data);
          that.setData({
            address:data
          })
        }
      }
      }
    )
  },

  calculatePrice(){
    var param = []
    var allPrice = 0.00
    var allCount = 0
    this.data.goodsList.forEach(element => {
      allCount += element.count
     allPrice += element.count * Number.parseFloat(element.goodsPrice)
    });
    param.push({
      title:"商品价格",
      "value":allPrice.toFixed(2)
    })
    param.push({
      title:"退换货免运费",
      value:"0.00"
    })
    param.push({
      title:"运费",
      value:"0.00"
    })
    param.push({
      title:"优惠卷",
      value:"0.00"
    })
    this.setData({
      allCount:allCount,
      allPrice:allPrice.toFixed(2),
      priceInfo:param as[]
    })
  },

  gotoPayAction(){
    if(this.data.address.userName == undefined){
      wx.showToast
      wx.showToast({
        title:"地址不能为空",
        icon:'error'
      })
      return
    }
  
    var order = {
      address:this.data.address,
      goodList:this.data.goodsList,
      price:this.data.allPrice,
      id:0,
      state:0,
      count:this.data.allCount,
      createTime:formatTime(new Date())
    }

    this.deleteGoods()
    addOrder(order).then((res)=>{
      this.data.orderId = res;
    })
    this.setData({
      payShow:true
    })
  },

  deleteGoods(){
    wx.getStorage({
      key:"shopCar",
      success:(res)=>{
       
          var list:GoodsModel[] = res.data
          var tempData:GoodsModel[] = []
          var selectData = this.data.goodsList
          let mySet = new Set();
          selectData.forEach(element => {
            mySet.add(element.id)
          }); 
          list.forEach(element => {
            if(!mySet.has(element.id)){
                tempData.push(element)
            }
          });
           wx.setStorageSync("shopCar",tempData)
      }
    })


  },

  closePayment(){
    this.setData({
      payShow:false
    })
    wx.showToast(
      {
        title:"取消支付"
      }
    )
    setTimeout(() => {
      wx.navigateBack()
    }, 2000);
  },

  ensurePassword(e:any){
    console.log(e);
    this.setData({
      payShow:false
    })
    const orderList:any[] =  wx.getStorageSync("order")
    
    for (let index = 0; index < orderList.length; index++) {
      const element = orderList[index];
      if(element.id == this.data.orderId){
        element.state = Math.floor(Math.random()*3)+1;
        element.payTime=formatTime(new Date())
      }
    }
    wx.setStorageSync("order",orderList)
    wx.showToast(
      {
        title:"支付成功"
      }
    )
    setTimeout(() => {
      wx.navigateBack()
    }, 2000);
  }
 
})