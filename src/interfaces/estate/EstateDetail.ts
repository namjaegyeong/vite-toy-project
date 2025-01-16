import { EstateSummary } from './EstateSummary.ts';
import { EstateBidDetail } from './EstateBidDetail.ts';

export interface EstateDetail {
  summary: EstateSummary;
  bid: EstateBidDetail;
  note: string;
}