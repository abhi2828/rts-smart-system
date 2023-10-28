export const BASE_URI = process.env.PUBLIC_URL;
export const MANAGE_HUBSPOT_URL = (portalId: string) =>
  'https://app.hubspot.com/forms/' + portalId;
