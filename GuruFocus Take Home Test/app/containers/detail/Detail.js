import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
const {get_blog_detail} = actions;
import reactRenderer from 'remark-react'
import style from './style.css'
class Detail extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        const {blogContent,title,author,viewCount,commentCount,time} = this.props;
        return(
            <div className={style.container}>
                <h2>{title}</h2>
                <div className={style.blogInfo}>
                    <span >
                        <img className={style.authorImg} src={require('./author.png')}/> {author}
                    </span>
                    <span>
                        <img src={require('./calendar.png')}/> {time}
                    </span>
                    <span>
                        <img src={require('./comments.png')}/> {commentCount}
                    </span>
                    <span>
                        <img src={require('./views.png')}/> {viewCount}
                    </span>
                </div>
                <div id='preview' className={style.content}>
                    {remark().use(reactRenderer).processSync(blogContent).contents}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_blog_detail(this.props.location.state.id);
    }
}

function mapStateToProps(state) {
    const {content,title,author,viewCount,commentCount,time} = state.front.blogDetail;
    return{
        blogContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_blog_detail:bindActionCreators(get_blog_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);