import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';
//Markdown library
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //markdown-table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctors: [],
            //doctor-infor-table
            allPrice: [],
            allPayment: [],
            allProvince: [],
            allSpecialty: [],
            allClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: '',
            //UI state
            hasOldData: false,
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfoStart();
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                allDoctors: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                allDoctors: dataSelect,
                allPrice: dataSelectPrice,
                allPayment: dataSelectPayment,
                allProvince: dataSelectProvince,
                allSpecialty: dataSelectSpecialty
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                allPrice: dataSelectPrice,
                allPayment: dataSelectPayment,
                allProvince: dataSelectProvince,
                allSpecialty: dataSelectSpecialty
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '', 
            hasOldData: false,
            addressClinic: '',
            nameClinic: '',
            note: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
        });
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { allPrice, allPayment, allProvince, allSpecialty } = this.state;
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '', selectedSpecialty = '';
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                selectedPrice = allPrice.find(item => {
                    return item && item.value === priceId
                });
                selectedPayment = allPayment.find(item => {
                    return item && item.value === paymentId
                });
                selectedProvince = allProvince.find(item => {
                    return item && item.value === provinceId
                });
                selectedSpecialty = allSpecialty.find(item => {
                    return item && item.value === specialtyId
                });
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                paymentId: paymentId,
                priceId: priceId,
                provinceId: provinceId,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
            });
        }
    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        })
    }
    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.allDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.introduction" />
                        </label>
                        <textarea className="form-control"
                            onChange={(event) => { this.handleOnChangeText(event, 'description') }}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select name="selectedPrice"
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.allPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select name="selectedPayment"
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.allPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select name="selectedProvince"
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.allProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.name-clinic" />
                        </label>
                        <input className="form-control" type="text"
                            onChange={(event) => { this.handleOnChangeText(event, 'nameClinic') }}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.address-clinic" />
                        </label>
                        <input className="form-control" type="text"
                            onChange={(event) => { this.handleOnChangeText(event, 'addressClinic') }}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input className="form-control" type="text"
                            onChange={(event) => { this.handleOnChangeText(event, 'note') }}
                            value={this.state.note}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select name="selectedSpecialty"
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.allSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.clinic" />
                        </label>
                        <Select name="selectedClinic"
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.allClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button type="button" className={`${hasOldData === true ? 'save' : 'create'}-content-doctor`}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span> : <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    }</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfoStart: () => dispatch(actions.getRequiredDoctorInfoStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
