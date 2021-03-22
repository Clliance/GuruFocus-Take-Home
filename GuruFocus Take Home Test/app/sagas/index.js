import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth} from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {getAllTagsFlow, addTagFlow, delTagFlow} from './adminManagerTagsSaga'
import {saveBlogFlow} from './adminManagerNewBlogSaga'
import {getBlogListFlow,deleteBlogFlow,editBlogFlow} from './adminManagerBlogSaga'
import {getBlogsListFlow,getBlogDetailFlow} from './frontSaga'

export default function* rootSaga() {
    yield  fork(loginFlow);
    yield  fork(registerFlow);
    yield  fork(user_auth);
    yield fork(get_all_users_flow);
    yield fork(getAllTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);
    yield fork(saveBlogFlow);
    yield fork(getBlogListFlow);
    yield fork(deleteBlogFlow);
    yield fork(getBlogsListFlow);
    yield fork(getBlogDetailFlow);
    yield fork(editBlogFlow);
}
