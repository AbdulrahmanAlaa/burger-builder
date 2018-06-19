import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => req, error => {
                this.setState({ error: null });
                return Promise.reject(error);
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error });
                return Promise.reject(error);
            });
        }
        componentWillUnmount() {
            console.log('[unmount called ]',this.reqInterceptor,this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal modalClosed={this.errorConfirmedHandler} show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}
export default withErrorHandler;
