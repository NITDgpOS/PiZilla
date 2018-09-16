import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import FilesActions from './../actions/FilesActions';
import PropTypes from 'prop-types';

const icon = '/assets/img/pizilla/favicon.ico';

class DropZone extends Component {
    static propTypes = {
        path: PropTypes.string
    }

    constructor(props) {
        super(props);
        Notification.requestPermission();

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            maxFilesize: 4096, //MB
            parallelUploads: 10,
            uploadMultiple: true
        };

        this.componentConfig = {
            postUrl: '/upload',
            showFiletypeIcon: true
        };

        this.dropzone = null;
    }

    success = (file, path) => {
        FilesActions.updateFileList(path);
        const body = `Filename : ${file.name}`;
        if(Notification.permission === 'granted') {
            new Notification('File uploaded successfully',{ body , icon });
        }
    }

    render = () => {
        const { path } = this.props;
        const eventHandlers = {
            init: (dz) => this.dropzone = dz,
            success: (file) => this.success(file, path)
        };

        return (
            <DropzoneComponent
                config={ this.componentConfig }
                djsConfig={ this.djsConfig }
                eventHandlers={ eventHandlers }
            />
        );
    }
}

export default DropZone;
