// Import toolbar components
import BaseToolbar from './BaseToolbar.vue';
import TowingToolbar from './TowingToolbar.vue';

// Export components
export {
  BaseToolbar,
  TowingToolbar,
};

export const getToolbarComponent = (menu, tab) => {
  const toolbarMapping = {
    'Towing': {
      'Towing': TowingToolbar
    }
  };

  return toolbarMapping[menu]?.[tab] || BaseToolbar;
};