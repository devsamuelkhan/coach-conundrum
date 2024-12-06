import axios from "axios";
import moment from "moment";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_URL = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      console.error("Api Error  :", error);
      throw error; // Rethrow the error for the caller to handle
    }
  },
  getAllSlots: async ({ user_id,coach_id }) => {
    try {
      let query = "";
      if (user_id) {
        query = query + `?user_id=${user_id}`;
      }
      if (coach_id) {
        query = query + `?coach_id=${coach_id}`;
      }
      const response = await axiosInstance.get("/slots" + query);
      const data = (response.data || []).map((slot) => ({
        start: moment(slot.start_time).toDate(),
        end: moment(slot.start_time).add(2, "hours").toDate(),
        title: `${slot.coach.name}`,
        ...slot,
      }));
      return data;
    } catch (error) {
      console.error("Api Error :", error);
      throw error;
    }
  },

  addSlot: async (payload) => {
    try {
      const response = await axiosInstance.post("/slots", payload);
      return response.data;
    } catch (error) {
      console.error("Api Error :", error);
      throw error;
    }
  },

  updateSlot: async (id, payload) => {
    try {
      console.error("Error fetching ==>>:", id, payload);

      const response = await axiosInstance.patch(`/slots/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Api Error :", error);
      throw error;
    }
  },
  deleteSlot: async (id) => {
    try {
      const response = await axiosInstance.delete(`/slots/${id}`);
      return response.data;
    } catch (error) {
      console.error("Api Error :", error);
      throw error;
    }
  },
};
