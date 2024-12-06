import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import { API_URL } from "../services/Api";

const formattedDate = (date) => moment(date).format("MMMM Do YYYY, h:mm A");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = ({ selectedUser }) => {
  const [completeSlot, setCompleteSlot] = useState(null);
  const [notes, setNotes] = useState("");
  const [satisfaction, setSatisfaction] = useState(5);

  const { data = [] } = useQuery({
    queryKey: ["slots"],
    queryFn: () => API_URL.getAllSlots({ user_id: selectedUser?.id || null }),
    enabled: !!selectedUser,
  });

  const queryClient = useQueryClient();

  const updateSlotMutation = useMutation({
    queryKey: ["slots"],
    mutationFn: ({ id, payload }) => {
      return API_URL.updateSlot(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      setCompleteSlot(false);
      toast.success("Feedback Updated Successfully");
    },
    onError: (error) => {
      console.error("Error update slot:", error);
    },
  });

  const deleteSlotMutation = useMutation({
    queryKey: ["slots"],
    mutationFn: ({ id }) => {
      return API_URL.deleteSlot(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      setCompleteSlot(false);
    },
    onError: (error) => {
      console.error("Error update slot:", error);
    },
  });

  const completeSlotHandler = () => {
    updateSlotMutation.mutate({
      id: completeSlot?.id,
      payload: {
        call: true,
        notes,
        satisfaction,
      },
    });
  };

  const deleteSlotHandler = (id) => {
    deleteSlotMutation.mutate({ id });
  };

  return (
    <>
      <section className="mt-12 md:mt-0 ">
        <h2 className="text-base font-semibold text-gray-900">
          All Of Your Slots
        </h2>
        <ol className="mt-4 flex flex-col gap-y-2 text-sm/6 text-gray-500">
          {selectedUser &&
            data?.map((slot) => (
              <div
                key={slot.id}
                className="  border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border"
              >
                <div className="border-b border-gray-200 px-4 py-4    ">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        <time dateTime={formattedDate(slot?.start)}>
                          {formattedDate(slot?.start)}
                        </time>{" "}
                        - [ 2 hours ]
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-2">
                        <div
                          className={classNames(
                            slot.student
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800",
                            "inline-flex px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                          )}
                        >
                          {slot.student ? "Booked" : "Not Booked"}
                        </div>{" "}
                        <div
                          className={classNames(
                            slot.call
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800",
                            "inline-flex px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                          )}
                        >
                          {slot.call ? "Completed" : "Pending"}
                        </div>
                      </p>
                    </div>
                    <div>
                      {selectedUser?.role === "student" && !slot?.call && (
                        <button
                          onClick={() => {
                            if (slot?.call)
                              return toast.warning(
                                "You already submitted the feedback"
                              );
                            setCompleteSlot(slot);
                            setNotes("");
                          }}
                          type="button"
                          className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Mark as Complete
                        </button>
                      )}

                      {selectedUser?.id === slot?.coach_id &&
                        !slot?.student &&
                        !slot?.call && (
                          <button
                            onClick={() => deleteSlotHandler(slot.id)}
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            Delete
                          </button>
                        )}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="mt-6 lg:col-span-5 lg:mt-0">
                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Coach Details
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{slot.title}</span>
                          <span className="block">
                            {slot?.coach?.phone_number}
                          </span>
                          <span className="block">{slot?.coach?.email}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Student Details
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{slot.student?.name}</span>
                          <span className="block">
                            {slot?.student?.phone_number}
                          </span>
                          <span className="block">{slot?.student?.email}</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="sm:flex lg:col-span-7">
                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h3 className="text-base font-medium text-gray-900">
                        <p>Review</p>
                      </h3>
                      <p>
                        {slot?.call && (
                          <>
                            <div className="mt-1 flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  aria-hidden="true"
                                  className={classNames(
                                    slot?.satisfaction > rating
                                      ? "text-yellow-400"
                                      : "text-gray-300",
                                    "size-5 shrink-0"
                                  )}
                                />
                              ))}
                            </div>
                            <p className="mt-1 text-sm text-gray-600 italic">
                              {slot?.notes}
                            </p>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ol>
      </section>

      <Dialog
        open={completeSlot ? true : false}
        onClose={setCompleteSlot}
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
                    Mark Slot Completed
                  </DialogTitle>
                  <div className="mt-2">
                    {/* <input
                      value={satisfaction}
                      onChange={(e) => setSatisfaction(e.target.value)}
                      type="number"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    /> */}
                    <div className="mt-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          onClick={() => setSatisfaction(rating + 1)}
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            satisfaction > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "size-5 shrink-0"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      type="time"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={completeSlotHandler}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Complete
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Home;
