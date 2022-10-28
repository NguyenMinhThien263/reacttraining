import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomeHeader.js';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import './DetailSpecialty.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getDetailSpecialtyById } from '../../../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            arrProvince: [],
            dataDetailSpecialty: {},
            //UI
            descriptionCollapse: false,
        };
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({ id, location: 'ALL' });
            let resProvince = await getAllCodeService("PROVINCE");


            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let { arrDoctorId } = this.state
                if (data && !_.isEmpty(data)) {
                    let arr = data.specialtyData;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn Quốc',
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrProvince: dataProvince ? dataProvince : [],
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = e.target.value;
            let res = await getDetailSpecialtyById({ id, location });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.specialtyData;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }
    handleCollapseOnClick = () => {
        this.setState({
            descriptionCollapse: !this.state.descriptionCollapse,
        });
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, arrProvince, descriptionCollapse } = this.state;
        let { language } = this.props;
        console.log('cehck data detail specialty', this.state);
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty-content">
                        <div className={`description-specialty ${descriptionCollapse === false ? 'descript-collapse' : ''}`}>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                && <div className="" dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                        </div>
                        <div className="sp-collapse" onClick={() => this.handleCollapseOnClick()}>
                            {descriptionCollapse === true ?
                                <FormattedMessage id="patient.detail-specialty.hide" />
                                : <FormattedMessage id="patient.detail-specialty.show" />} ...
                        </div>
                    </div>

                    <div className="search-sp-doctor">
                        <select className='select-search' onChange={(e) => this.handleOnChangeSelect(e)}>
                            {arrProvince && arrProvince.length > 0 &&
                                arrProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorId={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
