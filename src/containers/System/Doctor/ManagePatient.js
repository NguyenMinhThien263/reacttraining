import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { postSendRemedy, getListPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        };
    }


    async componentDidMount() {
        await this.getDataPatient();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let fomattedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: fomattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        });
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        });
    }
    isCloseModal = () => {
        this.setState({
            isOpenRemedyModal: !this.state.isOpenRemedyModal,
            dataModal: {},
        });
    }
    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        console.log('check daat from send', dataModal);
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
            language: this.props.language,
        })
        if (res && res.errCode === 0) {
            toast.success('Send Remedy succeed');
            await this.getDataPatient();
            this.isCloseModal()
            this.setState({
                isShowLoading: false,
            });
        } else {
            toast.error('Send Remedy Failed')
            console.log("error form sending:", res);
            this.setState({
                isShowLoading: false,
            });
        }
    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, isShowLoading } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label htmlFor="">chọn ngày khám</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="table-manage-patient mt-3">
                                <table id="patients">
                                    <tbody>

                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và Tên</th>
                                            <th>Giới Tính</th>
                                            <th>Địa Chỉ</th>
                                            <th>Actions</th>
                                        </tr>
                                        {
                                            dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                                let gender = language === LANGUAGES.VI ?
                                                    item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                return (<>
                                                    <tr key={`${index}`}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className="btn-confirm" onClick={() => this.handleBtnConfirm(item)} >Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                                :
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                                        No data
                                                    </td>
                                                </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        isCloseModal={this.isCloseModal}
                        sendRemedy={this.sendRemedy}
                        dataModal={dataModal} />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
