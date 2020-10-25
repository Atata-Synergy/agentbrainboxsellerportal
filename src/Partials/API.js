import axios from 'axios';

export default axios.create({
    baseURL: `http://agentbrainbox.test/v_1`
});