//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tokens: [{ 'symbol': '加载中...' }],
    msg: 'ERC20 代币排名'
  },

  onShow: function () {
    var that = this;
    //get top100 listing tokens
    wx.request({
      url: 'https://touzishijian.com/SmallApp/api/token_symbols',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data)
        // console.log(res.data)
        var ts = new Date(res.data.timestamp * 1000)
        that.setData({
          tokens: res.data.data,
          timestamp: ts.toLocaleString()
        })

        // console.log(ts.toDateString())
      }
    });
    wx.request({
      url: 'https://touzishijian.com/SmallApp/api/msg',
      data: {
        name: 'erc20'
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
      url: 'https://unitnetwork.net/SmallApp/api/token_symbols',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        // console.log(res.data.data)
        // console.log(res.data)
        var ts = new Date(res.data.timestamp * 1000)
        that.setData({
          tokens: res.data.data,
          timestamp: ts.toLocaleString()
        })

        // console.log(ts.toDateString())
      }
    });
  }
})
