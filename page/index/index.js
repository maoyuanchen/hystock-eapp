let app = getApp();
let url = app.globalData.domain + '/login';

Page({
    data: {
        corpId: '',
        authCode: '',
        userId: '',
        userName: '',
        hideList: true,
    },
    onCardClick: function (ev) {
        dd.showToast({
            content: ev.info,
        });
    },
    goCharts() {
        dd.navigateTo({
            url: '/page/charts/charts'
        });
    },
    loginSystem() {
        dd.showLoading();
        dd.getAuthCode({
            success: (res) => {
                this.setData({
                    authCode: res.authCode
                })
                //dd.alert({content: "step1"});
                dd.httpRequest({
                    url: url,
                    method: 'POST',
                    data: {
                        authCode: res.authCode
                    },
                    dataType: 'json',
                    success: (res) => {
                        // dd.alert({content: "step2"});
                        console.log('success----', res)
                        let userId = res.data.result.userId;
                        let userName = res.data.result.userName;
                        this.setData({
                            userId: userId,
                            userName: userName,
                            hideList: false
                        })
                    },
                    fail: (res) => {
                        console.log("httpRequestFail---", res)
                        dd.alert({ content: JSON.stringify(res) });
                    },
                    complete: (res) => {
                        dd.hideLoading();
                    }
                });
            },
            fail: (err) => {
                // dd.alert({content: "step3"});
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
    },
    onLoad() {
        let _this = this;
        this.setData({
            corpId: app.globalData.corpId
        })
        //dd.alert({content: "step1"});
    }
});