/**
 * Survey Types - Teaching Assistant Module
 *
 * Handles survey and feedback functionality including:
 * - Survey creation and management
 * - Multiple question types (multiple choice, rating, text, etc.)
 * - Response collection and analytics
 * - Survey templates
 * - Net Promoter Score (NPS) and satisfaction tracking
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Type of survey question
 */
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice', // Single selection
  MULTIPLE_SELECT = 'multiple_select', // Multiple selections
  RATING = 'rating', // 1-5 stars or 1-10 scale
  TEXT = 'text', // Short text answer
  LONG_TEXT = 'long_text', // Long text answer (textarea)
  YES_NO = 'yes_no', // Boolean question
  NPS = 'nps', // Net Promoter Score (0-10)
  SCALE = 'scale', // Linear scale (e.g., 1-10)
  DROPDOWN = 'dropdown' // Dropdown selection
}

/**
 * Survey status
 */
export enum SurveyStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed',
  ARCHIVED = 'archived'
}

/**
 * Survey visibility/target
 */
export enum SurveyTarget {
  ALL_PARENTS = 'all_parents',
  SPECIFIC_CLASS = 'specific_class',
  SPECIFIC_PARENTS = 'specific_parents',
  SEGMENT = 'segment', // Parent segment
  COURSE_COMPLETERS = 'course_completers'
}

/**
 * Response status
 */
export enum ResponseStatus {
  STARTED = 'started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * Survey question
 */
export interface SurveyQuestion {
  id: string;
  surveyId: string;

  // Question details
  questionText: string;
  description?: string;
  type: QuestionType;

  // Options (for multiple choice, dropdown, etc.)
  options?: {
    id: string;
    text: string;
    value: string | number;
  }[];

  // Scale settings (for rating, scale, NPS)
  scaleMin?: number; // e.g., 1
  scaleMax?: number; // e.g., 10
  scaleMinLabel?: string; // e.g., "Very Unsatisfied"
  scaleMaxLabel?: string; // e.g., "Very Satisfied"

  // Validation
  isRequired: boolean;
  minLength?: number; // For text inputs
  maxLength?: number;
  minSelections?: number; // For multiple select
  maxSelections?: number;

  // Display
  order: number; // Question order in survey
  placeholder?: string; // For text inputs

  // Logic
  conditionalOn?: {
    questionId: string; // Show this question if...
    expectedAnswer: string | number | boolean;
  };

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Survey
 */
export interface Survey {
  id: string;
  title: string;
  description?: string;

  // Questions
  questions: SurveyQuestion[];
  totalQuestions: number;

  // Status
  status: SurveyStatus;
  target: SurveyTarget;

  // Target details
  targetClassIds?: string[];
  targetParentIds?: string[];
  targetSegment?: string;

  // Schedule
  startDate?: string; // ISO 8601
  endDate?: string;

  // Settings
  allowAnonymous: boolean;
  allowMultipleResponses: boolean;
  showProgressBar: boolean;
  randomizeQuestions: boolean;
  requireAllQuestions: boolean;

  // Completion
  thankYouMessage?: string;
  redirectUrl?: string; // Redirect after completion

  // Statistics
  totalResponses: number;
  completedResponses: number;
  averageCompletionTime: number; // seconds
  completionRate: number; // Percentage

  // Creator
  createdBy: string; // TA ID
  createdAt: string;
  updatedAt: string;

  // Template
  isTemplate: boolean;
  templateName?: string;

  // Tags
  tags: string[];
}

/**
 * Survey response from a parent
 */
export interface SurveyResponse {
  id: string;
  surveyId: string;

  // Respondent
  parentId?: string; // Null if anonymous
  parentName?: string;

  // Status
  status: ResponseStatus;

  // Answers
  answers: {
    questionId: string;
    questionText: string;
    questionType: QuestionType;
    answer: string | number | boolean | string[]; // Type depends on question type
    answeredAt: string;
  }[];

  // Timing
  startedAt: string;
  submittedAt?: string;
  timeSpent: number; // seconds

  // Metadata
  ipAddress?: string;
  userAgent?: string;
  device?: 'desktop' | 'tablet' | 'mobile';

  // Source
  source?: 'email' | 'app' | 'web' | 'sms';
}

/**
 * Survey analytics and insights
 */
export interface SurveyAnalytics {
  surveyId: string;
  surveyTitle: string;
  generatedAt: string;

  // Summary
  summary: {
    totalResponses: number;
    completedResponses: number;
    abandonedResponses: number;
    completionRate: number; // Percentage
    averageCompletionTime: number; // seconds
  };

  // Response trends
  responsesByDate: {
    date: string; // YYYY-MM-DD
    responses: number;
    completed: number;
  }[];

  // Question analytics
  questionAnalytics: {
    questionId: string;
    questionText: string;
    questionType: QuestionType;

    // Multiple choice / dropdown
    optionBreakdown?: {
      option: string;
      count: number;
      percentage: number;
    }[];

    // Rating / scale / NPS
    averageScore?: number;
    scoreDistribution?: {
      score: number;
      count: number;
      percentage: number;
    }[];

    // NPS specific
    npsScore?: number; // -100 to 100
    promoters?: number; // Percentage
    passives?: number; // Percentage
    detractors?: number; // Percentage

    // Yes/No
    yesCount?: number;
    noCount?: number;
    yesPercentage?: number;
    noPercentage?: number;

    // Text answers
    textAnswers?: string[];
    commonKeywords?: { keyword: string; count: number }[];

    // Response stats
    totalResponses: number;
    responseRate: number; // Percentage of survey takers who answered
  }[];

  // Respondent demographics
  demographics: {
    byClass: { className: string; count: number }[];
    byAge: { ageGroup: string; count: number }[];
    byLanguage: { language: string; count: number }[];
    byDevice: { device: string; count: number }[];
  };

  // Sentiment (for text responses)
  sentiment?: {
    positive: number; // Percentage
    neutral: number;
    negative: number;
  };
}

/**
 * Survey template for quick creation
 */
export interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  category: 'satisfaction' | 'feedback' | 'nps' | 'event' | 'course' | 'custom';

  // Template questions
  questions: Omit<SurveyQuestion, 'id' | 'surveyId' | 'createdAt' | 'updatedAt'>[];

  // Usage
  usageCount: number;
  isPublic: boolean; // Available to all TAs

  // Creator
  createdBy: string; // TA ID or 'system'
  createdAt: string;
  updatedAt: string;
}

/**
 * NPS (Net Promoter Score) calculation
 */
export interface NPSMetrics {
  surveyId: string;
  questionId: string; // The NPS question

  // Scores
  totalResponses: number;
  npsScore: number; // -100 to 100

  // Breakdown
  promoters: {
    count: number;
    percentage: number;
    scores: 9 | 10;
  };

  passives: {
    count: number;
    percentage: number;
    scores: 7 | 8;
  };

  detractors: {
    count: number;
    percentage: number;
    scores: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };

  // Trends
  trend: 'improving' | 'stable' | 'declining';
  previousNPS?: number;
  change?: number; // Change from previous period

  // By segment
  bySegment?: {
    segment: string;
    npsScore: number;
    count: number;
  }[];
}

/**
 * Satisfaction score metrics
 */
export interface SatisfactionMetrics {
  surveyId: string;
  generatedAt: string;

  // Overall satisfaction
  overallScore: number; // 0-100
  totalResponses: number;

  // By dimension
  dimensions: {
    dimension: string; // e.g., "Course Quality", "Teacher Support"
    score: number; // 0-100
    responses: number;
  }[];

  // Trend
  trend: 'improving' | 'stable' | 'declining';
  previousScore?: number;
  change?: number; // Percentage change

  // Benchmarks
  comparedToAverage: number; // How much above/below average
  rank?: number; // Rank among all surveys
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to create survey
 */
export interface CreateSurveyRequest {
  title: string;
  description?: string;
  target: SurveyTarget;
  targetClassIds?: string[];
  targetParentIds?: string[];
  targetSegment?: string;
  startDate?: string;
  endDate?: string;
  allowAnonymous?: boolean;
  allowMultipleResponses?: boolean;
  showProgressBar?: boolean;
  randomizeQuestions?: boolean;
  thankYouMessage?: string;
  tags?: string[];
}

/**
 * Response for create survey
 */
export interface CreateSurveyResponse {
  surveyId: string;
  success: boolean;
  message?: string;
}

/**
 * Request to add question to survey
 */
export interface AddQuestionRequest {
  surveyId: string;
  questionText: string;
  description?: string;
  type: QuestionType;
  options?: SurveyQuestion['options'];
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  isRequired?: boolean;
  order?: number;
  conditionalOn?: SurveyQuestion['conditionalOn'];
}

/**
 * Request to update question
 */
export interface UpdateQuestionRequest {
  questionText?: string;
  description?: string;
  options?: SurveyQuestion['options'];
  isRequired?: boolean;
  order?: number;
}

/**
 * Request to get surveys
 */
export interface GetSurveysRequest {
  page?: number;
  pageSize?: number;
  status?: SurveyStatus[];
  target?: SurveyTarget[];
  search?: string;
  tags?: string[];
  createdBy?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt' | 'responses' | 'completionRate' | 'title';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get surveys
 */
export interface GetSurveysResponse {
  surveys: Survey[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    totalActive: number;
    totalResponses: number;
    averageCompletionRate: number;
  };
}

/**
 * Request to submit survey response
 */
export interface SubmitSurveyResponseRequest {
  surveyId: string;
  parentId?: string; // Null for anonymous
  answers: {
    questionId: string;
    answer: string | number | boolean | string[];
  }[];
  timeSpent: number; // seconds
  device?: 'desktop' | 'tablet' | 'mobile';
  source?: 'email' | 'app' | 'web' | 'sms';
}

/**
 * Response for submit survey
 */
export interface SubmitSurveyResponseResponse {
  responseId: string;
  success: boolean;
  message?: string;
  thankYouMessage?: string;
  redirectUrl?: string;
}

/**
 * Request to get survey responses
 */
export interface GetSurveyResponsesRequest {
  surveyId: string;
  page?: number;
  pageSize?: number;
  status?: ResponseStatus[];
  parentId?: string;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Response for get survey responses
 */
export interface GetSurveyResponsesResponse {
  responses: SurveyResponse[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to get survey analytics
 */
export interface GetSurveyAnalyticsRequest {
  surveyId: string;
  dateFrom?: string;
  dateTo?: string;
  includeTextAnswers?: boolean;
  includeDemographics?: boolean;
}

/**
 * Response for survey analytics
 */
export interface GetSurveyAnalyticsResponse {
  analytics: SurveyAnalytics;
}

/**
 * Request to get NPS metrics
 */
export interface GetNPSMetricsRequest {
  surveyId: string;
  questionId: string;
  compareWithPrevious?: boolean;
  bySegment?: boolean;
}

/**
 * Response for NPS metrics
 */
export interface GetNPSMetricsResponse {
  nps: NPSMetrics;
}

/**
 * Request to create survey from template
 */
export interface CreateFromTemplateRequest {
  templateId: string;
  title: string;
  description?: string;
  target: SurveyTarget;
  targetClassIds?: string[];
  targetParentIds?: string[];
  customizeQuestions?: boolean; // If true, allows editing questions
}

/**
 * Request to get survey templates
 */
export interface GetSurveyTemplatesRequest {
  category?: SurveyTemplate['category'][];
  search?: string;
  isPublic?: boolean;
}

/**
 * Response for get survey templates
 */
export interface GetSurveyTemplatesResponse {
  templates: SurveyTemplate[];
}

/**
 * Request to update survey status
 */
export interface UpdateSurveyStatusRequest {
  surveyId: string;
  status: SurveyStatus;
}

/**
 * Request to export survey results
 */
export interface ExportSurveyResultsRequest {
  surveyId: string;
  format: 'excel' | 'csv' | 'pdf';
  includeAnalytics?: boolean;
  includeCharts?: boolean;
}

/**
 * Response for export survey results
 */
export interface ExportSurveyResultsResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  format: string;
  expiresAt: string;
}
