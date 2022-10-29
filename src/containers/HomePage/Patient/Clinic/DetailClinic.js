import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomeHeader.js';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import './DetailClinic.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getDetailClinicById } from '../../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        };
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({ id });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.clinicData;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-clinic-container">
                <HomeHeader />
                <div className="detail-clinic-body">
                    <div className="description-clinic-content">
                        <div className="description-clinic">
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                &&
                                <>
                                    <div className="name">{dataDetailClinic.name}</div>
                                    <div className="name">{dataDetailClinic.address}</div>
                                    <div className="" dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                </>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
