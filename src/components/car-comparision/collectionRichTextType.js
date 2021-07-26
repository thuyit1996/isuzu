export const COLLECT_RICH_TEXT_TYPE = [
  { parent: 'Exterior', child: 'FrontWiper' },
  { parent: 'Interior', child: 'Sunshade' },
  { parent: 'Interior', child: 'MeterCluster' },
  { parent: 'Interior', child: 'FrontConsoleDecoration' },
  { parent: 'Interior', child: 'DoorPanelDecoration' },
  { parent: 'Interior', child: 'CenterConsole' },
  { parent: 'Interior', child: 'AirConditioningSystem' },
  { parent: 'Engine', child: 'Type' },
  { parent: 'SteeringSystem', child: 'Type' },
  { parent: 'Safety', child: 'FrontSeatBelt' },
  { parent: 'SuspensionSystem', child: 'Front' },
  { parent: 'SuspensionSystem', child: 'Rear' },
]
export function isItemRichText(parent, child) {
  return COLLECT_RICH_TEXT_TYPE.find(item => item.parent === parent && item.child === child);
}