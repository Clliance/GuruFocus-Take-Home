import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from "../../reducers/adminManagerNewBlog";
import {actions as tagActions} from "../../reducers/adminManagerTags";
import dateFormat from 'dateformat'

const {get_all_tags} = tagActions;
const {update_content, update_tags, update_title, save_blog} = actions;
const Option = Select.Option;

class AdminNewBlog extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: [],
            modalVisible: false
        };
    }

    // Content
    onChanges(e) {
        this.props.update_content(e.target.value);
    }

    // Headline
    titleOnChange(e) {
        this.props.update_title(e.target.value)
    };

    // Tag
    selectTags(value) {
        this.props.update_tags(value)
    };

    // Preview
    preView() {
        this.setState({
            modalVisible: true
        })
    };

    // Publish
    publishBlog() {
        let blogData = {};
        blogData.title = this.props.title;
        blogData.content = this.props.content;
        blogData.tags = this.props.tags;
        blogData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        blogData.isPublish = true;
        this.props.save_blog(blogData);
    };

    // Save
    saveBlog() {
        let blogData = {};
        blogData.title = this.props.title;
        blogData.content = this.props.content;
        blogData.tags = this.props.tags;
        blogData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        blogData.isPublish = false;
        this.props.save_blog(blogData);
    };

    //handleOk
    handleOk() {
        this.setState({
            modalVisible: false
        })
    };

    render() {
        return (
            <div>
                <h2>Post New Blog</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>Title</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'Title'}
                        type='text'
                        value={this.props.title}
                        onChange={this.titleOnChange.bind(this)}/>
                    <span className={style.subTitle}>Content</span>
                    <textarea
                        className={style.textArea}
                        value={this.props.content}
                        onChange={this.onChanges.bind(this)}/>
                    <span className={style.subTitle}>Tags</span>
                    <Select
                        mode="multiple"
                        className={style.titleInput}
                        placeholder="Please Select a Tag"
                        onChange={this.selectTags.bind(this)}
                        value={this.props.tags}
                    >
                        {
                            this.props.tagsBase.map((item) => (
                                <Option key={item}>{item}</Option>
                            ))
                        }
                    </Select>

                    <div className={style.bottomContainer}>
                        <Button type="primary" onClick={this.publishBlog.bind(this)}
                                className={style.buttonStyle}>Publish</Button>
                        <Button type="primary" onClick={this.saveBlog.bind(this)}
                                className={style.buttonStyle}>Save</Button>
                        <Button type="primary" onClick={this.preView.bind(this)}
                                className={style.buttonStyle}>Preview</Button>
                    </div>
                </div>
                <Modal
                    visible={this.state.modalVisible}
                    title="Blog Preview"
                    onOk={this.handleOk.bind(this)}
                    width={'900px'}
                    onCancel={this.handleOk.bind(this)}
                    footer={null}
                >
                    <div className={style.modalContainer}>
                        <div id='preview' className={style.testCode}>
                            {remark().use(reactRenderer).processSync(this.props.content).contents}
                        </div>
                    </div>
                </Modal>
            </div>

        )
    }

    componentDidMount() {
        this.props.get_all_tags();
    }
}

AdminNewBlog.propsTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.array,
    tagsBase: PropTypes.array
};

AdminNewBlog.defaultProps = {
    title: '',
    content: '',
    tags: [],
    tagsBase: []
};

function mapStateToProps(state) {
    const {title, content, tags} = state.admin.newBlog;
    let tempArr = state.admin.tags;
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === 'Home') {
            tempArr.splice(i, 1);
        }
    }
    return {
        title,
        content,
        tags,
        tagsBase: tempArr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update_tags: bindActionCreators(update_tags, dispatch),
        update_title: bindActionCreators(update_title, dispatch),
        update_content: bindActionCreators(update_content, dispatch),
        get_all_tags: bindActionCreators(get_all_tags, dispatch),
        save_blog: bindActionCreators(save_blog, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminNewBlog)