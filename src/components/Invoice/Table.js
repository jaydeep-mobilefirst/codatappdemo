import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import FormModal from "./FormModal";
import { headerData } from "../../data/data";
import { baseURL } from "../../data/const";
import Search from "./Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [connections, setConnections] = useState([]);
  const [selectedOption, setSelectedOption] = useState(true);
  const [selectedOptionDueAmount, setSelectedOptionDueAmount] = useState(false);
  const [query, setQuery] = useState("");
  const [state, setState] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    setState(!state);
  }, [selectedOptionDueAmount]);
  const paymentid =
    modalData?.paymentAllocations[modalData?.paymentAllocations.length - 1]
      ?.payment?.id;

  const companyId = localStorage.getItem("companyId");
  const companyName = localStorage.getItem("companyName");

  const fetchInvoice = () => {
    setLoader(true);
    axios
      .get(baseURL + `api/fetchInvoice/${companyId}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      .then((response) => {
        setUsers(Object.values(response.data)[0].results);
        if (!refreshPage) {
          setLoader(false);
        }
        // toast.success(`${companyName}'s invoice listing`, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      })
      .catch((err) => {
        console.log(err);
        if (!refresh) {
          setLoader(false);
        }
        setTimeout(() => {
          setLoader(false);
        }, 8000);
        toast.error(err?.message + ` Please try again later`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const fetchConnections = () => {
    axios
      .get(baseURL + `api/fetchConnections/${companyId}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      .then((response) => {
        setConnections(Object.values(response.data)[0].results);
        // toast.success(
        //   "connection id - " + Object.values(response.data)[0]?.results[0]?.id,
        //   {
        //     position: toast.POSITION.TOP_RIGHT,
        //   }
        // );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message + ` Please try again later`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    fetchInvoice();
    fetchConnections();
    setLoader(true);
    if (refreshPage) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }, [refresh]);

  const formModalData = (data) => {
    setShowModal(true);
    setModalData(data);
  };

  const onClickStatus = () => {
    setSelectedOption(!selectedOption);
    let sortData = [...users].sort((a, b) => {
      if (selectedOption ? a.status < b.status : a.status > b.status) {
        return -1;
      }
      if (!selectedOption ? a.status > b.status : a.status < b.status) {
        return 1;
      }
      return 0;
    });
    setUsers(sortData);
    setPage(0);
  };

  const onClickDueAmount = () => {
    setSelectedOptionDueAmount(!selectedOptionDueAmount);
    let sortData = [...users].sort((a, b) => {
      if (
        selectedOptionDueAmount
          ? parseInt(a.amountDue, 10) < parseInt(b.amountDue, 10)
          : parseInt(a.amountDue, 10) > parseInt(b.amountDue, 10)
      ) {
        return -1;
      }
      if (
        !selectedOptionDueAmount
          ? parseInt(a.amountDue, 10) > parseInt(b.amountDue, 10)
          : parseInt(a.amountDue, 10) < parseInt(b.amountDue, 10)
      ) {
        return 1;
      }
      return 0;
    });
    setUsers(sortData);
    setPage(0);
  };

  return (
    <div className="p-5 mt-10 lg:mt-2 lg:p-10">
      <ToastContainer />
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        {companyName} Invoices list
      </h4>
      <div className="float-right m-5 w-48 sm:w-64">
        <Search setQuery={setQuery} />
      </div>
      <FormModal
        showModal={showModal}
        setShowModal={setShowModal}
        setModalData={setModalData}
        modalData={modalData}
        paymentid={paymentid}
        connections={connections}
        setRefresh={setRefresh}
        refresh={refresh}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
      />
      {loader && (
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              {headerData.map((data, idx) => {
                return (
                  <th className="px-4 py-3" key={idx}>
                    {data?.title}
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
      )}

      {loader ? (
        <div className="mt-16 flex items-center justify-center w-screen lg:w-[75vw]">
          <Oval
            height={80}
            width={80}
            color="purple"
            wrapperStyle={{}}
            wrapperclassName=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="white"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  {headerData.map((data, idx) => {
                    return (
                      <th className="px-4 py-3" key={idx}>
                        {data?.title === "Status" ? (
                          <>
                            <button
                              onClick={onClickStatus}
                              className="uppercase flex items-center justify-center focus:border-none"
                            >
                              {data?.title}
                              {selectedOption ? (
                                <div className="h-0 w-0 ml-1 border-x-8 border-x-transparent border-b-[10px] border-b-black-500"></div>
                              ) : (
                                <div className="h-0 w-0 ml-1 border-x-8 border-x-transparent border-t-[10px] border-t-black-500"></div>
                              )}
                            </button>
                          </>
                        ) : (
                          <>
                            {data?.title === "due Amount" ? (
                              <>
                                <button
                                  onClick={onClickDueAmount}
                                  className="uppercase flex items-center justify-center focus:border-none"
                                >
                                  {data?.title}
                                  {!selectedOptionDueAmount ? (
                                    <div className="h-0 w-0 ml-1 border-x-8 border-x-transparent border-b-[10px] border-b-black-500"></div>
                                  ) : (
                                    <div className="h-0 w-0 ml-1 border-x-8 border-x-transparent border-t-[10px] border-t-black-500"></div>
                                  )}
                                </button>
                              </>
                            ) : (
                              <>{data?.title}</>
                            )}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {data.length > 0 ? (
                  <></>
                ) : (
                  <div className="font-bold flex items-center justify-center text-gray-700 dark:text-gray-400">
                    <div className="px-4 py-3">No Data Found</div>
                  </div>
                )}
                {data.map((data, idx) => {
                  return (
                    <tr key={idx} className="text-gray-700 dark:text-gray-400">
                      <td className="px-4 py-3">{page * 10 + idx + 1}</td>
                      <td className="px-4 py-3">
                        {data?.customerRef?.companyName}
                      </td>
                      <td className="px-4 py-3">{data?.invoiceNumber}</td>
                      <td className="px-4 py-3">{data?.issueDate}</td>
                      <td className="px-4 py-3">{data?.dueDate}</td>
                      <td className="px-4 py-3">
                        {data?.amountDue
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " " +
                          data?.currency}
                      </td>
                      <td className="px-4 py-3">
                        {data?.totalAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " " +
                          data?.currency}
                      </td>
                      <td className="px-4 py-3">{data?.currency}</td>
                      <td
                        className="px-4 py-3"
                        onClick={() => setSelectedOption(!selectedOption)}
                      >
                        {data?.status}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => formModalData(data)}
                          disabled={data?.amountDue > 0 ? false : true}
                          className={`${
                            data?.amountDue > 0
                              ? "opacity-100 hover:bg-purple-700"
                              : "opacity-50"
                          } px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600  focus:outline-none focus:shadow-outline-purple`}
                        >
                          Click Here
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              users={users}
              setData={setData}
              page={page}
              setPage={setPage}
              query={query}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
