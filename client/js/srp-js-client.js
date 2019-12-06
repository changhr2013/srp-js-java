var SRP_CLIENT = {

    options: {
        sendSaltAndVerifier: 'http://127.0.0.1:8000/srp/upload/saltAndVerifier',
        getSalt: 'http://127.0.0.1:8000/srp/download/salt',
        swapAB: 'http://127.0.0.1:8000/srp/swap/AB',
        sendM1: 'http://127.0.0.1:8000/srp/send/M1',
        identity: 'test_username',
        password: 'test_password',
    },

    innerParams: {
        salt: "salt",
        verifier: "verifier",
        AA: 'AA',
        BB: 'BB',
        M1str: 'M1str',
        M2str: 'M2str'
    },

    uploadSaltAndVerifier: function (options) {
        var me = this;

        if (options) {
            me.options = options;
        }

        var srpClient = new SRP6JavascriptClientSessionSHA256();

        var userName = me.getIdentity();
        var password = me.getPassword();

        var salt = srpClient.generateRandomSalt();
        var verifier = srpClient.generateVerifier(salt, userName, password);

        var createManagerRequest = {
            "userId": me.getIdentity(),
            "salt": salt,
            "verifier": verifier
        };

        // 上传 salt 和 verifier
        $.ajax({
            type: "POST",
            url: me.options.sendSaltAndVerifier,
            data: JSON.stringify(createManagerRequest),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {
                console.log(response);
                me.innerParams.verifier = verifier;
            },
            error: function () {
                alert("请求失败");
            }
        });
        return verifier;
    },

    initialize: function (options) {
        var me = this;

        if (options) {
            me.options = options;
        }
        return me.postSaltAndVerifier();
    },

    postSaltAndVerifier: function (options) {
        var me = this;

        if (options) {
            me.options = options;
        }

        // 请求服务器获取 salt
        var tokenRequest = { "userId": me.getIdentity() };

        $.ajax({
            type: "POST",
            url: me.options.getSalt,
            data: JSON.stringify(tokenRequest),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {
                console.log(response);
                me.innerParams.salt = response.data;
            },
            error: function () {
                alert("请求失败");
            }
        });

        var srpClient = new SRP6JavascriptClientSessionSHA256();

        // 本地计算 A
        var AA = srpClient.step1(me.getIdentity(), me.getPassword());
        me.innerParams.AA = AA;

        // 请求服务器获取 B
        var iaRequest = {
            "userId": me.getIdentity(),
            "clientA": AA
        };

        $.ajax({
            type: "POST",
            url: me.options.swapAB,
            data: JSON.stringify(iaRequest),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {
                console.log(response);
                me.innerParams.BB = response.data;
            },
            error: function () {
                alert("请求失败");
            }
        });

        // 本地计算 M1
        var M1str = srpClient.step2(me.innerParams.salt, me.innerParams.BB);
        me.innerParams.M1str = M1str;

        // 请求服务器获取 M2
        var m1Request = {
            "userId": me.getIdentity(),
            "clientM1": M1str
        };

        $.ajax({
            type: "POST",
            url: me.options.sendM1,
            data: JSON.stringify(m1Request),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {
                console.log(response);
                me.innerParams.M2str = response.data;
            },
            error: function () {
                alert("请求失败");
            }
        });

        // 本地计算 M2 与服务器进行比对
        var M2str = me.innerParams.M2str;
        if (srpClient.step3(M2str)) {
            return srpClient.getSessionKey(true);
        } else {
            return null;
        }
    },

    getIdentity: function () {
        return this.options.identity;
    },

    getPassword: function () {
        return this.options.password;
    }
};