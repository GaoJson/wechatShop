// pages/my/address/address-add.ts
import { areaList } from '@vant/area-data';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import { AddressModel } from '../../../utils/models';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: getApp<IAppOption>().globalData.statusHeight! + 44,
    bottomHeight: getApp<IAppOption>().globalData.bottomHeight,
    areaList,
    showAreaFlag: false,
    areaData: '',
    areaSelectFlag: false,

    userValue: '',
    phoneValue: '',
    detailValue: '',
    defaultAddress: false,

    editFlag: false,
    editIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (this.options) {
      if (this.options.index) {
        const index: number = Number.parseInt(this.options.index)
        this.data.editIndex = index;
        wx.getStorage({
          key: "address",
          success: (e) => {
            var addressList: AddressModel[] = e.data;
            var data: AddressModel = addressList[index];
            console.log(data);
            
            this.setData(
              {
                editFlag:true,
                userValue:data.userName,
                phoneValue:data.phone,
                areaData:data.area,
                detailValue:data.areaDetail,
                defaultAddress:data.defaultFlag,
                areaSelectFlag:true,
              }
            )

          }
        }
        )


      }


    }

  },

  bindUserValue(e: any) {
    this.data.userValue = e.detail.value;
  },
  bindPhoneValue(e: any) {
    this.data.phoneValue = e.detail.value;

  },
  bindDetailValue(e: any) {
    this.data.detailValue = e.detail.value;
  },

  bindSwitch(e: any) {
    this.data.defaultAddress = e.detail.value;
  },

  showArea() {
    this.setData(
      {
        showAreaFlag: true
      }
    )
  },
  hideArea() {
    this.setData(
      {
        showAreaFlag: false
      }
    )
  },
  ensureArea(e: any) {
    var data = e.detail.values as any[];
    var area = ''
    for (var iterator of data) {
      area = area + iterator.name;
    }
    this.setData(
      {
        areaSelectFlag: true,
        areaData: area
      }
    )
    this.hideArea()
  },

  addAddress() {
    if (this.data.userValue.length == 0) {
      Toast('收货人不能为空');
      return;
    }
    if (this.data.phoneValue.length == 0) {
      Toast('手机号码不能为空');
      return;
    }
    if (this.data.areaData.length == 0) {
      Toast('请选择地区');
      return;
    }
    if (this.data.detailValue.length == 0) {
      Toast('详细地址不能为空');
      return;
    }

    var params: AddressModel = {
      userName: this.data.userValue,
      phone: this.data.phoneValue,
      area: this.data.areaData,
      areaDetail: this.data.detailValue,
      defaultFlag: this.data.defaultAddress
    };

    wx.getStorage({
      key: "address",
      success: (e) => {
        var addressList: AddressModel[] = e.data;
        if(this.data.editFlag){
          addressList.splice(this.data.editIndex,0,params)
          Toast("修改成功")
        } else{
          addressList.push(params);
          Toast("添加成功")
        }
        wx.setStorageSync("address", addressList)
        setTimeout(() => {
          wx.navigateBack();
        }, 1000)
      }
    }
    )
  },
  deleteAddress(){
    wx.getStorage({
      key: "address",
      success: (e) => {
        var addressList: AddressModel[] = e.data;
        addressList.splice(this.data.editIndex,1)
        wx.setStorageSync("address", addressList)
        Toast("删除成功")
        setTimeout(() => {
          wx.navigateBack();
        }, 1000)
      }
    }
    )

  }
})