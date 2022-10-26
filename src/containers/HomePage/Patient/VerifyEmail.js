import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { postVerifyBookingAppointment } from '../../../services/userService'
import HomeHeader from '../HomeHeader';
import './VerifyEmail.scss'
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <div className="verify-email-container">
                <HomeHeader isShowBanner={false} />
                {statusVerify === false ?
                    <div className="">Loading data ...</div>
                    :
                    <div className="">
                        {+errCode === 0 ?
                            <div className="infor-booking">Xác nhận lịch hẹn thành công!</div>
                            :
                            <div className="infor-booking">Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
