import request from 'superagent';
import path from 'path';
import React, { Component } from 'react';

class FilesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { files: [], path: this.props.path };
        this.changePath = this.changePath.bind(this);
        this.getFileList = this.getFileList.bind(this);
    }

    componentDidMount() {
        this.getFileList(this.state.path);
    }

    changePath(event) {
        event.preventDefault();
        let dirPath = path.join(this.state.path, event.target.innerHTML);
        this.setState({ path: dirPath, files: [] });
        this.getFileList(dirPath);
    }

    getFileList(dirPath) {
        const encodedPath = encodeURIComponent(dirPath);
        const files = [];

        request.get(`/files?path=${encodedPath}`, (err, res) => {
            if (err) throw err;

            if (path.resolve(dirPath) !== path.resolve(this.props.path))
                files.push(<li key={path.dirname(dirPath)}>
                    <a onClick={this.changePath} href="">..</a>
                </li>);

            res.body.forEach(file => {
                const encodedFilePath = encodeURIComponent(file.path);
                const downloadLink = `/download?path=${encodedFilePath}`;
                let link = <a href={downloadLink}>{file.name}</a>;
                if (file.isDirectory)
                    link = (<a href="" onClick={this.changePath}>{file.name}</a>);
                files.push(<li key={file.path}>{link}</li>);
            });

            this.setState({ files: files });
        });
    }

    render() {
        return (
            <div>
                <ul>{this.state.files}</ul>
            </div>
        )
    }
}

export default FilesComponent;
