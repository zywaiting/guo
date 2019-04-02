//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    name: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //不管授不授权我都要自动登录获取openid
    wx.login({
      success: code => {
        wx.request({
          url: app.globalData.url + '/onLogin',
          data: {
            code: code.code,
            express: 'xiaoguo',
            appUrlName: 'LoginUrl'
          },
          success: function (res) {
            console.log(res.data.data);
            app.globalData.openid = res.data.data
            that.getUserMessage(res.data.data);
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  },
  getUserMessage:function(openid){
    var that = this;
    wx.request({
      url: app.globalData.url + '/xiaoguo/getUserMessage',
      data: {
        appid: app.globalData.appid,
        openId: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data.data);
        if(res.data.data.userName===null){
          
        }else{
          app.globalData.userName = res.data.data.userName
          wx.switchTab({
            url: '../data/data'
          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //监听输入的名称
  setname: function (e) {
    this.data.name = e.detail.value;
  },
  //监听登录
  login: function () {
    var that = this;
    console.log('姓名：' + that.data.name);
    wx.request({
      url: app.globalData.url + '/xiaoguo/updateUserName',
      data: {
        userName: that.data.name,
        openId: app.globalData.openid
      },
      success: function (res) {
        console.log("--------123--------");
        console.log(res.data.code);
        if (res.data.code===200){
          app.globalData.userName = that.data.name
          wx.switchTab({
            url: '../data/data'
          })
        }else{
          wx.showToast({
            title: '请找小郭同志',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: function (res) {
        console.log(res);
        console.log("--------fail--------");
      }
    })
  }
})
