import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
class HomeHeader extends Component {

    render() {
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="side-bar fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="content-container">
                                <div className="Title"><b><FormattedMessage id="home-header.speciality"/></b></div>
                                <div className="subTilte"><FormattedMessage id="home-header.searchdoctor"/></div>
                            </div>
                            <div className="content-container">
                                <div className="Title"><b><FormattedMessage id="home-header.heathFacility"/></b></div>
                                <div className="sub-tilte"><FormattedMessage id="home-header.selectRoom"/></div>
                            </div>
                            <div className="content-container">
                                <div className="Title"><b><FormattedMessage id="home-header.doctor"/></b></div>
                                <div className="sub-tilte"><FormattedMessage id="home-header.selectDoctor"/></div>
                            </div>
                            <div className="content-container">
                                <div className="Title"><b><FormattedMessage id="home-header.fee"/></b></div>
                                <div className="sub-tilte"><FormattedMessage id="home-header.checkingHeath"/></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question"></i>
                                <span><FormattedMessage id="home-header.support"/></span>
                            </div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="banner-title">
                            <span className="title-content"></span>
                            <br /><span className="sub-title-content"></span>
                        </div>
                        <div className="banner-search">
                            <i className="fas fa-search"></i>
                            <input className="input-search" type="text"
                                placeholder="Tìm kiếm khoa khám bệnh"
                            />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="banner-options">
                            <div className="option-item">
                                <div className="item-icon"><i className="far fa-hospital"></i></div>
                                <div className="item-text"></div>
                            </div>
                            <div className="option-item">
                                <div className="item-icon"><i class="fas fa-mobile-alt"></i></div>
                                <div className="item-text"></div>
                            </div>
                            <div className="option-item">
                                <div className="item-icon"><i class="fas fa-stethoscope"></i></div>
                                <div className="item-text"></div>
                            </div>
                            <div className="option-item">
                                <div className="item-icon"><i class="fas fa-x-ray"></i></div>
                                <div className="item-text"></div>
                            </div>
                            <div className="option-item">
                                <div className="item-icon"><i class="fas fa-magnet"></i></div>
                                <div className="item-text"></div>
                            </div>
                            <div className="option-item">
                                <div className="item-icon"><i class="fas fa-syringe"></i></div>
                                <div className="item-text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
