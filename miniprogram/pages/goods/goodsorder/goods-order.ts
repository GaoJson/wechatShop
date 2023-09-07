import { AddressModel, GoodsModel } from "../../../utils/models";


// pages/goods/goodsorder/goods-order.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    goodsList:[] as GoodsModel[],
    address:{},
    priceInfo:[],
    allPrice:'0.00'
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
    this.data.goodsList.forEach(element => {
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
      allPrice:allPrice.toFixed(2),
      priceInfo:param as[]
    })
    
  },
 
})