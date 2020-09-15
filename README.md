# Todo List

## Author
* [Yibo Zhao](https://github.com/yib0zha0)

## Description
This project uses `React Native` to build a todo list. It supports adding, deleting, sorting and editing todo list.

## Run
1. React native projects require development environment for android and ios apps. You can check this [tutorial](https://reactnative.dev/docs/environment-setup) to set them up. Check the section `React Native CLI Quickstart`
1. Clone the project: `git clone https://github.com/yib0zha0/todo-list.git`
1. Enter the folder: `cd todo-list`
1. Install all dependency: `npm install`
1. Start the app: `npx react-native start`
1. Start a new terminal. Start a simulator and install the app. 
    * If you want to run it in a iOS simulator. Run `pod install` under the [ios](ios/) folder first. Then, run `npx react-native run-ios`.
    * If you want to run it in an Android simulator, run `npx react-native run-android`.
1. Enjoy it.

## Test
Assume you've cloned the project and installed all dependencies following the previous section. Use this command to run unit tests.
```
# execute in the project root folder.
npm test
```