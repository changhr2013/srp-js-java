package com.changhr.cloud.srp.controller;

import com.changhr.cloud.srp.pojo.cache.SrpInfoCache;
import com.changhr.cloud.srp.pojo.vo.DownloadSaltVO;
import com.changhr.cloud.srp.pojo.vo.SaltAndVerifierVO;
import com.changhr.cloud.srp.pojo.vo.SendM1VO;
import com.changhr.cloud.srp.pojo.vo.SwapABVO;
import com.google.common.cache.Cache;
import com.sense.ddoe.common.utils.BigIntegerUtils;
import com.sense.ddoe.common.utils.ResultUtil;
import com.sense.ddoe.common.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.crypto.CryptoException;
import org.bouncycastle.crypto.agreement.srp.SRP6Server;
import org.bouncycastle.crypto.agreement.srp.SRP6StandardGroups;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.security.SecureRandom;

/**
 * @author changhr
 * @create 2019-12-05 15:48
 */
@Slf4j
@RestController
public class SrpController {

    @Autowired
    private Cache<String, SRP6Server> srp6ServerCache;

    @Autowired
    private Cache<String, SrpInfoCache> userStoreCache;

    @PostMapping("/srp/upload/saltAndVerifier")
    public ResultVO<String> uploadSaltAndVerifier(@RequestBody SaltAndVerifierVO saltAndVerifierVo) {
        String userId = saltAndVerifierVo.getUserId();
        userStoreCache.put(userId, new SrpInfoCache()
                .setSalt(saltAndVerifierVo.getSalt())
                .setVerifier(saltAndVerifierVo.getVerifier()));

        log.debug("客户端上传的 salt[{}]\nverifier[{}]",
                saltAndVerifierVo.getSalt(), saltAndVerifierVo.getVerifier());

        return ResultUtil.success();
    }

    @PostMapping("/srp/download/salt")
    public ResultVO<String> downloadSalt(@RequestBody DownloadSaltVO downloadSaltVo) {
        String userId = downloadSaltVo.getUserId();
        SrpInfoCache srpInfoCache = userStoreCache.getIfPresent(userId);
        assert srpInfoCache != null;
        return ResultUtil.success(srpInfoCache.getSalt());
    }

    @PostMapping("/srp/swap/AB")
    public ResultVO<String> swapAB(@RequestBody SwapABVO swapABVo) {
        String userId = swapABVo.getUserId();
        SrpInfoCache srpInfoCache = userStoreCache.getIfPresent(userId);
        assert srpInfoCache != null;
        BigInteger verifier = BigIntegerUtils.fromHex(srpInfoCache.getVerifier());

        BigInteger clientA = BigIntegerUtils.fromHex(swapABVo.getClientA());

        SRP6Server srp6Server = new SRP6Server();
        srp6Server.init(SRP6StandardGroups.rfc5054_2048, verifier, new SHA256Digest(), new SecureRandom());
        BigInteger serverB = srp6Server.generateServerCredentials();

        BigInteger serverS;
        try {
            serverS = srp6Server.calculateSecret(clientA);
        } catch (CryptoException e) {
            throw new RuntimeException(e);
        }
        log.debug("服务端计算出的 B[{}]\nS[{}]",
                BigIntegerUtils.toHex(serverB), BigIntegerUtils.toHex(serverS));

        srp6ServerCache.put(userId, srp6Server);
        return ResultUtil.success(BigIntegerUtils.toHex(serverB));
    }

    @PostMapping("/srp/send/M1")
    public ResultVO<String> sendM1(@RequestBody SendM1VO sendM1Vo) {
        String userId = sendM1Vo.getUserId();
        SRP6Server srp6Server = srp6ServerCache.getIfPresent(userId);
        assert srp6Server != null;
        BigInteger clientM1 = BigIntegerUtils.fromHex(sendM1Vo.getClientM1());

        BigInteger serverM2;
        BigInteger sessionKey;
        try {
            boolean checkM1 = srp6Server.verifyClientEvidenceMessage(clientM1);
            if (!checkM1) {
                throw new RuntimeException("M1 校验失败");
            }
            serverM2 = srp6Server.calculateServerEvidenceMessage();
            sessionKey = srp6Server.calculateSessionKey();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.debug("服务端计算出的 M2[{}]\nsessionKey[{}]",
                BigIntegerUtils.toHex(serverM2), BigIntegerUtils.toHex(sessionKey));

        return ResultUtil.success(BigIntegerUtils.toHex(serverM2));
    }
}
