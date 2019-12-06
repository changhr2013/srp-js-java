package com.changhr.cloud.srp.pojo.cache;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 存储用户对应的 salt 和 verifier
 *
 * @author changhr
 * @create 2019-12-05 17:35
 */
@Data
@Accessors(chain = true)
public class SrpInfoCache {

    private String salt;

    private String verifier;
}
