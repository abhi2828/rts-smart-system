/* eslint-disable @typescript-eslint/no-shadow */
import CloseIcon from '@mui/icons-material/Close';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import type { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open = true,
  setOpen,
  selectedId,
  setSnackMessage,
  setShowSnack,
}: {
  open: boolean;
  setOpen: (open: string | null) => void;
  selectedId: string | null;
  setSnackMessage: any;
  setShowSnack: any;
}) {
  const [data, setData] = React.useState<any>(null);
  const [openItemModal, setOpenItemModal] = React.useState<string | boolean>(
    false
  );
  const [dataPushed, setDataPushed] = React.useState<any>(
    JSON.parse(localStorage.getItem('dataPushedGlItems') || '{}')
  );

  React.useEffect(() => {
    if (selectedId !== null) {
      (async () => {
        const data1 = await axios.get(
          'https://stgrtsapi.clienttech.dev/api/Budget/get-budget-by-code/' +
            selectedId
        );

        if (data1.data.data === null) {
          setData({
            noData: true,
          });
          return;
        }

        setData(data1.data.data[0]);
      })();
    }
  }, [selectedId]);

  const handleClose = () => {
    setOpen(null);
  };

  React.useEffect(() => {
    return () => {
      setOpenItemModal(false);
    };
  }, []);

  React.useEffect(() => {
    localStorage.setItem('dataPushedGlItems', JSON.stringify(dataPushed));
  }, [dataPushed]);

  if (data === null) {
    return <div></div>;
  }

  const pushData = async (openItemModal: string) => {
    const dataPR = data.pr_detail.find((pr: any) => pr.pr_no === openItemModal);

    function convertDate(inputDate: string) {
      const inputFormat = 'DD.MM.YYYY';
      const outputFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

      // Convert the input date string to a moment object
      const inputMoment = moment(inputDate, inputFormat);

      // Convert the moment object to the desired output format
      const outputDate = inputMoment.format(outputFormat);

      return outputDate;
    }

    const transformedItems = dataPR.items.map((item: any) => {
      return {
        RequiredDate: convertDate(item.required_date),
        ItemMaster: item.item_master,
        ServiceDescription: item.service_description,
        GLCode: item.gl_code,
        RequiredQuantity: item.required_qty,
        Currency: item.currency,
        InfoPrice: item.info_price,
        Project: item.project,
        FreeText: item.free_text,
        UnitOfMeasurement: item.unit_of_measurement,
        Attachment: item.attachment,
        Remark: item.remark,
        CostCenter: item.cost_center,
        Vendor: '',
        VendorCode: '',
      };
    });

    const transformedData = {
      Requestor: dataPR.requester,
      Department: dataPR.department,
      PRNo: dataPR.pr_no,
      PostingDate: convertDate(dataPR.posting_date),
      RequiredDate: convertDate(dataPR.required_date),
      Items: transformedItems,
    };

    await axios.post(
      'https://ssmrts.sesami.online/API/SubmitPR',
      {
        ...transformedData,
      },
      {
        headers: {
          Authorization: 'Basic F3E7DB5C-D57C-4103-8B46-99AF3E8267CE',
          SourceSystemID: 'SESAMi-RTS-API',
        },
      }
    );

    setDataPushed((isPushedOld: any) => ({
      ...isPushedOld,
      [openItemModal]: Date.now(),
    }));

    setSnackMessage('Post Successful');
    setShowSnack(true);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              {/* {data[0].gl_code} */} PURCHASE REQUEST DETAILS
            </Typography>
          </Toolbar>
        </AppBar>

        <div className='tw-mx-[5rem] tw-mt-8  tw-text-2xl tw-font-bold'>
          {data.noData ? (
            <div className=''>No data available</div>
          ) : (
            <>
              {/* <div>REQUESTER : {data[0].pr_detail.requester}</div>
              <div>DEPARTMENT: {data[0].pr_detail.department}</div>
              <div>PR NO: {data[0].pr_detail.pr_no}</div>
              <div>POSTING DATE : {data[0].pr_detail.posting_date}</div>
              <div>REQUESTED DATE : {data[0].pr_detail.required_date}</div>
              <div>DOCUMENT DATE : {data[0].pr_detail.document_date}</div> */}
            </>
          )}
        </div>
        {!data.noData && (
          <div className='tw-mx-[5rem] tw-mt-8 tw-flex tw-gap-[2rem]'>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>TOTAL Items</div>
              <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
                {data.pr_detail.length}
              </div>
            </div>
          </div>
        )}

        <div className='tw-mx-[5rem] tw-my-10 tw-max-w-[1800px] '>
          <TableContainer
            component={Paper}
            className='!tw-rounded-2xl tw-text-base'
          >
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>REQUESTOR NO.</StyledTableCell>
                  <StyledTableCell align='center'>DEPARTMENT</StyledTableCell>
                  <StyledTableCell align='center'>PR NO.</StyledTableCell>
                  <StyledTableCell align='center'>
                    POSTING DATE{' '}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    DOCUMENT DATE{' '}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    REQUIRED DATE{' '}
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              {!data.noData && (
                <TableBody className=' !tw-text-black'>
                  {data.pr_detail.map((row: any) => (
                    <>
                      <StyledTableRow
                        onClick={() => setOpenItemModal(row.pr_no)}
                        className='!tw-cursor-pointer'
                        key={row.requester}
                      >
                        <StyledTableCell
                          component='th'
                          scope='row'
                          className='!tw-font-bold !tw-underline'
                        >
                          {row.requester}
                        </StyledTableCell>

                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.department}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.pr_no}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.posting_date}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.document_date}
                        </StyledTableCell>
                        <StyledTableCell
                          className='!tw-font-bold '
                          align='center'
                        >
                          {row.required_date}
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>{' '}
        </div>
      </Dialog>
      <div>
        <Dialog
          className='!tw-z-[1400]'
          maxWidth='xl'
          open={openItemModal !== false}
          PaperProps={{ sx: { borderRadius: '10px' } }}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenItemModal(false)}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle className=' tw-flex tw-justify-between !tw-px-10'>
            Item Details for PR
            <IconButton onClick={() => setOpenItemModal(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent className='!tw-relative !tw-min-h-[700px] !tw-p-5 !tw-px-10'>
            <div className='!tw-overflow-auto'>
              <Table aria-label='customized table tw-p-5 !tw-max-w-[1000px]'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className='tw-whitespace-nowrap'>
                      ITEM NO.
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      SERVICE DESCRIPTION
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      GL CODE
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      Required Date{' '}
                    </StyledTableCell>
                    <StyledTableCell className='tw-whitespace-nowrap'>
                      REQUIRED QTY
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      CURRENCY
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      INFO PRICE
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      EXCHANGE RATE
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      PROJECT
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      FREE TEXT
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      UNIT OF MEASUREMENT
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      ATTACHMENT
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      REMARK
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      className='tw-whitespace-nowrap'
                    >
                      COST CENTER
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {openItemModal !== false &&
                    data.pr_detail
                      .find((pr: any) => pr.pr_no === openItemModal)
                      .items.map((row: any) => (
                        <StyledTableRow key={row.item_master}>
                          <StyledTableCell
                            component='th'
                            scope='row'
                            className='!tw-font-bold !tw-underline'
                          >
                            {row.item_master}
                          </StyledTableCell>

                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.service_description}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold tw-whitespace-nowrap'
                            align='center'
                          >
                            {row.gl_code}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.required_date}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.required_qty}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.currency}
                          </StyledTableCell>

                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.info_price}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.exchange_rate}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.project}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.free_text}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.unit_of_measurement}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.attachment}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.remark}
                          </StyledTableCell>
                          <StyledTableCell
                            className='!tw-font-bold '
                            align='center'
                          >
                            {row.cost_center === null ? '-' : row.cost_center}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
            <div className='tw-bottom-5 tw-absolute tw-mt-5 tw-flex tw-w-[90%] tw-justify-end'>
              <button
                className={
                  'tw-rounded-lg  tw-px-7 tw-py-3 tw-text-white ' +
                  (dataPushed[openItemModal as string]
                    ? 'tw-bg-primary'
                    : 'tw-bg-primary')
                }
                onClick={() => pushData(openItemModal as string)}
                // disabled={dataPushed[openItemModal as string] !== undefined}
              >
                SUBMIT PR
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
