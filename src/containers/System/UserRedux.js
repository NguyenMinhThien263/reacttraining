import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
constructor(props) {
    super(props);
    this.state={};
}

    componentDidMount() {
    }


    render() {
        return (
            <div className="user-redux-container">
                <div className="title">
                    USER REDUX TRAINING
                </div>
                <div className="user-redux-body" >
                    theem moiws nguowif ddung
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
