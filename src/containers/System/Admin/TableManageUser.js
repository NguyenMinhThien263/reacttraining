import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import './TableManageUser.scss';
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        };
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }
    render() {
        let arrUsers = this.state.userRedux;
        return (
            <>
                <table id="TableManageUser">
                    <tbody>

                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button type="button" className="btn-edit" onClick={() => { this.handleEditUser(item) }}><i className="fas fa-edit"></i></button>
                                            <button type="button" className="btn-delete" onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
