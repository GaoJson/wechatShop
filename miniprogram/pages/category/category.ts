// pages/category/category.ts
import  API_HOME  from '../../api/homeApi';
import {addShopCar} from '../../utils/util'
const app = getApp<IAppOption>();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    contentHeight:wx.getSystemInfoSync().windowHeight - app.globalData.statusHeight! - 44,
    statusHeight:app.globalData.statusHeight! + 44,
    currentIndex:0,
    page:1,
    categoryList:[],
    goodsList:[],

    ani: {},
    
  },

  leftMenuTap(index:any){
    var idx = index.currentTarget.dataset.tap;
    this.setData({
      currentIndex:idx,
      page:1
    })
    
    const model:any = this.data.categoryList[idx];
    this.getGoodsData(model.id)
  },
  onLoad() {
    this.loadData()
  },

  loadData() {
    API_HOME.getHomeData().then((res)=>{
      this.setData({
        categoryList:res.data.tgoodsCategoryVos as [],
      })
      this.getGoodsData(res.data.tgoodsCategoryVos[0].id)
  
    })
  },

  getGoodsData(id:string) {
    console.log(id);
    var prama = {
      "pageNum":this.data.page,
      "pageSize":10,
      "goodsCid":id
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

  tapShopcart(e:any) {
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
  },
  jumpGoodsDetail(e:any){
    const id = e.currentTarget.dataset.info
    wx.navigateTo({url: '/pages/goods/goodsDetail?id='+id
    })
  },
  onShow(){
    console.log("1111");
    
  },

})