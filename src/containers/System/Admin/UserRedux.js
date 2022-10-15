import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import '../Admin/UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            action: '',
            //init user param
            userEditId: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let arrGenders = this.props.genders;
        let arrPositions = this.props.positions;
        let arrRoles = this.props.roles;
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
            })
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log("check image", base64);
            let imageURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: imageURL,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        let { action } = this.state;
        if (isValid === false) return;
        if (action === CRUD_ACTIONS.CREATE) {
            //fire action create redux
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire action edit redux
            this.props.editUserStart({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check on change state', this.state);
        })
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'DEFAULTPASSWORD',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, role, position, avatar } = this.state
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
                                    <input type="email" className="form-control"
                                        value={email}
                                        onChange={(e) => { this.onChangeInput(e, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control"
                                        value={password}
                                        onChange={(e) => { this.onChangeInput(e, 'password') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(e) => { this.onChangeInput(e, 'firstName') }} />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(e) => { this.onChangeInput(e, 'lastName') }} />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => { this.onChangeInput(e, 'phoneNumber') }} />
                                </div>
                                <div className="col-9">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" placeholder="1234 Main St"
                                        value={address}
                                        onChange={(e) => { this.onChangeInput(e, 'address') }} />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-select"
                                        value={gender}
                                        onChange={(e) => { this.onChangeInput(e, 'gender') }}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-select"
                                        value={position}
                                        onChange={(e) => { this.onChangeInput(e, 'position') }}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.role" /></label>
                                    <select className="form-select"
                                        value={role}
                                        onChange={(e) => { this.onChangeInput(e, 'role') }}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
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
                                <div className="col-12 my-3">
                                    <button type="button" className={`btn btn-${this.state.action === CRUD_ACTIONS.EDIT ? 'warning' : 'primary'}`}
                                        onClick={() => this.handleSaveUser()}
                                    ><FormattedMessage id={`manage-user.${this.state.action === CRUD_ACTIONS.EDIT ? 'edit' : 'save'}`} /></button>
                                </div>
                                <div className="col-12 mb-5">
                                    <TableManageUser
                                        handleEditUserFromParent={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
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
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUserStart(data)),
        fetchAllUsers: () => dispatch(actions.fetchAllUserStart()),
        editUserStart: (data) => dispatch(actions.editUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
