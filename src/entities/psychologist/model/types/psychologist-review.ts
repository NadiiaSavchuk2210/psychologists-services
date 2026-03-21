export interface Review {
  reviewer: string;
  reviewer_ua: string;
  rating: number;
  comment: string;
  comment_ua: string;
}

export interface ReviewUI extends Review {
  displayReviewer: string;
  displayComment: string;
}
