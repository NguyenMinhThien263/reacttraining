import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {

    render() {
        return (
            <div className="section-share about">
                <div className="section-about-header">
                    Truyền thông traning react
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%" height="400"
                            src="https://www.youtube.com/embed/SIuF37EWaLU"
                            title="東京フラッシュ / Vaundy ：MUSIC VIDEO"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, deserunt?
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
