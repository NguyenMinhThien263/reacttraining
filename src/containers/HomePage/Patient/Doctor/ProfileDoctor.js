import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../../services/userService'
import './ProfileDoctor.scss';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: [],
        };
    }


    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }
    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInfoDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }

    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log('check date', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY');
            return (
                <>
                    <div className="">{time} &#45; {this.capitalizeFirstLetter(date)}</div>
                    <div className=""><FormattedMessage id="patient.booking-modal.free-fee" /></div>
                </>
            )
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        let nameEn = '';
        let nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }

        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className="content-right">
                        <div className="content-right-up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="content-right-down">
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span className="">
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="text-price">
                    <FormattedMessage id="patient.extra-infor-doctor.text-price" />
                    &#58;
                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData &&
                        <NumberFormat
                            className="currency"
                            value={language === LANGUAGES.VI ? dataProfile.Doctor_Infor.priceTypeData.valueVi
                                : language === LANGUAGES.EN ? dataProfile.Doctor_Infor.priceTypeData.valueEn
                                    : ''}
                            displayType={'text'}
                            thousandSeparator=","
                            suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
