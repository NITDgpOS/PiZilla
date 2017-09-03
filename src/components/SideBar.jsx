import React, { Component } from 'react';
import File from './File';
import FilesActions from '../actions/FilesActions';
import PropTypes from 'prop-types';
import path from 'path';

class SideBar extends Component {
    static propTypes = {
        files: PropTypes.arrayOf(PropTypes.object),
        path: PropTypes.string
    }

    componentDidMount() {
        FilesActions.updateFileList(this.props.path);
    }

    render() {
        const files = this.props.files;
        const list = files.map((file, i) => <File key={ i } { ...file } />);
        list.unshift(<li key="title"><a className="title">PiZilla</a></li>);

        return (
            <div>
                <ul id="slide-out" className="side-nav fixed">
                    {list}
                </ul>
                <a href="#" data-activates="slide-out" className="button-collapse">
                    <i className="fa fa-bars" />
                </a>
            </div>
        );
    }
}

export default SideBar;
