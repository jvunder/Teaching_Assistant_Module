/**
 * Class Service
 *
 * Handles all class-related API calls including:
 * - Class listing and details
 * - Parent management and approval
 * - Class statistics and analytics
 */

import { api } from './api';
import type {
  GetClassesRequest,
  GetClassesResponse,
  GetClassDetailResponse,
  GetClassStatsResponse,
  GetParentsRequest,
  GetParentsResponse,
  ApproveParentRequest,
  ApproveParentResponse,
} from '../types';

// Use mock data in development if API is not available
const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Retrieves a paginated list of classes with optional filters
 *
 * @param params - Filter and pagination parameters
 * @returns Promise resolving to paginated class list
 * @throws Error if request fails
 *
 * @example
 * ```ts
 * const response = await classService.getClasses({
 *   page: 1,
 *   limit: 10,
 *   search: 'Math',
 *   grade: '10',
 *   status: 'active'
 * });
 * console.log('Classes:', response.data.classes);
 * ```
 */
async function getClasses(params: GetClassesRequest = {}): Promise<GetClassesResponse> {
  try {
    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      return mockDataService.getClasses(params);
    }

    const { data } = await api.get<GetClassesResponse>('/classes', {
      params,
    });

    return data;
  } catch (error: any) {
    console.error('Get classes error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch classes');
  }
}

/**
 * Retrieves detailed information about a specific class
 *
 * @param classId - The unique identifier of the class
 * @returns Promise resolving to class details
 * @throws Error if request fails or class not found
 *
 * @example
 * ```ts
 * const response = await classService.getClassDetail('class-123');
 * console.log('Class name:', response.data.name);
 * console.log('Students:', response.data.students);
 * ```
 */
async function getClassDetail(classId: string): Promise<GetClassDetailResponse> {
  try {
    if (!classId) {
      throw new Error('Class ID is required');
    }

    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      return mockDataService.getClassDetail(classId);
    }

    const { data } = await api.get<GetClassDetailResponse>(`/classes/${classId}`);

    return data;
  } catch (error: any) {
    console.error('Get class detail error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch class details');
  }
}

/**
 * Retrieves a paginated list of parents for a specific class
 *
 * @param params - Filter and pagination parameters including classId
 * @returns Promise resolving to paginated parent list
 * @throws Error if request fails
 *
 * @example
 * ```ts
 * const response = await classService.getParents({
 *   classId: 'class-123',
 *   page: 1,
 *   limit: 20,
 *   approvalStatus: 'pending'
 * });
 * console.log('Pending parents:', response.data.parents);
 * ```
 */
async function getParents(params: GetParentsRequest): Promise<GetParentsResponse> {
  try {
    const { classId, ...queryParams } = params;

    if (!classId) {
      throw new Error('Class ID is required');
    }

    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      return mockDataService.getParents(params);
    }

    const { data } = await api.get<GetParentsResponse>(`/classes/${classId}/parents`, {
      params: queryParams,
    });

    return data;
  } catch (error: any) {
    console.error('Get parents error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch parents');
  }
}

/**
 * Approves or rejects a parent's access request to a class
 *
 * @param parentId - The unique identifier of the parent
 * @param approve - True to approve, false to reject
 * @param reason - Optional reason for rejection
 * @returns Promise resolving to approval result
 * @throws Error if request fails
 *
 * @example
 * ```ts
 * // Approve parent
 * await classService.approveParent('parent-123', true);
 *
 * // Reject parent with reason
 * await classService.approveParent('parent-456', false, 'Invalid documentation');
 * ```
 */
async function approveParent(
  parentId: string,
  approve: boolean,
  reason?: string
): Promise<ApproveParentResponse> {
  try {
    if (!parentId) {
      throw new Error('Parent ID is required');
    }

    if (!approve && !reason) {
      throw new Error('Rejection reason is required when rejecting a parent');
    }

    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      return mockDataService.approveParent(parentId, approve, reason);
    }

    const requestData: ApproveParentRequest = {
      approve,
      reason,
    };

    const { data } = await api.post<ApproveParentResponse>(
      `/parents/${parentId}/approve`,
      requestData
    );

    return data;
  } catch (error: any) {
    console.error('Approve parent error:', error);
    throw new Error(error.response?.data?.message || 'Failed to process parent approval');
  }
}

/**
 * Retrieves statistical data for a specific class
 *
 * @param classId - The unique identifier of the class
 * @returns Promise resolving to class statistics
 * @throws Error if request fails
 *
 * @example
 * ```ts
 * const response = await classService.getClassStats('class-123');
 * console.log('Total students:', response.data.totalStudents);
 * console.log('Average attendance:', response.data.averageAttendance);
 * console.log('Pending approvals:', response.data.pendingApprovals);
 * ```
 */
async function getClassStats(classId: string): Promise<GetClassStatsResponse> {
  try {
    if (!classId) {
      throw new Error('Class ID is required');
    }

    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      return mockDataService.getClassStats(classId);
    }

    const { data } = await api.get<GetClassStatsResponse>(`/classes/${classId}/stats`);

    return data;
  } catch (error: any) {
    console.error('Get class stats error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch class statistics');
  }
}

/**
 * Retrieves all classes assigned to the current teacher
 *
 * @returns Promise resolving to list of teacher's classes
 * @throws Error if request fails
 *
 * @example
 * ```ts
 * const response = await classService.getMyClasses();
 * console.log('My classes:', response.data.classes);
 * ```
 */
async function getMyClasses(): Promise<GetClassesResponse> {
  try {
    return await getClasses({ status: 'active' });
  } catch (error: any) {
    console.error('Get my classes error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch your classes');
  }
}

/**
 * Searches for classes by name or subject
 *
 * @param searchTerm - The search term to filter classes
 * @param filters - Optional additional filters
 * @returns Promise resolving to filtered class list
 *
 * @example
 * ```ts
 * const response = await classService.searchClasses('Physics', {
 *   grade: '11',
 *   status: 'active'
 * });
 * ```
 */
async function searchClasses(
  searchTerm: string,
  filters: Omit<GetClassesRequest, 'search'> = {}
): Promise<GetClassesResponse> {
  try {
    return await getClasses({
      ...filters,
      search: searchTerm,
    });
  } catch (error: any) {
    console.error('Search classes error:', error);
    throw new Error(error.response?.data?.message || 'Failed to search classes');
  }
}

// Export service object with all methods
export const classService = {
  getClasses,
  getClassDetail,
  getParents,
  approveParent,
  getClassStats,
  getMyClasses,
  searchClasses,
};

export default classService;
