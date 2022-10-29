import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import { createNewClinic } from '../../../services/userService'
//Markdown library
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    }
    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({ ...copyState });
    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new clinic succeed!");
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error("Add new clinic failed!");
            console.log('check res form save', res);
        }
    }
    render() {
        return (
            <div className="manage-clinic-container">
                <div className="ms-title">Quản lý phòng khám</div>
                <div className="all-new-clinic row">
                    <div className="col-6 form-group">
                        <label htmlFor="">Tên phòng khám</label>
                        <input type="text" className="form-control"
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="">Ảnh phòng khám</label>
                        <input type="file" className="form-control"
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="">Địa chỉ phòng khám</label>
                        <input type="text" className="form-control"
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-clinic"
                            onClick={() => this.handleSaveNewClinic()}
                        >Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
