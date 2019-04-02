// pages/data/data.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.userName);
    var that = this;
    wx.request({
      url: app.globalData.url + '/xiaoguo/getSampleSignByNow',
      data: {
        uesrName: app.globalData.userName
      },
      success: function (res) {
        that.setData({
          listData: res.data.data
        })
        app.globalData.listData = res.data.data
        console.log(res.data.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submitMessage: function() {
    console.log("that.listData");
    var that = this;
    console.log(app.globalData.listData);
    wx.request({
      url: app.globalData.url + '/xiaoguo/submitMessage',
      data: {
        listData: app.globalData.listData
      },
      success: function (res) {
        that.onShow();
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  }
})