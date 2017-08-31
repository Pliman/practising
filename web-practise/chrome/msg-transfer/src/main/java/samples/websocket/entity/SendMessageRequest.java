package samples.websocket.entity;

import lombok.Data;
import lombok.ToString;

/**
 * Created by lei on 16-10-17.
 */
@Data
@ToString
public class SendMessageRequest {
    private String friendName;
    private String userName;
    private String msg;
}
