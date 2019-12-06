package com.changhr.cloud.srp.config;

import com.changhr.cloud.srp.pojo.cache.SrpInfoCache;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.bouncycastle.crypto.agreement.srp.SRP6Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * @author changhr
 * @create 2019-12-05 15:50
 */
@Configuration
public class SrpConfig {

    @Bean
    Cache<String, SRP6Server> bcSrpServerCache() {
        return CacheBuilder.newBuilder()
                .expireAfterAccess(120, TimeUnit.SECONDS)
                .build();
    }

    @Bean
    Cache<String, SrpInfoCache> userStoreCache() {
        return CacheBuilder.newBuilder()
                .build();
    }
}
