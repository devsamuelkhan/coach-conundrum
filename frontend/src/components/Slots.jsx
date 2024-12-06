import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../services/Api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const coach_id = 2;
const student_id = 3;
const formattedDate = (date) => moment(date).format("MMMM Do YYYY, h:mm A");

export default function Slots({ selectedUser }) {
  const [newSlotModal, setNewSlotModal] = useState(false);
  const [slot, setSlot] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");

  const { data = [] } = useQuery({
    queryKey: ["slots"],
    queryFn: () =>
      API_URL.getAllSlots({
        ...(selectedUser.role === "coach" && { coach_id: selectedUser?.id }),
      }),
    enabled: !!selectedUser,
  });
  const queryClient = useQueryClient();

  const addSlotMutation = useMutation({
    queryKey: ["slots"],
    mutationFn: async (payload) => API_URL.addSlot(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);

      setNewSlotModal(false);
    },
    onError: (error) => {
      console.error("Error adding slot:", error);
    },
  });

  const updateSlotMutation = useMutation({
    queryKey: ["slots"],
    mutationFn: ({ id, payload }) => {
      return API_URL.updateSlot(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      setSlot(false);
    },
    onError: (error) => {
      console.error("Error update slot:", error);
    },
  });

  const addSlotHandler = () => {
    const start_time = moment(slotDate)
      .set({
        hour: moment(slotTime, "HH:mm").hour(),
        minute: moment(slotTime, "HH:mm").minute(),
      })
      .toISOString();
    const payload = { start_time, coach_id: selectedUser.id };
    addSlotMutation.mutate(payload);
  };

  const bookSlotHandler = () => {
    updateSlotMutation.mutate({
      id: slot?.id,
      payload: { student_id: slot?.student ? null : student_id },
    });
  };

  return (
    <>
     
      <div className="App">
        <div className="flex justify-between mb-5">
          {selectedUser?.role !== "coach" ? (
            <p></p>
          ) : (
            <button
              onClick={() => setNewSlotModal(true)}
              type="button"
              className="relative rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Slot
            </button>
          )}
          <p>
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs ring-2 font-medium ring-green-200 text-green-700 mr-2">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className="size-1.5 fill-green-500"
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
              booked
            </span>
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium ring-2 ring-blue-200 text-blue-700 mr-2">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className="size-1.5 fill-blue-500"
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
              open
            </span>
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-pink-100 px-1.5 py-0.5 text-xs font-medium ring-2 ring-red-200 text-pink-700 mr-2">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className="size-1.5 fill-pink-500"
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
              closed
            </span>
          </p>
        </div>

        <Calendar
          onSelectEvent={(e) => {
            if (e.call) return toast.error("Slot already closed");
            if (selectedUser.role === "coach")
              return toast.error("Slot cannot booked by coach");
            if (e?.student && e?.student?.id !== selectedUser?.id)
              return toast.error("Slot already booked by another student");
            setSlot(e);
          }}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={selectedUser ? data : []}
          style={{ height: "100vh" }}
          eventPropGetter={(event) => {
            const backgroundColor =
              event?.student?.id === selectedUser?.id
                ? "green"
                : event.student
                ? "red"
                : "blue";
            return {
              style: {
                backgroundColor: event?.call
                  ? "red"
                  : selectedUser
                  ? backgroundColor
                  : "blue",
              },
            };
          }}
        />
      </div>
     
      {/* NEW SLOT */}
      <Dialog
        open={newSlotModal}
        onClose={setNewSlotModal}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Add New Slot
                  </DialogTitle>
                  <div className="mt-2">
                    <input
                      value={slotDate}
                      onChange={(e) => setSlotDate(e.target.value)}
                      type="date"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      value={slotTime}
                      onChange={(e) => setSlotTime(e.target.value)}
                      type="time"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={addSlotHandler}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Slot
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* VIEW / BOOK SLOT */}
      <Dialog
        open={slot ? true : false}
        onClose={setSlot}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        {slot && (
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div>
                  <div className="mt-3  sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base text-center font-semibold text-gray-900"
                    >
                      View Slot
                    </DialogTitle>

                    <div className="mt-2">
                      Start Time: {formattedDate(slot?.start)}
                    </div>
                    <div className="mt-2">
                      End Time: {formattedDate(slot?.end)}
                    </div>

                    <div className="mt-2">name: {slot?.coach?.name}</div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={bookSlotHandler}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {slot?.student ? "UnBook Slot" : "Book Slot"}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
