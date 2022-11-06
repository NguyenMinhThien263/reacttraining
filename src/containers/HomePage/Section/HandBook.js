import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
class HandBook extends Component {

    render() {
        return (
            <div className="section-share handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm Nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="section-img handbook-img" />
                                <div className="">Cẩm nang 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="section-img handbook-img" />
                                <div className="">Cẩm nang 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="section-img handbook-img" />
                                <div className="">Cẩm nang 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="section-img handbook-img" />
                                <div className="">Cẩm nang 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="section-img handbook-img" />
                                <div className="">Cẩm nang 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="section-img handbook-img" />
                                <div className="">Cẩm nang 6</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
