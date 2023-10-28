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
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import type { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
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
  data,
  setSesamiModalNo,
}: {
  open: boolean;
  data: any;
  setSesamiModalNo: (prNo: string | null) => void;
}) {
  const handleClose = () => {
    setSesamiModalNo(null);
  };

  if (data === null) {
    return <div></div>;
  }

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
              PURCHASE ORDER
            </Typography>
          </Toolbar>
        </AppBar>

        <div className='tw-mx-[5rem] tw-mt-8 tw-flex tw-gap-[2rem]'>
          <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
            <div className=' tw-text-2xl'>TOTAL Items</div>
            <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
              {data.length}
            </div>
          </div>
        </div>
        <div className='tw-mx-[5rem] tw-my-10 tw-max-w-[1800px] '>
          <TableContainer
            component={Paper}
            className='!tw-rounded-2xl tw-text-base'
          >
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Item No.</StyledTableCell>
                  <StyledTableCell align='center'>
                    Service Description
                  </StyledTableCell>
                  <StyledTableCell align='center'>GL Code</StyledTableCell>
                  <StyledTableCell align='center'>
                    Required Date{' '}
                  </StyledTableCell>

                  <StyledTableCell align='center'>Required Qty</StyledTableCell>
                  <StyledTableCell align='center'>Currency</StyledTableCell>
                  <StyledTableCell align='center'>Info Price</StyledTableCell>
                  <StyledTableCell align='center'>Project</StyledTableCell>
                  <StyledTableCell align='center'>Free text</StyledTableCell>
                  <StyledTableCell align='center'>
                    Unit of Measurement
                  </StyledTableCell>
                  <StyledTableCell align='center'>Attachment</StyledTableCell>
                  <StyledTableCell align='center'>Remark</StyledTableCell>
                  <StyledTableCell align='center'>Cost center</StyledTableCell>
                  <StyledTableCell align='center'>Vendor</StyledTableCell>
                  <StyledTableCell align='center'>Vendor Code</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className=' !tw-text-black'>
                {data.map((row: any) => (
                  <StyledTableRow key={row.item_master}>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      className='!tw-font-bold !tw-underline'
                    >
                      {row.ItemMaster}
                    </StyledTableCell>

                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.ServiceDescription}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.GLCode}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {new Date(row.RequiredDate).toDateString()}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.RequiredQuantity}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Currency}
                    </StyledTableCell>

                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.InfoPrice}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Project}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.FreeText}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.UnitOfMeasurement}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Attachment}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Remark}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.CostCenter === null ? '-' : row.CostCenter}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Vendor}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.VendorCode}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
}
