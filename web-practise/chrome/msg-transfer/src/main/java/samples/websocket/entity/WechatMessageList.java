package samples.websocket.entity;

import lombok.Data;

import java.util.List;

/**
 * Created by lei on 16-10-18.
 */
@Data
public class WechatMessageList {
    private List<WechatMessage> messages;
    private String userName;
}
