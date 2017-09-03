import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';

class DropZone extends Component {
    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            maxFilesize: 4096 //MB
        };

        this.componentConfig = {
            postUrl: '/upload',
            showFiletypeIcon: true
        };

        this.dropzone = null;
        this.sending.bind(this);
    }

    sending(file, xhr, formData) {
        console.info(file, xhr, formData);
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        const eventHandlers = {
            init: (dz) => this.dropzone = dz,
            sending: this.sending
        };

        return (
            <DropzoneComponent
                config={ config }
                djsConfig={ djsConfig }
                eventHandlers={ eventHandlers }
            />
        );
    }
}

export default DropZone;
