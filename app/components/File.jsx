import React, { Component } from 'react';
import FilesActions from '../actions/FilesActions';
import { Icon } from 'react-fa';
import PropTypes from 'prop-types';

class File extends Component {
    static propTypes = {
        extension: PropTypes.string,
        icon: PropTypes.string,
        isDirectory: PropTypes.bool,
        mime: PropTypes.string,
        name: PropTypes.string,
        path: PropTypes.string
    };

    changeDirectory = (event) => {
        event.preventDefault();
        FilesActions.changeDirectory(this.props.path);
    }

    getViewLink = (path) => {
        return `/view/${encodeURIComponent(path)}`;
    }

    getDownloadLink = (path) => {
        return `/download?path=${encodeURIComponent(path)}`;
    }

    getIconByMime = (type) => {
        if (type.startsWith('video/'))
            return 'film';
        if (type.startsWith('image/'))
            return 'picture-o';
        if (type.endsWith('/pdf'))
            return 'file-pdf-o';
        if (type.startsWith('audio/'))
            return 'file-audio-o';
        if (type.startsWith('text/'))
            return 'file-text-o';
        return 'file-o';
    }

    render = () => {
        const { path, name, mime, isDirectory } = this.props;
        const icon = (typeof this.props.icon !== 'undefined' ?
            <Icon name={ this.props.icon } /> :
            <Icon name='folder-o' />);
        const linkProps = {
            target: '_blank'
        };

        let link = (
            <a { ...linkProps } href={ this.getViewLink(name) }>
                <Icon Component='i' name={ this.getIconByMime(mime) } />
                {name}
            </a>
        );
        if (isDirectory) {
            link = (
                <a { ...linkProps } onClick={ this.changeDirectory }>
                    {icon}{name}
                </a>);
        }
        return <li>{link}</li>;
    }
}

export default File;
