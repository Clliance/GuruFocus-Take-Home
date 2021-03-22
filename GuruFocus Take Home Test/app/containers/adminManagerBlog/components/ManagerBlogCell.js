import style from '../style.css'
import React from 'react'
import {Button} from 'antd'
export const ManagerBlogCell = (props)=>(
    <div className={style.cellContainer}>
        <div className={style.cellAboutBlog}>
            <p className={style.blogTitle}>{props.data.title}</p>
            <p className={style.blogInfo}>
                <span>Author: {props.data.author}  </span>
                <span>Reading: {props.data.viewCount}  </span>
                <span>Comments: {props.data.commentCount}  </span>
                <span>Publish Time: {props.data.time}  </span>
            </p>
        </div>
        <div className={style.cellState}>
            <span>
                {props.data.isPublish?'Published':'Draft'}
            </span>
        </div>
        <div className={style.cellOperation}>
            <Button type='primary' icon="edit" onClick={()=>{props.edit_blog(props.data._id);props.history.push('/admin/newBlog')}}>Edit</Button>
            <Button type='primary' icon="delete" onClick={()=>props.delete(props.data._id)}>Delete</Button>
            <Button type='primary' icon="eye-o" onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getBlogDetail(props.data._id)}}>View</Button>
        </div>
    </div>
);