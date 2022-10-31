import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../../utils';
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        };
    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }


    }
    isCloseModal = () => {
        this.props.isCloseModal();
    }
    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }
    render() {
        let { isOpenModal, dataModal, sendRemedy } = this.props;
        console.log('check props', this.props);
        return (
            <div className="">
                <Modal isOpen={isOpenModal}
                    className={'modal-remedy-container'}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => this.isCloseModal()}>Gửi hoá đơn khám bệnh thành công</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor="">
                                    Email Bệnh nhân
                                </label>
                                <input className="form-control" type="email" value={this.state.email}
                                    onChange={(e) => this.handleOnChangeEmail(e)}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">
                                    Chọn đơn thuốc
                                </label>
                                <input className="form-control" type="file"
                                    onChange={(e) => this.handleOnChangeImage(e)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-3"
                            onClick={() => this.handleSendRemedy()}
                        >
                            Gửi
                        </Button>{' '}
                        <Button color="secondary" className="px-3" onClick={() => this.isCloseModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
