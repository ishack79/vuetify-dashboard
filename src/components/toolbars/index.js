// Import toolbar components
import BaseToolbar from './BaseToolbar.vue';
import TowingToolbar from './TowingToolbar.vue';
import GroundHandlerToolbar from './GroundHandlerToolbar.vue';

// Export components
export {
  BaseToolbar,
  TowingToolbar,
  GroundHandlerToolbar,
};

export const getToolbarComponent = (menu, tab) => {
  const toolbarMapping = {
    'Towing': {
      'Towing': TowingToolbar,
      'GroundHandler': GroundHandlerToolbar,
    }
  };

  return toolbarMapping[menu]?.[tab] || BaseToolbar;
};