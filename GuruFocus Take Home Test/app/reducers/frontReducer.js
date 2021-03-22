const initialState = {
    category: [],
    blogList: [],
    blogDetail: {},
    pageNum: 1,
    total: 0
};
export const actionTypes = {
    GET_BLOG_LIST: "GET_BLOG_LIST",
    RESPONSE_BLOG_LIST: "RESPONSE_BLOG_LIST",
    GET_BLOG_DETAIL: "GET_BLOG_DETAIL",
    RESPONSE_BLOG_DETAIL: "RESPONSE_BLOG_DETAIL"
};

export const actions = {
    get_blog_list: function (tag = '', pageNum = 1) {
        return {
            type: actionTypes.GET_BLOG_LIST,
            tag,
            pageNum
        }
    },
    get_blog_detail: function (id) {
        return {
            type: actionTypes.GET_BLOG_DETAIL,
            id
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESPONSE_BLOG_LIST:
            return {
                ...state, blogList: [...action.data.list], pageNum: action.data.pageNum, total: action.data.total
            };
        case actionTypes.RESPONSE_BLOG_DETAIL:
            return {
                ...state, blogDetail: action.data
            };

        default:
            return state;
    }
}
