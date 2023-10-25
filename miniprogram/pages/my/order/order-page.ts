import { addShopCar, formatTime, getOrderList } from "../../../utils/util";

// pages/my/order/order-page.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    menuSelect:0,
    menuList:["全部","待支付","待发货","待收货","已完成"],
    allOrder:[],
    orderList:[],
    orderSelectId:0,

    moreTop:0,
    moreLeft:0,
    showMore:false,

    payShow:false,
    orderPrice:'0',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   
    
  },
  onReady(){
    getOrderList().then((data:any)=>{
      this.data.allOrder = data;
    })
    var type = Number.parseInt(this.options.type??'0');
    var ty = -1
    if(type>=0){
      ty = type
      type += 1
    } else{
      type = 0;
    }

    this.setData({
      menuSelect:type
    })
    console.log(ty);
    setTimeout(() => {
      this.getList(ty)
    }, 100);
  },

  getList(index:number){
    var list:any[] = []
    this.data.allOrder.forEach(element => {
       const data:any = element;
       if(data.state == index) {
          list.push(data)
       }
    });
    list.reverse()
    if(index == -1){
      this.setData({
        orderList:this.data.allOrder.reverse()
      })
    } else {
      this.setData({
        orderList:list as any
      })
    }   
  },

  menuSelectAction(e:any){

    const index = e.currentTarget.dataset.index;
    if(this.data.menuSelect!=index){
      this.setData({
        menuSelect:index
      })
    }
    this.getList(index-1);
  },


  itemAction(){
    
    
    

  },
  

  moreAction(e:any){
    this.setData({
      showMore:true,
      moreLeft:e.detail.x,
      moreTop: getApp<IAppOption>().globalData.systemInfo.screenHeight-e.detail.y
    })
  },
  hideMoreAction(){
    this.setData({
      showMore:false,
    })
  },
  detailAction(e:any){
    const id = e.currentTarget.dataset.index
    wx.navigateTo({ url: '/pages/my/order/order-detail?id='+id})
  },

  ensureOrder(e:any){
    const index = e.currentTarget.dataset.index
    var data:any = this.data.orderList[index]
    this.data.orderSelectId = data.id;
    wx.showModal({
      title:"确认收货",
      confirmText:"确认",
      cancelText:"取消",
      success:(res)=>{
          if(res.confirm){
            for (let index = 0; index < this.data.allOrder.length; index++) {
              const element:any = this.data.allOrder[index];
              if(element.id == this.data.orderSelectId){
                  element.state = 3;
                  element.completeTime=formatTime(new Date())
                break
              }
            }
            this.getList(this.data.menuSelect-1)
            wx.showToast({
              title:"收货成功"
            })
            wx.setStorageSync("order",this.data.allOrder)
          }
      }
    }
    )
  },

  paymentAction(e:any){
    const index = e.currentTarget.dataset.index
    var data:any = this.data.orderList[index]
    this.data.orderSelectId = data.id;
    this.setData({
      orderPrice:data.price,
      payShow:true
    })
  },
  closePayment(){
    this.setData({
      payShow:false
    })
  },
  ensurePassword(){
    this.setData({
      payShow:false
    })
    for (let index = 0; index < this.data.allOrder.length; index++) {
      const element:any = this.data.allOrder[index];
      if(element.id == this.data.orderSelectId){
          element.state = 1;
          element.payTime=formatTime(new Date())
        break
      }
    }
    this.getList(this.data.menuSelect-1)
    wx.showToast({
      title:"付款成功"
    })
    wx.setStorageSync("order",this.data.allOrder)
  },

  addShopcar(e:any){
    const index = e.currentTarget.dataset.index
    var data:any = this.data.orderList[index]
    var goodList:[] = data.goodList;
    for (let index = 0; index < goodList.length; index++) {
      const element = goodList[index];
      addShopCar(element)
    }
    wx.showToast({title:'添加购物车成功'})
  },

  deliveryAction(e:any){
    const index = e.currentTarget.dataset.index
    var data:any = this.data.orderList[index]
    wx.showModal({
      title:"填写快递单号",
      confirmText:"确认",
      cancelText:"取消",
      editable:true,
      placeholderText:"请输入快递单号",
      success:(res)=>{
        if(res.confirm){
          for (let index = 0; index < this.data.allOrder.length; index++) {
            const element:any = this.data.allOrder[index];
            if(element.id == data.id){
                element.state = 2;
                element.deliveryId = res.content;
                element.deliveryTime=formatTime(new Date())
              break
            }
          }
          this.getList(this.data.menuSelect-1)
          wx.showToast({
            title:"发货成功"
          })
          wx.setStorageSync("order",this.data.allOrder)
        }
      }
    })


  },

  deleteOrder(e:any){
    const index = e.currentTarget.dataset.index
    var data:any = this.data.orderList[index]
    wx.showModal({
      title:"确认删除该订单？",
      confirmText:"确认",
      cancelText:"取消",
      success:(res)=>{
        if(res.confirm){
          for (let index = 0; index < this.data.allOrder.length; index++) {
            const element:any = this.data.allOrder[index];
            if(element.id == data.id){
              this.data.allOrder.splice(index,1)
              break
            }
          }
          this.getList(this.data.menuSelect-1)
          wx.showToast({
            title:"删除成功"
          })
          wx.setStorageSync("order",this.data.allOrder)
        }
      }
    })
  },

  expressAction(e:any){
    const id = e.currentTarget.dataset.index

    wx.navigateTo({ url: '/pages/my/order/order-express?id='+id})
  },

  commentAction(e:any){
    const id = e.currentTarget.dataset.index
    wx.navigateTo({ url: '/pages/my/order/order-comment?id='+id})
  },
  
})