import { describe, it, expect } from 'vitest';
import { mockDataService } from '../mockData.service';

describe('mockDataService', () => {
  describe('login', () => {
    it('should successfully login with valid email and password', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const response = await mockDataService.login(email, password);

      expect(response.success).toBe(true);
      expect(response.data.accessToken).toContain('mock_access_token_');
      expect(response.data.refreshToken).toContain('mock_refresh_token_');
      expect(response.data.user.email).toBe(email);
      expect(response.data.user.fullName).toBe('Trợ Giảng Demo');
      expect(response.data.user.role).toBe('assistant');
    });

    it('should fail login with password less than 6 characters', async () => {
      const email = 'test@example.com';
      const password = '12345';

      await expect(mockDataService.login(email, password)).rejects.toThrow(
        'Email hoặc mật khẩu không đúng'
      );
    });

    it('should fail login with empty email', async () => {
      const email = '';
      const password = 'password123';

      await expect(mockDataService.login(email, password)).rejects.toThrow(
        'Email hoặc mật khẩu không đúng'
      );
    });

    it('should fail login with empty password', async () => {
      const email = 'test@example.com';
      const password = '';

      await expect(mockDataService.login(email, password)).rejects.toThrow(
        'Email hoặc mật khẩu không đúng'
      );
    });

    it('should generate unique tokens on each login', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const response1 = await mockDataService.login(email, password);
      const response2 = await mockDataService.login(email, password);

      expect(response1.data.accessToken).not.toBe(response2.data.accessToken);
      expect(response1.data.refreshToken).not.toBe(response2.data.refreshToken);
    });
  });

  describe('getDashboard', () => {
    it('should return dashboard data with correct adult education metrics', async () => {
      const dashboard = await mockDataService.getDashboard();

      expect(dashboard).toBeDefined();
      expect(dashboard.kpis).toBeDefined();
      expect(dashboard.kpis.totalClasses).toBe(8);
      expect(dashboard.kpis.totalStudents).toBe(68); // Adult learners, not 356
      expect(dashboard.kpis.totalParents).toBe(68);
      expect(dashboard.kpis.unreadMessages).toBe(15);
    });

    it('should return parent segments data', async () => {
      const dashboard = await mockDataService.getDashboard();

      expect(dashboard.parentSegments).toBeDefined();
      expect(dashboard.parentSegments.notStarted).toBe(12);
      expect(dashboard.parentSegments.slowProgress).toBe(18);
      expect(dashboard.parentSegments.topPerformers).toBe(38);

      // Total should equal total students
      const total =
        dashboard.parentSegments.notStarted +
        dashboard.parentSegments.slowProgress +
        dashboard.parentSegments.topPerformers;
      expect(total).toBe(68);
    });

    it('should return recent activities', async () => {
      const dashboard = await mockDataService.getDashboard();

      expect(dashboard.recentActivities).toBeDefined();
      expect(Array.isArray(dashboard.recentActivities)).toBe(true);
      expect(dashboard.recentActivities.length).toBeGreaterThan(0);

      const activity = dashboard.recentActivities[0];
      expect(activity).toHaveProperty('id');
      expect(activity).toHaveProperty('type');
      expect(activity).toHaveProperty('message');
      expect(activity).toHaveProperty('time');
    });

    it('should return class performance data', async () => {
      const dashboard = await mockDataService.getDashboard();

      expect(dashboard.classPerformance).toBeDefined();
      expect(Array.isArray(dashboard.classPerformance)).toBe(true);
      expect(dashboard.classPerformance.length).toBeGreaterThan(0);

      const classData = dashboard.classPerformance[0];
      expect(classData).toHaveProperty('className');
      expect(classData).toHaveProperty('participation');
      expect(classData).toHaveProperty('attendance');
    });
  });

  describe('getClasses', () => {
    it('should return list of adult education classes', async () => {
      const classes = await mockDataService.getClasses();

      expect(Array.isArray(classes)).toBe(true);
      expect(classes.length).toBeGreaterThan(0);

      const classItem = classes[0];
      expect(classItem).toHaveProperty('id');
      expect(classItem).toHaveProperty('name');
      expect(classItem).toHaveProperty('grade');
      expect(classItem).toHaveProperty('subject');
      expect(classItem).toHaveProperty('studentCount');
      expect(classItem).toHaveProperty('parentCount');
      expect(classItem).toHaveProperty('teacherName');
    });

    it('should return classes with adult education context', async () => {
      const classes = await mockDataService.getClasses();

      // Check that class names are about parenting/adult education
      const hasAdultEducationContent = classes.some(cls =>
        cls.name.includes('con') ||
        cls.name.includes('dạy') ||
        cls.name.includes('học viên') ||
        cls.subject.includes('Nuôi') ||
        cls.subject.includes('Tâm lý')
      );

      expect(hasAdultEducationContent).toBe(true);
    });
  });
});
