# UAT TEST SCENARIOS
## Teaching Assistant WebApp - Detailed Test Cases

**Version:** 1.0
**Date:** 01/11/2025
**Total Scenarios:** 77

---

## 📋 HOW TO USE THIS DOCUMENT

### Test Scenario Format

Each test scenario includes:
- **ID:** Unique identifier (e.g., AUTH-001)
- **Priority:** Critical / High / Medium / Low
- **Category:** Feature area
- **Description:** What is being tested
- **Pre-conditions:** Setup required before test
- **Test Steps:** Numbered steps to follow
- **Expected Result:** What should happen
- **Actual Result:** [Leave blank - fill during testing]
- **Status:** [Leave blank - Pass/Fail]
- **Notes:** [Leave blank - any observations]

### How to Execute

1. Read the entire scenario first
2. Ensure pre-conditions are met
3. Follow test steps exactly as written
4. Compare actual result with expected result
5. Mark as **PASS** if results match, **FAIL** if different
6. Log any issues in issue tracker
7. Add notes about usability or suggestions

---

## 🔐 CATEGORY 1: AUTHENTICATION & SECURITY

### AUTH-001: Successful Login
**Priority:** Critical
**Description:** Verify user can login with valid credentials

**Pre-conditions:**
- Application is accessible at http://localhost:5173
- User is on login page

**Test Steps:**
1. Navigate to http://localhost:5173
2. Enter email: `ta1@test.com`
3. Enter password: `Test@123`
4. Check "Remember Me" checkbox
5. Click "Đăng nhập" button

**Expected Result:**
- Login succeeds
- Success message appears: "Đăng nhập thành công!"
- User is redirected to Dashboard page
- User's name appears in header

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

**Notes:** ______________

---

### AUTH-002: Login with Invalid Password
**Priority:** High
**Description:** Verify system rejects invalid password

**Pre-conditions:**
- User is on login page

**Test Steps:**
1. Enter email: `ta1@test.com`
2. Enter password: `wrong`
3. Click "Đăng nhập" button

**Expected Result:**
- Login fails
- Error message appears: "Mật khẩu tối thiểu 6 ký tự"
- User remains on login page

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### AUTH-003: Login with Invalid Email Format
**Priority:** High
**Description:** Verify email validation works

**Pre-conditions:**
- User is on login page

**Test Steps:**
1. Enter email: `notanemail`
2. Enter password: `Test@123`
3. Click "Đăng nhập" button

**Expected Result:**
- Form validation error appears: "Email không hợp lệ"
- Login button is disabled or form doesn't submit

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### AUTH-004: Logout Functionality
**Priority:** Critical
**Description:** Verify user can logout successfully

**Pre-conditions:**
- User is logged in and on Dashboard

**Test Steps:**
1. Click on user avatar/name in header
2. Click "Đăng xuất" option from dropdown
3. Confirm logout if prompted

**Expected Result:**
- User is logged out
- User is redirected to login page
- Session is cleared (refreshing page shows login page)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### AUTH-005: Protected Route Access
**Priority:** High
**Description:** Verify unauthenticated users cannot access protected pages

**Pre-conditions:**
- User is NOT logged in

**Test Steps:**
1. Try to navigate directly to: http://localhost:5173/dashboard
2. Try to navigate to: http://localhost:5173/classes
3. Try to navigate to: http://localhost:5173/messaging

**Expected Result:**
- All attempts redirect to login page
- User cannot access protected content

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 📊 CATEGORY 2: DASHBOARD & ANALYTICS

### DASH-001: Dashboard Loads Successfully
**Priority:** Critical
**Description:** Verify dashboard page loads with all components

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Navigate to Dashboard (or login redirects here)
2. Wait for page to fully load

**Expected Result:**
- Page loads within 3 seconds
- 4 KPI cards are visible (Total Classes, Students, Parents, Unread Messages)
- Performance chart (bar chart) is visible
- Engagement trend chart (line chart) is visible
- Recent activities table is visible
- All data is loaded (no "Loading..." stuck)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-002: KPI Cards Show Correct Data
**Priority:** High
**Description:** Verify KPI cards display correct metrics

**Pre-conditions:**
- User is on Dashboard

**Test Steps:**
1. Observe the 4 KPI cards
2. Note the values displayed

**Expected Result:**
- Total Classes: 12
- Total Students: 456
- Total Parents: 892
- Unread Messages: 23
- Each card has an icon
- Values are formatted correctly (no NaN, undefined)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-003: Performance Chart Displays Data
**Priority:** Medium
**Description:** Verify bar chart shows class performance

**Pre-conditions:**
- User is on Dashboard

**Test Steps:**
1. Locate the "Class Performance" chart
2. Hover over bars

**Expected Result:**
- Bar chart displays multiple classes (e.g., Class 10A1, 9B2, etc.)
- Each bar shows completion percentage
- Tooltip appears on hover showing exact values
- Chart is readable and properly sized

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-004: Engagement Trend Chart Displays Data
**Priority:** Medium
**Description:** Verify line chart shows engagement over time

**Pre-conditions:**
- User is on Dashboard

**Test Steps:**
1. Locate the "Engagement Trend" chart
2. Hover over data points

**Expected Result:**
- Line chart displays dates on X-axis
- Line shows engagement percentage on Y-axis
- Tooltip appears on hover showing exact values
- Chart shows trend over time

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-005: Recent Activities Table
**Priority:** Medium
**Description:** Verify activities table shows recent actions

**Pre-conditions:**
- User is on Dashboard

**Test Steps:**
1. Locate the "Recent Activities" table
2. Review the entries

**Expected Result:**
- Table shows at least 5 recent activities
- Each row shows: action, user, date/time
- Data is sorted by date (newest first)
- Table is readable

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-006: Dashboard Responsive Design
**Priority:** Medium
**Description:** Verify dashboard adjusts to different screen sizes

**Pre-conditions:**
- User is on Dashboard

**Test Steps:**
1. Resize browser window to 1024px width
2. Resize to 1366px width
3. Resize to full screen (1920px)

**Expected Result:**
- KPI cards stack appropriately on smaller screens
- Charts resize and remain readable
- No horizontal scrolling
- All content accessible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-007: Analytics Page - Multiple Chart Types
**Priority:** Medium
**Description:** Verify analytics page shows all chart types

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Navigate to Analytics page (click Analytics in sidebar)
2. Wait for page to load

**Expected Result:**
- Line chart for "Engagement Trend" is visible
- Bar chart for "Class Performance" is visible
- Pie chart for "Message Statistics" is visible
- All charts display data correctly
- Date range picker is visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### DASH-008: Analytics - Export Buttons
**Priority:** Low
**Description:** Verify export buttons are present

**Pre-conditions:**
- User is on Analytics page

**Test Steps:**
1. Locate export buttons
2. Click "Export Excel" button
3. Click "Export PDF" button

**Expected Result:**
- Export Excel button is visible
- Export PDF button is visible
- Clicking buttons shows some response (mock implementation may just show message)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 📚 CATEGORY 3: CLASS MANAGEMENT

### CLASS-001: Classes List Loads
**Priority:** Critical
**Description:** Verify classes page loads with class list

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Click "Classes" in sidebar
2. Wait for page to load

**Expected Result:**
- Page loads within 3 seconds
- Table shows list of classes
- Each class shows: name, students count, status, actions
- Status badges show color (Active = green, Inactive = gray)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-002: Search Classes
**Priority:** High
**Description:** Verify search functionality works

**Pre-conditions:**
- User is on Classes page

**Test Steps:**
1. Locate search box above the table
2. Type "10A1" in search box
3. Press Enter or wait for auto-search

**Expected Result:**
- Table filters to show only classes matching "10A1"
- Classes like "Class 10A1" are visible
- Other classes are hidden
- Clearing search restores full list

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-003: Sort Classes Table
**Priority:** Medium
**Description:** Verify table sorting works

**Pre-conditions:**
- User is on Classes page

**Test Steps:**
1. Click on "Tên Lớp" column header
2. Click again to reverse sort
3. Try sorting by "Học Sinh" column

**Expected Result:**
- First click sorts ascending (A-Z)
- Second click sorts descending (Z-A)
- Number columns sort numerically
- Sort indicator (arrow) appears on column header

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-004: Pagination Controls
**Priority:** Medium
**Description:** Verify pagination works if many classes

**Pre-conditions:**
- User is on Classes page
- More than 10 classes exist (mock data should have this)

**Test Steps:**
1. Scroll to bottom of table
2. Locate pagination controls
3. Click "Next" or page 2
4. Try changing page size (e.g., 10 → 20 items per page)

**Expected Result:**
- Pagination shows total pages
- Clicking page 2 shows next set of classes
- Page size selector changes number of rows shown
- Current page is highlighted

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-005: View Class Detail
**Priority:** Critical
**Description:** Verify clicking a class opens detail page

**Pre-conditions:**
- User is on Classes page

**Test Steps:**
1. Click "Chi Tiết" button on any class (e.g., first row)
2. Wait for detail page to load

**Expected Result:**
- User is navigated to Class Detail page
- URL changes to `/classes/:id` (e.g., `/classes/class-1`)
- Class detail page loads successfully

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-006: Class Detail - Parent List
**Priority:** High
**Description:** Verify class detail shows parent list

**Pre-conditions:**
- User is on Class Detail page

**Test Steps:**
1. Observe the page layout
2. Locate the parent list table

**Expected Result:**
- Stats cards show: Total Parents, Average Completion, Top Performers
- Parent list table is visible
- Each parent row shows: name, student name, progress, points
- Progress bars are visible and show percentages
- "Chi Tiết" button available for each parent

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-007: Class Detail - Search Parents
**Priority:** Medium
**Description:** Verify search works in parent list

**Pre-conditions:**
- User is on Class Detail page

**Test Steps:**
1. Locate search box above parent table
2. Type a parent name (e.g., "Nguyễn")
3. Observe filtering

**Expected Result:**
- Table filters to show only matching parents
- Search is case-insensitive
- Clearing search restores full list

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-008: View Parent Detail Modal
**Priority:** Medium
**Description:** Verify parent detail modal opens

**Pre-conditions:**
- User is on Class Detail page

**Test Steps:**
1. Click "Chi Tiết" button on any parent row
2. Wait for modal to open

**Expected Result:**
- Modal opens showing parent details
- Modal shows: parent name, student name, progress bar, points
- Modal has close button (X)
- Clicking outside modal or X closes it

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-009: Class Stats Cards
**Priority:** Low
**Description:** Verify stats cards show correct data

**Pre-conditions:**
- User is on Class Detail page

**Test Steps:**
1. Observe the stats cards at top of page
2. Note the values

**Expected Result:**
- Total Parents: Shows a number (e.g., 38)
- Average Completion: Shows percentage (e.g., 75%)
- Top Performers: Shows count (e.g., 10)
- Cards are properly styled

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CLASS-010: Back to Classes List
**Priority:** Medium
**Description:** Verify navigation back to classes list

**Pre-conditions:**
- User is on Class Detail page

**Test Steps:**
1. Click browser back button OR
2. Click "Classes" in sidebar

**Expected Result:**
- User returns to Classes list page
- Previous page state is maintained (search, page number)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 💬 CATEGORY 4: MESSAGING SYSTEM

### MSG-001: Messaging Page Loads
**Priority:** Critical
**Description:** Verify messaging page loads with all sections

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Click "Messaging" in sidebar
2. Wait for page to load

**Expected Result:**
- Page loads successfully
- 3 sections visible: Bước 1 (Filter), Bước 2 (Editor), Bước 3 (Schedule)
- Class selector is visible
- Condition selector is visible
- Message editor is visible
- "Gửi Tin Nhắn" button is visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-002: Select Target Classes
**Priority:** High
**Description:** Verify class multi-selection works

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Click "Chọn lớp" dropdown in Bước 1
2. Select "Class 10A1"
3. Select "Class 9B2"
4. Observe selected classes

**Expected Result:**
- Dropdown opens showing class options
- Can select multiple classes
- Selected classes show as tags
- Can remove selection by clicking X on tag

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-003: Filter by Condition
**Priority:** High
**Description:** Verify condition filter works

**Pre-conditions:**
- User is on Messaging page
- At least one class selected

**Test Steps:**
1. Click "Lọc theo điều kiện" dropdown
2. Select "Chưa hoàn thành"
3. Try other options: "Không hoạt động 7 ngày", "TOP 10%"

**Expected Result:**
- Dropdown shows filter options
- Can select one condition at a time
- Selected condition is highlighted
- (Mock: No actual filtering happens, just UI selection)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-004: Select Message Template
**Priority:** Medium
**Description:** Verify template selection works

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Click "Chọn template" dropdown in Bước 2
2. Select "Nhắc nhở học bài"
3. Select "Chúc mừng"

**Expected Result:**
- Dropdown shows template options
- Selecting a template may populate message editor (mock: may not)
- Can change templates

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-005: Rich Text Editor Functionality
**Priority:** High
**Description:** Verify message editor works

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Click in the message editor area (ReactQuill)
2. Type: "Chào các phụ huynh,"
3. Select the text and make it **bold**
4. Add a new line and type more text
5. Try other formatting: italic, underline, bullet list

**Expected Result:**
- Can type text in editor
- Toolbar shows formatting options (bold, italic, underline, lists, etc.)
- Formatting buttons work
- Text is formatted as expected
- Editor is large enough to see content

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-006: Schedule Message
**Priority:** Medium
**Description:** Verify date/time picker works

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Click "Chọn thời gian gửi" date picker in Bước 3
2. Select tomorrow's date
3. Select a specific time (e.g., 10:00 AM)
4. Click OK or confirm

**Expected Result:**
- Date picker opens calendar view
- Can select future date and time
- Selected date/time is displayed
- Can clear selection

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-007: Preview Message
**Priority:** Medium
**Description:** Verify preview modal works

**Pre-conditions:**
- User is on Messaging page
- Message content is entered

**Test Steps:**
1. Enter some text in message editor
2. Click "Preview" button
3. Review preview modal
4. Close modal

**Expected Result:**
- Preview modal opens
- Modal shows formatted message content
- Modal has title "Preview Tin Nhắn"
- Can close modal with X or Cancel

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-008: Send Message - Validation (No Class Selected)
**Priority:** High
**Description:** Verify validation prevents sending without class selection

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Do NOT select any class
2. Enter message content
3. Click "Gửi Tin Nhắn" button

**Expected Result:**
- Error message appears: "Vui lòng chọn ít nhất một lớp"
- Message is not sent
- Form remains on page

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-009: Send Message - Validation (No Content)
**Priority:** High
**Description:** Verify validation prevents sending without message

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Select one or more classes
2. Do NOT enter any message content
3. Click "Gửi Tin Nhắn" button

**Expected Result:**
- Error message appears: "Vui lòng nhập nội dung tin nhắn"
- Message is not sent

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-010: Send Message - Success
**Priority:** Critical
**Description:** Verify message sends successfully with valid data

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Select "Class 10A1" from class dropdown
2. Select condition "Chưa hoàn thành"
3. Enter message: "Nhắc nhở hoàn thành bài học"
4. Click "Gửi Tin Nhắn" button

**Expected Result:**
- Success message appears: "Tin nhắn đã được gửi thành công!"
- Form may reset OR remain with data
- No error messages

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-011: Send Scheduled Message
**Priority:** Medium
**Description:** Verify scheduled message works

**Pre-conditions:**
- User is on Messaging page

**Test Steps:**
1. Select a class
2. Enter message content
3. Select future date/time in schedule picker
4. Click "Gửi Tin Nhắn"

**Expected Result:**
- Success message appears
- Message indicates it's scheduled (may show "Scheduled for [date/time]")

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### MSG-012: Messaging Page - Form Reset
**Priority:** Low
**Description:** Verify form can be cleared/reset

**Pre-conditions:**
- User is on Messaging page with data entered

**Test Steps:**
1. Fill out the entire form (classes, content, schedule)
2. Look for a reset or clear button OR
3. Refresh the page

**Expected Result:**
- Form clears all data
- Returns to initial state

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 📝 CATEGORY 5: CONTENT MANAGEMENT

### CONT-001: Content Page Loads
**Priority:** Critical
**Description:** Verify content page loads with tabs

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Click "Content" in sidebar
2. Wait for page to load

**Expected Result:**
- Page loads successfully
- 3 tabs visible: "Danh Sách Nội Dung", "Upload Video", "Tạo Bài Viết"
- Default tab (Danh Sách) is active
- Tab content is visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-002: Switch Between Tabs
**Priority:** Medium
**Description:** Verify tab navigation works

**Pre-conditions:**
- User is on Content page

**Test Steps:**
1. Click "Upload Video" tab
2. Click "Tạo Bài Viết" tab
3. Click "Danh Sách Nội Dung" tab

**Expected Result:**
- Clicking each tab switches content
- Active tab is highlighted
- Content changes appropriately
- No errors when switching

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-003: Upload Video Form
**Priority:** High
**Description:** Verify video upload form displays

**Pre-conditions:**
- User is on Content page, "Upload Video" tab

**Test Steps:**
1. Observe the upload form
2. Locate all form fields

**Expected Result:**
- File upload button visible: "Chọn Video (Max 500MB, 15 phút)"
- Title input field visible
- Description textarea visible
- "Upload Video" submit button visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-004: Video Upload - Select File
**Priority:** Medium
**Description:** Verify file selection works

**Pre-conditions:**
- User is on Content page, "Upload Video" tab

**Test Steps:**
1. Click "Chọn Video" button
2. Select a video file from computer (any video file for testing)
3. Observe the result

**Expected Result:**
- File browser opens
- After selecting file, filename appears in form
- Can remove selected file
- (Mock: Actual upload won't happen, just file selection UI)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-005: Video Upload - Form Validation
**Priority:** High
**Description:** Verify video form validates required fields

**Pre-conditions:**
- User is on Content page, "Upload Video" tab

**Test Steps:**
1. Leave video file empty
2. Click "Upload Video" button
3. Observe validation

**Expected Result:**
- Validation error appears: "Vui lòng chọn video"
- Form does not submit

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-006: Video Upload - Submit Form
**Priority:** Medium
**Description:** Verify video upload form submission

**Pre-conditions:**
- User is on Content page, "Upload Video" tab

**Test Steps:**
1. Select a video file (can be any file for mock)
2. Enter title: "Test Video"
3. Enter description: "This is a test video"
4. Click "Upload Video" button

**Expected Result:**
- Success message appears: "Video uploaded successfully!"
- Form may reset to empty state
- (Mock: No actual upload happens)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-007: Create Article Form
**Priority:** High
**Description:** Verify article creation form works

**Pre-conditions:**
- User is on Content page, "Tạo Bài Viết" tab

**Test Steps:**
1. Observe the article form
2. Locate form fields

**Expected Result:**
- Title input field visible
- Rich text editor (ReactQuill) visible
- "Tạo Bài Viết" submit button visible
- Editor toolbar has formatting options

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### CONT-008: Create Article - Submit
**Priority:** High
**Description:** Verify article creation works

**Pre-conditions:**
- User is on Content page, "Tạo Bài Viết" tab

**Test Steps:**
1. Enter title: "Test Article"
2. In editor, type: "This is test article content"
3. Format some text (bold, italic)
4. Click "Tạo Bài Viết" button

**Expected Result:**
- Form validates required fields
- Success message appears: "Article created successfully!"
- Form may reset

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 📬 CATEGORY 6: SUPPORT INBOX

### INBOX-001: Inbox Page Loads
**Priority:** Critical
**Description:** Verify inbox page loads with ticket tabs

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Click "Inbox" in sidebar
2. Wait for page to load

**Expected Result:**
- Page loads successfully
- 3 tabs visible: "New (5)", "In Progress (3)", "Resolved (45)"
- Default tab "New" is active
- Ticket table is visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-002: Switch Ticket Status Tabs
**Priority:** Medium
**Description:** Verify tab navigation between ticket statuses

**Pre-conditions:**
- User is on Inbox page

**Test Steps:**
1. Click "In Progress (3)" tab
2. Click "Resolved (45)" tab
3. Click "New (5)" tab

**Expected Result:**
- Each tab shows different ticket list
- Badge count is visible (e.g., New (5))
- Active tab is highlighted

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-003: Ticket List Display
**Priority:** High
**Description:** Verify ticket table shows correct columns

**Pre-conditions:**
- User is on Inbox page, "New" tab

**Test Steps:**
1. Observe the ticket table
2. Review table columns

**Expected Result:**
- Table shows columns: #, Subject, From, Date, Actions
- Each row has a "View" button
- Tickets are listed (mock data)
- Table is readable

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-004: Open Ticket Detail
**Priority:** Critical
**Description:** Verify clicking View opens ticket detail modal

**Pre-conditions:**
- User is on Inbox page with tickets visible

**Test Steps:**
1. Click "View" button on any ticket row
2. Wait for modal to open

**Expected Result:**
- Modal opens showing ticket detail
- Modal title shows "Ticket #[number]"
- Ticket content is visible (Subject, From, Content)
- Reply section is visible below
- Modal has close button

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-005: Select Canned Response
**Priority:** Medium
**Description:** Verify canned response dropdown works

**Pre-conditions:**
- User has opened a ticket detail modal

**Test Steps:**
1. Locate "Chọn canned response" dropdown in reply section
2. Click dropdown
3. Select "Hướng dẫn đăng nhập"

**Expected Result:**
- Dropdown shows canned response options
- Selecting an option may populate the reply editor
- Can change selection

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-006: Reply to Ticket
**Priority:** High
**Description:** Verify replying to a ticket works

**Pre-conditions:**
- User has opened a ticket detail modal

**Test Steps:**
1. In reply editor (ReactQuill), type: "Cảm ơn bạn đã liên hệ. Đây là câu trả lời..."
2. Format text as needed
3. Observe the editor

**Expected Result:**
- Can type in reply editor
- Formatting toolbar works
- Text appears formatted

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-007: Send Reply and Close Ticket
**Priority:** High
**Description:** Verify "Gửi & Đóng Ticket" button works

**Pre-conditions:**
- User has opened a ticket and typed a reply

**Test Steps:**
1. Type a reply in editor
2. Click "Gửi & Đóng Ticket" button

**Expected Result:**
- Success message or confirmation
- Modal closes OR ticket status updates
- (Mock: Just UI feedback, no actual API call)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-008: Send Reply and Keep Open
**Priority:** Medium
**Description:** Verify "Gửi & Giữ Mở" button works

**Pre-conditions:**
- User has opened a ticket and typed a reply

**Test Steps:**
1. Type a reply
2. Click "Gửi & Giữ Mở" button

**Expected Result:**
- Success message appears
- Modal may stay open
- Ticket remains in "In Progress" status

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-009: Transfer Ticket to Admin
**Priority:** Medium
**Description:** Verify transfer functionality

**Pre-conditions:**
- User has opened a ticket detail modal

**Test Steps:**
1. Click "Transfer to Admin" button

**Expected Result:**
- Confirmation prompt may appear
- Success message: "Ticket transferred"
- (Mock: Just UI feedback)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### INBOX-010: Close Ticket Detail Modal
**Priority:** Low
**Description:** Verify modal closes properly

**Pre-conditions:**
- User has a ticket detail modal open

**Test Steps:**
1. Click the X (close button) in modal header
2. OR click outside the modal

**Expected Result:**
- Modal closes
- Returns to ticket list
- No errors

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 👤 CATEGORY 7: PROFILE MANAGEMENT

### PROF-001: Profile Page Loads
**Priority:** Critical
**Description:** Verify profile page loads with tabs

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Click "Profile" in sidebar
2. Wait for page to load

**Expected Result:**
- Page loads successfully
- 3 tabs visible: "Thông Tin", "Đổi Mật Khẩu", "Cài Đặt Thông Báo"
- Default tab "Thông Tin" is active
- Edit profile form is visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PROF-002: View Current Profile Info
**Priority:** Medium
**Description:** Verify profile displays current user data

**Pre-conditions:**
- User is on Profile page, "Thông Tin" tab

**Test Steps:**
1. Observe the form fields
2. Note pre-filled values

**Expected Result:**
- Full Name field shows: "Teaching Assistant"
- Email field shows email (e.g., "ta@educonnect.vn") - disabled/read-only
- Phone field shows phone number
- Avatar upload section is visible

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PROF-003: Update Profile Information
**Priority:** High
**Description:** Verify profile update works

**Pre-conditions:**
- User is on Profile page, "Thông Tin" tab

**Test Steps:**
1. Change "Họ Tên" to "Nguyễn Văn A"
2. Change "Số Điện Thoại" to "0912345678"
3. Click "Cập Nhật" button

**Expected Result:**
- Success message appears: "Profile updated successfully!"
- Form retains new values
- (Mock: No actual API call)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PROF-004: Change Password - Validation
**Priority:** High
**Description:** Verify password change validates inputs

**Pre-conditions:**
- User is on Profile page, "Đổi Mật Khẩu" tab

**Test Steps:**
1. Enter "Mật Khẩu Hiện Tại": "123"
2. Enter "Mật Khẩu Mới": "newpass"
3. Enter "Xác Nhận Mật Khẩu": "different"
4. Click "Đổi Mật Khẩu" button

**Expected Result:**
- Validation errors appear:
  - "Mật khẩu tối thiểu 6 ký tự" (if too short)
  - "Passwords don't match" (if new != confirm)
- Form does not submit

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PROF-005: Change Password - Success
**Priority:** High
**Description:** Verify password change works with valid data

**Pre-conditions:**
- User is on Profile page, "Đổi Mật Khẩu" tab

**Test Steps:**
1. Enter "Mật Khẩu Hiện Tại": "Test@123"
2. Enter "Mật Khẩu Mới": "NewPass@123"
3. Enter "Xác Nhận Mật Khẩu": "NewPass@123"
4. Click "Đổi Mật Khẩu" button

**Expected Result:**
- Success message: "Password changed successfully!"
- Form resets to empty
- (Mock: No actual password change)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PROF-006: Notification Settings
**Priority:** Low
**Description:** Verify notification toggles work

**Pre-conditions:**
- User is on Profile page, "Cài Đặt Thông Báo" tab

**Test Steps:**
1. Observe the notification settings
2. Toggle "Email Notifications" switch OFF
3. Toggle "Push Notifications" switch OFF
4. Toggle "SMS Notifications" switch ON

**Expected Result:**
- 3 toggle switches visible: Email, Push, SMS
- Switches respond to clicks (visual toggle)
- Email and Push may be ON by default
- SMS may be OFF by default
- (Mock: No actual settings saved)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 🔄 CATEGORY 8: CROSS-FEATURE WORKFLOWS

### WORK-001: Complete Login to Dashboard Flow
**Priority:** Critical
**Description:** Verify end-to-end login flow

**Pre-conditions:**
- User is logged out

**Test Steps:**
1. Navigate to login page
2. Login with valid credentials
3. Observe dashboard loads
4. Check all navigation items

**Expected Result:**
- Smooth login flow
- Dashboard loads automatically after login
- All sidebar menu items are accessible
- User can navigate to any page

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-002: Class to Parent Detail Workflow
**Priority:** High
**Description:** Verify navigating from class to parent detail

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Go to Classes page
2. Click "Chi Tiết" on a class
3. On Class Detail page, click "Chi Tiết" on a parent
4. Review parent detail modal
5. Close modal
6. Navigate back to Classes list

**Expected Result:**
- Smooth navigation between pages
- All data loads correctly
- No errors in console
- Can navigate back successfully

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-003: Message Creation Full Workflow
**Priority:** High
**Description:** Verify complete message creation and sending

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Navigate to Messaging page
2. Select 2 classes
3. Select filter condition
4. Choose a template
5. Edit message content
6. Set schedule for tomorrow
7. Preview message
8. Send message

**Expected Result:**
- All steps complete without errors
- Preview shows formatted content
- Success message on send
- Logical flow from start to finish

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-004: Content Creation and Publishing
**Priority:** Medium
**Description:** Verify creating both video and article content

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Navigate to Content page
2. Upload a video (fill form)
3. Switch to "Tạo Bài Viết" tab
4. Create an article (fill form)
5. Go to "Danh Sách Nội Dung" tab

**Expected Result:**
- Can complete both workflows
- Tab switching doesn't lose data (before submit)
- Both content types can be created
- No errors

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-005: Support Ticket Full Lifecycle
**Priority:** High
**Description:** Verify handling a ticket from new to resolved

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Go to Inbox page
2. Open a "New" ticket
3. Select canned response
4. Type a reply
5. Send & Close ticket
6. Check if ticket moves to "Resolved" tab

**Expected Result:**
- Ticket opens successfully
- Can compose reply
- Sending closes ticket
- (Mock: Ticket may not actually move tabs)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-006: Dashboard to Analytics Workflow
**Priority:** Medium
**Description:** Verify viewing charts across Dashboard and Analytics

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. View Dashboard charts
2. Navigate to Analytics page
3. Compare data consistency
4. Try export functions
5. Return to Dashboard

**Expected Result:**
- Both pages load charts correctly
- Data appears consistent
- Export buttons respond
- Smooth navigation

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-007: Profile Update and Re-login
**Priority:** Medium
**Description:** Verify profile changes persist (mock)

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Go to Profile page
2. Update profile name
3. Logout
4. Login again
5. Go to Profile page

**Expected Result:**
- Can update profile
- Logout succeeds
- Re-login succeeds
- (Mock: Changes may not persist)

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### WORK-008: Multi-Page Navigation Flow
**Priority:** Medium
**Description:** Verify seamless navigation across all pages

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Visit all pages in order: Dashboard → Classes → Messaging → Content → Analytics → Inbox → Profile
2. Use sidebar navigation
3. Use browser back/forward buttons
4. Return to Dashboard

**Expected Result:**
- All pages load successfully
- No errors when navigating
- Browser back/forward works
- Active menu item highlights correctly

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## ❌ CATEGORY 9: ERROR HANDLING

### ERR-001: Invalid Route Handling
**Priority:** Medium
**Description:** Verify handling of non-existent routes

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Navigate to http://localhost:5173/nonexistent
2. Try http://localhost:5173/random-page

**Expected Result:**
- Shows 404 page OR redirects to Dashboard
- No blank page or crash
- User can navigate back to valid pages

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### ERR-002: Network Error Simulation
**Priority:** Low
**Description:** Verify error handling when API fails (mock)

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open browser DevTools
2. Go to Network tab
3. Set network to "Offline"
4. Try to load Dashboard or send a message

**Expected Result:**
- Appropriate error message appears
- App doesn't crash
- Can recover when network returns

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### ERR-003: Session Expiration
**Priority:** High
**Description:** Verify handling of expired session

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open browser DevTools → Application → Local Storage
2. Delete "access_token" key
3. Try to navigate to a different page

**Expected Result:**
- User is redirected to login page
- No app crash
- Can login again successfully

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### ERR-004: Form Submission Errors
**Priority:** Medium
**Description:** Verify error messages for failed form submissions

**Pre-conditions:**
- User is on any page with a form

**Test Steps:**
1. Try to submit various forms with missing required fields
2. Observe error messages

**Expected Result:**
- Clear error messages appear
- Error messages are in Vietnamese
- Form highlights invalid fields
- User can correct and resubmit

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### ERR-005: Browser Console Errors
**Priority:** Medium
**Description:** Verify no critical errors in browser console

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open browser DevTools → Console
2. Navigate through all pages
3. Perform various actions
4. Monitor console for errors

**Expected Result:**
- No critical JavaScript errors (red)
- Warnings (yellow) are acceptable
- No "undefined" or "null" errors
- App functions normally

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

## 🎨 CATEGORY 10: USABILITY & PERFORMANCE

### PERF-001: Page Load Performance
**Priority:** High
**Description:** Verify pages load within acceptable time

**Pre-conditions:**
- User is logged in
- Good internet connection

**Test Steps:**
1. Clear browser cache
2. Navigate to Dashboard (measure time)
3. Navigate to Classes (measure time)
4. Navigate to Messaging (measure time)
5. Navigate to Analytics (measure time with charts)

**Expected Result:**
- Dashboard loads in < 2 seconds
- Other pages load in < 3 seconds
- Charts render smoothly without lag
- No "Loading..." stuck indefinitely

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PERF-002: Table Scrolling Performance
**Priority:** Medium
**Description:** Verify large tables scroll smoothly

**Pre-conditions:**
- User is on Classes page or Class Detail page

**Test Steps:**
1. Scroll through the table quickly
2. Sort the table and scroll again
3. Search and observe table updates

**Expected Result:**
- Smooth scrolling (no jank)
- Sorting is fast (< 1 second)
- Search updates table quickly
- No browser freezing

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### PERF-003: Chart Rendering Performance
**Priority:** Medium
**Description:** Verify charts render without lag

**Pre-conditions:**
- User is on Dashboard or Analytics page

**Test Steps:**
1. Load page with charts
2. Hover over chart elements
3. Interact with tooltips
4. Resize browser window

**Expected Result:**
- Charts render in < 2 seconds
- Tooltips appear instantly on hover
- No stuttering or lag
- Charts resize smoothly with window

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### USAB-001: Vietnamese Language Consistency
**Priority:** High
**Description:** Verify all text is in correct Vietnamese

**Pre-conditions:**
- User navigates through all pages

**Test Steps:**
1. Review all page titles, labels, buttons
2. Check form field labels
3. Review error messages
4. Check notifications

**Expected Result:**
- All text is in Vietnamese (no English unless intended)
- Correct Vietnamese grammar and spelling
- Consistent terminology across pages
- No untranslated placeholder text like "Lorem ipsum"

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

### USAB-002: Mobile/Tablet Responsiveness
**Priority:** Medium
**Description:** Verify responsive design on smaller screens

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Resize browser to tablet size (768px width)
2. Navigate through all pages
3. Try using all features

**Expected Result:**
- Layout adjusts to tablet size
- All content is accessible (no cut-off)
- Sidebar may collapse to hamburger menu
- Tables may scroll horizontally if needed
- Forms remain usable

**Actual Result:** ______________

**Status:** [ ] PASS [ ] FAIL

---

---

## 📊 TEST EXECUTION SUMMARY TEMPLATE

### Summary Statistics
- **Total Scenarios:** 77
- **Executed:** _____ / 77
- **Passed:** _____
- **Failed:** _____
- **Blocked:** _____
- **Not Tested:** _____

### Pass Rate
- **Critical:** _____ / _____ (___%)
- **High:** _____ / _____ (___%)
- **Medium:** _____ / _____ (___%)
- **Low:** _____ / _____ (___%)

### Defects by Severity
- **Critical:** _____
- **High:** _____
- **Medium:** _____
- **Low:** _____

---

**END OF TEST SCENARIOS**

**Next Steps:**
1. Execute all scenarios
2. Log defects in issue tracker
3. Collect usability feedback
4. Generate UAT summary report
5. Obtain sign-off for production deployment
