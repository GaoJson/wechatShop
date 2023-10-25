import { getOrderList } from "../../../utils/util"

// pages/my/order/order-detail.ts
Page({

  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    order:{},
    goodsList:[]
  },
  onLoad() {
    const id = this.options.id
    getOrderList().then((data:any)=>{
      var list:any[] = data;
      list.forEach(element => {
         if (id == element.id){
           console.log(element);
          this.setData({
            order:element
          })
         }
      });
    })
  },
})