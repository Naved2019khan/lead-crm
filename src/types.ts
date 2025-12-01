
export type SiteStatus = 'active' | 'inactive';

export interface SiteDetails {
  siteId: number;
  siteName: string;
  siteDomain: string;
  siteStatus: SiteStatus;
}