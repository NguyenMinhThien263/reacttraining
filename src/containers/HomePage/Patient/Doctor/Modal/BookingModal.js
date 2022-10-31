import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../../utils';
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor'
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import * as actions from '../../../../../store/actions';
import DatePicker from '../../../../../components/Input/DatePicker';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            timeType: '',
            selectedGender: '',
        };
    }


    async componentDidMount() {
        this.props.getGenderStart();
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let { dataTime } = this.props;
            let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
            let timeType = dataTime.timeType;
            this.setState({
                doctorId: doctorId,
                timeType: timeType,
            });
        }

    }
    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState,
        });
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        });
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        });
    }
    handleConfirmBooking = async () => {
        //validated
        let date = moment(new Date()).startOf('day').valueOf();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success("Booking a new Appointment success!");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking a new Appointment failed!");
        }
    }
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY');
            return `${time} - ${this.capitalizeFirstLetter(date)}`;
        }
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        return (
            <div className="">
                <Modal isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg' centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right"
                                onClick={closeBookingModal}
                            ><i className="fas fa-times"></i></span>
                        </div>
                        <div className="booking-modal-body container">
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.full-name" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.phone-number" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="">
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button type="button" className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.confirm" />
                            </button>
                            <button type="button" className="btn-booking-cancel"
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id="patient.booking-modal.cancel" />
                            </button>
                        </div>
                    </div>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
