package samples.websocket.controller;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import samples.websocket.echo.EchoWebSocketHandler;
import samples.websocket.entity.SendMessageRequest;

import javax.validation.Valid;
import java.io.IOException;

/**
 * Created by lei on 16-10-18.
 */
@Slf4j
@Controller
public class SimpleController {
    Gson gson = new Gson();

    @RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
    @ResponseBody
    public String sendMessage(@Valid @RequestBody SendMessageRequest request) {

        String str = gson.toJson(request);
        log.info("sendMessage {}", str);
        TextMessage message = new TextMessage(str);
        WebSocketSession session = EchoWebSocketHandler.sessionMap.get(request.getUserName());
        try {
            if (null != session) {
                session.sendMessage(message);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "OK";
    }

}
