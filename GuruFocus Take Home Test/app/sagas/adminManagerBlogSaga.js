import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as BlogTypes} from '../reducers/adminManagerBlog'
import {actionTypes as NewBlogTypes} from '../reducers/adminManagerNewBlog'

export function* getBlogList (pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getBlogs?pageNum=${pageNum}&isPublish=false`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Network Request Error', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getBlogListFlow () {
    while (true){
        let req = yield take(BlogTypes.ADMIN_GET_BLOG_LIST);
        let res = yield call(getBlogList,req.pageNum);
        if(res){
            if (res.code === 0) {
                res.data.pageNum = req.pageNum;
                yield put({type:BlogTypes.ADMIN_RESPONSE_GET_BLOG_LIST,data:res.data})
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

export function* deleteBlog (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/blog/delBlog?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Network Request Error', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteBlogFlow () {
    while(true){
        let req = yield take(BlogTypes.ADMIN_DELETE_BLOG);
        const pageNum = yield select(state=>state.admin.blogs.pageNum);
        let res = yield call(deleteBlog,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Delete Successful', msgType: 1});
                yield put({type:BlogTypes.ADMIN_GET_BLOG_LIST,pageNum})
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

export function* editBlog (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getBlogDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Delete Successful', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editBlogFlow () {
    while (true){
        let req = yield take(BlogTypes.ADMIN_EDIT_BLOG);
        let res = yield call(editBlog,req.id);
        if(res){
            if (res.code === 0) {
                let title = res.data.title;
                let content = res.data.content;
                let tags = res.data.tags;
                let id = res.data._id;
                yield put({type:NewBlogTypes.SET_BLOG_ID,id});
                yield put({type:NewBlogTypes.UPDATING_TAGS,tags});
                yield put({type:NewBlogTypes.UPDATING_CONTENT,content});
                yield put({type:NewBlogTypes.UPDATING_TITLE,title});
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}