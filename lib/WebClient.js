'use strict';
//@formatter:off
var Client = require('./Client'), //
    util = require('util'),
    Q = require('q');
//@formatter:on

function WebClient(options, callback) {
    WebClient.super_.call(this);
    this.Store.set('api', {
        version : "V3.1.2",
        apiVersion : "p14",
        webVer : "92",
        publishDate : "06/25/2015",
        versionCode : "1506251055",
        product : "intl",
        lowCompatibleVersion : "10136",
        highCompatibleVersion : "20140",
        showGuide : "0",
        isPublish : true,
        isBeta : false,
        openHelper : false,
        getUploadInfo : true,
        getUploadInfoMin : -1,
        getUploadInfoMax : -1,
        goPush : true,
        multiDesktop : false,
        encryDes : "1",
        resourceStartTime : new Date().getTime(),
        adblockDetect : true,
        baseUri : "http://cdn1.airdroid.com/V3121506251055/",
        betaUrl : "http://beta.airdroid.com/",
        releaseUrl : "http://web.airdroid.com",
        wwwUrl : "http://www.airdroid.com/",
        desktopIconFolder : "theme/stock/images/",
        historyRedirectUrl : "/web/historyredirect/",
        userApiUrl : "https://id.airdroid.com/",
        payApiUrl : "https://pay.airdroid.com/",
        serverCenterUrl : "https://srv3.airdroid.com/",
        qrSocketUrl : "ws://ws.airdroid.com:8090/webNode?code=",
        srvUrl : "https://lb.airdroid.com:9071/",
        loadBalanceUrl : "http://lb.airdroid.com/",
        chromeOsUrl : "https://goog-reg-verify.airdroid.com/",
        uploadUrl : "https://upload.airdroid.com/",
        stateUrl : "https://stat3.airdroid.com/",
        introVideoUrl : "http://cdn1.airdroid.com/video/",
        partnerConfigUrl : "https://cdn1.airdroid.com/partner/partnerConfig.js",
        tdUrl : "http://td.airdroid.com/",
        showUpgrade : "1",
        openUrl : "https://s3.amazonaws.com/open.airdroid.com/demo/index.html"
    });
}

util.inherits(WebClient, Client);

WebClient.prototype.signIn = function signIn(data, callback) {
    var api = this.Store.get('api'), client = this, deferred = Q.defer();
    
    this.post.call(client, api.userApiUrl + api.apiVersion + "/user/signIn.html", data).then(function(data) {
        client.emit('login:success', data);
        deferred.resolve(data);
    }, function(reason) {
        client.emit('login:error', reason);
        deferred.reject(reason);
    });
    return deferred.promise.nodeify(callback);
};

WebClient.prototype.getUserInfo = function getUserInfo(data, callback) {
    if (!data)
        data = {};
    data.device = data.device || [{}];
    //@formatter:off
    var api = this.Store.get('api'), 
        client = this, 
        device = client.Store.get('device'), 
        deferred = Q.defer(),
        options = {
            account_id : data.account_id || client.Store.get('id'),
            app_ver : data.device[0].appVer || device[0].appVer,
            os_ver : data.device[0].osVersion || device[0].osVersion,
            web_ver : api.webVer,
            package_id : "com.sand.airdroid",
            language : 'en',
            country : '',
            vip : data.vip || client.Store.get('vip'),
            csrf_token : client.getCsrfToken(client.Store.get('account_sid') || null),
            push_token : 1
        };
    //@formatter:on
    this.get.call(client, api.userApiUrl + api.apiVersion + "/user/GetUserInfo.html", options, callback).then(function(success) {
        console.log('success');
        deferred.resolve(success);
    }, function(error) {
        error.print('Error: AirDroid.getUserInfo();');
        deferred.reject(error);
    });
    return deferred.promise.nodeify(callback);
};

WebClient.prototype.getFacebookToken = function signIn(data) {

};

WebClient.prototype.getTwitterToken = function signIn(data) {

};

WebClient.prototype.getCsrfToken = function getCsrfToken(account_sid) {
    if (!account_sid)
        account_sid = this.Store.get('account_sid') || "";
    return this.Crypto.hex_md5(account_sid + "RacE2YjM");
};

module.exports = WebClient;
