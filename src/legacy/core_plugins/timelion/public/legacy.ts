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

import { PluginInitializerContext } from 'kibana/public';
import { npSetup, npStart } from 'ui/new_platform';
import { plugin } from '.';
import { setup as visualizations } from '../../visualizations/public/legacy';
import { TimelionPluginSetupDependencies, TimelionPluginStartDependencies } from './plugin';
// @ts-ignore
import panelRegistry from './lib/panel_registry';
import { LegacyDependenciesPlugin } from './shim';

// Temporary solution
// It will be removed when all dependent services are migrated to the new platform.
const __LEGACY = new LegacyDependenciesPlugin();

const setupPlugins: Readonly<TimelionPluginSetupDependencies> = {
  visualizations,
  expressions: npSetup.plugins.expressions,
  __LEGACY,
};

const startPlugins: Readonly<TimelionPluginStartDependencies> = {
  panelRegistry,
  __LEGACY,
};

const pluginInstance = plugin({} as PluginInitializerContext);

export const setup = pluginInstance.setup(npSetup.core, setupPlugins);
export const start = pluginInstance.start(npStart.core, startPlugins);
