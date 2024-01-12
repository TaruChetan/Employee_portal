import { createSlice } from "@reduxjs/toolkit";
import { localLanguage } from "../../utils/constants";

const slice = createSlice({
  name: localLanguage.SLICE,
  initialState: {
    managerLoggedin: false,
    employeeLoggedin: false,
    user: [],
    department: [],
  },
  reducers: {
    userSignUp(state, action) {
      if (action.payload.user == localLanguage.EMPLOYEE) {
        action.payload.dept = "";
      }
      state.user.push(action.payload);
    },
    addDepartment(state, action) {
      state.department.push(action.payload);
    },
    deleteDepartment(state, action) {
      state.department = state.department.filter((item) => {
        return item.deptName != action.payload;
      });
    },
    updateDepartment(state, action) {
      const index = state.department.findIndex(
        (item) => item.deptName == action.payload.deptName
      );
      state.department[index] = action.payload;
    },
    assignDepartment(state, action) {
      const { name, email, dept } = action.payload;
      const updatedUsers = state.user.map((item) =>
        item.email === email ? { ...item, dept: dept } : item
      );
      const updatedDepartments = state.department.map((item) =>
        item.deptName === dept
          ? { ...item, numEmployees: item.numEmployees + 1 }
          : item
      );
      state.user = updatedUsers;
      state.department = updatedDepartments;
    },
    userLogin(state, action) {
      const updatedUsers = state.user.map((item) =>
        item.email === action.payload ? { ...item, isLogin: true } : item
      );

      return { ...state, user: updatedUsers };
    },
    userLogout(state, action) {
      const updatedUsers = state.user.map((item) =>
        item.email === action.payload ? { ...item, isLogin: false } : item
      );

      return { ...state, user: updatedUsers };
    },
  },
});

export default slice.reducer;

export const {
  userSignUp,
  addDepartment,
  deleteDepartment,
  updateDepartment,
  assignDepartment,
  userLogin,
  userLogout,
} = slice.actions;
