import React,{Component,PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {BlogListCell} from "../blogListCell/BlogListCell";

export default class BlogList extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        return(
            <div>
                {
                    this.props.data.map((item,index)=>(
                        <BlogListCell getBlogDetail={this.props.getBlogDetail} history={this.props.history} key={index} data={item}/>
                    ))
                }
            </div>
        )
    }
}