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
        let dirPath = path.join(this.state.path, event.target.dataset.path);
        this.setState({ path: dirPath, files: [] });
        this.getFileList(dirPath);
    }

    getFileList(dirPath) {
        const encodedPath = encodeURIComponent(dirPath);
        const files = [];
        let count = 0;

        request.get(`/files?path=${encodedPath}`, (err, res) => {
            if (err) throw err;

            files.push(<li key={count++}>
                <a className="title">PiZilla</a>
            </li>);

            // previous directory
            if (path.resolve(dirPath) !== path.resolve(this.props.path))
                files.push(<li key={count++}>
                    <a onClick={this.changePath} data-path="..">
                        <i className="fa fa-folder"></i>..
                    </a>
                </li>);

            res.body.forEach(file => {
                files.push(<li key={count++}><div className="divider"></div></li>);
                const encodedFilePath = encodeURIComponent(file.path);
                const downloadLink = `/download?path=${encodedFilePath}`;
                let link = (
                    <a
                        className="tooltipped" data-position="right"
                        data-delay="40" data-tooltip="Download"
                        href={downloadLink}>
                        <i className="fa fa-file"></i>{file.name}
                    </a>
                );
                if (file.isDirectory)
                    link = (
                        <a className="tooltipped" data-position="right"
                            data-delay="40" data-tooltip="Browse"
                            data-path={file.name} onClick={this.changePath}>
                            <i className="fa fa-folder"></i>{file.name}
                        </a>
                    );
                files.push(<li key={count++}>{link}</li>);
            });

            this.setState({ files: files });
        });
    }

    render() {
        return (
            <div>
                <ul id="slide-out" className="side-nav fixed">
                    {this.state.files}
                </ul>
                <a href="#" data-activates="slide-out" className="button-collapse">
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        );
    }
}

export default FilesComponent;
