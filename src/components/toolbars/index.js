export { default as BaseToolbar } from './BaseToolbar.vue';
export { default as TowingToolbar } from './TowingToolbar.vue';

export const getToolbarComponent = (menu, tab) => {
  const toolbarMapping = {
    'Towing': {
      'Towing': 'TowingToolbar'
    }
  };

  return toolbarMapping[menu]?.[tab] || 'BaseToolbar';
};