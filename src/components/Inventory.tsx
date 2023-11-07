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

//import FullScreenDialog from './FullScreenDialog';
//import SesamiToSapModalInfo from './SesamiToSapModalInfo';
//import VendorDetailsModal from './VendorDetailsModal';
//import { formatDate } from '@/utils/getDateDiffInDays';
import Footer from './Footer';
import InventoryDetailsModal from './InventoryDetailsModal';
import { NewInventoryTypeObject, ReceiveInventoryTypeObject } from '@/utils/DataTypes';

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
  let base_url:string = 'https://stgrtsapi.clienttech.dev/api/CMMS'
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Please select data');

  const [inventoryData, setInventories] = useState<any>([]);
  // const [loadingInventory, setLoadingInventory] = useState(true);

  const [updateDataInventory, setUpdateDataInventory] = useState(false);
  const [showSyncingInventory, setShowSyncingInventory] = useState(false);
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

 const [inventoryLineDocNo, setInventoryLineDocNo] = useState<string>('1');

  // const [inventoryDataReceiveLine, setInventoryDataReceiveLine] = useState<any>( [] );

  // const [loadingInventoryReceiveLine, setLoadingInventoryReceiveLine] =
  //   useState(true);

  const [updateDataInventoryReceiveLine, setUpdateDataInventoryReceiveLine] =
    useState(false);
  const [showSyncingInventoryReceiveLine, setShowSyncingInventoryReceiveLine] =
    useState(false);
  // const [inventorySearchedReceiveLine, setInventorySearchedReceiveLine] =
  //   useState<any>([]);
  const [
    inventorySearchParamsReceiveLine,
    setInventorySearchParamsReceiveLine,
  ] = useState<string>('');
  const [inventoryDocNumber, setInventoryDocNumber] = useState<string[]>([]);

  const [updateDataInventoryIssueLine, setUpdateDataInventoryIssueLine] =
    useState(false);
  const [showSyncingInventoryIssueLine, setShowSyncingInventoryIssueLine] =
    useState(false);

  const [inventorySearchParamsIssueLine, setInventorySearchParamsIssueLine] =
    useState<string>('');


  const [updateDataInventoryReturnFlow, setUpdateDataInventoryReturnFlow] =
    useState(false);
  const [showSyncingInventoryReturnFlow, setShowSyncingInventoryReturnFlow] =
    useState(false);
  const [inventorySearchParamsReturnFlow, setInventorySearchParamsReturnFlow] =
    useState<string>('');

  const [inventoryType, setInventoryType] = useState<string>('inventory');

  let allInventoryRowsAreChecked = true;
  if (rowCheckedInventory && inventoryData?.length > 0) {
    inventoryData.forEach((row: any) => {

      if (rowCheckedInventory[row?.item_no] === true) {
        return;
      }

      if (
        isPushedInventory[row?.item_no]?.pushed === true &&
        typeof isPushedInventory[row?.item_no]?.time === 'number'
      ) {
        return;
      }

      allInventoryRowsAreChecked = false;
    });
  }

  const checkAllInventoryRows = () => {
    if (allInventoryRowsAreChecked) {
      const rowCheckedInventoryNow = rowCheckedInventory;
      inventoryData.forEach((row: any) => {
        rowCheckedInventoryNow[row?.item_no] = false;
      });

      setRowCheckedInventory({ ...rowCheckedInventoryNow });
    } else {
      const rowCheckedInventoryNow = rowCheckedInventory;
      inventoryData.forEach((row: any) => {
        rowCheckedInventoryNow[row?.item_no] = true;
      });

      setRowCheckedInventory({ ...rowCheckedInventoryNow });
    }
  };

  const createInventory = async () => {
    if (Object.keys(rowCheckedInventory)?.length === 0) {
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
        inventoryData.find(row => row?.item_no === itemNo);
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

  const inventoryCollections = ['receive','issue','return'];

  const ApiCall2 = async ()=>{
    let DocUrl: string = `${base_url}/get-goods-numbers/${inventoryType}/2023`;

    if(inventoryCollections?.includes(inventoryType)){
      try {
        const docResp = await axios.get(DocUrl);
        setInventoryDocNumber([...docResp?.data?.data])
      } catch (err) {
        console.log('err', err)
      }
    }
  }

const ApiCall = async () => {
  let url;
if (inventoryType === 'receive') {
  url = `https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-receive-line/${inventoryLineDocNo}`;
}
else if (inventoryType === 'issue') {
  url = `https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-issue-line/${inventoryLineDocNo}`
}
else if (inventoryType === 'return') {
  url = `https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-return-flow/${inventoryLineDocNo}`
}
else{
  url = 'https://stgrtsapi.clienttech.dev/api/CMMS/get-inventories/' + new Date().getFullYear();
}

  try {
    const response = await axios.get(url);
    
    if (inventoryCollections?.includes(inventoryType)) {
      
      if(inventoryType === 'return'){
        let newData
        newData= response?.data?.data?.items?.map((e:any)=>{
          return {...e,number:response?.data?.data?.number,
            remarks:response?.data?.data?.remarks,
            user_name:response?.data?.data?.user_name,
            attachments:response?.data?.data?.attachments,
            vendor_code:response?.data?.data?.vendor_code,
            vendor_name:response?.data?.data?.vendor_name,
            posting_date:response?.data?.data?.posting_date,
            owner:response?.data?.data?.owner,
          }
        })
        setInventories([...newData ]) 
      }
      else{ 
        let newData
        newData= response?.data?.data?.items?.map((e:any)=>{
          return {...e,number:response?.data?.data?.number,
            remarks:response?.data?.data?.remarks,
            user_name:response?.data?.data?.user_name,
            attachments:response?.data?.data?.attachments,
          }
        })
        setInventories([...newData ]) 
      }

    } else {
       setInventories([...response?.data?.data])
    }
  } catch (error) {
  }
  
}
useEffect(() => {
  ApiCall();
}, [inventoryLineDocNo]);

useEffect(() => {
  const iconElement = document.getElementById('restart-icon');

  if (iconElement) {
    iconElement.classList.add('rotate-animation');
    setTimeout(() => {
      iconElement.classList.remove('rotate-animation');
    }, 1000);
  }
  ApiCall()
  ApiCall2()
}, [updateDataInventory, showSyncingInventory,inventoryType,inventoryLineDocNo]);

console.log('inventoryType', inventoryType)
console.log('inventoryDocNumber', inventoryDocNumber)
console.log('inventoryLineDocNo', typeof inventoryLineDocNo ,inventoryLineDocNo)
console.log('inventoryData', inventoryData)
  return (
    <>
      <Header />

      <InventoryDetailsModal
        open={inventoryDetailsModalNo !== null}
        // itemNo={typeof inventoryDetailsModalNo === 'string' ? {} as NewInventoryTypeObject | ReceiveInventoryTypeObject : inventoryDetailsModalNo}
        itemNo={inventoryDetailsModalNo as NewInventoryTypeObject | ReceiveInventoryTypeObject | ''}
        inventoryType={inventoryType}
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
              onChange={e => {
                setInventories(null)             
                setInventoryType(()=>e.target.value)}}
                
            >
              <MenuItem value={'inventory'}>Inventory</MenuItem>
              <MenuItem value='receive'>
                Inventory Receive line
              </MenuItem>
              <MenuItem value={'issue'}>
                Inventory Issue line
              </MenuItem>
              <MenuItem value={'return'}>
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
                  id='restart-icon'
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
                  {inventoryData?.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              { (
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
                      {inventoryData?.map((row: any) => (
                        <>
                          <StyledTableRow key={row?.item_no}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[150px] tw-items-center'>
                                <Checkbox
                                  color='primary'
                                  checked={
                                    rowCheckedInventory[row?.item_no] || false
                                  }
                                  onChange={e => {
                                    setRowCheckedInventory({
                                      ...rowCheckedInventory,
                                      [row?.item_no]: e.target.checked,
                                    });
                                  }}
                                  inputProps={{
                                    'aria-label': 'select all desserts',
                                  }}
                                />
                                <span
                                  className='tw-cursor-pointer'
                                  onClick={() =>
                                    setInventoryDetailsModalNo(row)
                                  }
                                >
                                  {row?.item_no ? row?.item_no : '-'}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.item_type || '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.item_group || '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.description || '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.warehouse[0]?.warehouse_name || '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.cost_center ? row?.cost_center : '-'}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.description}
                            </StyledTableCell> */}

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.serial_numbers ? row?.serial_numbers : '-'}
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
                className={`tw-rounded-lg  tw-px-7 tw-py-3 tw-text-white ${ Object.values(rowCheckedInventory).includes(true)? 'tw-bg-primary ': 'tw-bg-gray-400' }`}
                onClick={createInventory}
                disabled={!(Object.values(rowCheckedInventory).includes(true))}
              >
                CREATE Inventory
              </button>
            </div>
          </Card>
        )}

        {/* inventory ReceiveLine  */}

        {inventoryType === 'receive' && (
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
                  id='restart-icon'
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
                  value={inventoryLineDocNo}
                  onChange={e =>
                    setInventoryLineDocNo(e.target.value as string)
                  }
                >
                  {inventoryDocNumber?.map((docNo: string) => (
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
                  {inventoryData?.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              { (
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
                      {inventoryData?.map((row: any) => (
                        <>
                          <StyledTableRow key={row?.item_no}>
                          <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                              <span
                                  className='tw-cursor-pointer'
                                  onClick={() =>
                                    setInventoryDetailsModalNo(row)
                                  }
                                >
                                  {row?.item_no ? row?.item_no : '-'}
                                </span>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.warehouse ? row?.warehouse : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.uom_code ? row?.uom_code : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.number ? row?.number : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.quantity ? row?.quantity : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.user_name ? row?.user_name : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.remarks ? row?.remarks : '-'}
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

        {/* inventory IssueLine */}

        {inventoryType === 'issue' && (
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
                  id='restart-icon'
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
                  value={inventoryLineDocNo}
                  onChange={e =>
                    setInventoryLineDocNo(()=>e.target.value as string)
                  }
                >
                  {inventoryDocNumber?.map((docNo: string) => (
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
                  {inventoryData?.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
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
                          ITEM COST
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
                          DESCRIPTION
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
                      {inventoryData?.map((row: any) => (
                        <>
                          <StyledTableRow key={row?.number}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                                <span className='tw-cursor-pointer tw-whitespace-nowrap tw-text-center'
                                 onClick={() =>
                                  setInventoryDetailsModalNo(row)
                                }
                                >
                                  {row?.item_no ? row?.item_no : '-'}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.item_cost ? row?.item_cost : '-'}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.warehouse?.[0]?.warehouse_name || ''}
                            </StyledTableCell> */}

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.warehouse ? row?.warehouse : '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.description ? row?.description : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.uom_code ? row?.uom_code : '-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.quantity ? row?.quantity :'-'}
                            </StyledTableCell>
                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.user_name ? row?.user_name : '-'}
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
          </Card>
        )}

        {/* inventory Return Flow */}
        {inventoryType === 'return' && (
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
                  id='restart-icon'
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
                  value={inventoryLineDocNo}
                  onChange={e =>
                    setInventoryLineDocNo(e.target.value as string)
                  }
                >
                  {inventoryDocNumber?.map((docNo: string) => (
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
                  {inventoryData?.length}
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }} className='tw-my-10'>
              { (
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
                      {inventoryData?.map((row: any) => (
                        <>
                          <StyledTableRow key={row?.item_no}>
                            <StyledTableCell
                              className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                              align='center'
                            >
                              <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                                <span className='tw-cursor-pointer tw-whitespace-nowrap tw-text-center'
                                 onClick={() =>
                                  setInventoryDetailsModalNo(row)
                                }
                                >
                                  {row?.item_no ? row?.item_no : '-'}
                                </span>
                              </div>
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.quantity ? row?.quantity : '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.posting_date || '-'}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.warehouse?.[0]?.warehouse_name || ''}
                            </StyledTableCell> */}

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.remarks ? row?.remarks : '-'}
                            </StyledTableCell>

                            <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.owner ? row?.owner : '-'}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              className='!tw-font-bold '
                              align='center'
                            >
                              {row?.serial_numbers}
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
