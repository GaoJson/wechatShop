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
    menuList:["全部","待支付","待发货","待收货","已完成"],
    allOrder:[],
    orderList:[],

    moreTop:0,
    moreLeft:0,
    showMore:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    getOrderList().then((data:any)=>{
      this.data.allOrder = data;
    })
    
  },
  onReady(){
    this.getList(-1);
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
    console.log(this.data.orderList);
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



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    
    
  },

  itemAction(){
    console.log("222222");
    

  },
  

  moreAction(e:any){
    console.log("1111111");
    this.setData({
      showMore:true,
      moreLeft:e.detail.x,
      moreTop: getApp<IAppOption>().globalData.systemInfo.screenHeight-e.detail.y
    })
    

  },
  hideMoreAction(){
    console.log("33333333");
    
    this.setData({
      showMore:false,
    })
   
  }
  
})