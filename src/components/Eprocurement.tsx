import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  FormLabel,
  Paper,
  Snackbar,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import axios from 'axios';
import { noop } from 'lodash';
import { nanoid } from 'nanoid';
import Link from 'next/link';
// import moment from 'moment';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import { formatDate } from '@/utils/getDateDiffInDays';

import Footer from './Footer';
import FullScreenDialog from './FullScreenDialog';
import SesamiToSapModalInfo from './SesamiToSapModalInfo';
import VendorDetailsModal from './VendorDetailsModal';

function addNumbers(num1: number, num2: number) {
  // Convert the input numbers to floats with two decimal places
  num1 = parseFloat(num1.toFixed(2));
  num2 = parseFloat(num2.toFixed(2));

  // Add the numbers
  let result = num1 + num2;

  // Ensure the result is a float with two decimal places
  result = parseFloat(result.toFixed(2));

  return result;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  const [showSnack, setShowSnack] = useState(false);

  //sapb2 to sesami
  const [sapb1ToSesami, setSapb1toSasami] = useState<any>([]);
  const [rowChecked, setRowChecked] = useState<{
    [key: string]: boolean;
  }>(JSON.parse(localStorage.getItem('rowCheckedSapToSesami') || `{}`));
  const [loading, setLoading] = useState(true);
  // const [, setIsPushed] = useState<{ [key: string]: number }>({});
  const [snackMessage, setSnackMessage] = useState('Please select data');

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState(false);
  const [showSyncingBudgets, setShowSyncingBudgets] = useState(false);

  const [sapb1ToSesamiSearched, setSapb1toSasamiSearched] = useState<any>([]);
  const [sapb1SearchParams, setSapb1SearchParams] = useState<string | null>(
    null
  );
  const [costCenters, setCostCenters] = useState<{
    [key: string]: {
      cost_center: string;
      currency: string;
      amount: string;
      dimension: string;
      cost_center_code: string;
    }[];
  }>({});

  // sesami to sapb1
  const [rowCheckedReq, setRowCheckedReq] = useState<{
    [key: string]: boolean;
  }>(JSON.parse(localStorage.getItem('rowCheckedReq') || `{}`));
  const [isPushedReq, setIsPushedReq] = useState<{
    [key: string]: {
      pushed: boolean;
      time: number;
    };
  }>(JSON.parse(localStorage.getItem('isPushedReq') || `{}`));

  const [sesamiToSapLoading, setSesamiToSapLoading] = useState(true);
  const [sesamiToSapData, setSesamiToSapData] = useState<any>([]);
  const [sesamiToSapDataSearched, setSesamiToSapDataSearched] = useState<any>(
    []
  );
  const [showSyncingReq, setShowSyncingReq] = useState(false);

  const [reqSearchParams, setReqSearchParams] = useState('');
  const [sesamiModalNo, setSesamiModalNo] = useState<string | null>(null);
  const [updateRequisitionData, setUpdateRequisitionData] = useState(false);

  const [reqPoNo, setReqPoNo] = useState<{
    [key: string]: {
      PONumber: string;
      [key: string]: string;
    };
  }>({});

  // vendors
  const [rowCheckedVendor, setRowCheckedVendor] = useState<{
    [key: string]: boolean;
  }>(JSON.parse(localStorage.getItem('rowCheckedVendor') || `{}`));
  const [isPushedVendor, setIsPushedVendor] = useState<{
    [key: string]: { time: number; pushed: boolean };
  }>(JSON.parse(localStorage.getItem('isPushedVendor') || `{}`));

  const [vendorLoading, setVendorsLoading] = useState(true);
  const [vendorData, setVendorData] = useState<any>([]);
  const [vendorDataSearched, setVendorDataSearched] = useState<any>([]);
  const [vendorSearchParam, setVendorSearchParam] = useState('');
  const [updateVendorData, setUpdateVEndorData] = useState(false);
  const [vendorDetailsModalNo, setVendorDetailsModalNo] = useState<
    string | null
  >(null);

  const [showSyncingVendor, setShowSyncingVendor] = useState(false);

  const [syncedDataSapToSesami, setSyncedDataSapToSesami] = useState<any>(
    JSON.parse(localStorage.getItem('syncedDataSapToSesami') || `{}`)
  );

  const x = isPushedVendor;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  x;

  useEffect(() => {
    if (sapb1ToSesami.length === 0) {
      return;
    }

    if (!sapb1SearchParams) {
      setSapb1toSasamiSearched([...sapb1ToSesami]);

      return;
    }

    const searched: Array<any> = [];

    sapb1ToSesami.forEach((gl: any) => {
      if (
        gl.gl_code.toLowerCase().includes(sapb1SearchParams.toLowerCase()) ||
        gl.dimension.toLowerCase().includes(sapb1SearchParams.toLowerCase()) ||
        gl.description.toLowerCase().includes(sapb1SearchParams.toLowerCase())
      ) {
        searched.push(gl);

        return;
      }

      costCenters[gl.gl_code]?.forEach(costCenter => {
        if (
          costCenter.cost_center
            .toLowerCase()
            .includes(sapb1SearchParams.toLowerCase())
        ) {
          searched.push(gl);

          return;
        }
      });
    });

    setSapb1toSasamiSearched([...searched]);
  }, [sapb1ToSesami, sapb1SearchParams]);

  useEffect(() => {
    if (sesamiToSapData.length === 0) {
      return;
    }

    if (!reqSearchParams) {
      setSesamiToSapDataSearched([...sesamiToSapData]);

      return;
    }

    const searched: Array<any> = [];

    sesamiToSapData.forEach((gl: any) => {
      if (
        gl.PRNo.toLowerCase().includes(reqSearchParams.toLowerCase()) ||
        gl.Requestor.toLowerCase().includes(reqSearchParams.toLowerCase()) ||
        gl.Department.toLowerCase().includes(reqSearchParams.toLowerCase()) ||
        reqPoNo[gl.PRNo]?.PONumber.toLowerCase().includes(
          reqSearchParams.toLowerCase()
        )
      ) {
        searched.push(gl);

        return;
      }

      gl.Items?.forEach((item: any) => {
        if (
          item.CostCenter.toLowerCase().includes(reqSearchParams.toLowerCase())
        ) {
          searched.push(gl);

          return;
        }
      });
    });

    setSesamiToSapDataSearched([...searched]);
  }, [sesamiToSapData, reqSearchParams]);

  useEffect(() => {
    if (vendorData.length === 0) {
      return;
    }

    if (!vendorSearchParam) {
      setVendorDataSearched([...vendorData]);

      return;
    }

    const searched: Array<any> = [];

    vendorData.forEach((vendor: any) => {
      if (
        vendor.IDNumber.toLowerCase().includes(
          vendorSearchParam.toLowerCase()
        ) ||
        vendor.Name.toLowerCase().includes(vendorSearchParam.toLowerCase()) ||
        vendor.Group.toLowerCase().includes(vendorSearchParam.toLowerCase()) ||
        vendor.Code.toLowerCase().includes(vendorSearchParam.toLowerCase())
      ) {
        searched.push(vendor);

        return;
      }
    });

    setVendorDataSearched([...searched]);
  }, [vendorData, vendorSearchParam]);

  useEffect(() => {
    const iconElement = document.getElementById('restart-icon-sapb1');

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/Budget/get-budgets/' +
          new Date().getFullYear()
      );

      setSapb1toSasami([...data.data.data]);
      setLoading(false);
    })();
  }, [updateData, showSyncingBudgets]);

  useEffect(() => {
    const iconElement = document.getElementById('restart-icon-ven');

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://ssmrts.sesami.online/API/GetVendor',
        {
          headers: {
            Authorization: 'Basic F3E7DB5C-D57C-4103-8B46-99AF3E8267CE',
            SourceSystemID: 'SESAMi-RTS-API',
          },
        }
      );

      setVendorData([...data.data.vendor]);
      setVendorsLoading(false);
    })();
  }, [updateVendorData, showSyncingVendor]);

  useEffect(() => {
    const iconElement = document.getElementById('restart-icon-req');

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://ssmrts.sesami.online/API/GetRequisition',
        {
          headers: {
            Authorization: 'Basic F3E7DB5C-D57C-4103-8B46-99AF3E8267CE',
            SourceSystemID: 'SESAMi-RTS-API',
          },
        }
      );

      setSesamiToSapData([...data.data.SAPRequisition]);
      setSesamiToSapLoading(false);
    })();
  }, [updateRequisitionData, showSyncingReq]);

  useEffect(() => {
    if (sapb1ToSesami && sapb1ToSesami.length > 0) {
      (async () => {
        sapb1ToSesami.forEach(async (gl: any) => {
          const res = await axios.get(
            'https://stgrtsapi.clienttech.dev/api/Budget/get-budget-cost-center/' +
              gl.gl_code
          );

          setCostCenters(prev => ({
            ...prev,
            [gl.gl_code]: res.data.data as Array<{
              cost_center: string;
              currency: string;
              amount: string;
              dimension: string;
            }>,
          }));
        });
      })();
    }
  }, [sapb1ToSesami]);

  useEffect(() => {
    if (sesamiToSapData && sesamiToSapData.length > 0) {
      (async () => {
        sesamiToSapData.forEach(async (requisition: any) => {
          const res = await axios.get(
            'https://ssmrts.sesami.online/API/GetPurchaseOrder/' +
              requisition.PRNo,
            {
              headers: {
                Authorization: 'Basic F3E7DB5C-D57C-4103-8B46-99AF3E8267CE',
                SourceSystemID: 'SESAMi-RTS-API',
              },
            }
          );

          const order = res.data.order[0];

          setReqPoNo(prev => ({
            ...prev,
            [requisition.PRNo]: order,
          }));
        });
      })();
    }
  }, [sesamiToSapData]);

  const createPoReq = async () => {
    if (Object.keys(rowCheckedReq).length === 0) {
      setSnackMessage('Please select data');
      setShowSnack(true);

      return;
    }

    Object.keys(rowCheckedReq).forEach(async prNo => {
      if (!rowCheckedReq[prNo]) {
        return;
      }
      (async () => {
        try {
          const reqPoData: any =
            // @ts-ignore
            reqPoNo[prNo];

          let vendor = undefined;
          const vendorRes = await axios.get(
            'https://ssmrts.sesami.online/API/GetVendor/' + reqPoData.PRNumber,
            {
              headers: {
                Authorization: 'Basic F3E7DB5C-D57C-4103-8B46-99AF3E8267CE',
                SourceSystemID: 'SESAMi-RTS-API',
              },
            }
          );
          vendor = vendorRes.data.vendor[0] || undefined;

          const itemVendor = vendor?.Items[0];
          const transformedItems = {
            sesami_pr_number: reqPoData.PRNumber,
            sesami_po_number: reqPoNo[prNo]?.PONumber,
            sesami_vendor: {
              card_code: vendor.Code,
              company_name: vendor.Name,
              group: vendor.Group,
              currency: itemVendor.Currency,
              tel_no: itemVendor.Telephone,
              fax: itemVendor.Fax,
              email: itemVendor.Email,
              industry: itemVendor.Industry,
              address_id: itemVendor.AddressID,
              address_name_2: itemVendor.AddressName2,
              address_name_3: itemVendor.AddressName3,
              city: itemVendor.City,
              zipcode: itemVendor.ZipCode,
              country: itemVendor.Country,
              state: itemVendor.State,
            },

            document_date: reqPoData.DocumentDate,
            posting_date: reqPoData.PostingDate,
            currency: reqPoData.Currency,
            amount: reqPoData.Amount,
            exchange_rate: 1,
            items: reqPoData.Items.map((item: any) => ({
              item_no: item.ItemNo,
              quantity: item.Quantity.toString(),
              unit_price: item.UnitPrice.toString(),
              tax_code: item.TaxCode.toString(),
              tax_amount: item.TaxAmount.toString(),
              total_amount_include_tax: item.TotalAmountIncludeTax.toString(),
              uom: item.UOM.toString(),
              project: item.Project,
            })),
          };

          await axios.post(
            'https://stgrtsapi.clienttech.dev/api/Purchase/create-purchase-order',
            {
              ...transformedItems,
            }
          );
          setIsPushedReq(isPushedOld => ({
            ...isPushedOld,
            [prNo]: {
              pushed: true,
              time: Date.now(),
            },
          }));

          setSnackMessage('Post Successful');
          setShowSnack(true);
        } catch (err) {
          setIsPushedReq(isPushedOld => ({
            ...isPushedOld,
            [prNo]: {
              pushed: false,
              time: Date.now(),
            },
          }));
        }
      })();
    });
  };

  const createVendorReq = async () => {
    if (Object.keys(rowCheckedVendor).length === 0) {
      setSnackMessage('Please select data');
      setShowSnack(true);

      return;
    }

    Object.keys(rowCheckedVendor).forEach(async idNumber => {
      if (rowCheckedVendor[idNumber] !== true) {
        return;
      }

      (async () => {
        try {
          const vendorData =
            //@ts-ignore
            vendorDataSearched.find(row => row.IDNumber === idNumber);

          const transformedItems = {
            card_code: vendorData.Code,
            company_name: vendorData.Name,
            group: vendorData.Group,
            currency: vendorData.Items[0]?.Currency || '',
            tel_no: vendorData.Items[0]?.Telephone || '',
            fax: vendorData.Items[0]?.Fax || '',
            email: vendorData.Items[0]?.Email || '',
            industry: vendorData.Items[0]?.Industry || '',
            address_id: vendorData.Items[0]?.AddressID || '',
            address_name_2: vendorData.Items[0]?.AddressName2 || '',
            address_name_3: vendorData.Items[0]?.AddressName3 || '',
            city: vendorData.Items[0]?.City || '',
            zipcode: vendorData.Items[0]?.ZipCode || '',
            country: vendorData.Items[0]?.Country || '',
            state: vendorData.Items[0]?.State || '',
          };
          await axios.post(
            'https://stgrtsapi.clienttech.dev/api/Vendor/create',
            {
              ...transformedItems,
            },
            {
              headers: {
                'ngrok-skip-browser-warning': '69420',
              },
            }
          );

          setIsPushedVendor(isPushedOld => ({
            ...isPushedOld,
            [idNumber]: {
              pushed: true,
              time: Date.now(),
            },
          }));

          setSnackMessage('Post Successful');
          setShowSnack(true);
        } catch (err) {
          setIsPushedVendor(isPushedOld => ({
            ...isPushedOld,
            [idNumber]: {
              pushed: false,
              time: Date.now(),
            },
          }));
        }
      })();
    });
  };

  const openSesamiModal = (prNo: string) => {
    setSesamiModalNo(prNo);
  };

  const totalGL: string[] = [];
  let totalBudget = 0;

  const multipleCostCentreGl: {
    [key: string]: [
      {
        name: string;
        value: number;
      }
    ];
  } = {};

  sapb1ToSesami.forEach((sap: any) => {
    totalBudget = addNumbers(totalBudget, parseFloat(sap.amount));

    if (multipleCostCentreGl[sap.gl_code] !== undefined) {
      multipleCostCentreGl[sap.gl_code]!.push({
        name: sap.cost_center as string,
        value: sap.amount as number,
      });
    } else {
      multipleCostCentreGl[sap.gl_code] = [
        {
          name: sap.cost_center as string,
          value: sap.amount as number,
        },
      ];
    }
    if (!totalGL.includes(sap.gl_code)) {
      totalGL.push(sap.gl_code);
    }
  });

  const openDropdown = (id: string) => {
    if (id === dropdownOpen) {
      return setDropdownOpen(null);
    }

    setDropdownOpen(id);
  };

  async function postBudgets() {
    if (Object.keys(rowChecked).length === 0) {
      setSnackMessage('Please select data');
      setShowSnack(true);

      return;
    }

    Object.keys(rowChecked).forEach(async gl_code => {
      try {
        // already synced sesasmi data, now not removing it and pushing it on req
        // if (syncedDataSapToSesami[gl_code]?.pushed === true) {
        //   return;
        // }

        const postUrl = 'https://ssmrts.sesami.online/API/postbudget';

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        const costCentersData = costCenters[gl_code];

        if (costCenters) {
          for (const costCenter of costCentersData!) {
            const glInfo: any = sapb1ToSesamiSearched.find(
              (gl: any) => gl.gl_code === gl_code
            );
            const postData = {
              GLCode: glInfo.gl_code,
              CostCenterCode: (costCenter.cost_center_code as string) || '',
              GLDescription: glInfo.description,
              CostCenterDescription: costCenter.cost_center || '',
              BudgetAmount: costCenter.amount,
              Dimension: glInfo.dimension,
            };

            try {
              const res = await axios.post(postUrl, postData, {
                headers: {
                  'ngrok-skip-browser-warning': '69420',
                  Authorization: 'Basic F3E7DB5C-D57C-4103-8B46-99AF3E8267CE',
                  SourceSystemID: 'SESAMi-RTS-API',
                },
              });
              console.log(
                `Budget posted for GL code ${glInfo.gl_code}, Cost Center ${costCenter}`
              );

              if (res.data.Succeed === false) {
                throw new Error('Failed');
              }
              setSyncedDataSapToSesami((prev: any) => ({
                ...prev,
                [sapb1ToSesamiSearched.find((gl: any) => gl.gl_code === gl_code)
                  .gl_code]: {
                  pushed: true,
                  time: Date.now(),
                },
              }));

              setRowChecked(rowPrevChecked => {
                const rowCheckedInfo = rowPrevChecked;
                delete rowCheckedInfo[
                  sapb1ToSesamiSearched.find(
                    (gl: any) => gl.gl_code === gl_code
                  ).gl_code
                ];

                return { ...rowCheckedInfo };
              });
            } catch (error) {
              setSyncedDataSapToSesami((prev: any) => ({
                ...prev,
                [sapb1ToSesamiSearched.find((gl: any) => gl.gl_code === gl_code)
                  .gl_code]: {
                  pushed: false,
                  time: Date.now(),
                },
              }));
              console.error(
                `Failed to post budget for GL code ${
                  sapb1ToSesamiSearched.find(
                    (gl: any) => gl.gl_code === gl_code
                  ).gl_code
                }, Cost Center ${costCenter}`
              );
            }
          }
        }
      } catch (error) {
        console.error(`Failed to fetch budgets for GL code ${gl_code}`);
      }
    });
  }

  const twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const currentTime = new Date().getTime();

  const totalBudgetSyncedToday = Object.keys(syncedDataSapToSesami).filter(
    syncedId =>
      syncedDataSapToSesami[syncedId].pushed === true &&
      currentTime - syncedDataSapToSesami[syncedId].time <=
        twentyFourHoursInMillis
  ).length;

  let totalBudgetCostSyncedToday = 0;

  if (sapb1ToSesami.length > 0) {
    Object.keys(syncedDataSapToSesami).forEach((glSynced: any) => {
      if (
        syncedDataSapToSesami[glSynced]?.pushed === true &&
        currentTime - syncedDataSapToSesami[glSynced].time <=
          twentyFourHoursInMillis
      ) {
        totalBudgetCostSyncedToday += parseFloat(
          sapb1ToSesami.find((gl: any) => gl.gl_code === glSynced).amount
        );
      }
    });
  }

  totalBudgetCostSyncedToday = Number(totalBudgetCostSyncedToday.toString());

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  let disableSubmitPostBudget = true;

  if (rowChecked && sapb1ToSesamiSearched.length > 0) {
    if (Object.keys(rowChecked).length > 0) {
      disableSubmitPostBudget = false;
    }
    // Object.keys(rowChecked).forEach(gl_code => {
    //   if (rowChecked[gl_code] === true) {
    //     if (
    //       syncedDataSapToSesami[
    //         sapb1ToSesamiSearched.find((gl: any) => gl.gl_code === gl_code)
    //           .gl_code
    //       ] === undefined
    //     ) {
    //       disableSubmitPostBudget = false;

    //       return;
    //     }

    //     if (
    //       syncedDataSapToSesami[
    //         sapb1ToSesamiSearched.find((gl: any) => gl.gl_code === gl_code)
    //           .gl_code
    //       ]?.pushed === false
    //     ) {
    //       disableSubmitPostBudget = false;
    //     }
    //   }
    // });
  }
  let areAllRowsChecked = true;
  let allGlHaveNoCostCenter = true;

  if (rowChecked && sapb1ToSesamiSearched.length > 0) {
    sapb1ToSesamiSearched.forEach((glRow: any) => {
      if (!costCenters[glRow.gl_code]) {
        allGlHaveNoCostCenter = false; // Set allGlHaveNoCostCenter to false if any gl has a cost center

        return true;
      }

      if (rowChecked[glRow.gl_code] === true) {
        return;
      }

      if (syncedDataSapToSesami[glRow.gl_code]?.pushed === true) {
        return;
      }

      areAllRowsChecked = false;
    });
  }

  // Check if all gl's have no cost center, then set areAllRowsChecked to false
  if (allGlHaveNoCostCenter) {
    areAllRowsChecked = false;
  }

  const checkAllRowChecked = () => {
    if (areAllRowsChecked) {
      const rowCheckedNow = rowChecked;
      sapb1ToSesamiSearched.forEach((glRow: any) => {
        if (!costCenters[glRow.gl_code]) {
          return;
        }

        rowCheckedNow[glRow.gl_code] = false;
      });

      setRowChecked({ ...rowCheckedNow });
    } else {
      const rowCheckedNow = rowChecked;
      sapb1ToSesamiSearched.forEach((glRow: any) => {
        if (!costCenters[glRow.gl_code]) {
          return;
        }

        rowCheckedNow[glRow.gl_code] = true;
      });

      setRowChecked({ ...rowCheckedNow });
    }
  };

  let allRequesterRowsAreChecked = true;
  if (rowCheckedReq && sesamiToSapDataSearched.length > 0) {
    sesamiToSapDataSearched.forEach((row: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions

      if (rowCheckedReq[row.PRNo] === true) {
        return;
      }

      if (
        isPushedReq[row.PRNo]?.pushed === true &&
        typeof isPushedReq[row.PRNo]?.time === 'number'
      ) {
        return;
      }

      allRequesterRowsAreChecked = false;
    });
  }

  const checkAllRequesterRows = () => {
    if (allRequesterRowsAreChecked) {
      const rowReqCheckedNow = rowCheckedReq;
      sesamiToSapDataSearched.forEach((row: any) => {
        rowReqCheckedNow[row.PRNo] = false;
      });

      setRowCheckedReq({ ...rowReqCheckedNow });
    } else {
      const rowReqCheckedNow = rowCheckedReq;
      sesamiToSapDataSearched.forEach((row: any) => {
        rowReqCheckedNow[row.PRNo] = true;
      });

      setRowCheckedReq({ ...rowReqCheckedNow });
    }
  };

  let allVendorRowsChecked = true;
  if (rowCheckedVendor && vendorDataSearched.length > 0) {
    vendorDataSearched.forEach((row: any) => {
      if (rowCheckedVendor[row.IDNumber] === true) {
        return;
      }

      if (typeof isPushedVendor[row.IDNumber] === 'number') {
        return;
      }

      allVendorRowsChecked = false;
    });
  }

  const checkAllVendorRows = () => {
    if (allVendorRowsChecked) {
      const rowCheckedVendorNow = rowCheckedVendor;
      vendorDataSearched.forEach((row: any) => {
        rowCheckedVendorNow[row.IDNumber] = false;
      });

      setRowCheckedVendor({ ...rowCheckedVendorNow });
    } else {
      const rowCheckedVendorNow = rowCheckedVendor;
      vendorDataSearched.forEach((row: any) => {
        rowCheckedVendorNow[row.IDNumber] = true;
      });

      setRowCheckedVendor({ ...rowCheckedVendorNow });
    }
  };

  useEffect(() => {
    // localStorage.setItem('rowCheckedSapToSesami', JSON.stringify(rowChecked));
    localStorage.setItem(
      'syncedDataSapToSesami',
      JSON.stringify(syncedDataSapToSesami)
    );
  }, [syncedDataSapToSesami]);

  useEffect(() => {
    // localStorage.setItem('rowCheckedReq', JSON.stringify(rowCheckedReq));
    localStorage.setItem('isPushedReq', JSON.stringify(isPushedReq));
  }, [isPushedReq]);

  useEffect(() => {
    // localStorage.setItem('rowCheckedVendor', JSON.stringify(rowCheckedVendor));
    localStorage.setItem('isPushedVendor', JSON.stringify(isPushedVendor));
  }, [isPushedVendor]);

  return (
    <>
      <Header />
      <FullScreenDialog
        open={selectedId !== null}
        selectedId={selectedId}
        setOpen={setSelectedId}
        setSnackMessage={setSnackMessage}
        setShowSnack={setShowSnack}
      />
      <SesamiToSapModalInfo
        open={sesamiModalNo !== null}
        data={
          sesamiToSapData.find((data: any) => data.PRNo === sesamiModalNo)
            ?.Items || []
        }
        setSesamiModalNo={setSesamiModalNo}
      />

      <VendorDetailsModal
        open={vendorDetailsModalNo !== null}
        data={
          vendorDataSearched.find(
            (data: any) => data.IDNumber === vendorDetailsModalNo
          )?.Items || []
        }
        setVendorDetailsModalNo={setVendorDetailsModalNo}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        className='!tw-z-[99999] !tw-bg-primary !tw-text-white'
        open={showSnack}
        autoHideDuration={3000}
        onClose={() => setShowSnack(false)}
        message={snackMessage}
      />
      <section className='tw-bg-[#F4f4f4]'>
        <div className='tw-flex tw-items-center tw-bg-primary tw-px-[7rem] tw-py-[2rem]'>
          <Link href='/home' replace>
            <div className='tw-text-white'>
              <ChevronLeftIcon
                fill='white'
                className='tw-min-h-[5rem] tw-min-w-[5rem]'
              />
            </div>
          </Link>
          <div className='tw-flex tw-items-center tw-text-3xl tw-text-white'>
            SAP B1 {'<=>'} E PROCUREMENT DATA SYNC
          </div>
        </div>
        <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
          <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
            <div className='tw-flex tw-flex-col'>
              <span className='tw-text-3xl'>GET BUDGETS</span>{' '}
              <span className='tw-mt-4 tw-text-gray-400'>
                This module facilitates seamless cross-data synchronization
                between the SAP-B1 data source and the SESAMI E-procurement
                destination system in near real-time. An automated scheduler
                diligently monitors both systems for updates at 10-minute
                intervals, ensuring the availability of the most up-to-date
                data. Additionally, system users have the option to manually
                trigger a data refresh by clicking on the designated refresh
                icon.
              </span>
            </div>
            <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
              <RestartAltIcon
                id='restart-icon-sapb1'
                fill='black'
                className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                onClick={() => {
                  setUpdateData(!updateData);
                  setShowSyncingBudgets(true);
                  setTimeout(() => setShowSyncingBudgets(false), 2000);
                }}
              />
              <div
                className={` tw-whitespace-nowrap ${
                  showSyncingBudgets ? 'tw-visible' : 'tw-invisible'
                }`}
              >
                Getting Latest Budget
              </div>
            </div>
          </div>
          <div className='tw-mt-5 tw-flex   tw-gap-[2rem]'>
            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-1 tw-py-2 tw-pb-5 !tw-text-sm !tw-text-gray-900'
                id='demo-simple-select-label'
              >
                {' '}
                Quick Search
              </FormLabel>
              <TextField
                fullWidth
                className='tw-block tw-grow tw-basis-1/3'
                name='email'
                variant='outlined'
                onChange={e => setSapb1SearchParams(e.target.value)}
                value={sapb1SearchParams}
                placeholder='GL Code | Dimension | Cost Center'
              />
            </FormControl>
          </div>
          <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL BUDGET</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                {totalGL.length}
              </div>
            </div>

            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL BUDGET SYNCED TODAY</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                {totalBudgetSyncedToday}
              </div>
            </div>

            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL BUDGET AMOUNT</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                {totalBudget}
              </div>
            </div>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL BUDGET AMOUNT TODAY</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                {totalBudgetCostSyncedToday}
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }} className='tw-my-10'>
            {!loading && (
              <TableContainer
                component={Paper}
                className='!tw-rounded-2xl tw-text-base'
              >
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align='center'
                        className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                      >
                        <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[150px] tw-items-center'>
                          <Checkbox
                            className=''
                            color='info'
                            checked={areAllRowsChecked}
                            onChange={checkAllRowChecked}
                            inputProps={{
                              'aria-label': 'Check All',
                            }}
                            style={{
                              color: '#ffffff',
                            }}
                          />
                          GL CODE
                        </div>
                      </StyledTableCell>

                      <StyledTableCell align='center'>
                        BUDGET AMOUNT (MYR)
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        DESCRIPTION
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        DIMENSION
                      </StyledTableCell>

                      <StyledTableCell align='center'>
                        SYNC DATE
                      </StyledTableCell>
                      <StyledTableCell align='center'>STATUS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className=' !tw-text-black'>
                    {sapb1ToSesamiSearched.map((row: any, index: number) => (
                      <>
                        <StyledTableRow key={row.gl_code}>
                          <StyledTableCell
                            component='td'
                            scope='row'
                            className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                            align='center'
                          >
                            <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                              {!costCenters[row.gl_code] ? (
                                <Tooltip title='Cost centres not available'>
                                  <Checkbox
                                    color='primary'
                                    checked={false}
                                    onChange={noop}
                                  />
                                </Tooltip>
                              ) : (
                                <Checkbox
                                  color='primary'
                                  checked={rowChecked[row.gl_code] || false}
                                  onChange={e => {
                                    setRowChecked({
                                      ...rowChecked,
                                      [row.gl_code]: e.target.checked,
                                    });
                                  }}
                                  inputProps={{
                                    'aria-label': 'select all desserts',
                                  }}
                                />
                              )}
                              <span
                                className='tw-cursor-pointer tw-text-center'
                                onClick={() => setSelectedId(row.gl_code)}
                              >
                                {row.gl_code}
                              </span>
                            </div>
                          </StyledTableCell>

                          <StyledTableCell
                            className='!tw-relative !tw-cursor-pointer !tw-font-bold'
                            align='left'
                            onClick={
                              costCenters[row.gl_code] !== undefined &&
                              costCenters[row.gl_code] !== null
                                ? () => openDropdown(row.gl_code)
                                : () => {}
                            }
                          >
                            <div className='tw-flex tw-items-center tw-justify-center'>
                              <div className='tw-flex tw-w-full  tw-max-w-[140px] tw-items-center tw-justify-start'>
                                {costCenters[row.gl_code] !== undefined ? (
                                  <>
                                    {row.amount}
                                    {costCenters[row.gl_code] !== null ? (
                                      <ArrowDropDownIcon className='tw-cursor-pointer' />
                                    ) : null}
                                    {dropdownOpen === row.gl_code &&
                                      index !== sapb1ToSesami.length - 1 && (
                                        <TableContainer
                                          component={Paper}
                                          className='!tw-absolute !tw-right-[-120px] !tw-top-[30%] !tw-z-20 !tw-ml-5 !tw-max-w-[300px] !tw-rounded-lg tw-text-base'
                                        >
                                          <Table aria-label='customized table'>
                                            <TableHead>
                                              <TableRow>
                                                <StyledTableCell align='center'>
                                                  COST CENTRE
                                                </StyledTableCell>
                                                <StyledTableCell align='center'>
                                                  AMOUNT
                                                </StyledTableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody className=' !tw-text-black'>
                                              {costCenters[row.gl_code]!.map(
                                                row1 => (
                                                  <StyledTableRow
                                                    key={row1.cost_center}
                                                  >
                                                    <StyledTableCell
                                                      component='th'
                                                      scope='row'
                                                      className='!tw-font-bold'
                                                    >
                                                      {row1.cost_center}
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                      component='th'
                                                      scope='row'
                                                      className='!tw-font-bold'
                                                    >
                                                      {row1.amount}
                                                    </StyledTableCell>
                                                  </StyledTableRow>
                                                )
                                              )}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      )}
                                  </>
                                ) : (
                                  <div className='tw-flex tw-max-h-[30px] tw-max-w-[30px] tw-items-center tw-justify-center'>
                                    {costCenters[row.gl_code] !== null ? (
                                      <CircularProgress />
                                    ) : (
                                      '-'
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.description}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.dimension}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {syncedDataSapToSesami[row.gl_code]?.pushed !==
                            undefined
                              ? formatDate(
                                  new Date(
                                    syncedDataSapToSesami[row.gl_code]
                                      ?.time as number
                                  )
                                )
                              : '-'}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {syncedDataSapToSesami[row.gl_code]?.pushed !==
                            undefined
                              ? syncedDataSapToSesami[row.gl_code]?.pushed !==
                                false
                                ? 'Success'
                                : 'Failed'
                              : 'Not Pushed'}
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
          <div className='tw-flex tw-justify-end tw-pr-5'>
            <button
              className={
                `tw-rounded-lg  tw-px-7 tw-py-3 tw-text-white  ` +
                (disableSubmitPostBudget ? 'tw-bg-gray-400' : 'tw-bg-primary')
              }
              onClick={postBudgets}
              disabled={disableSubmitPostBudget}
            >
              SUBMIT BUDGET
            </button>
          </div>
        </Card>
        <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
          <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
            <div className='tw-flex tw-flex-col'>
              <span className='tw-text-3xl'>
                GET PURCHASE REQUISITION & PURCHASE ORDER
              </span>{' '}
              <span className='tw-mt-4 tw-text-gray-400'>
                This module facilitates seamless cross-data synchronization
                between the SESAMI E-procurement and the SAP-B1 data source
                destination system in near real-time. An automated scheduler
                diligently monitors both systems for updates at 10-minute
                intervals, ensuring the availability of the most up-to-date
                data. Additionally, system users have the option to manually
                trigger a data refresh by clicking on the designated refresh
                icon.
              </span>
            </div>
            <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
              <RestartAltIcon
                id='restart-icon-req'
                fill='black'
                className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                onClick={() => {
                  setUpdateRequisitionData(!updateData);
                  setShowSyncingReq(true);
                  setTimeout(() => setShowSyncingReq(false), 2000);
                }}
              />
              <div
                className={` tw-whitespace-nowrap ${
                  showSyncingReq ? 'tw-visible' : 'tw-invisible'
                }`}
              >
                Getting Latest PR & PO
              </div>
            </div>
          </div>
          <div className='tw-mt-5 tw-flex   tw-gap-[2rem]'>
            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-1 tw-py-2 tw-pb-5 !tw-text-sm !tw-text-gray-900'
                id='demo-simple-select-label'
              >
                {' '}
                Quick Search
              </FormLabel>
              <TextField
                fullWidth
                className='tw-block tw-grow tw-basis-1/3'
                name='email'
                variant='outlined'
                placeholder='GL Code | Dimension | Cost Center'
                onChange={e => setReqSearchParams(e.target.value)}
                value={reqSearchParams}
              />
            </FormControl>
          </div>
          <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL GL SYNCED</div>
              <div className='tw-text-4xl tw-font-bold'>
                {sesamiToSapDataSearched.length}
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }} className='tw-my-10'>
            {!sesamiToSapLoading && (
              <TableContainer component={Paper} className='!tw-rounded-2xl'>
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align='center'
                        className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                      >
                        <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[150px] tw-items-center'>
                          <Checkbox
                            className=''
                            color='info'
                            checked={allRequesterRowsAreChecked}
                            onChange={checkAllRequesterRows}
                            inputProps={{
                              'aria-label': 'Check All',
                            }}
                            style={{
                              color: '#ffffff',
                            }}
                          />
                          REQUESTOR
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        DEPARTMENT
                      </StyledTableCell>
                      <StyledTableCell align='center'>PR NO</StyledTableCell>
                      <StyledTableCell align='center'>PO NO</StyledTableCell>

                      <StyledTableCell align='center'>
                        POSTING DATE
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        REQUIRED DATE
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Sync Date
                      </StyledTableCell>
                      <StyledTableCell align='center'>STATUS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className=' !tw-text-black'>
                    {sesamiToSapDataSearched.map((row: any) => (
                      <StyledTableRow key={nanoid()}>
                        <StyledTableCell
                          align='center'
                          className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                        >
                          <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[150px] tw-items-center'>
                            <Checkbox
                              color='primary'
                              checked={rowCheckedReq[row.PRNo] || false}
                              onChange={e => {
                                setRowCheckedReq({
                                  ...rowCheckedReq,
                                  [row.PRNo]: e.target.checked,
                                });
                              }}
                              inputProps={{
                                'aria-label': 'select all desserts',
                              }}
                            />
                            <span
                              className='tw-cursor-pointer'
                              onClick={() => openSesamiModal(row.PRNo)}
                            >
                              {row.Requestor}
                            </span>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.Department}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.PRNo}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {reqPoNo[row.PRNo]?.PONumber ?? '-'}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {new Date(row.PostingDate).toLocaleDateString()}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {new Date(row.RequiredDate).toLocaleDateString()}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold'
                          align='center'
                        >
                          {typeof isPushedReq[row.PRNo]?.time === 'number'
                            ? formatDate(
                                new Date(isPushedReq[row.PRNo]?.time as number)
                              )
                            : '-'}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold'
                          align='center'
                        >
                          {isPushedReq[row.PRNo]?.pushed
                            ? 'Success'
                            : typeof isPushedReq[row.PRNo]?.pushed ===
                              'undefined'
                            ? '-'
                            : 'Failed'}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
          <div className='tw-flex tw-justify-end tw-pr-5'>
            <button
              className='tw-rounded-lg tw-bg-primary tw-px-7 tw-py-3 tw-text-white'
              onClick={createPoReq}
            >
              CREATE PO
            </button>
          </div>
        </Card>
        <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
          <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
            <div className='tw-flex tw-flex-col'>
              <span className='tw-text-3xl'>VENDOR LIST</span>{' '}
              <span className='tw-mt-4 tw-text-gray-400'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
                perspiciatis inventore modi ut omnis minus dignissimos placeat,
                et, rerum labore iste! Porro architecto esse magni consectetur
                aspernatur ipsum minus quae!
              </span>
            </div>

            <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
              <RestartAltIcon
                id='restart-icon-ven'
                fill='black'
                className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                onClick={() => {
                  setUpdateVEndorData(!updateVendorData);
                  setShowSyncingVendor(true);
                  setTimeout(() => setShowSyncingVendor(false), 2000);
                }}
              />
              <div
                className={` tw-whitespace-nowrap ${
                  showSyncingVendor ? 'tw-visible' : 'tw-invisible'
                }`}
              >
                Getting Latest Vendor List
              </div>
            </div>
          </div>
          <div className='tw-mt-5 tw-flex   tw-gap-[2rem]'>
            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-1 tw-py-2 tw-pb-5 !tw-text-sm !tw-text-gray-900'
                id='demo-simple-select-label'
              >
                {' '}
                Quick Search
              </FormLabel>
              <TextField
                fullWidth
                className='tw-block tw-grow tw-basis-1/3'
                name='email'
                variant='outlined'
                value={vendorSearchParam}
                onChange={e => setVendorSearchParam(e.target.value)}
                placeholder='GL Code | Company Name | Industry'
              />
            </FormControl>
          </div>
          <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL VENDOR SYNCED</div>
              <div className='tw-text-4xl tw-font-bold'>
                {vendorDataSearched.length}
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }} className='tw-my-10'>
            {!vendorLoading && (
              <TableContainer component={Paper} className='!tw-rounded-2xl'>
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align='center'
                        className='!tw-flex-start !tw-flex !tw-font-bold !tw-underline'
                      >
                        <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[250px] tw-items-center'>
                          <Checkbox
                            className=''
                            color='info'
                            checked={allVendorRowsChecked}
                            onChange={checkAllVendorRows}
                            inputProps={{
                              'aria-label': 'Check All',
                            }}
                            style={{
                              color: '#ffffff',
                            }}
                          />
                          COMPANY NAME
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        ID NUMBER
                      </StyledTableCell>
                      <StyledTableCell align='center'>CODE</StyledTableCell>
                      <StyledTableCell align='center'>GROUP</StyledTableCell>

                      <StyledTableCell align='center'>
                        SYNC DATE
                      </StyledTableCell>
                      <StyledTableCell align='center'>STATUS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className=' !tw-text-black'>
                    {vendorDataSearched.map((row: any) => (
                      <StyledTableRow key={row.IDNumber}>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[250px] tw-items-center'>
                            <Checkbox
                              color='primary'
                              checked={rowCheckedVendor[row.IDNumber] || false}
                              onChange={e => {
                                setRowCheckedVendor({
                                  ...rowCheckedVendor,
                                  [row.IDNumber]: e.target.checked,
                                });
                              }}
                              inputProps={{
                                'aria-label': 'select all desserts',
                              }}
                            />
                            <span
                              className='tw-cursor-pointer tw-underline'
                              onClick={() =>
                                setVendorDetailsModalNo(row.IDNumber)
                              }
                            >
                              {row.Name}
                            </span>
                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.IDNumber}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.Code}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.Group}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold'
                          align='center'
                        >
                          {typeof isPushedVendor[row.IDNumber]?.time ===
                          'number'
                            ? formatDate(
                                new Date(
                                  isPushedVendor[row.IDNumber]?.time as number
                                )
                              )
                            : '-'}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold'
                          align='center'
                        >
                          {isPushedVendor[row.IDNumber]?.pushed
                            ? 'Success'
                            : typeof isPushedVendor[row.IDNumber]?.pushed ===
                              'undefined'
                            ? '-'
                            : 'Failed'}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
          <div className='tw-flex tw-justify-end tw-pr-5'>
            <button
              className='tw-rounded-lg tw-bg-primary tw-px-7 tw-py-3 tw-text-white'
              onClick={createVendorReq}
            >
              Create Vendor
            </button>
          </div>
        </Card>
      </section>
      <Footer className='tw-mt-10' />
    </>
  );
};

export default Home;
