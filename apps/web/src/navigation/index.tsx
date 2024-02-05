import {
  AddCompanyScreen,
  AddUserScreen,
  AuthLayout,
  CompaniesScreen,
  DashboardLayout,
  EditCompanyScreen,
  EditUserScreen,
  FileUpload,
  LoginScreen,
  PageNotFoundScreen,
  ProjectsScreen,
  RegisterScreen,
  SettingsScreen,
  UsersScreen,
  ViewCompanyScreen,
} from '@/web/containers';
import {Providers} from '@/web/providers';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="/">
      <Route element={<AuthLayout />}>
        <Route>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Route>
        <Route index element={<Navigate to="/login" replace />} />
      </Route>
    </Route>

    <Route path="auth">
      <Route>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<ProjectsScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="companies" element={<CompaniesScreen />} />
          <Route
            path="view-company/:companyName"
            element={<ViewCompanyScreen />}
          />
          <Route
            path="edit-company/:companyName"
            element={<EditCompanyScreen />}
          />
          <Route path="users" element={<UsersScreen />} />
          <Route path="add-user" element={<AddUserScreen />} />
          <Route path="edit-user" element={<EditUserScreen />} />
          <Route path="add-company" element={<AddCompanyScreen />} />
          <Route index element={<Navigate to="/auth/dashboard" replace />} />

          <Route path="files-upload" element={<FileUpload />} />
          <Route path="*" element={<PageNotFoundScreen />} />
        </Route>
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
