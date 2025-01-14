/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { PluginInitializerContext, CoreSetup, CoreStart, Plugin } from 'src/core/public';
import { IUiActionsStart, IUiActionsSetup } from 'src/plugins/ui_actions/public';
import {
  CONTEXT_MENU_TRIGGER,
  PANEL_BADGE_TRIGGER,
  Setup as EmbeddableSetup,
  Start as EmbeddableStart,
} from '../../../../../../../src/plugins/embeddable/public';
import { CustomTimeRangeAction } from './custom_time_range_action';

import { CustomTimeRangeBadge } from './custom_time_range_badge';
import { CommonlyUsedRange } from './types';

interface SetupDependencies {
  embeddable: EmbeddableSetup; // Embeddable are needed because they register basic triggers/actions.
  uiActions: IUiActionsSetup;
}

interface StartDependencies {
  embeddable: EmbeddableStart;
  uiActions: IUiActionsStart;
}

export type Setup = void;
export type Start = void;

export class AdvancedUiActionsPublicPlugin
  implements Plugin<Setup, Start, SetupDependencies, StartDependencies> {
  constructor(initializerContext: PluginInitializerContext) {}

  public setup(core: CoreSetup, { uiActions }: SetupDependencies): Setup {}

  public start(core: CoreStart, { uiActions }: StartDependencies): Start {
    const dateFormat = core.uiSettings.get('dateFormat') as string;
    const commonlyUsedRanges = core.uiSettings.get('timepicker:quickRanges') as CommonlyUsedRange[];
    const timeRangeAction = new CustomTimeRangeAction({
      openModal: core.overlays.openModal,
      dateFormat,
      commonlyUsedRanges,
    });
    uiActions.registerAction(timeRangeAction);
    uiActions.attachAction(CONTEXT_MENU_TRIGGER, timeRangeAction.id);

    const timeRangeBadge = new CustomTimeRangeBadge({
      openModal: core.overlays.openModal,
      dateFormat,
      commonlyUsedRanges,
    });
    uiActions.registerAction(timeRangeBadge);
    uiActions.attachAction(PANEL_BADGE_TRIGGER, timeRangeBadge.id);
  }

  public stop() {}
}
