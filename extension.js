var vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "test-switcher" is now active!');
    var switcher = vscode.commands.registerCommand('extension.testSwitch', function () {
        var currentFileName = vscode.window.activeTextEditor.document.fileName;
        var rootPath = vscode.workspace.rootPath;
        currentFileName = currentFileName.replace( rootPath + '/', '' );
        var isSpec = currentFileName.startsWith('spec/');
        var openFileName = '';
        if(isSpec == true) {
            openFileName = currentFileName.replace('spec/', '');
            openFileName = openFileName.replace('_spec', '');
        } else {
            openFileName = 'spec/' + currentFileName;
            openFileName = openFileName.replace('.rb', '_spec.rb');
        }
        var absolutePath = vscode.workspace.rootPath + '/' + openFileName;
        var openPath = vscode.Uri.file(absolutePath);
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });
    });
    context.subscriptions.push(switcher);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
