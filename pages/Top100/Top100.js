//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    top100: [{ 'symbol': '加载中...' }],
    msg: '市值前100'
  },

  onLoad: function () {
    wx.showToast({
      title: '下拉刷新',
      icon: 'none'
    })
  },

  onShow: function () {
    var that = this;
    //get top100 listing tokens
    wx.request({
      url: 'https://touzishijian.com/SmallApp/api/top100',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        var ts = new Date(res.data.metadata.timestamp * 1000)
        that.setData({
          top100: res.data.data,
          timestamp: ts.toLocaleString()
        })
        
        // console.log(ts.toDateString())
      }
    });

    wx.request({
      url: 'https://touzishijian.com/SmallApp/api/msg',
      data: {
        name: 'top100'
      },
      header: {
        'content-type': 'application/text' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          msg: res.data
        })
        // console.log(ts.toDateString())
      }
    })
  },

  search: function (searchValue) {
    wx.navigateTo({
      url: '../logs/logs',
      data: {
        name: searchValue
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    })
  }, 

  getTokenSymbol: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value.toUpperCase()
    });
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在刷新',
      duration: 1000
    })
    var that = this;
    //get top100 listing tokens
    wx.request({
      url: 'https://unitnetwork.net/SmallApp/api/top100',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        // console.log(res.data)
        var ts = new Date(res.data.metadata.timestamp * 1000)
        that.setData({
          top100: res.data.data,
          timestamp: ts.toLocaleString()
        })
      }
    });
    
    wx.showLoading({
      title: '正在刷新',
      duration: 1000
    })
  }
})
