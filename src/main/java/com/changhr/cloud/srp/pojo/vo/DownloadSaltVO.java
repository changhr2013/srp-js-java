package com.changhr.cloud.srp.pojo.vo;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author changhr
 * @create 2019-12-05 17:43
 */
@Data
@Accessors(chain = true)
public class DownloadSaltVO {

    private String userId;

}
