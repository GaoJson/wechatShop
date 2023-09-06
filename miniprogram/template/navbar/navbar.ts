// template/navbar/navbar.ts

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String

  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backAction(){
      wx.navigateBack();
    }
  }
})
