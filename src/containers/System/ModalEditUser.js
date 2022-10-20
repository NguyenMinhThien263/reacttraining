import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalUser.scss";
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }

    }

    toggle = () => {
        this.props.toggleModal()
    }

    handleOnChangeInput = (e) => {
        let target = e.target;
        let copyState = { ...this.state };
        copyState[target.name] = target.value;
        this.setState({ ...copyState })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = Object.keys(this.state)
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("missing parameter " + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editUser(this.state);
        }
    }
    render() {
        return (
            <div className="text-center" >
                <Modal isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label htmlFor="">Email</label>
                                <input type="text"
                                    name="email"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Password</label>
                                <input type="password"
                                    name="password"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.password}
                                    disabled
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">FirstName</label>
                                <input type="text"
                                    name="firstName"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">LastName</label>
                                <input type="text"
                                    name="lastName"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="input-container max-full-width">
                                <label htmlFor="">Address</label>
                                <input type="text"
                                    name="address"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-3"
                            onClick={() => { this.handleSaveUser() }}>
                            Save Changes
                        </Button>{' '}
                        <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
                    </ModalFooter>
                </Modal></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
