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

import React from 'react';
import ReactDOM from 'react-dom';

import { I18nContext } from 'ui/i18n';
import { NewVisModal } from './new_vis_modal';
import { TypesStart } from '../../../../visualizations/public/np_ready/types';

interface ShowNewVisModalParams {
  editorParams?: string[];
}

export function showNewVisModal(
  visTypeRegistry: TypesStart,
  { editorParams = [] }: ShowNewVisModalParams = {}
) {
  const container = document.createElement('div');
  const onClose = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  document.body.appendChild(container);
  const element = (
    <I18nContext>
      <NewVisModal
        isOpen={true}
        onClose={onClose}
        visTypesRegistry={visTypeRegistry}
        editorParams={editorParams}
      />
    </I18nContext>
  );
  ReactDOM.render(element, container);
}
