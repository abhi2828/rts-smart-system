import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Card,
  Checkbox,
  //Checkbox,
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
} from '@mui/material';
//import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import axios from 'axios';
import Link from 'next/link';
// import moment from 'moment';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
//import FullScreenDialog from './FullScreenDialog';
//import SesamiToSapModalInfo from './SesamiToSapModalInfo';
//import VendorDetailsModal from './VendorDetailsModal';
import { formatDate } from '@/utils/getDateDiffInDays';

import CMMSDetailsModal from './CMMSDetailsModal';
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

const Home = () => {
  const [showSnack, setShowSnack] = useState(false);

  //sapb2 to sesami
  const [sapb1ToCmms, setSapb1toCmms] = useState<any>([]);
  const [rowCheckedCMSS, setRowCheckedCMSS] = useState<{
    [key: string]: boolean;
  }>(JSON.parse(localStorage.getItem('rowCheckedSapToSesami') || `{}`));
  const [loading, setLoading] = useState(true);
  const [snackMessage, setSnackMessage] = useState('Please select data');

  const [updateDataCMSS, setUpdateDataCMMS] = useState(false);
  const [showSyncingCMMS, setShowSyncingCMMS] = useState(false);
  const [sesamiToCMMSSearched, setSesamiToCMMSSearched] = useState<any>([]);
  const [sapb1SearchParams, setSapb1SearchParams] = useState<string>('');

  const [CMMSDetailsModalNo, setCMMSDetailsModalNo] = useState<string | null>(
    null
  );

  const [syncedDataToCmms, setsyncedDataToCmms] = useState<{
    [key: string]: {
      time: number;
      pushed: boolean;
    };
  }>(JSON.parse(localStorage.getItem('syncedDataToCmms') || `{}`));

  // inventories

  const [inventoryDetailsModalNo, setInventoryDetailsModalNo] = useState<
    string | null
  >(null);

  useEffect(() => {
    const iconElement = document.getElementById('restart-icon-cmms');

    if (iconElement) {
      iconElement.classList.add('rotate-animation');
      setTimeout(() => {
        iconElement.classList.remove('rotate-animation');
      }, 1000);
    }

    (async () => {
      const data = await axios.get(
        'https://stgrtsapi.clienttech.dev/api/CMMS/get-asserts/2023'
      );

      setSapb1toCmms([...data.data.data]);
      setLoading(false);
    })();
  }, [updateDataCMSS, showSyncingCMMS]);

  async function postCMMS() {
    if (Object.keys(rowCheckedCMSS).length === 0) {
      setSnackMessage('Please select data');
      setShowSnack(true);

      return;
    }

    Object.keys(rowCheckedCMSS).forEach(async itemNo => {
      if (rowCheckedCMSS[itemNo] !== true) {
        return;
      }

      try {
        const postUrl =
          '  http://202.165.24.206/TommsApi/api/AssetApiKey/saveAsset';

        const itemInfo: any = sesamiToCMMSSearched.find(
          (item: any) => item.item_no === itemNo
        );

        //map data
        const postData = {
          astMstAssetNo: itemInfo.item_no,
          astMstAssetGrpcode: itemInfo.item_group,
          astMstAssetShortdesc: itemInfo.foreign_name,
          astMstWorkArea: itemInfo.location,
          astMstAssetLocn: itemInfo.location,
          AstMstAstLvl: itemInfo.location,
          astMstCostCenter: itemInfo.cost_center,
          AstMstAssetLongdesc: itemInfo.description,
          AstDetVarchar2: itemInfo.serial_numbers,
          AstDetVarchar3: itemInfo.manufacturer,
          AstDetDatetime1: itemInfo.capitalization_date,
          AstDetVarchar5: itemInfo.preferred_vendor,
          AstDetVarchar4: itemInfo.uom_name,
          astMstAssetType: itemInfo.asset_group,
          astMstAssetCode: itemInfo.asset_class,
          AstDetNumeric1: itemInfo.warranty_period,
          AstDetDatetime2: itemInfo.warranty_start_date,
          AstDetDatetime3: itemInfo.warranty_end_date,
        };

        try {
          const res = await axios.post(postUrl, postData, {
            headers: { 'ngrok-skip-browser-warning': '69420' },
          });

          if (res.data.Succeed === false) {
            throw new Error('Failed');
          }
          setsyncedDataToCmms((prev: any) => ({
            ...prev,
            [itemNo]: {
              pushed: true,
              time: Date.now(),
            },
          }));

          setRowCheckedCMSS(rowPrevChecked => {
            const rowCheckedInfo = rowPrevChecked;
            delete rowCheckedInfo[itemNo];

            return { ...rowCheckedInfo };
          });
        } catch (error) {
          setsyncedDataToCmms((prev: any) => ({
            ...prev,
            [itemNo]: {
              pushed: false,
              time: Date.now(),
            },
          }));
        }
      } catch (error) {
        console.error(`Failed to fetch budgets for GL code ${itemNo}`);
      }
    });
  }

  useEffect(() => {
    if (sapb1SearchParams.length === 0) {
      setSesamiToCMMSSearched([...sapb1ToCmms]);

      return;
    }

    const searched: Array<any> = [];

    sapb1ToCmms.forEach((cmms: any) => {
      if (
        cmms.item_no.toLowerCase().includes(sapb1SearchParams.toLowerCase()) ||
        cmms.item_group
          .toLowerCase()
          .includes(sapb1SearchParams.toLowerCase()) ||
        cmms.foreign_name
          .toLowerCase()
          .includes(sapb1SearchParams.toLowerCase()) ||
        cmms.description.toLowerCase().includes(sapb1SearchParams.toLowerCase())
      ) {
        searched.push(cmms);

        return;
      }
    });

    setSesamiToCMMSSearched([...searched]);
  }, [sapb1ToCmms, sapb1SearchParams]);

  const twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const currentTime = new Date().getTime();

  const totalCMMSSyncedToday = Object.keys(syncedDataToCmms).filter(
    syncedId =>
      syncedDataToCmms[syncedId]?.pushed === true &&
      currentTime - (syncedDataToCmms[syncedId]?.time || 0) <=
        twentyFourHoursInMillis
  ).length;

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  let disableSubmitCMMS = true;

  if (rowCheckedCMSS && sesamiToCMMSSearched.length > 0) {
    Object.keys(rowCheckedCMSS).forEach(itemNo => {
      if (rowCheckedCMSS[itemNo] === true) {
        if (syncedDataToCmms[itemNo]?.pushed === undefined) {
          disableSubmitCMMS = false;

          return;
        }

        if (syncedDataToCmms[itemNo]?.pushed === false) {
          disableSubmitCMMS = false;
        }
      }
    });
  }

  let allRowsCMMSChecked = true;
  if (rowCheckedCMSS && sesamiToCMMSSearched.length > 0) {
    sesamiToCMMSSearched.forEach((item: any) => {
      if (rowCheckedCMSS[item.item_no] === true) {
        return;
      }

      if (
        syncedDataToCmms[item.item_no]?.pushed === true &&
        typeof syncedDataToCmms[item.item_no]?.time === 'number'
      ) {
        return;
      }

      allRowsCMMSChecked = false;
    });
  }

  const checkAllCMMSRows = () => {
    if (allRowsCMMSChecked) {
      const rowCheckedCMSSNow = rowCheckedCMSS;
      sesamiToCMMSSearched.forEach((item: any) => {
        rowCheckedCMSSNow[item.item_no] = false;
      });

      setRowCheckedCMSS({ ...rowCheckedCMSSNow });
    } else {
      const rowCheckedCMSSNow = rowCheckedCMSS;
      sesamiToCMMSSearched.forEach((item: any) => {
        rowCheckedCMSSNow[item.item_no] = true;
      });

      setRowCheckedCMSS({ ...rowCheckedCMSSNow });
    }
  };

  return (
    <>
      <Header />

      <CMMSDetailsModal
        open={CMMSDetailsModalNo !== null}
        data={
          sesamiToCMMSSearched.find(
            (data: any) => data.item_no === CMMSDetailsModalNo
          ) || []
        }
        setCMMSDetailsModalNo={setCMMSDetailsModalNo}
      />

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
        <div className='tw-flex tw-items-center tw-bg-primary tw-px-[7rem] tw-py-[2rem]'>
          <Link href='/home'>
            <div className='tw-text-white'>
              <ChevronLeftIcon
                fill='white'
                className='tw-min-h-[5rem] tw-min-w-[5rem]'
              />
            </div>
          </Link>
          <div className='tw-flex tw-items-center tw-text-3xl tw-text-white'>
            SAP B1 {'<=>'} CMMS DATA SYNC
          </div>
        </div>
        <Card className='tw-mx-[7rem] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
          <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
            <div className='tw-flex tw-flex-col'>
              <span className='tw-text-3xl'>ASSET MASTER (FIXED ASSET)</span>{' '}
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
                id='restart-icon-cmms'
                fill='black'
                className='tw-min-h-[4rem]  tw-min-w-[4rem] tw-cursor-pointer'
                onClick={() => {
                  setUpdateDataCMMS(!updateDataCMSS);
                  setShowSyncingCMMS(true);
                  setTimeout(() => setShowSyncingCMMS(false), 2000);
                }}
              />
              <div
                className={` tw-whitespace-nowrap ${
                  showSyncingCMMS ? 'tw-visible' : 'tw-invisible'
                }`}
              >
                Getting Latest Asset
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
                placeholder='Item No | Item Group | Foreign Name'
              />
            </FormControl>
          </div>
          <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL ASSETS</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>1</div>
            </div>

            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL ASSETS SYNCED TODAY</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                {totalCMMSSyncedToday}
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
                        <div className='tw-flex-start tw-flex  tw-w-full tw-max-w-[250px] tw-items-center'>
                          <Checkbox
                            className=''
                            color='info'
                            checked={allRowsCMMSChecked}
                            onChange={checkAllCMMSRows}
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
                        ITEM GROUP
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        className='tw-whitespace-nowrap'
                      >
                        FOREIGN NAME
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        className='tw-whitespace-nowrap'
                      >
                        LOCATION
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
                        DESCRIPTION
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        className='tw-whitespace-nowrap'
                      >
                        SERIAL NOS
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        className='tw-whitespace-nowrap'
                      >
                        DATE SYNCED
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        className='tw-whitespace-nowrap'
                      >
                        STATUS
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className=' !tw-text-black'>
                    {sesamiToCMMSSearched.map((row: any) => (
                      <>
                        <StyledTableRow key={row.gl_code}>
                          <StyledTableCell
                            className='!tw-flex !tw-justify-center !tw-font-bold !tw-underline'
                            align='center'
                          >
                            <div className='tw-flex-start tw-flex tw-w-full tw-max-w-[150px] tw-items-center'>
                              <Checkbox
                                color='primary'
                                checked={rowCheckedCMSS[row.item_no] || false}
                                disabled={
                                  syncedDataToCmms[row.item_no]?.pushed || false
                                }
                                onChange={e => {
                                  setRowCheckedCMSS({
                                    ...rowCheckedCMSS,
                                    [row.item_no]: e.target.checked,
                                  });
                                }}
                                inputProps={{
                                  'aria-label': 'select all desserts',
                                }}
                              />

                              <span
                                className='tw-cursor-pointer tw-whitespace-nowrap tw-text-center'
                                onClick={() =>
                                  setCMMSDetailsModalNo(row.item_no)
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
                            {row.item_group}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.foreign_name}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.location}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.cost_center}
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
                            {row.serial_numbers}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold'
                            align='center'
                          >
                            {typeof syncedDataToCmms[row.item_no]?.time ===
                            'number'
                              ? formatDate(
                                  new Date(
                                    syncedDataToCmms[row.item_no]
                                      ?.time as number
                                  )
                                )
                              : '-'}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold'
                            align='center'
                          >
                            {syncedDataToCmms[row.item_no]?.pushed
                              ? 'Success'
                              : typeof syncedDataToCmms[row.item_no]?.pushed ===
                                'undefined'
                              ? '-'
                              : 'Failed'}
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
                (disableSubmitCMMS ? 'tw-bg-gray-400' : 'tw-bg-primary')
              }
              onClick={postCMMS}
              disabled={disableSubmitCMMS}
            >
              SUBMIT ASSET
            </button>
          </div>
        </Card>
      </section>
      <Footer className='tw-mt-10' />
    </>
  );
};

export default Home;
