import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalUser.scss";
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {
        
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
    checkValidInput = () => {
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
    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.createNewUser(this.state);
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
                    <ModalHeader toggle={() => { this.toggle() }}>Create a new User</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label htmlFor="">Email</label>
                                <input type="text"
                                    name="email"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Password</label>
                                <input type="password"
                                    name="password"
                                    onChange={(e) => { this.handleOnChangeInput(e) }}
                                    value={this.state.password}
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
                            onClick={() => { this.handleAddNewUser() }}>
                            Add User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
