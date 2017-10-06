import React, { Component } from 'react';
import File from './File';
import FilesActions from '../actions/FilesActions';
import { Icon } from 'react-fa';
import PropTypes from 'prop-types';
import path from 'path';
import serverConfig from './../../server/config';

class SideBar extends Component {
    static propTypes = {
        files: PropTypes.arrayOf(PropTypes.object),
        path: PropTypes.string
    }

    componentDidMount = () => {
        FilesActions.updateFileList(this.props.path);
    }

    render = () => {
        const dirpath = this.props.path;
        const parentDir = {
            extension: null,
            icon: 'level-up',
            isDirectory: true,
            name: '..',
            path: path.dirname(dirpath)
        };
        const files = this.props.files;
        if (path.resolve(dirpath) !== path.resolve(serverConfig.uploads))
            files.unshift(parentDir);
        const list = files.map((file) => <File key={ file.path } { ...file } />);
        list.unshift(<li key="title"><a className="title">PiZilla</a></li>);

        return (
            <div>
                <ul id="slide-out" className="side-nav fixed">
                    {list}
                </ul>
                <a href="#" data-activates="slide-out" className="button-collapse">
                    <Icon Component="i" name="bars" />
                </a>
            </div>
        );
    }
}

export default SideBar;
