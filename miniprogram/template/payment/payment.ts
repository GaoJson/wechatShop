// template/payment/payment.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    payShow:{
      type:Boolean,
      value:false
    },
    price:{
      type:String,
      value:''
    }
  },

  data:{
    bottomHeight:getApp<IAppOption>().globalData.bottomHeight,
    numberList:[1,2,3,4,5,6,7,8,9,'','0',"X"],
    pwd:''
  },

  

  methods: {
    closeModel:function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} 
      this.setData({
        pwd:''
      })
      this.triggerEvent('closeModel', myEventDetail, myEventOption)
    },
    clickNumber:function(e:any){
      const data = e.currentTarget.dataset.item;
      if(data == "X"){
        var pwds:string = this.data.pwd
        this.setData({
          pwd:pwds.slice(0, -1)
        }
        )
      } else {
        if(this.data.pwd.length < 6){
          this.setData({
            pwd:this.data.pwd+data
          }
          )
        }
        if(this.data.pwd.length == 6){
          var myEventDetail = {"pwd":this.data.pwd}
          this.triggerEvent('ensurePwd',myEventDetail)  
        }

      }
    }
    
  },
})
