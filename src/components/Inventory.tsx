import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Card,
  Checkbox,
  //Checkbox,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
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
} from '@mui/material';
import axios from 'axios';
//import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import Link from 'next/link';
// import moment from 'moment';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import { formatDate } from '@/utils/getDateDiffInDays';

//import FullScreenDialog from './FullScreenDialog';
//import SesamiToSapModalInfo from './SesamiToSapModalInfo';
//import VendorDetailsModal from './VendorDetailsModal';
//import { formatDate } from '@/utils/getDateDiffInDays';
import Footer from './Footer';
import InventoryDetailsModal from './InventoryDetailsModal';

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

const Inventory = () => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Please select data');

  const [inventoryData, setInventories] = useState<any>([]);
  const [loadingInventory, setLoadingInventory] = useState(true);

  const [updateDataInventory, setUpdateDataInventory] = useState(false);
  const [showSyncingInventory, setShowSyncingInventory] = useState(false);
  const [inventorySearched, setInventorySearched] = useState<any>([]);
  const [inventorySearchParams, setInventorySearchParams] =
    useState<string>('');

  const [rowCheckedInventory, setRowCheckedInventory] = useState<{
    [key: string]: boolean;
  }>(JSON.parse(localStorage.getItem('rowCheckedInventory') || `{}`));
  const [isPushedInventory, setIsPushedInventory] = useState<{
    [key: string]: { time: number; pushed: boolean };
  }>(JSON.parse(localStorage.getItem('isPushedInventory') || `{}`));

  const [inventoryDetailsModalNo, setInventoryDetailsModalNo] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (inventorySearchParams.length === 0) {
      setInventorySearched([...inventoryData]);

      return;
    }

    const searched: Array<any> = [];

    inventoryData.forEach((inventory: any) => {
      if (
        inventory.item_no
          .toLowerCase()
          .includes(inventorySearchParams.toLowerCase()) ||
        inventory.item_group
          .toLowerCase()
          .includes(inventorySearchParams.toLowerCase()) ||
        inventory.description
          .toLowerCase()
          .includes(inventorySearchParams.toLowerCase())
      ) {
        searched.push(inventory);

        return;
      }
    });

    setInventorySearched([...searched]);
  }, [inventoryData, inventorySearchParams]);

  useEffect(() => {
    const iconElement = document.getElementById('restart-icon-inventory');

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-inventories/' +
          new Date().getFullYear()
      );

      setInventories([...data.data.data]);
      setLoadingInventory(false);
    })();
  }, [updateDataInventory, showSyncingInventory]);

  // inventory receive line

  const [inventoryReceiveLineDocNo, setInventoryReceiveLineDocNo] = useState(1);
  const [inventoryReceiveLineDocNoList, setInventoryReceiveLineDocNoList] =
    useState<Array<number>>([]);

  const [inventoryDataReceiveLine, setInventoryDataReceiveLine] = useState<any>(
    []
  );
  const [loadingInventoryReceiveLine, setLoadingInventoryReceiveLine] =
    useState(true);

  const [updateDataInventoryReceiveLine, setUpdateDataInventoryReceiveLine] =
    useState(false);
  const [showSyncingInventoryReceiveLine, setShowSyncingInventoryReceiveLine] =
    useState(false);
  const [inventorySearchedReceiveLine, setInventorySearchedReceiveLine] =
    useState<any>([]);
  const [
    inventorySearchParamsReceiveLine,
    setInventorySearchParamsReceiveLine,
  ] = useState<string>('');

  useEffect(() => {
    if (inventorySearchParamsReceiveLine.length === 0) {
      setInventorySearchedReceiveLine([...inventoryDataReceiveLine]);

      return;
    }

    const searched: Array<any> = [];

    inventoryDataReceiveLine.forEach((inventory: any) => {
      if (
        inventory.number
          .toLowerCase()
          .includes(inventorySearchParamsReceiveLine.toLowerCase())
      ) {
        searched.push(inventory);

        return;
      }
    });

    setInventorySearchedReceiveLine([...searched]);
  }, [inventoryDataReceiveLine, inventorySearchParamsReceiveLine]);

  useEffect(() => {
    const iconElement = document.getElementById(
      'restart-icon-inventory-receive-line'
    );

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-receive-line/' +
          inventoryReceiveLineDocNo
      );

      setInventoryDataReceiveLine([...[data.data.data]]);
      setLoadingInventoryReceiveLine(false);
    })();
  }, [
    updateDataInventoryReceiveLine,
    showSyncingInventoryReceiveLine,
    inventoryReceiveLineDocNo,
  ]);

  // inventory issue line
  const [inventoryIssueLineDocNo, setInventoryIssueLineDocNo] = useState(1);
  const [inventoryIssueLineDocNoList, setInventoryIssueLineDocNoList] =
    useState<any>([]);
  const [inventoryDataIssueLine, setInventoryDataIssueLine] = useState<any>([]);
  const [loadingInventoryIssueLine, setLoadingInventoryIssueLine] =
    useState(true);

  const [updateDataInventoryIssueLine, setUpdateDataInventoryIssueLine] =
    useState(false);
  const [showSyncingInventoryIssueLine, setShowSyncingInventoryIssueLine] =
    useState(false);
  const [inventorySearchedIssueLine, setInventorySearchedIssueLine] =
    useState<any>([]);
  const [inventorySearchParamsIssueLine, setInventorySearchParamsIssueLine] =
    useState<string>('');

  useEffect(() => {
    if (inventorySearchParamsIssueLine.length === 0) {
      setInventorySearchedIssueLine([...inventoryDataIssueLine]);

      return;
    }

    const searched: Array<any> = [];

    inventoryDataIssueLine.forEach((inventory: any) => {
      if (
        inventory.item_no
          .toLowerCase()
          .includes(inventorySearchParamsIssueLine.toLowerCase())
      ) {
        searched.push(inventory);

        return;
      }
    });

    setInventorySearchedIssueLine([...searched]);
  }, [inventoryDataIssueLine, inventorySearchParamsIssueLine]);

  useEffect(() => {
    const iconElement = document.getElementById(
      'restart-icon-inventory-issue-line'
    );

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-issue-line/' +
          inventoryIssueLineDocNo
      );

      setInventoryDataIssueLine([...[data.data.data]]);
      setLoadingInventoryIssueLine(false);
    })();
  }, [
    updateDataInventoryIssueLine,
    showSyncingInventoryIssueLine,
    inventoryIssueLineDocNo,
  ]);

  // inventory return flow
  const [inventoryDataReturnFlowDocNo, setInventoryDataReturnFlowDocNo] =
    useState(1);
  const [
    inventoryDataReturnFlowDocNoList,
    setInventoryDataReturnFlowDocNoList,
  ] = useState<any>([]);
  const [inventoryDataReturnFlow, setInventoryDataReturnFlow] = useState<any>(
    []
  );
  const [loadingInventoryReturnFlow, setLoadingInventoryReturnFlow] =
    useState(true);

  const [updateDataInventoryReturnFlow, setUpdateDataInventoryReturnFlow] =
    useState(false);
  const [showSyncingInventoryReturnFlow, setShowSyncingInventoryReturnFlow] =
    useState(false);
  const [inventorySearchedReturnFlow, setInventorySearchedReturnFlow] =
    useState<any>([]);
  const [inventorySearchParamsReturnFlow, setInventorySearchParamsReturnFlow] =
    useState<string>('');

  useEffect(() => {
    if (inventorySearchParamsReturnFlow.length === 0) {
      setInventorySearchedReturnFlow([...inventoryDataReturnFlow]);

      return;
    }

    const searched: Array<any> = [];

    inventoryDataReturnFlow.forEach((inventory: any) => {
      if (
        inventory.vendor_code
          .toLowerCase()
          .includes(inventorySearchParamsReturnFlow.toLowerCase())
      ) {
        searched.push(inventory);

        return;
      }
    });

    setInventorySearchedReturnFlow([...searched]);
  }, [inventoryDataReturnFlow, inventorySearchParamsReturnFlow]);

  useEffect(() => {
    const iconElement = document.getElementById(
      'restart-icon-inventory-return-flow'
    );

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-return-flow/' +
          inventoryDataReturnFlowDocNo
      );

      setInventoryDataReturnFlow([...[data.data.data]]);
      setLoadingInventoryReturnFlow(false);
    })();
  }, [
    updateDataInventoryReturnFlow,
    showSyncingInventoryReturnFlow,
    inventoryDataReturnFlowDocNo,
  ]);

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-goods-numbers/' +
          'receive' +
          '/' +
          new Date().getFullYear()
      );

      setInventoryReceiveLineDocNoList([...data.data.data]);
    })();

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-goods-numbers/' +
          'issue' +
          '/' +
          new Date().getFullYear()
      );

      setInventoryIssueLineDocNoList([...data.data.data]);
    })();

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-goods-numbers/' +
          'return' +
          '/' +
          new Date().getFullYear()
      );

      setInventoryDataReturnFlowDocNoList([...data.data.data]);
    })();
  }, [updateDataInventoryReturnFlow, showSyncingInventoryReturnFlow]);

  const [inventoryType, setInventoryType] = useState<string>('inventory');

  let allInventoryRowsAreChecked = true;
  if (rowCheckedInventory && inventorySearched.length > 0) {
    inventorySearched.forEach((row: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions

      if (rowCheckedInventory[row.item_no] === true) {
        return;
      }

      if (
        isPushedInventory[row.item_no]?.pushed === true &&
        typeof isPushedInventory[row.item_no]?.time === 'number'
      ) {
        return;
      }

      allInventoryRowsAreChecked = false;
    });
  }

  const checkAllInventoryRows = () => {
    if (allInventoryRowsAreChecked) {
      const rowCheckedInventoryNow = rowCheckedInventory;
      inventorySearched.forEach((row: any) => {
        rowCheckedInventoryNow[row.item_no] = false;
      });

      setRowCheckedInventory({ ...rowCheckedInventoryNow });
    } else {
      const rowCheckedInventoryNow = rowCheckedInventory;
      inventorySearched.forEach((row: any) => {
        rowCheckedInventoryNow[row.item_no] = true;
      });

      setRowCheckedInventory({ ...rowCheckedInventoryNow });
    }
  };

  const createInventory = async () => {
    if (Object.keys(rowCheckedInventory).length === 0) {
      setSnackMessage('Please select data');
      setShowSnack(true);

      return;
    }

    Object.keys(rowCheckedInventory).forEach(async itemNo => {
      if (!rowCheckedInventory[itemNo]) {
        return;
      }

      const inventoryDataCurrent =
        //@ts-ignore
        inventorySearched.find(row => row.item_no === itemNo);
      (async () => {
        try {
          const transformedItems = {
            siteCd: inventoryDataCurrent.item_no,
          };

          await axios.post(
            'http://202.165.24.206/TommsApi/api/AssetApiKey/saveInventory',
            {
              ...transformedItems,
            }
          );
          setIsPushedInventory(isPushedOld => ({
            ...isPushedOld,
            [itemNo]: {
              pushed: true,
              time: Date.now(),
            },
          }));

          setSnackMessage('Post Successful');
          setShowSnack(true);
        } catch (err) {
          setIsPushedInventory(isPushedOld => ({
            ...isPushedOld,
            [itemNo]: {
              pushed: false,
              time: Date.now(),
            },
          }));
        }
      })();
    });
  };

  return (
    <>
      <Header />

      <InventoryDetailsModal
        open={inventoryDetailsModalNo !== null}
        itemNo={inventoryDetailsModalNo || ''}
        setInventoryDetailsModalNo={setInventoryDetailsModalNo}
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
        <div className='tw-flex tw-items-center tw-justify-between tw-bg-primary tw-px-[7rem] tw-py-[2rem]'>
          <Link href='/home'>
            <div className='tw-text-white'>
              <ChevronLeftIcon
                fill='white'
                className='tw-min-h-[5rem] tw-min-w-[5rem]'
              />
              <span className='tw-text-[24px]'>Inventory Management</span>
            </div>
          </Link>
          <FormControl className='!tw-max-w-[200px]' fullWidth>
            <label
              className='tw-mb-2 tw-text-[18px] tw-text-white'
              id='demo-simple-select-label'
            >
              Select Inventory Type
            </label>
            <Select
              className='!tw-bg-white !tw-text-black'
              value={inventoryType}
              onChange={e => setInventoryType(e.target.value)}
            >
              <MenuItem value={'inventory'}>Inventory</MenuItem>
              <MenuItem value={'inventoryReceiveLine'}>
                Inventory Receive line
              </MenuItem>
              <MenuItem value={'inventoryIssueLine'}>
                Inventory Issue line
              </MenuItem>
              <MenuItem value={'inventoryReturnFlow'}>
                Inventory Return flow
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {inventoryType === 'inventory' && (
          <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
            <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
              <div className='tw-flex tw-flex-col'>
                <span className='tw-text-3xl'>NEW INVENTORY</span>{' '}
                <span className='tw-mt-4 tw-text-gray-400'>
                  This module facilitates seamless cross-data synchronization
                  between the SAP-B1 data source and the CMMS destination system
                  in near real-time. An automated scheduler diligently monitors
                  both systems for updates at 10-minute intervals, ensuring the
                  availability of the most up-to-date data. Additionally, system
                  users have the option to manually trigger a data refresh by
                  clicking on the designated refresh icon.
                </span>
              </div>
              <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
                <RestartAltIcon
                  id='restart-icon-inventory'
                  fill='black'
                  className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                  onClick={() => {
                    setUpdateDataInventory(!updateDataInventory);
                    setShowSyncingInventory(true);
                    setTimeout(() => setShowSyncingInventory(false), 2000);
                  }}
                />
                <div
                  className={` tw-whitespace-nowrap ${
                    showSyncingInventory ? 'tw-visible' : 'tw-invisible'
                  }`}
                >
                  Getting Latest Inventories
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
                  onChange={e => setInventorySearchParams(e.target.value)}
                  value={inventorySearchParams}
                  placeholder='Item No | Item Group | Description'
                />
              </FormControl>
            </div>
            <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
              <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
                <div className=' tw-text-2xl'>TOTAL ITEMS</div>
                <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                  {inventoryData.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              {!loadingInventory && (
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
                              checked={allInventoryRowsAreChecked}
                              onChange={checkAllInventoryRows}
                              inputProps={{
                                'aria-label': 'Check All',
                              }}
                              style={{
                                color: '#ffffff',
                              }}
                            />
                            ITEM NO
                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          ITEM TYPE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          ITEM GROUP
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          DESCRIPTION
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          WAREHOUSE NAME
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          COST CENTER
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          SERIAL NUMBER
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className=' !tw-text-black'>
                      {inventorySearched.map((row: any) => (
                        <>
                          <StyledTableRow key={row.item_no}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[150px] tw-items-center'>
                                <Checkbox
                                  color='primary'
                                  checked={
                                    rowCheckedInventory[row.item_no] || false
                                  }
                                  onChange={e => {
                                    setRowCheckedInventory({
                                      ...rowCheckedInventory,
                                      [row.item_no]: e.target.checked,
                                    });
                                  }}
                                  inputProps={{
                                    'aria-label': 'select all desserts',
                                  }}
                                />
                                <span
                                  className='tw-cursor-pointer'
                                  onClick={() =>
                                    setInventoryDetailsModalNo(row.item_no)
                                  }
                                >
                                  {row.item_no}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.item_type}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.item_group}
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
                              {row.warehouse?.[0]?.warehouse_name || ''}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.cost_center}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.description}
                            </StyledTableCell> */}

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.serial_numbers}
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
                className='tw-rounded-lg tw-bg-primary tw-px-7 tw-py-3 tw-text-white'
                onClick={createInventory}
              >
                CREATE Inventory
              </button>
            </div>
          </Card>
        )}
        {inventoryType === 'inventoryReceiveLine' && (
          <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
            <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
              <div className='tw-flex tw-flex-col'>
                <span className='tw-text-3xl'>
                  RECEIVE LINE - GOODS RECEIPT
                </span>{' '}
                <span className='tw-mt-4 tw-text-gray-400'>
                  This module facilitates seamless cross-data synchronization
                  between the SAP-B1 data source and the CMMS destination system
                  in near real-time. An automated scheduler diligently monitors
                  both systems for updates at 10-minute intervals, ensuring the
                  availability of the most up-to-date data. Additionally, system
                  users have the option to manually trigger a data refresh by
                  clicking on the designated refresh icon.
                </span>
              </div>
              <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
                <RestartAltIcon
                  id='restart-icon-inventory'
                  fill='black'
                  className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                  onClick={() => {
                    setUpdateDataInventoryReceiveLine(
                      !updateDataInventoryReceiveLine
                    );
                    setShowSyncingInventoryReceiveLine(true);
                    setTimeout(
                      () => setShowSyncingInventoryReceiveLine(false),
                      2000
                    );
                  }}
                />
                <div
                  className={` tw-whitespace-nowrap ${
                    showSyncingInventoryReceiveLine
                      ? 'tw-visible'
                      : 'tw-invisible'
                  }`}
                >
                  Getting Latest Inventories
                </div>
              </div>
            </div>
            <div className='tw-mt-5 tw-flex  tw-items-center tw-gap-[2rem]'>
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
                  onChange={e =>
                    setInventorySearchParamsReceiveLine(e.target.value)
                  }
                  value={inventorySearchParamsReceiveLine}
                  placeholder='Item No | Warehouse | Number'
                />
              </FormControl>

              <FormControl className='tw-ml-5 !tw-max-w-[200px]' fullWidth>
                <label className='tw-mb-2 tw-text-xs '>Doc No</label>
                <Select
                  className='!tw-bg-white !tw-text-black'
                  value={inventoryReceiveLineDocNo}
                  onChange={e =>
                    setInventoryReceiveLineDocNo(e.target.value as number)
                  }
                >
                  {inventoryReceiveLineDocNoList.map(docNo => (
                    <MenuItem key={docNo} value={docNo}>
                      {docNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
              <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
                <div className=' tw-text-2xl'>TOTAL ITEMS</div>
                <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                  {inventoryDataReceiveLine.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              {!loadingInventoryReceiveLine && (
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
                          ITEM NO
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          WAREHOUSE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          UOM CODE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          NUMBER
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          QUANTITY
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          USERNAME
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          REMARK
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className=' !tw-text-black'>
                      {inventorySearchedReceiveLine.map((row: any) => (
                        <>
                          <StyledTableRow key={row.item_no}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                                <span className='tw-cursor-pointer tw-whitespace-nowrap tw-text-center'>
                                  {row.item_no}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.warehouse}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.uom_code}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.warehouse?.[0]?.warehouse_name || ''}
                            </StyledTableCell> */}

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.number}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.quantity}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.user_name}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.remarks}
                            </StyledTableCell>
                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.number}
                            </StyledTableCell> */}

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {isPushedInventory[row.item_no]?.pushed !==
                              undefined
                                ? formatDate(
                                    new Date(
                                      isPushedInventory[row.item_no]
                                        ?.time as number
                                    )
                                  )
                                : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {isPushedInventory[row.item_no]?.pushed !==
                              undefined
                                ? isPushedInventory[row.item_no]?.pushed !==
                                  false
                                  ? 'Success'
                                  : 'Failed'
                                : 'Not Pushed'}
                            </StyledTableCell> */}
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </Card>
        )}

        {inventoryType === 'inventoryIssueLine' && (
          <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
            <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
              <div className='tw-flex tw-flex-col'>
                <span className='tw-text-3xl'>ISSUE LINE - GOODS ISSUE</span>{' '}
                <span className='tw-mt-4 tw-text-gray-400'>
                  This module facilitates seamless cross-data synchronization
                  between the SAP-B1 data source and the CMMS destination system
                  in near real-time. An automated scheduler diligently monitors
                  both systems for updates at 10-minute intervals, ensuring the
                  availability of the most up-to-date data. Additionally, system
                  users have the option to manually trigger a data refresh by
                  clicking on the designated refresh icon.
                </span>
              </div>
              <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
                <RestartAltIcon
                  id='restart-icon-inventory'
                  fill='black'
                  className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                  onClick={() => {
                    setUpdateDataInventoryIssueLine(
                      !updateDataInventoryIssueLine
                    );
                    setShowSyncingInventoryIssueLine(true);
                    setTimeout(
                      () => setShowSyncingInventoryIssueLine(false),
                      2000
                    );
                  }}
                />
                <div
                  className={` tw-whitespace-nowrap ${
                    showSyncingInventoryIssueLine
                      ? 'tw-visible'
                      : 'tw-invisible'
                  }`}
                >
                  Getting Latest Inventories
                </div>
              </div>
            </div>
            <div className='tw-mt-5 tw-flex tw-items-center    tw-gap-[2rem]'>
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
                  onChange={e =>
                    setInventorySearchParamsIssueLine(e.target.value)
                  }
                  value={inventorySearchParamsIssueLine}
                  placeholder='Item No | Item Type '
                />
              </FormControl>
              <FormControl className='tw-ml-5 !tw-max-w-[200px]' fullWidth>
                <label className='tw-mb-2 tw-text-xs '>Doc No</label>
                <Select
                  id='demo-simple-select'
                  className='!tw-bg-white !tw-text-black'
                  value={inventoryIssueLineDocNo}
                  onChange={e =>
                    setInventoryIssueLineDocNo(e.target.value as number)
                  }
                >
                  {inventoryIssueLineDocNoList.map((docNo: any) => (
                    <MenuItem key={docNo} value={docNo}>
                      {docNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
              <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
                <div className=' tw-text-2xl'>TOTAL ITEMS</div>
                <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                  {inventoryDataIssueLine.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              {!loadingInventoryIssueLine && (
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
                          ITEM NO
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          ITEM TYPE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          WAREHOUSE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          ITEM DESCRIPTION
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          UOM CODE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          QUANTITY
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          USERNAME
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className=' !tw-text-black'>
                      {inventorySearchedIssueLine.map((row: any) => (
                        <>
                          <StyledTableRow key={row.number}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                                <span className='tw-cursor-pointer tw-whitespace-nowrap tw-text-center'>
                                  {row.item_no}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.number}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.warehouse}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.warehouse?.[0]?.warehouse_name || ''}
                            </StyledTableCell> */}

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
                              {row.uom_code}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.quantity}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.user_name}
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </Card>
        )}

        {inventoryType === 'inventoryReturnFlow' && (
          <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
            <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
              <div className='tw-flex tw-flex-col'>
                <span className='tw-text-3xl'>RETURN FLOW - GOODS RETURN</span>{' '}
                <span className='tw-mt-4 tw-text-gray-400'>
                  This module facilitates seamless cross-data synchronization
                  between the SAP-B1 data source and the CMMS destination system
                  in near real-time. An automated scheduler diligently monitors
                  both systems for updates at 10-minute intervals, ensuring the
                  availability of the most up-to-date data. Additionally, system
                  users have the option to manually trigger a data refresh by
                  clicking on the designated refresh icon.
                </span>
              </div>
              <div className='tw-flex tw-flex-col tw-items-center tw-justify-end tw-gap-[1rem]'>
                <RestartAltIcon
                  id='restart-icon-inventory'
                  fill='black'
                  className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                  onClick={() => {
                    setUpdateDataInventoryReturnFlow(
                      !updateDataInventoryReturnFlow
                    );
                    setShowSyncingInventoryReturnFlow(true);
                    setTimeout(
                      () => setShowSyncingInventoryReturnFlow(false),
                      2000
                    );
                  }}
                />
                <div
                  className={` tw-whitespace-nowrap ${
                    showSyncingInventoryReturnFlow
                      ? 'tw-visible'
                      : 'tw-invisible'
                  }`}
                >
                  Getting Latest Inventories
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
                  onChange={e =>
                    setInventorySearchParamsReturnFlow(e.target.value)
                  }
                  value={inventorySearchParamsReturnFlow}
                  placeholder='Item No'
                />
              </FormControl>
              <FormControl className='tw-ml-5 !tw-max-w-[200px]' fullWidth>
                <label className='tw-mb-2 tw-text-xs '>Doc No</label>
                <Select
                  className='!tw-bg-white !tw-text-black'
                  value={inventoryDataReturnFlowDocNo}
                  onChange={e =>
                    setInventoryDataReturnFlowDocNo(e.target.value as number)
                  }
                >
                  {inventoryDataReturnFlowDocNoList.map((docNo: any) => (
                    <MenuItem key={docNo} value={docNo}>
                      {docNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
              <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
                <div className=' tw-text-2xl'>TOTAL ITEMS</div>
                <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                  {inventoryDataReturnFlow.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              {!loadingInventoryReturnFlow && (
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
                          ITEM NO
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          QUALITY
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          POSTING DATE
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          REMARKS{' '}
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          OWNER
                        </StyledTableCell>

                        {/* <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          COST CENTER
                        </StyledTableCell>

                        <StyledTableCell
                          align='center'
                          className='tw-whitespace-nowrap'
                        >
                          SERIAL NUMBER
                        </StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody className=' !tw-text-black'>
                      {inventorySearchedReturnFlow.map((row: any) => (
                        <>
                          <StyledTableRow key={row.item_no}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                                <span className='tw-cursor-pointer tw-whitespace-nowrap tw-text-center'>
                                  {row.item_no}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.quantity}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.posting_date}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.warehouse?.[0]?.warehouse_name || ''}
                            </StyledTableCell> */}

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.remarks}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.owner}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row.serial_numbers}
                            </StyledTableCell> */}
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </Card>
        )}
      </section>
      <Footer className='tw-mt-10' />
    </>
  );
};

export default Inventory;
