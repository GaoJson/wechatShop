import { GoodsModel } from "./models"

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

const app = getApp<IAppOption>();

export const navbarHeight = ()=>{
  return app.globalData.statusHeight! + 44
}

export const addShopCar = (data: any) => {
  var list = wx.getStorageSync("shopCar")
  if(!list){
   list = []
  }
  var goodsList:any[] = list
  var exitFlag = false;
  var allCount = 0;
  for (let index = 0; index < goodsList.length; index++) {
    var tempData = goodsList[index];
    if (tempData.id == data.id) {
      var count = Number.parseInt(tempData.count);
      count++;
      tempData.count = count;
      exitFlag = true;
    }
    allCount += Number.parseInt(tempData.count);
  }
  if (!exitFlag) {
    var goodsData:GoodsModel = {
      "goodsName": data.goodsName,
      "goodsImg": data.goodsImg,
      "goodsPrice": data.goodsPrice,
      "id": data.id,
      "spec": data.spec,
      "count": 1,
      selectFlag:true
    }
    allCount += 1;
    console.log(goodsList);
    
    goodsList.push(goodsData)
  }
  wx.setStorageSync("shopCar",goodsList);
  wx.setStorageSync("shopCarCount", allCount);
  wx.setTabBarBadge({
    index: 2,
    text: "" + allCount,
  })
}
export const calculateShopCar = (data: []) => {
  var allCount = 0;
  for (let index = 0; index < (data ?? []).length; index++) {
    var tempData: any = data[index];
    allCount += Number.parseInt(tempData.count);
  }
  wx.setStorageSync("shopCar",data);
  wx.setStorageSync("shopCarCount", allCount);
  wx.setTabBarBadge({
    index: 2,
    text: "" + allCount,
  })
}

export const showShopcarCount=()=>{
  var list = wx.getStorageSync("shopCar")
  if(!list){
   list = []
  }
  var allCount = 0
  for (let index = 0; index < list.length; index++) {
    var tempData = list[index];
    allCount += Number.parseInt(tempData.count);
  }
  wx.setTabBarBadge({
    index: 2,
    text: "" + allCount,
  })
}

export const addCollectGoods=(data:any)=>{
  var param:any = {
    "goodsName": data.goodsName,
    "goodsImg": data.goodsImg,
    "goodsPrice": data.goodsPrice,
    "id": data.id,
    "spec": data.spec,
  };
  wx.getStorage({
    key:"collect",
    success:(res:any)=>{
      var list:any[] = res.data;
      list.push(param);
      wx.setStorageSync("collect",list)
    },
    fail:()=>{
      wx.setStorageSync("collect",[param])
    }
  })

}

export const deleteCollectGoods=(data:any)=>{
  wx.getStorage({
    key:"collect",
    success:(res:any)=>{
      var list:any[] = res.data;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if(element.id == data) {
          list.splice(index,1)
          break
        }  
      }
      wx.setStorageSync("collect",list)
    },
    fail:()=>{
      wx.setStorageSync("collect",[])
    }
  })

}

export const getOrderList=():Promise<any>=>{
  return new Promise((resolve)=>{
    wx.getStorage({
      key:"order",
      success:(res:any)=>{
        resolve(res.data)
      },
      fail:()=>{
        wx.setStorageSync("order",[])
        resolve([])
      }
    })
  })
}
export const addOrder=(data:any):Promise<any>=>{
  return new Promise((resolve)=>{
    wx.getStorage({
      key:"order",
      success:(res:any)=>{
        var list:any[] = res.data
        if(list.length> 0){
          var temp = list[list.length-1];
           data.id = temp.id+1; 
        }
        list.push(data)
        wx.setStorageSync("order",list)
        resolve(data.id)
      },
      fail:()=>{
        var list:any[] = []
        list.push(data)
        wx.setStorageSync("order",list)
      }
    })
  })
  
}
