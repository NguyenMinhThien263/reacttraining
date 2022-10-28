import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpg'
import { getAllSpecialty } from '../../../services/userService'
import { withRouter } from "react-router-dom";
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });

        }
    }
    handleViewDetailSpecialty=(item)=>{ 
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="section-share specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.specialty-populular"/></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-info"/></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                        className="section-customize specialty-child">
                                            <div className="section-img specialty-img"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="specialty-name">{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
