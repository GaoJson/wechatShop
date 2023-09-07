import  API_HOME  from '../../api/homeApi';
import { addCollectGoods, addShopCar, deleteCollectGoods } from '../../utils/util';
const app = getApp<IAppOption>()
// pages/goods/goodsDetail.ts
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    statusHeight:app.globalData.statusHeight! + 44,
    goodsId:"",
    goodData:{},
    goodContent:"",
    goodsBanner:[],
    collectFlag:false,
    bottomHeight:app.globalData.bottomHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const id = this.options.id??""
    this.data.goodsId = id;
    API_HOME.getGoodsDetail(id).then((res)=>{
       const banner:string = res.data.goodsBanner;
       var array =  banner.split(",")
       var goodContent:string = res.data.goodsContent;
       goodContent = goodContent.replace(/\<img/gi, '<img style="width:100%";height:auto')
       this.setData({
         goodData:res.data,
         goodContent:goodContent,
         goodsBanner:array as []
       })
    })

    wx.getStorage({
      key:"collect",
      success:(res:any)=>{
        var list:any[] = res.data;
        console.log(list);
        list.forEach(element => {
          if(element.id==id){
            this.setData({
              collectFlag:true
            })
          }
        });
      },
      fail:()=>{
        wx.setStorageSync("collect",[])
      }
    })

  },

  backRouter() {
    wx.navigateBack()
  },

  addCollect(){
    if(this.data.collectFlag){
      deleteCollectGoods(this.data.goodsId)
      wx.showToast(
        {
          title:"取消成功",
          duration:2000
        }
      )
      this.setData({
        collectFlag:false
      })
    } else{
      addCollectGoods(this.data.goodData)
      wx.showToast(
        {
          title:"收藏成功",
          duration:2000
        }
      )
      this.setData({
        collectFlag:true
      })
      
    }
  },
  addShopcat(){
    addShopCar(this.data.goodData)
    wx.showToast({
      title: '添加成功',
      duration: 2000
    })
  },

})