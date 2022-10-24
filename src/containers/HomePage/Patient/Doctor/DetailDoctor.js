import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader.js';
import '../Doctor/DetailDoctor.scss';
import { LANGUAGES } from '../../../../utils';
import { getDetailInforDoctor } from '../../../../services/userService'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor'
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            });
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameEn = '';
        let nameVi = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className="content-right">
                            <div className="content-right-up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="content-right-down">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span className="">
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorId={this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor
                                doctorId={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div className="" dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
