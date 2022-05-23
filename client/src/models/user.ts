const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));




export default {
    namespace: 'user',
    state: {
        username: '',
        password: '',
        currentAuthority: 'guest',
    },
    reducers: {
        set(state: any, {payload}: any) {
            state.username = payload.username;
            state.password = payload.password;
            state.currentAuthority = payload.currentAuthority;
        },
        logout(state: any) {
            state.username = '';
            state.password = '';
            state.currentAuthority = 'guest';
        }
    },
    effects: {
        * addAsync(_action: any, {put}: any) {
            yield delay(1000);
            yield put({type: 'add'});
        },
    },
};
        