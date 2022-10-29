import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : [],
            });
        }
        console.log('check res Clinic', res);
    }
    componentDidUpdate(prevProps, prevState) {

    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    }
    render() {
        let { dataClinic } = this.state;
        return (
            <div className="section-share medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                            className="section-customize clinic-child">
                                            <div className="section-img clinic-img"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="clinic-name">{item.name}</div>
                                        </div>
                                    )
                                })}

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
