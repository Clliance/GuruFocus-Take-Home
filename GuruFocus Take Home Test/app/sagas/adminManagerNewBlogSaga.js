import {take, call, put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as NewBlogActionTypes} from '../reducers/adminManagerNewBlog'

export function* saveBlog(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let id = yield select(state=>state.admin.newBlog.id);
        if(id){
            data.id = id;
            return yield call(post, '/admin/blog/updateBlog', data);
        }else{
            return yield call(post, '/admin/blog/addBlog', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Network Request Error', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveBlogFlow() {
    while (true) {
        let request = yield take(NewBlogActionTypes.SAVE_BLOG);
        if (request.data.title === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Please enter blog title', msgType: 0});
        } else if (request.data.content === "") {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Please enter blog content', msgType: 0});
        } else if (request.data.tags.length === 0) {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Please select blog tags', msgType: 0});
        }
        if (request.data.title && request.data.content && request.data.tags.length > 0) {
            let res = yield call(saveBlog, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/managerBlog');
                    }, 1000);
                } else if (res.message === 'Identity expired, please sign in again') {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                    setTimeout(function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}