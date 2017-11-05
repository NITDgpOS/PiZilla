import React, { Component } from 'react';
import File from './File';
import FilesActions from '../actions/FilesActions';
import { Icon } from 'react-fa';
import PropTypes from 'prop-types';
import Search from './Search.jsx';
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

        return (
            <div>
                <div id='slide-out' className='side-nav fixed'>
                    <div className='sidebar-header'>
                        <a className='title'>
                            <img src='/assets/img/pizilla/PiZilla-text.png' />
                        </a>
                        <Search files={ files } />
                    </div>
                    <ul className='file-list'>{list}</ul>
                </div>
                <a href='#' data-activates='slide-out' className='button-collapse'>
                    <Icon Component='i' name='bars' />
                </a>
            </div>
        );
    }
}

export default SideBar;
