import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../../utils';
import { getExtraInforDoctorById } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        };
    }

    renderExtraInforDoctorById = async (doctorId) => {
        let res = await getExtraInforDoctorById(doctorId);
        if (res.data && res.errCode === 0) {
            this.setState({
                extraInfor: res.data,
            });
        }
    }
    componentDidMount() {
        if (this.props.doctorId) {
            this.renderExtraInforDoctorById(this.props.doctorId);
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            this.renderExtraInforDoctorById(this.props.doctorId);
        }
    }
    showHideDetailInfor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor,
        });
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props
        console.log('check state', this.state);
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className="detail-address">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                <div className="content-down">
                    {!isShowDetailInfor ?
                        <div className="title-price">
                            <FormattedMessage id="patient.extra-infor-doctor.text-price" />
                            &#58;
                            {extraInfor && extraInfor.priceTypeData &&
                                <NumberFormat
                                    className="currency"
                                    value={language === LANGUAGES.VI ? extraInfor.priceTypeData.valueVi : language === LANGUAGES.EN ? extraInfor.priceTypeData.valueEn : ''}
                                    displayType={'text'}
                                    thousandSeparator=","
                                    suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                />
                            }
                            <br />
                            <span className="show-hide-price" onClick={() => this.showHideDetailInfor()}>
                                <FormattedMessage id="patient.extra-infor-doctor.show-detail" />
                            </span>
                        </div>
                        :
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-infor-doctor.text-price" />
                                &#58;
                            </div>
                            <div className="detail-price">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-infor-doctor.text-price" />
                                    </span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceTypeData &&
                                            <NumberFormat
                                                className="currency"
                                                value={language === LANGUAGES.VI ? extraInfor.priceTypeData.valueVi : language === LANGUAGES.EN ? extraInfor.priceTypeData.valueEn : ''}
                                                displayType={'text'}
                                                thousandSeparator=","
                                                suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className="detail-payment">
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi : ''}
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <span className="show-hide-price" onClick={() => this.showHideDetailInfor()}>
                                <FormattedMessage id="patient.extra-infor-doctor.hide-detail" />
                            </span>
                        </>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
