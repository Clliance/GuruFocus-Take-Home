const initialState = {
    blogList: [],
    pageNum: 1,
    total: 0
};

export const actionTypes = {
    ADMIN_GET_BLOG_LIST: 'ADMIN_GET_BLOG_LIST',
    ADMIN_RESPONSE_GET_BLOG_LIST: "ADMIN_RESPONSE_GET_BLOG_LIST",
    ADMIN_EDIT_BLOG: "ADMIN_EDIT_BLOG",
    ADMIN_DELETE_BLOG: "ADMIN_DELETE_BLOG",
};

export const actions = {
    get_blog_list: function (pageNum = 1) {
        return {
            type: actionTypes.ADMIN_GET_BLOG_LIST,
            pageNum
        }
    },
    delete_blog: function (id) {
        return {
            type: actionTypes.ADMIN_DELETE_BLOG,
            id
        }
    },
    edit_blog: function (id) {
        return {
            type: actionTypes.ADMIN_EDIT_BLOG,
            id
        }
    }
};

export function blogs(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADMIN_RESPONSE_GET_BLOG_LIST:
            return {
                ...state, blogList: [...action.data.list], total: action.data.total,pageNum:action.data.pageNum
            };
        default:
            return state;
    }
}