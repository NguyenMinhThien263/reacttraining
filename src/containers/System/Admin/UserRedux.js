import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';

import '../Admin/UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let imageURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: imageURL,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        console.log('check props from redux', this.props);
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="user-redux-container">
                <div className="title">
                    USER REDUX TRAINING
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">{isLoadingGender === true ? 'Loading Gender' : ''}</div>
                            <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                            <form className="row g-3">
                                <div className="col-md-3">
                                    <label><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-9">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" placeholder="1234 Main St" />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-select">
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-select">
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.role" /></label>
                                    <select className="form-select">
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <div className="preview-img-container">
                                        <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                        <input id="previewImg" type="file" hidden className="form-control"
                                            onChange={(e) => { this.handleOnChangeImage(e) }}
                                        />
                                        <div className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => { this.openPreviewImage() }}
                                        >

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >
        )
    }

}

const mapStateToProps = state => {
    console.log('admin', state.admin);
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
