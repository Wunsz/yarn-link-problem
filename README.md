# yarn-link-problem
Example of problem with local yarn link.

### Bug description
Yarn link/install follows `devDependencies` of linked package in linked package modules. Same happens for `file` if **not** pointed to the compiled dependency.

**Command**

```sh
yarn link
yarn install
```

**What is the current behavior?**
When you create two projects, say, a react library `react-lib`, and in the same repo you want to use it in other react application `react-app`, and link the `react-lib` to `react-app`, yarn somehow uses packages specified in `peerDependencies` from `devDependencies` of `react-lib` to components from `react-libs` instead of the packages from `react-app`. 

Furthermore, packages from `react-app` correctly use their own dependencies.

This does not happen, if i use `file` and point to the `dist` directory instead of `link`. However, then I loose ability to work on the library without running `yarn install --force` each time i make a change in the library.

It does not matter if one uses:
```sh
cd react-lib
yarn link
cd ../react-app
yarn link react-lib
```
or adds entry in `package.json`:
```
    "react-lib": "link:../react-lib",
```

**What is the expected behavior?**
`devDependencies` should not be linked/exported, `peerDependencies` should be loaded from `react-app` `node_modules`.


**Steps to Reproduce**
Clone this repo: https://github.com/Wunsz/yarn-link-problem

Run:
```
cd yarn-link-problem/react-lib
yarn install
yarn start
```
after that, in the other terminal
```
cd yarn-link-problem/react-app
yarn install
yarn start
```

You will see a blue `Material UI` button. However, in `react-app`, a theme is specified that should make this button green. If one changes `link:../react-lib` to 'file:../react-lib/dist` and reruns above process, the button will be green.

Note that one has to specify the compiled `dist` directory! Otherwise same as above happens an the button is blue.

Furthermore, Material UI Core module in `react-lib` and `react-app` are different. 

## Note
This applies to every package specified in `peerDependencies` and `devDependencies`. For react, the workaround was to remove `react` and `react-dom` and add `@types/react` and `@types/react-dom`. If this is not done, react will throw errors about multiple versions of react.

**Environment**
- Node Version: `14.0.0`
- Yarn v1 Version: `1.22.4` 
- OS and version: Ubuntu 18.04
