export interface Member {
  memberId: number;
  email: string;
  social: "KAKAO" | "GOOGLE";
  createdAt: string;
}

export interface MembersResponse {
  payload: Member[];
}

export interface ArticleVersion {
  articleVersionId: number;
  articleId: number;
  title: string;
  category: string;
  nickname: string;
  content: string;
  size: number;
  ip: string;
  isHiding: boolean;
  isNoEditing: boolean;
  createdAt: string;
}

export interface ArticleVersionsResponse {
  payload: ArticleVersion[];
}

export interface ArticleVersionReport {
  articleVersionReportId: number;
  articleVersionId: number;
  title: string;
  category: string;
  nickname: string;
  content: string;
  ip: string;
  reportReason: string;
  createdAt: string;
}

export interface ArticleVersionReportsResponse {
  payload: ArticleVersionReport[];
}

export interface BlockedIp {
  blockedIpId: number;
  ip: string;
  createdAt: string;
}

export interface BlockedIpsResponse {
  payload: BlockedIp[];
}
