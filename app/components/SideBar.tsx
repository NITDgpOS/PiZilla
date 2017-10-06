import * as path from 'path';
import * as React from 'react';
import { Icon } from 'react-fa';
import { updateFileList } from '../actions/FilesActions';
import { IFile } from './../../common/types';
import { IAppState } from './../reducers/files';
import { FileComponent, IFileComponentProps } from './File';

export class SideBarComponent extends React.Component<IAppState> {
    public componentDidMount(): void {
        updateFileList(this.props.path);
    }

    public render(): JSX.Element {
        const dirpath = this.props.path;
        const parentDir: IFileComponentProps = {
            icon: 'level-up',
            isDirectory: true,
            name: '..',
            path: path.dirname(dirpath),
        };
        const files = this.props.files;
        if (path.resolve(dirpath) !== path.resolve('uploads')) {
            files.unshift(parentDir);
        }
        const list = files.map((file) => <FileComponent key={ file.path } { ...file } />);
        list.unshift(<li key='title'><a className='title'>PiZilla</a></li>);

        return (
            <div>
                <ul id='slide-out' className='side-nav fixed'>
                    {list}
                </ul>
                <a href='#' data-activates='slide-out' className='button-collapse'>
                    <Icon Component='i' name='bars' />
                </a>
            </div>
        );
    }
}
