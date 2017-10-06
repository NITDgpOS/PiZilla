import * as React from 'react';
import { Icon } from 'react-fa';
import { changeDirectory } from '../actions/FilesActions';
import { IFile } from './../../common/types';

export interface IFileComponentProps extends IFile {
    icon?: string;
}

export class FileComponent extends React.Component<IFileComponentProps> {
    public changeDirectory = (event: any) => {
        event.preventDefault();
        changeDirectory(event.target.dataset.path);
    }

    public getViewLink = (path: string) => {
        return `/view/${encodeURIComponent(path)}`;
    }

    public getIconByMime = (type?: string | null) => {
        if (typeof type === 'undefined' || type === null) {
            return 'file-type-o';
        } else if (type.startsWith('video/')) {
            return 'film';
        } else if (type.startsWith('image/')) {
            return 'picture-o';
        } else if (type.endsWith('/pdf')) {
            return 'file-pdf-o';
        } else if (type.startsWith('audio/')) {
            return 'file-audio-o';
        } else if (type.startsWith('text/')) {
            return 'file-text-o';
        }
        return 'file-o';
    }

    public render(): JSX.Element {
        const path = this.props.path;
        const name = this.props.name;
        const mimetype = this.props.mime;
        const isDirectory = this.props.isDirectory;
        const icon = (typeof this.props.icon !== 'undefined' ?
            <Icon name={ this.props.icon } /> :
            <Icon name='folder-o' />);
        let link = (
            <a className='tooltipped' data-position='right' data-delay='40'
                data-tooltip='Download' data-path={ path }
                href={ this.getViewLink(name) }
            >
                <Icon Component='i' name={ this.getIconByMime(mimetype) } />
                {name}
            </a>
        );
        if (isDirectory) {
            link = (
                <a className='tooltipped' data-position='right'
                    data-delay='40' data-tooltip='Browse'
                    data-path={ path } onClick={ this.changeDirectory }
                >{ icon }{name}
                </a>);
        }
        return <li>{link}</li>;
    }
}
