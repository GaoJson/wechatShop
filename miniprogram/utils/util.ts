export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
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
  var goodsList: any = app.globalData.shopCar;
  var exitFlag = false;
  var allCount = 0;
  for (let index = 0; index < (goodsList ?? []).length; index++) {
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
    app.globalData.shopCar?.push({
      "goodsName": data.goodsName,
      "goodsImg": data.goodsImg,
      "goodsPrice": data.goodsPrice,
      "id": data.id,
      "spec": data.spec,
      "count": 1
    });
    allCount += 1;
  }
  wx.setStorageSync("shopCar", JSON.stringify(app.globalData.shopCar));
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
  app.globalData.shopCar = data;
  wx.setStorageSync("shopCar", JSON.stringify(data));
  wx.setStorageSync("shopCarCount", allCount);
  wx.setTabBarBadge({
    index: 2,
    text: "" + allCount,
  })
}

