import PureRenderMixin from 'react-addons-pure-render-mixin'
import React,{Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import {ManagerBlogCell} from "./components/ManagerBlogCell";
import { Pagination } from 'antd';
import {actions} from '../../reducers/adminManagerBlog'
import {actions as FrontActions} from '../../reducers/frontReducer'
import Admin from "../admin/Admin";
const {get_blog_list,delete_blog,edit_blog} = actions;
const {get_blog_detail} = FrontActions;
class AdminManagerBlog extends Component{

    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        return(
            <div>
                <h2>Blogs Management</h2>
                <div className={style.blogListContainer}>
                    {
                        this.props.blogList.map((item,index)=>(
                            <ManagerBlogCell
                                edit_blog={(id)=>this.props.edit_blog(id)}
                                history={this.props.history}
                                getBlogDetail={(id)=>this.props.get_blog_detail(id)}
                                delete={(id)=>this.props.delete_blog(id)}
                                key={index} data={item}/>
                        ))
                    }
                </div>
                <div  className={style.paginationStyle}>
                    <Pagination
                        defaultPageSize={5}
                        onChange={(pageNum)=>{
                            this.props.get_blog_list(pageNum);
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(this.props.blogList.length === 0){
            this.props.get_blog_list()
        }
    }
}

AdminManagerBlog.defaultProps={
    blogList:[],
    pageNum:1,
    total:0
};

AdminManagerBlog.defaultProps = {
    blogList:PropTypes.array,
    pageNum:PropTypes.number,
    total:PropTypes.number
};
function mapStateToProps(state) {
    return{
        blogList:state.admin.blogs.blogList,
        pageNum:state.admin.blogs.pageNum,
        total:state.admin.blogs.total
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_blog_list:bindActionCreators(get_blog_list,dispatch),
        delete_blog:bindActionCreators(delete_blog,dispatch),
        edit_blog:bindActionCreators(edit_blog,dispatch),
        get_blog_detail:bindActionCreators(get_blog_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManagerBlog);

