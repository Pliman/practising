import {CHANGE_CHILD_TEXT, CHANGE_TEST_MSG} from "../../mutation-types";

export default {
    /**
     * 修改父组件的内容
     * @param state
     * @param payload
     */
    [CHANGE_TEST_MSG](state, payload){
        state.testMsg = payload.content;
    },

    /**
     * 修改子组件的内容
     * @param state
     * @param payload
     */
    [CHANGE_CHILD_TEXT](state, payload){
        state.childText = payload.content;
    }
};
