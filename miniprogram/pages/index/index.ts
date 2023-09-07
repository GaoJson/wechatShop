// index.ts
// 获取应用实例
import  API_HOME  from '../../api/homeApi';
import {addShopCar} from '../../utils/util'
const app = getApp<IAppOption>()



Page({
  
  data: {
    contentHeight:wx.getSystemInfoSync().windowHeight - app.globalData.statusHeight! - 44-40,
    statusHeight:app.globalData.statusHeight! + 44,
    topBannerVos:[],
    tgoodsCategoryVos:[],
    shopNoticeVos:[],
    hotGoodsVo:[],
    midBannerVos:[],
    goodsList:[],
    refreshStatus:false,
    page:1,
    ani: {},
  },

  onLoad() {
    this.getGoodsData();
    this.getList();
  
    
  },
 
  getList() {
    var prama = {
      "pageNum":this.data.page,
      "pageSize":4
    }
   API_HOME.getHomeList(prama).then((res)=>{
      if (this.data.page == 1){
        this.data.goodsList = [];
      }
     console.log(res)
      var data:[] = res.data.rows;
      this.setData(
        {
          goodsList:this.data.goodsList.concat(data)
        }
      )
     
   })
  },

  getGoodsData(){
    API_HOME.getHomeData().then((res)=>{
    var categoryList: any[] = res.data.tgoodsCategoryVos;
    var total = categoryList.length;
    if (total % 8 == 0) {
      total = Math.floor(total / 8);
    } else {
      total = Math.floor(total / 8) + 1;
    }
    var caList = [] as any[];
    for (let idx = 0; idx < total; idx++) {
      var model = [] as any[];
      var end = (idx + 1) * 8;
      if (end > categoryList.length) {
        end = categoryList.length - idx * 8;
      }
      for (let index = 0; index < end; index++) {
        var data = categoryList[index];
        model.push(data)
      }
      caList.push(model);
    }
    
  
      this.setData({
        refreshStatus:false,
        topBannerVos:res.data.topBannerVos as [],
        tgoodsCategoryVos:caList as [],
        shopNoticeVos:res.data.shopNoticeVos as[],
        midBannerVos:res.data.midBannerVos as[],
      } 
      )
      
      console.log(res);
    })
  },

  getMoreData() {
    this.setData(
      {page:this.data.page+1}
    )
    this.getList()
  },
   
  jumpGoodsDetail(e:any){
    const id = e.currentTarget.dataset.info
    wx.navigateTo({url: '/pages/goods/goodsDetail?id='+id
    })
  },
  tapShopcart(e:any) {
    console.log("tapShopcarttapShopcarttapShopcart");
    
    var data = e.currentTarget.dataset.info;
    var ani = wx.createAnimation(
      {
        duration:1,
        timingFunction:'ease'
      }
    )
    ani.left(e.detail.x-12).top(e.detail.y-12).step()
    this.setData({
      ani: ani.export(),
    })
    setTimeout(()=>{
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      //通过Animation的left和top这两个API，将飞行点移动到购物车坐标处
      animation.left('450rpx').top('100vh').step()
      this.setData({
        ani: animation.export()
      })
    },100)
    setTimeout(()=>{
      addShopCar(data)
    },500)
  }

})
