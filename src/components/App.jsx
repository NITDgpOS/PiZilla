import React, { Component } from 'react';
import DropZone from './DropZone';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import { connect } from 'react-redux';

class App extends Component {
    static propTypes = {
        store: PropTypes.object
    };

    render() {
        const store = this.props.store;
        return (
            <main>
                <SideBar { ...store } />
                <DropZone path={ store.path } />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return { store: { ...state } };
}

export default connect(mapStateToProps)(App);
