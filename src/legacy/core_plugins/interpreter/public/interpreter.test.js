/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

jest.mock('ui/new_platform', () => ({
  npSetup: {
    core: {
      http: {},
      injectedMetadata: {
        getKibanaVersion: () => '8.0.0',
        getBasePath: () => '/lol',
      }
    }
  }
}));
jest.mock('uiExports/interpreter');

jest.mock('@kbn/interpreter/common', () => ({
  register: jest.fn(),
  registryFactory: jest.fn(),
}));

const mockInterpreter = {
  interpreter: {
    interpretAst: jest.fn(),
  }
};
jest.mock('./lib/interpreter', () => ({
  initializeInterpreter: jest.fn().mockReturnValue(Promise.resolve(mockInterpreter)),
}));

jest.mock('./registries', () => ({
  registries: {
    browserFunctions: jest.fn(),
    renderers: jest.fn(),
    types: jest.fn(),
  },
}));

jest.mock('../../../ui/public/new_platform');
jest.mock('./functions', () => ({ functions: [{}, {}, {}] }));
jest.mock('./renderers/visualization', () => ({ visualization: {} }));

describe('interpreter/interpreter', () => {
  let getInterpreter;
  let interpretAst;
  let initializeInterpreter;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    getInterpreter = require('./interpreter').getInterpreter;
    interpretAst = require('./interpreter').interpretAst;
    initializeInterpreter = require('./lib/interpreter').initializeInterpreter;
  });

  describe('getInterpreter', () => {
    it('initializes interpreter', async () => {
      await getInterpreter();
      expect(initializeInterpreter).toHaveBeenCalledTimes(1);
    });

    it('only initializes interpreter once', async () => {
      await getInterpreter();
      await getInterpreter();
      expect(initializeInterpreter).toHaveBeenCalledTimes(1);
    });

    it('resolves', async () => {
      await expect(getInterpreter()).resolves;
    });

    it('resolves with interpreter object', async () => {
      const interpreter = await getInterpreter();
      await expect(Object.keys(interpreter)).toEqual(['interpreter']);
    });
  });

  describe('interpretAst', () => {
    it('resolves', async () => {
      const params = [{}];
      await expect(interpretAst(...params)).resolves;
    });

    it('initializes interpreter if needed', async () => {
      const params = [{}];
      await interpretAst(...params);
      expect(initializeInterpreter).toHaveBeenCalledTimes(1);
    });

    it('calls interpreter.interpretAst with the provided params', async () => {
      const params = [{}];
      await interpretAst(...params);
      expect(mockInterpreter.interpreter.interpretAst).toHaveBeenCalledTimes(1);
      expect(mockInterpreter.interpreter.interpretAst).toHaveBeenCalledWith(...params);
    });

    it('calls interpreter.interpretAst each time', async () => {
      const params = [{}];
      await interpretAst(...params);
      await interpretAst(...params);
      expect(mockInterpreter.interpreter.interpretAst).toHaveBeenCalledTimes(2);
    });
  });

});
