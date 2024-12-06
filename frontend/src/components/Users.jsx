import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../services/Api";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
export default function Users({ selectedUser, setSelectedUser }) {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: API_URL.getAllUsers,
  });

  return (
    <>
      <Dialog
        open={!selectedUser ? true : false}
        onClose={setSelectedUser}
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
              <div className="mt-3 text-center sm:mb-4">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Login to Continue
                </DialogTitle>
              </div>
              <fieldset
                aria-label="Pricing plans"
                className="relative -space-y-px rounded-md bg-gray-100"
              >
                {data.map((user) => (
                  <label
                    key={user.id}
                    aria-label={user.id}
                    className="group flex cursor-pointer flex-col border border-gray-200 bg-gray-100 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md focus:outline-none has-[:checked]:relative has-[:checked]:border-indigo-200 has-[:checked]:bg-indigo-50 md:grid   md:pl-4 md:pr-6"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <input
                        onChange={() => setSelectedUser(user)}
                        checked={selectedUser?.id === user.id}
                        value={user}
                        name="pricing-plan"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />

                      <span className="ml-3 flex flex-col">
                        <span className="block text-sm font-medium text-gray-900 group-has-[:checked]:text-indigo-900">
                          {user.name} - [{user.role}]
                        </span>
                        <span className="block text-sm text-gray-500 group-has-[:checked]:text-indigo-700">
                          {user.email}
                        </span>
                        <span className="block text-sm text-gray-500 group-has-[:checked]:text-indigo-700">
                          {user.phone_number}
                        </span>
                      </span>
                    </span>
                  </label>
                ))}
              </fieldset>
            </DialogPanel>
          </div>
        </div>
        <DialogBackdrop />
      </Dialog>
    </>
  );
}
