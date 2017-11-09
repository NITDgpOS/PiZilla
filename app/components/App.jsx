import React, { Component } from 'react';
import DropZone from './DropZone';
import Footer from './Footer';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import { connect } from 'react-redux';

class App extends Component {
    static propTypes = {
        store: PropTypes.object
    };

    render = () => {
        const { store } = this.props;
        const forkImgProps = {
            alt: 'Fork me on GitHub',
            'data-canonical-src': 'https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png',
            src: 'https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67',
            style: { border: 0, position: 'absolute', right: 0, top: 0 }
        };
        return (
            <main>
                <SideBar { ...store } />
                <DropZone path={ store.path } />
                <Footer />
                <a href="https://github.com/NITDgpOS/PiZilla">
                    <img { ...forkImgProps } />
                </a>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return { store: { ...state } };
};

export default connect(mapStateToProps)(App);
