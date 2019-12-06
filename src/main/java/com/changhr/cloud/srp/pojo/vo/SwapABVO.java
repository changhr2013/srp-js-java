package com.changhr.cloud.srp.pojo.vo;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author changhr
 * @create 2019-12-05 17:47
 */
@Data
@Accessors(chain = true)
public class SwapABVO {

    private String userId;

    private String clientA;
}
