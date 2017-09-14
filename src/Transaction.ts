export default interface Transaction {
  id: string;
  affiliation?: string;
  revenue?: number;
  tax?: number;
  shipping?: number;
  couponCode?: string;
};
