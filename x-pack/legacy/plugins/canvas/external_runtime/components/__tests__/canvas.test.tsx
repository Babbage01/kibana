/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { mount } from 'enzyme';
import React from 'react';
import { Canvas } from '../canvas.container';

describe('<Canvas />', () => {
  test('null workpad renders nothing', () => {
    expect(mount(<Canvas />).isEmptyRender());
  });
});
