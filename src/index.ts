import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker
} from '@jupyterlab/notebook';

import TeacherInterface from './teacher'

/**
 * Initialization data for the SeminarHelper extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'SeminarHelper:plugin',
  description: 'r easier teacher-to-student interraction during online and offline coding seminars.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('JupyterLab extension SeminarHelper is activated!');

    tracker.widgetAdded.connect((sender, notebookPanel) => {
      const widget = new TeacherInterface();
      document.body.appendChild(widget.node);

      console.log("Child appended.");
    })
  }
};

export default plugin;
