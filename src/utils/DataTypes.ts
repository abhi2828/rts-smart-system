export type NewInventoryTypeObject = {
    item_no: string;
    item_type: string;
    item_group: string;
    description: string;
    warehouse: {
      warehouse_code: string;
      warehouse_name: string;
      in_stock: string;
    }[];
    serial_numbers: string;
    manufacturer: string;
    preferred_vendor: string;
    required_purchase_uom: string;
    inventory_level_max: string;
    cost_center: string;
    warranty_period: string;
    warranty_start_date: string;
    warranty_end_date: string;
    packaging_uom_name: string;
    purchase_uom_name: string;
    lead_time: string;
    hazardous_material: string;
    remarks: string;
    attachments: string;
    part_no: string;
  };

 export type ReceiveInventoryTypeObject = {
    item_no: string;
    description: string;
    quantity: string;
    unit_price: string;
    total: string;
    item_cost: string;
    gl_code: string;
    uom_code: string;
    whs_code: string;
    warehouse: string;
    distr_rule: string;
    number: string;
    remarks: string;
    user_name: string;
};

export type CmmsTypeObject = {
  item_no: string;
  item_group: string;
  foreign_name: string;
  location: string;
  cost_center: string;
  description: string;
  serial_numbers: string;
  manufacturer: string;
  capitalization_date: string;
  preferred_vendor: string;
  uom_name: string;
  asset_group: string;
  asset_class: string;
  remarks: string;
  attachments: string;
  warranty_period: string;
  warranty_start_date: string;
  warranty_end_date: string;
};
