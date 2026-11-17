import type { EmploymentType } from './schemas';

// Copy of the recruitment pages (Vietnamese only in this phase: no other language has these pages).

export const careersMessages = {
  breadcrumb: 'Tuyển dụng',
  footerLink: 'Tuyển dụng',

  metaTitle: 'Tuyển dụng – Gia nhập Green Ruby Cruises',
  metaDescription:
    'Cơ hội nghề nghiệp tại Green Ruby Cruises, du thuyền cao cấp trên vịnh Hạ Long và vịnh Lan Hạ. Xem các vị trí đang tuyển dụng và gửi hồ sơ ứng tuyển.',

  heroEyebrow: 'Green Ruby Cruises · Careers',
  heroTitle: 'Gia nhập Green Ruby',
  heroTagline: 'Cùng tạo nên những trải nghiệm khác biệt',
  heroLead:
    'Chúng tôi tìm kiếm những người đồng hành tận tâm, chuyên nghiệp và trân trọng giá trị của sự tinh tế trong từng trải nghiệm.',
  heroCta: 'Khám phá vị trí tuyển dụng',

  listTitle: 'Vị trí đang tuyển dụng',
  listIntro: 'Khám phá cơ hội phát triển cùng Green Ruby Cruises.',
  empty:
    'Hiện tại Green Ruby Cruises chưa có vị trí tuyển dụng mới. Cảm ơn bạn đã quan tâm và hãy quay lại trong thời gian tới.',
  viewDetail: 'Xem chi tiết',
  contactLabel: 'Liên hệ tuyển dụng',
  contactBody: 'Mọi câu hỏi về tuyển dụng, vui lòng gửi email cho đội ngũ tuyển dụng:',

  meta: {
    department: 'Bộ phận',
    location: 'Địa điểm',
    employmentType: 'Hình thức',
    deadline: 'Hạn nộp hồ sơ',
  },
  employmentType: {
    'full-time': 'Toàn thời gian',
    'part-time': 'Bán thời gian',
    contract: 'Hợp đồng có thời hạn',
    temporary: 'Thời vụ',
    intern: 'Thực tập',
  } satisfies Record<EmploymentType, string>,

  apply: 'Ứng tuyển vị trí này',
  sections: {
    intro: 'Giới thiệu công việc',
    description: 'Mô tả công việc',
    requirements: 'Yêu cầu công việc',
    benefits: 'Quyền lợi',
  },
  closingTitle: 'Trở thành một phần của Green Ruby',
  closingBody: 'Nếu vị trí này phù hợp với định hướng nghề nghiệp của bạn, hãy gửi hồ sơ ứng tuyển đến đội ngũ tuyển dụng.',
  closingCta: 'Gửi hồ sơ ứng tuyển',
  emailLabel: 'Email tuyển dụng',
  back: 'Xem các vị trí khác',

  closedNotice: 'Vị trí này đã ngừng nhận hồ sơ.',
  closedBody: 'Cảm ơn bạn đã quan tâm. Bạn có thể xem các vị trí khác đang tuyển dụng tại Green Ruby Cruises.',
  closedBadge: 'Đã đóng',

  /** SEO title when the editor left "Tiêu đề SEO" empty. */
  jobMetaTitle: (title: string) => `Tuyển dụng ${title}`,
  jobMetaDescription: (title: string, department: string) =>
    `Green Ruby Cruises tuyển dụng ${title} (bộ phận ${department}). Xem mô tả công việc, yêu cầu và cách ứng tuyển.`,
};

/** "15/12/2026" from "2026-12-15" (no time zone shift: the date is a calendar day). */
export function formatDay(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
