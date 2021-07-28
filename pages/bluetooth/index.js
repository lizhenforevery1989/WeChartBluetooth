// pages/bluetooth/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bluetoothList: [{
            "deviceId": "78:6c:b2:934:de",
            "name": "nick",
            "RSSI": 123
        }],
        isBluetoothOpen: false,
        isStartScanDevices: false,
        errorDialogButtons: [{
            text: '确定'
        }],
        errorDialogShow: false,
        errorDialogTitle: '',
    },
    /**
     * 打开蓝牙按钮响应函数
     */
    openBluetoothClick: function (options) {
        let that = this;
        this.setData({
            bluetoothList: []
        })
        /**
         * 判断当前蓝牙是否打卡,已打开的话就可以关闭，
         */
        if (this.data.isBluetoothOpen == true) {
            wx.closeBluetoothAdapter({
                success: (res) => {
                    that.setData({
                        isBluetoothOpen: false
                    })
                    console.log('关闭蓝牙适配器成功')
                },
                fail: (res) => {
                    console.log('关闭蓝牙适配器失败')
                },
                complete: (res) => [
                    console.log(res)
                ]
            })
        } else {
            wx.openBluetoothAdapter({
                mode: 'central',
                success: (res) => {
                    that.setData({
                        isBluetoothOpen: true
                    })
                    console.log('打开蓝牙适配器成功');
                    setTimeout(() => {
                        /**
                         * 
                         */

                         wx.getBluetoothDevices({
                           success: (result) => {
                               console.log(result)
                           },
                         })

                         /**
                          * 
                          */
                    }, 2000);
                },
                fail: (res) => {
                    if (res.errCode == 10000) {
                        this.setData({
                            errorDialogTitle: '未初始化蓝牙适配器',
                            errorDialogShow: true
                        })
                    } else if (res.errCode == 10001) {
                        this.setData({
                            errorDialogTitle: '当前蓝牙适配器不可用',
                            errorDialogShow: true
                        })
                    } else {
                        this.setData({
                            errorDialogTitle: res.errMsg,
                            errorDialogShow: true
                        })
                    }
                    console.log('打开蓝牙适配器失败');
                },
                complete: (res) => {
                    console.log(res);
                }
            })
        }
    },
    onbindbuttontap: function (e) {
        this.setData({
            errorDialogTitle: '当前蓝牙适配器不可用',
            errorDialogShow: false
        })
        console.log('click')
    },
    /**
     * 搜索设备按钮响应函数
     */
    scanBluetoothClick: function (options) {
        let that = this;
        if (!this.data.isBluetoothOpen)
            return;
        if (this.data.isStartScanDevices == false) {
            wx.startBluetoothDevicesDiscovery({
                allowDuplicatesKey: false,
                success: (res) => {
                    wx.onBluetoothDeviceFound(this.onBluetoothDevicesFoundFun);
                    console.log('开始扫描设备打开成功')
                    that.setData({
                        isStartScanDevices: true
                    })
                },
                fail: (res) => {
                    console.log('开始扫描设备打开失败')
                },
                complete: (res) => [
                    console.log(res)
                ]
            })
        } else {
            wx.stopBluetoothDevicesDiscovery({
                success: (res) => {
                    console.log('停止扫描设备成功')
                    that.setData({
                        isStartScanDevices: false
                    })
                },
                fail: (res) => {
                    console.log('停止扫描设备失败')
                },
                complete: (res) => [
                    console.log(res)
                ]
            })
        }
    },
    /**
     * 发现设备回调处理函数
     */
    onBluetoothDevicesFoundFun: function (res) {
        console.log(res)
        var temp = this.data.bluetoothList;
        res.devices.forEach(element => {
            temp.push(element);
        });
        this.setData({
            bluetoothList: temp
        })
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

    }
})