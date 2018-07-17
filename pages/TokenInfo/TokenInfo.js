//TokenInfo.js
const util = require('../../utils/util.js')

Page({
  data: {
    tokens: []
  },
  onLoad: function (option) {
    var that = this;

    this.setData({
      token_symbol: option.symbol
    })

    wx.request({
      url: 'https://touzishijian.com/SmallApp/api/token',
      data: {
        name: option.symbol
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data)
        var ts = new Date(res.data.timestamp * 1000)
        var temp_top10 = 0;
        var temp_top30 = 0;
        var temp_top50 = 0;

        for (var i = 0; i < 10; i++) { temp_top10 += parseFloat(res.data.data[i].percentage); }
        for (var i = 0; i < 30; i++) { temp_top30 += parseFloat(res.data.data[i].percentage); }
        for (var i = 0; i < 50; i++) { temp_top50 += parseFloat(res.data.data[i].percentage); }

        that.setData({
          tokens: res.data.data,
          timestamp: ts.toLocaleString(),
          top10: temp_top10,
          top30: temp_top30,
          top50: temp_top50,
        })
        
      }
    })
    console.log('Draging data for Symbol: ' +  option.symbol);
  }
})
