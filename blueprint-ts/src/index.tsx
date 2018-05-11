import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './components/Hello';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { Classes, Intent, Spinner } from "@blueprintjs/core";

let x = 2 + 3;
console.log(x);

ReactDOM.render(<Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />, document.getElementById('root'));
/*
ReactDOM.render(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);*/
registerServiceWorker();
