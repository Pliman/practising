package samples.websocket.entity;

import lombok.Data;

/**
 * Created by lei on 16-10-18.
 */
@Data
public class WechatMessage {
    private String groupName;
    private String nickName;
    private String userName;
    private String msg;
}
