// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { WorktreeProvider } from './Worktree';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')?.exports;
	// const git = gitExtension?.getAPI(1);
	// console.log(git?.getRepository( file));
	// context.wo
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-worktree-menu" is now active!');

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
	? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	const command = 'git-worktree-menu.open-worktree';

	const commandHandler = async (args: any) => {
		// vscode.window.showInformationMessage("received open command " + args );
		const uri = vscode.Uri.file(args);
		let success = await vscode.commands.executeCommand('vscode.openFolder', uri);
	};

	vscode.commands.registerCommand(command, commandHandler);
	// Samples of `window.registerTreeDataProvider`
	const worktreeProvider = new WorktreeProvider(rootPath);
	vscode.window.registerTreeDataProvider('worktreeDependencies', worktreeProvider);

	vscode.commands.registerCommand('git-worktree-menu.refreshList', () => worktreeProvider.refresh() );
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('git-worktree-menu.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const commands = ['worktree', 'list'];
		simpleGit("./").raw(...commands).then( (e) => {
			console.log(e)
		});
		vscode.window.showInformationMessage('Hello World from Git Worktree Menu!');

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
