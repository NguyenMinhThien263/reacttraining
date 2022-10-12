import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './Header.scss';

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        const { processLogout } = this.props;
        let language = this.props.language
        let userInfo = this.props.userInfo;
        console.log("check user info",this.props.userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="languages">
                    <span className="welcome"><FormattedMessage id="home-header.welcome"/> {userInfo && userInfo.firstName ? userInfo.firstName : ''}!</span>
                    <span className={`${language === LANGUAGES.VI ? 'active' : ''} languages-vi`}
                        onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>
                        VN
                    </span>
                    <span className={`${language === LANGUAGES.EN ? 'active' : ''} languages-en`}
                        onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="LOGOUT">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
