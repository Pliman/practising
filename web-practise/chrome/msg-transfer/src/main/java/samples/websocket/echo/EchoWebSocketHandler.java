/*
 * Copyright 2012-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package samples.websocket.echo;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import samples.websocket.entity.WechatMessage;
import samples.websocket.entity.WechatMessageList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Echo messages by implementing a Spring {@link WebSocketHandler} abstraction.
 */
public class EchoWebSocketHandler extends TextWebSocketHandler {

    private static Logger logger = LoggerFactory.getLogger(EchoWebSocketHandler.class);
    public static Map<String, WebSocketSession> sessionMap = new HashMap<>();
    private final EchoService echoService;
    Gson gson = new Gson();

    @Autowired
    public EchoWebSocketHandler(EchoService echoService) {
        this.echoService = echoService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        logger.debug("Opened new session in instance " + this);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        String echoMessage = this.echoService.getMessage(message.getPayload());
        System.out.println(echoMessage);
        WechatMessageList result = gson.fromJson(echoMessage, WechatMessageList.class);
        sessionMap.put(result.getUserName(), session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception)
            throws Exception {
        session.close(CloseStatus.SERVER_ERROR);
    }

}
